// A/B : écarts de position du scroll (Firefox) avec / sans exclusion des scènes épinglées de l’ancrage.
const { launch, BASE, newPage, BROWSER } = require('./lib');
(async () => {
  const b = await launch();
  for (const variant of (process.env.V ? [process.env.V] : ['actuel', 'test : .pin { overflow-anchor: none }'])) {
    const res = [];
    for (const [w, h] of [[1440, 900], [390, 844], [1920, 1080]]) {
      const { ctx, page, log } = await newPage(b, { w, h, mobile: w < 800 });
      await page.goto(BASE, { waitUntil: 'load' }); await page.waitForTimeout(400);
      if (variant !== 'actuel') await page.addStyleTag({ content: process.env.CSS || '.pin { overflow-anchor: none; }' });
      const total = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
      const drift = [];
      for (let i = 0; i <= 40; i++) {
        const y = Math.round((i / 40) * total);
        const got = await page.evaluate(async (y) => { document.documentElement.style.scrollBehavior = 'auto'; scrollTo(0, y); await new Promise((r) => setTimeout(r, 160)); return Math.round(scrollY); }, y);
        if (Math.abs(got - y) > 1) drift.push(`${y}→${got} (#${await page.evaluate((y) => [...document.querySelectorAll('main > section')].find((s) => s.offsetTop <= y + innerHeight / 2 && s.offsetTop + s.offsetHeight > y + innerHeight / 2)?.id, y)})`);
        if (i % 4 === 0) await page.evaluate(async (y) => { scrollTo(0, Math.max(0, y - 40)); await new Promise((r) => setTimeout(r, 650)); }, y);
      }
      res.push(`${w}: ${drift.length} écart(s) ${drift.join(' ')} | avert. ${log.console.filter((c) => c.includes('anchoring')).length}`);
      await ctx.close();
    }
    console.log(`${BROWSER} — ${variant}\n  ${res.join('\n  ')}`);
  }
  await b.close();
})();
