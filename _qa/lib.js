// Outils partagés de l’audit QA (hors livraison).
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = process.env.QA_URL || 'http://localhost:8080/';
const VIEWPORTS = [
  [320, 568, true], [375, 667, true], [390, 844, true], [430, 932, true], [844, 390, true, 'paysage'],
  [768, 1024, true], [1024, 768, false], [1280, 800, false], [1440, 900, false], [1920, 1080, false], [2560, 1440, false],
];

/** Injecté avant chargement : vitals, long tasks, compteurs. */
const INIT = () => {
  window.__qa = { lcp: 0, cls: 0, longtasks: [], frames: [] };
  try {
    new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__qa.lcp = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__qa.cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
    new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__qa.longtasks.push(Math.round(e.duration)); }).observe({ type: 'longtask', buffered: true });
  } catch (e) { /* navigateur sans PerformanceObserver complet */ }
  // Contrôle du logo : visibilité, recouvrement, ratio.
  window.__logoCheck = () => [...document.querySelectorAll('.brand')].map((b) => {
    const out = { where: b.closest('header') ? 'nav' : 'footer' };
    for (const [k, el] of [['mark', b.querySelector('.brand-mark')], ['wm', b.querySelector('.wm')]]) {
      const r = el.getBoundingClientRect();
      let op = 1, n = el;
      while (n && n.nodeType === 1) { const cs = getComputedStyle(n); op *= +cs.opacity; if (cs.visibility === 'hidden' || cs.display === 'none') op = 0; n = n.parentElement; }
      const inVp = r.width > 0 && r.height > 0 && r.top >= 0 && r.left >= 0 && r.bottom <= innerHeight && r.right <= innerWidth;
      const pts = [[r.left + r.width / 2, r.top + r.height / 2], [r.left + 1.5, r.top + 1.5], [r.right - 1.5, r.bottom - 1.5]];
      const covered = inVp ? pts.filter(([x, y]) => { const e = document.elementFromPoint(x, y); return !(e && (b.contains(e) || e === b)); }).length : null;
      out[k] = { x: +r.left.toFixed(2), y: +r.top.toFixed(2), w: +r.width.toFixed(2), h: +r.height.toFixed(2), inVp, op: +op.toFixed(2), covered };
    }
    out.ratio = +(out.mark.w / out.mark.h).toFixed(3);
    const dot = b.querySelector('.brand-mark');
    out.color = getComputedStyle(b).color;
    return out;
  });
  // Texte coupé horizontalement (hors viewport) parmi les éléments visibles.
  window.__clipCheck = () => {
    const bad = [];
    for (const el of document.querySelectorAll('h1,h2,h3,p,li,.btn,label,summary,.stat-v')) {
      if (el.closest('[aria-hidden="true"],.app,[hidden],.cmdk')) continue;
      const r = el.getBoundingClientRect();
      if (!r.width || r.bottom < 0 || r.top > innerHeight) continue;
      let op = 1, n = el; while (n && n.nodeType === 1) { op *= +getComputedStyle(n).opacity; n = n.parentElement; }
      if (op < 0.05) continue;
      if (r.right > innerWidth + 1 || r.left < -1 || el.scrollWidth > el.clientWidth + 2 && getComputedStyle(el).overflowX !== 'visible')
        bad.push(`${el.tagName}.${el.className}|${el.textContent.trim().slice(0, 40)}|L${Math.round(r.left)} R${Math.round(r.right)}`);
    }
    return bad;
  };
};

/** Contraste logo/fond calculé sur les pixels réels de la capture. */
async function logoContrast(page, sel = 'header .brand-mark') {
  const el = await page.$(sel); if (!el) return null;
  const box = await el.boundingBox(); if (!box || box.y < 0) return null;
  const buf = await page.screenshot({ clip: { x: Math.max(0, box.x - 4), y: Math.max(0, box.y - 4), width: box.width + 8, height: box.height + 8 } });
  return page.evaluate(async (b64) => {
    const img = await createImageBitmap(await (await fetch('data:image/png;base64,' + b64)).blob());
    const c = new OffscreenCanvas(img.width, img.height); const x = c.getContext('2d'); x.drawImage(img, 0, 0);
    const d = x.getImageData(0, 0, img.width, img.height).data;
    const lum = (r, g, b) => [r, g, b].map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }).reduce((a, v, i) => a + v * [0.2126, 0.7152, 0.0722][i], 0);
    let mn = 1, mx = 0; for (let i = 0; i < d.length; i += 4) { const l = lum(d[i], d[i + 1], d[i + 2]); mn = Math.min(mn, l); mx = Math.max(mx, l); }
    return +((mx + 0.05) / (mn + 0.05)).toFixed(2);
  }, buf.toString('base64'));
}

async function newPage(browser, { w, h, mobile, theme = 'dark', reduced = false }) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: 1, reducedMotion: reduced ? 'reduce' : 'no-preference', acceptDownloads: true });
  await ctx.addInitScript((t) => { try { localStorage.setItem('ip-theme', t); } catch (e) {} }, theme);
  await ctx.addInitScript(INIT);
  const page = await ctx.newPage();
  const log = { console: [], failed: [] };
  page.on('console', (m) => { if (['error', 'warning'].includes(m.type())) log.console.push(`${m.type()}: ${m.text()}`); });
  page.on('pageerror', (e) => log.console.push('pageerror: ' + e.message));
  page.on('requestfailed', (r) => { if (!r.url().startsWith('data:')) log.failed.push(`${r.failure()?.errorText} ${r.url()}`); });
  page.on('response', (r) => { if (r.status() >= 400) log.failed.push(`${r.status()} ${r.url()}`); });
  return { ctx, page, log };
}

const scrollToY = (page, y) => page.evaluate((y) => { document.documentElement.style.scrollBehavior = 'auto'; scrollTo(0, y); document.documentElement.style.scrollBehavior = ''; }, y);
const ensure = (d) => { fs.mkdirSync(d, { recursive: true }); return d; };

module.exports = { chromium, fs, path, BASE, VIEWPORTS, newPage, logoContrast, scrollToY, ensure };
