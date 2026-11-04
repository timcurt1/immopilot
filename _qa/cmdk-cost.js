// Coût par frame de l’animation d’ouverture de la palette ⌘K, selon la propriété animée.
// Les variantes sont simulées dans la page (aucune modification du site).
const { launch, BASE, newPage, BROWSER } = require('./lib');
const VARIANTS = {
  'actuel (opacité + échelle + flou du panneau)': (v) => ({ panel: { opacity: v, transform: `scale(${0.95 + v * 0.05})`, filter: `blur(${(1 - v) * 8}px)` }, inner: {} }),
  'sans flou animé': (v) => ({ panel: { opacity: v, transform: `scale(${0.95 + v * 0.05})`, filter: '' }, inner: {} }),
  'flou sur le contenu seulement': (v) => ({ panel: { opacity: v, transform: `scale(${0.95 + v * 0.05})`, filter: '' }, inner: { filter: `blur(${(1 - v) * 8}px)` } }),
};
(async () => {
  const b = await launch();
  const { page } = await newPage(b, { w: 1440, h: 900, mobile: false });
  await page.goto(BASE, { waitUntil: 'load' }); await page.waitForTimeout(500);
  await page.keyboard.press('Control+k'); await page.waitForTimeout(800);
  for (const [name, fn] of Object.entries(VARIANTS)) {
    const ms = await page.evaluate((src) => new Promise((res) => {
      const f = eval(src); const panel = document.querySelector('[data-cmdk-panel]'); const inner = [...panel.children];
      const out = []; let t0 = performance.now(), last = t0;
      const step = (t) => {
        const v = Math.min(1, (t - t0) / 600); const s = f(v);
        Object.assign(panel.style, s.panel); inner.forEach((el) => { el.style.filter = s.inner.filter || ''; });
        out.push(t - last); last = t;
        if (v < 1) requestAnimationFrame(step); else res(out.slice(1));
      };
      requestAnimationFrame(step);
    }), fn.toString());
    const s = [...ms].sort((a, b) => a - b);
    console.log(`${BROWSER.padEnd(8)} ${name.padEnd(46)} frames=${ms.length} médiane=${Math.round(s[s.length >> 1])}ms max=${Math.round(s[s.length - 1])}ms`);
  }
  await b.close();
})();
