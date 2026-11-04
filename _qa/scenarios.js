// Scénarios ciblés : node _qa/scenarios.js <label> [filtre]  → _qa/out/<label>/scenarios/
const { chromium, fs, path, BASE, newPage, scrollToY, ensure } = require('./lib');
const label = process.argv[2] || 'baseline';
const only = process.argv[3];
const OUT = ensure(path.join(__dirname, 'out', label, 'scenarios'));
const R = {};
const sectionY = (page, id, f = 0) => page.evaluate(([id, f]) => { const el = document.getElementById(id); const top = el.getBoundingClientRect().top + scrollY; return Math.round(top + f * Math.max(0, el.offsetHeight - innerHeight)); }, [id, f]);
async function frames(page, dir, n, every, clip) {
  ensure(dir);
  for (let i = 0; i < n; i++) { await page.screenshot({ path: path.join(dir, `p${String(i).padStart(2, '0')}.jpg`), type: 'jpeg', quality: 60, clip }); await page.waitForTimeout(every); }
}
const S = {
  // A. Sources de layout shift au chargement (petits écrans).
  async cls(b) {
    const out = {};
    for (const [w, h] of [[320, 568], [390, 844]]) {
      const { ctx, page } = await newPage(b, { w, h, mobile: true });
      await page.addInitScript(() => { window.__shifts = []; new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__shifts.push({ v: +e.value.toFixed(4), t: Math.round(e.startTime), src: (e.sources || []).map((s) => (s.node && s.node.nodeType === 1 ? s.node.tagName + '.' + s.node.className : String(s.node && s.node.nodeName)) + ` ${JSON.stringify(s.previousRect)}→${JSON.stringify(s.currentRect)}`) }); }).observe({ type: 'layout-shift', buffered: true }); });
      await page.goto(BASE, { waitUntil: 'load' }); await page.waitForTimeout(1500);
      out[`${w}x${h}`] = await page.evaluate(() => window.__shifts);
      await ctx.close();
    }
    return out;
  },
  // B. Qui occupe le thread principal au chargement (profil CPU).
  async profile(b) {
    const { ctx, page } = await newPage(b, { w: 390, h: 844, mobile: true });
    const cdp = await ctx.newCDPSession(page);
    await cdp.send('Profiler.enable'); await cdp.send('Profiler.setSamplingInterval', { interval: 200 }); await cdp.send('Profiler.start');
    await page.goto(BASE, { waitUntil: 'load' }); await page.waitForTimeout(800);
    const { profile } = await cdp.send('Profiler.stop');
    const dt = {}; const byId = new Map(profile.nodes.map((n) => [n.id, n]));
    profile.samples.forEach((id, i) => { const n = byId.get(id); const k = `${n.callFrame.functionName || '(anon)'} ${n.callFrame.url.split('/').pop()}:${n.callFrame.lineNumber + 1}`; dt[k] = (dt[k] || 0) + (profile.timeDeltas[i] || 0) / 1000; });
    const lt = await page.evaluate(() => window.__qa.longtasks);
    await ctx.close();
    return { longtasks: lt, top: Object.entries(dt).sort((a, b) => b[1] - a[1]).slice(0, 14).map(([k, v]) => `${v.toFixed(1)}ms ${k}`) };
  },
  // C. Compteurs : la valeur finale est-elle visible avant que le comptage ne reparte de 0 ?
  async counters(b) {
    const { ctx, page } = await newPage(b, { w: 1440, h: 900, mobile: false });
    await page.goto(BASE, { waitUntil: 'load' }); await page.waitForTimeout(500);
    await scrollToY(page, (await sectionY(page, 'chiffres')) - 100);
    const seq = [];
    for (let i = 0; i < 30; i++) {
      seq.push(await page.evaluate(() => [...document.querySelectorAll('[data-count]')].map((el) => { let o = 1, n = el; while (n && n.nodeType === 1) { o *= +getComputedStyle(n).opacity; n = n.parentElement; } return `${el.textContent}@${o.toFixed(2)}`; }).join(' ')));
      await page.waitForTimeout(50);
    }
    await frames(page, path.join(OUT, 'counters'), 12, 70, { x: 0, y: 0, width: 1440, height: 900 });
    await ctx.close();
    // Défaut : une valeur finale visible (opacité > 0.05) puis une valeur plus petite ensuite.
    const flash = [];
    seq.forEach((line, t) => line.split(' ').forEach((tok, k) => {
      const [v, o] = tok.split('@'); const later = seq.slice(t + 1).map((l) => +l.split(' ')[k].split('@')[0]);
      if (+o > 0.05 && later.some((x) => x < +v)) flash.push(`t=${t * 50}ms compteur ${k}: « ${v} » visible (opacité ${o}) puis redescend`);
    }));
    return { flash: [...new Set(flash)].slice(0, 6), seq: seq.filter((_, i) => i % 3 === 0) };
  },
  // D. Hero au chargement, image par image.
  async hero(b) {
    const { ctx, page } = await newPage(b, { w: 1440, h: 900, mobile: false });
    await page.goto(BASE, { waitUntil: 'commit' });
    await frames(page, path.join(OUT, 'hero'), 24, 50);
    await ctx.close(); return 'frames → hero/';
  },
  // E. FAQ : fermeture image par image.
  async faq(b) {
    const { ctx, page } = await newPage(b, { w: 1440, h: 900, mobile: false });
    await page.goto(BASE, { waitUntil: 'load' }); await scrollToY(page, (await sectionY(page, 'faq')) + 80); await page.waitForTimeout(900);
    await page.locator('#faq summary').nth(1).click(); await page.waitForTimeout(900);
    const before = await page.evaluate(() => getComputedStyle(document.querySelectorAll('#faq .faq-a')[1]).opacity);
    await page.locator('#faq summary').nth(1).click();
    const seq = [];
    for (let i = 0; i < 10; i++) { seq.push(await page.evaluate(() => { const d = document.querySelectorAll('#faq details')[1]; const a = d.querySelector('.faq-a'); return `open=${d.open} answerVisible=${!!a.offsetHeight}@${getComputedStyle(a).opacity} next.ty=${document.querySelectorAll('#faq details')[2].style.transform || '0'}`; })); await page.waitForTimeout(40); }
    await ctx.close();
    return { opacityBeforeClose: before, closeSeq: seq };
  },
  // F. Rechargement au milieu d’une scène : première image après chargement.
  async reload(b) {
    const { ctx, page } = await newPage(b, { w: 1440, h: 900, mobile: false });
    await page.goto(BASE, { waitUntil: 'load' }); await scrollToY(page, await sectionY(page, 'tri', 0.5)); await page.waitForTimeout(600);
    await page.reload({ waitUntil: 'commit' });
    const seq = [];
    for (let i = 0; i < 16; i++) {
      seq.push(await page.evaluate(() => { const rows = [...document.querySelectorAll('#tri .row')]; if (!rows.length) return 'mockups pas encore rendus'; const ys = rows.map((r) => Math.round(r.getBoundingClientRect().top)); return `scrollY=${scrollY} rows-distinct-y=${new Set(ys).size}/${rows.length}`; }).catch(() => 'navigation'));
      await page.waitForTimeout(25);
    }
    await ctx.close(); return seq;
  },
  // G. Seuil de compaction de la nav : micro-scroll autour de 40 px.
  async navThreshold(b) {
    const { ctx, page } = await newPage(b, { w: 1440, h: 900, mobile: false });
    await page.goto(BASE, { waitUntil: 'load' }); await page.waitForTimeout(400);
    const seq = [];
    for (const y of [30, 52, 30, 50, 34, 46, 30, 52]) { await scrollToY(page, y); await page.waitForTimeout(60); seq.push(await page.evaluate(() => document.querySelector('.nav-bar').style.transform.match(/scale\(([^)]+)\)/)?.[1])); }
    await ctx.close();
    return { scaleAt_30_52_30_50_34_46_30_52: seq };
  },
  // H. Palette ⌘K : la page défile-t-elle derrière la boîte de dialogue ?
  async cmdkLock(b) {
    const { ctx, page } = await newPage(b, { w: 1440, h: 900, mobile: false });
    await page.goto(BASE, { waitUntil: 'load' }); await scrollToY(page, 3000); await page.waitForTimeout(300);
    await page.keyboard.press('Control+k'); await page.waitForTimeout(400);
    const y0 = await page.evaluate(() => scrollY);
    await page.mouse.move(100, 800); await page.mouse.wheel(0, 900); await page.waitForTimeout(600);
    const y1 = await page.evaluate(() => scrollY);
    await page.keyboard.press('Escape'); await page.waitForTimeout(400);
    await ctx.close(); return { scrollBefore: y0, scrollAfterWheelOverScrim: y1 };
  },
  // I. Fluidité : durées de frames pendant un scroll continu, avec et sans CPU ×4.
  async fps(b) {
    const res = {};
    for (const [w, h, mobile, cpu] of [[1440, 900, false, 1], [1440, 900, false, 4], [390, 844, true, 4]]) {
      const { ctx, page } = await newPage(b, { w, h, mobile });
      const cdp = await ctx.newCDPSession(page);
      await page.goto(BASE, { waitUntil: 'load' }); await page.waitForTimeout(600);
      await cdp.send('Emulation.setCPUThrottlingRate', { rate: cpu });
      const end = await sectionY(page, 'actions');
      await page.evaluate(() => { window.__fr = []; let l = performance.now(); const f = (t) => { window.__fr.push(t - l); l = t; if (window.__fr.length < 100000) requestAnimationFrame(f); }; requestAnimationFrame(f); });
      for (let y = 0; y < end; y += 60) { await page.mouse.wheel(0, 60); await page.waitForTimeout(16); }
      const fr = await page.evaluate(() => window.__fr.slice(2));
      const lt = await page.evaluate(() => window.__qa.longtasks.slice(-20));
      const s = [...fr].sort((a, b) => a - b);
      res[`${w}x${h} cpu×${cpu}`] = { frames: fr.length, p50: +s[Math.floor(s.length * 0.5)].toFixed(1), p95: +s[Math.floor(s.length * 0.95)].toFixed(1), max: +s[s.length - 1].toFixed(1), over33ms: fr.filter((x) => x > 33.4).length, longtasks: lt };
      await ctx.close();
    }
    return res;
  },
  // J. Demi-tour : une scène scrubbée est-elle identique en arrivant par le bas ou par le haut ?
  async reverse(b) {
    const { ctx, page } = await newPage(b, { w: 1440, h: 900, mobile: false });
    await page.goto(BASE, { waitUntil: 'load' }); await page.waitForTimeout(500);
    const out = {};
    for (const [id, f] of [['chaos', 0.35], ['tri', 0.45], ['commande', 0.4], ['theme', 0.5]]) {
      const y = await sectionY(page, id, f);
      for (let k = y - 1500; k <= y; k += 100) { await page.mouse.wheel(0, 100); }
      await scrollToY(page, y); await page.waitForTimeout(700);
      const a = await page.screenshot({ type: 'png' });
      await scrollToY(page, y + 900); await page.waitForTimeout(300);
      for (let k = 0; k < 9; k++) { await page.mouse.wheel(0, -100); await page.waitForTimeout(10); }
      await scrollToY(page, y); await page.waitForTimeout(700);
      const c = await page.screenshot({ type: 'png' });
      fs.writeFileSync(path.join(ensure(path.join(OUT, 'reverse')), `${id}-down.png`), a); fs.writeFileSync(path.join(OUT, 'reverse', `${id}-up.png`), c);
      out[id] = a.equals(c) ? 'identique' : 'différent (voir reverse/)';
    }
    await ctx.close(); return out;
  },
  // K. Retour arrière (bfcache) + resize pendant une scène.
  async bfcacheResize(b) {
    const { ctx, page, log } = await newPage(b, { w: 1440, h: 900, mobile: false });
    await page.goto(BASE, { waitUntil: 'load' }); await scrollToY(page, await sectionY(page, 'tri', 0.4)); await page.waitForTimeout(500);
    await page.evaluate(() => addEventListener('pageshow', (e) => { sessionStorage.setItem('persisted', e.persisted); }));
    await page.goto(BASE.replace(/\/?$/, '/') + 'legal.html'); await page.goBack(); await page.waitForTimeout(800);
    const back = await page.evaluate(() => ({ persisted: sessionStorage.getItem('persisted'), y: scrollY, rows: new Set([...document.querySelectorAll('#tri .row')].map((r) => Math.round(r.getBoundingClientRect().top))).size }));
    await page.screenshot({ path: path.join(OUT, 'bfcache.jpg'), type: 'jpeg', quality: 60 });
    for (const [w, h] of [[900, 900], [390, 844], [1440, 900]]) { await page.setViewportSize({ width: w, height: h }); await page.waitForTimeout(400); }
    const afterResize = await page.evaluate(() => ({ ox: document.documentElement.scrollWidth - innerWidth, rows: new Set([...document.querySelectorAll('#tri .row')].map((r) => Math.round(r.getBoundingClientRect().top))).size }));
    await page.screenshot({ path: path.join(OUT, 'resize.jpg'), type: 'jpeg', quality: 60 });
    await ctx.close(); return { back, afterResize, console: log.console };
  },
  // L. Mouvement réduit : du texte reste-t-il invisible ?
  async reduced(b) {
    const { ctx, page } = await newPage(b, { w: 390, h: 844, mobile: true, reduced: true });
    await page.goto(BASE, { waitUntil: 'load' }); await page.waitForTimeout(500);
    const total = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
    const hidden = new Set();
    for (let y = 0; y <= total; y += 400) {
      await scrollToY(page, y); await page.waitForTimeout(350);
      (await page.evaluate(() => [...document.querySelectorAll('h1,h2,h3,p,li,.btn,summary')].filter((el) => { if (el.closest('[aria-hidden="true"],[hidden],.cmdk,details:not([open]) .faq-a')) return false; const r = el.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight || !r.height) return false; let o = 1, n = el; while (n && n.nodeType === 1) { o *= +getComputedStyle(n).opacity; n = n.parentElement; } return o < 0.05; }).map((el) => el.textContent.trim().slice(0, 40)))).forEach((t) => hidden.add(t));
    }
    await ctx.close(); return { pinnedHeight: total, hiddenText: [...hidden] };
  },
  // M. Thème : bascule image par image (saut de luminosité ?).
  async theme(b) {
    const { ctx, page } = await newPage(b, { w: 1440, h: 900, mobile: false });
    await page.goto(BASE, { waitUntil: 'load' }); await page.waitForTimeout(500);
    const mean = async () => { const buf = await page.screenshot({ type: 'png', clip: { x: 0, y: 300, width: 1440, height: 2 } }); return page.evaluate(async (b64) => { const i = await createImageBitmap(await (await fetch('data:image/png;base64,' + b64)).blob()); const c = new OffscreenCanvas(i.width, i.height).getContext('2d'); c.drawImage(i, 0, 0); const d = c.getImageData(0, 0, i.width, i.height).data; let s = 0; for (let k = 0; k < d.length; k += 4) s += d[k] + d[k + 1] + d[k + 2]; return Math.round(s / (d.length / 4) / 3); }, buf.toString('base64')); };
    await page.click('[data-theme-toggle]');
    const seq = []; for (let i = 0; i < 14; i++) { seq.push(await mean()); await page.waitForTimeout(25); }
    const meta = await page.evaluate(() => document.querySelector('meta[name="theme-color"]').content);
    await ctx.close();
    // Au rechargement en clair, la meta theme-color suit-elle ?
    const p2 = await newPage(b, { w: 390, h: 844, mobile: true, theme: 'light' });
    await p2.page.goto(BASE, { waitUntil: 'load' });
    const metaOnLoadLight = await p2.page.evaluate(() => document.querySelector('meta[name="theme-color"]').content);
    await p2.ctx.close();
    return { luminanceSeq: seq, metaAfterToggle: meta, metaOnLoadLight };
  },
  // N. Menu mobile : ouverture / fermeture, logo et défilement.
  async menu(b) {
    const { ctx, page } = await newPage(b, { w: 390, h: 844, mobile: true });
    await page.goto(BASE, { waitUntil: 'load' }); await page.waitForTimeout(500);
    await page.tap('[data-menu-toggle]'); await page.waitForTimeout(500);
    const open = await page.evaluate(() => ({ logo: window.__logoCheck().find((x) => x.where === 'nav'), expanded: document.querySelector('[data-menu-toggle]').getAttribute('aria-expanded'), menuVisible: !!document.querySelector('#nav-links').offsetHeight }));
    await page.screenshot({ path: path.join(OUT, 'menu-open.jpg'), type: 'jpeg', quality: 60 });
    await page.keyboard.press('Escape'); await page.waitForTimeout(500);
    const closed = await page.evaluate(() => ({ menuVisible: !!document.querySelector('#nav-links').offsetHeight, focus: document.activeElement.getAttribute('aria-label') }));
    await ctx.close(); return { open, closed };
  },
};

(async () => {
  const b = await chromium.launch();
  for (const [k, fn] of Object.entries(S)) {
    if (only && !only.split(',').includes(k)) continue;
    try { R[k] = await fn(b); } catch (e) { R[k] = 'ERREUR ' + e.message.split('\n')[0]; }
    console.log(`== ${k}\n${JSON.stringify(R[k], null, 1).slice(0, 2500)}`);
  }
  fs.writeFileSync(path.join(OUT, `scenarios${only ? '-' + only.replace(/,/g, '_') : ''}.json`), JSON.stringify(R, null, 1));
  await b.close();
})();
