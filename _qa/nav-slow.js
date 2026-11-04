// La nav réapparaît-elle sur un défilement vers le haut LENT (petits pas) ?
const { launch, BASE, newPage, BROWSER, scrollToY } = require('./lib');
(async () => {
  const b = await launch();
  const { page } = await newPage(b, { w: 1440, h: 900, mobile: false });
  await page.goto(BASE, { waitUntil: 'load' }); await page.waitForTimeout(500);
  await scrollToY(page, 2000); await page.waitForTimeout(100); await scrollToY(page, 3000); await page.waitForTimeout(700);
  const st = () => page.evaluate(() => Math.round(document.querySelector('.nav-bar').getBoundingClientRect().bottom));
  const hidden = await st();
  for (let i = 0; i < 15; i++) { await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; scrollBy(0, -3); }); await page.waitForTimeout(30); }
  await page.waitForTimeout(700);
  const after = await st();
  console.log(`${BROWSER}: bas de la nav cachée=${hidden}px → après 15×3 px vers le haut=${after}px → ${after > 0 ? 'réapparue' : 'TOUJOURS CACHÉE'}`);
  await b.close();
})();
