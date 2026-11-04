// Audit complet : node _qa/audit.js <label>   → _qa/out/<label>/
// Matrice viewports × thèmes, scroll par paliers de 2,5 %, logo à chaque palier,
// débordements, console, requêtes, vitals. Chromium uniquement (WebKit/Firefox indisponibles ici).
const { launch, BROWSER, fs, path, VIEWPORTS, BASE, newPage, logoContrast, scrollToY, ensure } = require('./lib');
const label = process.argv[2] || 'baseline';
const OUT = ensure(path.join(__dirname, 'out', BROWSER === 'chromium' ? label : `${label}-${BROWSER}`));
const STEPS = 40;

(async () => {
  const browser = await launch();
  const report = { label, runs: [] };
  for (const [w, h, mobile, tag] of VIEWPORTS) for (const theme of ['dark', 'light']) {
    const name = `${w}x${h}-${theme}`;
    const dir = ensure(path.join(OUT, name));
    const { ctx, page, log } = await newPage(browser, { w, h, mobile, theme });
    const run = { name, issues: [], logo: [], overflow: [], clip: new Set() };
    const t0 = Date.now();
    await page.goto(BASE, { waitUntil: 'commit' });
    // Logo à t = 0, 100, 250, 500, 1000, 2000 ms.
    for (const t of [0, 100, 250, 500, 1000, 2000]) {
      const wait = t - (Date.now() - t0); if (wait > 0) await page.waitForTimeout(wait);
      try { await page.waitForSelector('header .brand', { timeout: 1500 }); } catch (e) { run.issues.push(`t=${t}: logo absent du DOM`); continue; }
      const L = await page.evaluate(() => window.__logoCheck && window.__logoCheck());
      if (L) for (const b of L.filter((x) => x.where === 'nav')) {
        if (!b.mark.inVp || b.mark.op < 0.99 || b.mark.covered || !b.wm.inVp || b.wm.covered) run.logo.push(`t=${t}ms ${JSON.stringify(b)}`);
        if (Math.abs(b.ratio - 1) > 0.01) run.logo.push(`t=${t}ms ratio ${b.ratio}`);
      }
    }
    await page.waitForLoadState('load'); await page.waitForTimeout(400);
    const total = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
    for (let i = 0; i <= STEPS; i++) {
      const y = Math.round((i / STEPS) * total);
      await scrollToY(page, y); await page.waitForTimeout(160);
      const s = await page.evaluate(() => ({ ox: document.documentElement.scrollWidth - document.documentElement.clientWidth, clip: window.__clipCheck() }));
      if (s.ox > 0) run.overflow.push(`palier ${i}: +${s.ox}px`);
      s.clip.forEach((c) => run.clip.add(`palier ${i}: ${c}`));
      await page.screenshot({ path: path.join(dir, `p${String(i).padStart(2, '0')}.jpg`), type: 'jpeg', quality: 55 });
      // Logo : on remonte de 40 px pour faire réapparaître la nav (elle se cache en descendant, par design).
      if (i % 4 === 0 && i < STEPS) {
        await scrollToY(page, Math.max(0, y - 40)); await page.waitForTimeout(650);
        const L = (await page.evaluate(() => window.__logoCheck())).find((x) => x.where === 'nav');
        const c = await logoContrast(page);
        if (!L.mark.inVp || L.mark.op < 0.99 || L.mark.covered || L.wm.covered || !L.wm.inVp) run.logo.push(`palier ${i} nav ${JSON.stringify(L)}`);
        if (c !== null && c < 3) run.logo.push(`palier ${i} contraste ${c}`);
      }
    }
    // Footer : logo en bas de page.
    await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; document.querySelector('footer .brand').scrollIntoView({ block: 'center' }); }); await page.waitForTimeout(500);
    const F = (await page.evaluate(() => window.__logoCheck())).find((x) => x.where === 'footer');
    const fc = await logoContrast(page, 'footer .brand-mark');
    if (!F.mark.inVp || F.mark.op < 0.99 || F.mark.covered) run.logo.push(`footer ${JSON.stringify(F)}`);
    if (fc !== null && fc < 3) run.logo.push(`footer contraste ${fc}`);
    const qa = await page.evaluate(() => ({ lcp: Math.round(window.__qa.lcp), cls: +window.__qa.cls.toFixed(4), longtasks: window.__qa.longtasks }));
    Object.assign(run, qa, { console: log.console, failed: log.failed.filter((f) => !f.includes('immopilot.world')), clip: [...run.clip] });
    report.runs.push(run);
    console.log(`${name} lcp=${qa.lcp} cls=${qa.cls} lt=${qa.longtasks.length} console=${log.console.length} failed=${run.failed.length} logo=${run.logo.length} overflow=${run.overflow.length} clip=${run.clip.length}`);
    await ctx.close();
  }
  fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 1));
  await browser.close();
})();
