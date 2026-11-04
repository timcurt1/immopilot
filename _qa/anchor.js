// Firefox : l’ancrage de défilement (scroll anchoring) corrige-t-il la position pendant le scroll ?
const { launch, BASE, newPage, BROWSER } = require('./lib');
(async () => {
  const b = await launch();
  const { page, log } = await newPage(b, { w: 1440, h: 900, mobile: false });
  await page.goto(BASE, { waitUntil: 'load' }); await page.waitForTimeout(500);
  const r = await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = 'auto';
    const total = document.documentElement.scrollHeight - innerHeight; const drift = [];
    for (let y = 0; y < total; y += 37) {
      scrollTo(0, y);
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      if (Math.abs(scrollY - y) > 0.5) drift.push(`${y}→${Math.round(scrollY)}`);
    }
    return { pas: Math.ceil(total / 37), corrections: drift.length, exemples: drift.slice(0, 6) };
  });
  console.log(BROWSER, JSON.stringify(r), '| avertissements ancrage :', log.console.filter((c) => c.includes('Scroll anchoring')).length);
  await b.close();
})();
