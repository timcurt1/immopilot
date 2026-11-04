// Alignement 1re carte du carrousel vs titre de section (même colonne attendue).
const { chromium, BASE, newPage, scrollToY } = require('./lib');
(async () => {
  const b = await chromium.launch();
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const { ctx, page } = await newPage(b, { w, h, mobile: w < 500 });
    await page.goto(BASE, { waitUntil: 'load' });
    const r = await page.evaluate(() => ({ sb: innerWidth - document.documentElement.clientWidth, card: Math.round(document.querySelector('.ben-card').getBoundingClientRect().left), title: Math.round(document.querySelector('#ben-title').getBoundingClientRect().left) }));
    console.log(`${w}: scrollbar=${r.sb}px carte=${r.card} titre=${r.title} écart=${r.card - r.title}px`);
    await ctx.close();
  }
  await b.close();
})();
