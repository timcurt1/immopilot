// Visuels des scènes épinglées : dépassent-ils le bas de l’écran pendant l’épinglage ?
const { chromium, BASE, newPage, scrollToY } = require('./lib');
const SC = [['chaos', '.chaos-app'], ['tri', '.app-tri'], ['commande', '.cmdk-demo .app'], ['theme', '.theme-frame']];
(async () => {
  const b = await chromium.launch();
  for (const [w, h] of [[320, 568], [375, 667], [390, 844], [430, 932], [768, 1024], [1024, 768], [1280, 800], [1440, 900]]) {
    const { ctx, page } = await newPage(b, { w, h, mobile: w < 800 });
    await page.goto(BASE, { waitUntil: 'load' }); await page.waitForTimeout(300);
    const out = [];
    for (const [id, sel] of SC) {
      const y = await page.evaluate((id) => { const el = document.getElementById(id); return el.getBoundingClientRect().top + scrollY + 0.5 * (el.offsetHeight - innerHeight); }, id);
      await scrollToY(page, y); await page.waitForTimeout(250);
      out.push(id + ':' + await page.evaluate((sel) => { const r = document.querySelector(sel).getBoundingClientRect(); return `${Math.round(r.bottom - innerHeight)}px (h${Math.round(r.height)})`; }, sel));
    }
    console.log(`${w}x${h}`, out.join('  '));
    await ctx.close();
  }
  await b.close();
})();
