// Page légale : ancres, liens, taille de texte, hiérarchie des titres, débordement, console.
const { launch, BASE, newPage, BROWSER } = require('./lib');
(async () => {
  const b = await launch();
  for (const [w, h, theme] of [[375, 667, 'dark'], [375, 667, 'light'], [1440, 900, 'dark']]) {
    const { ctx, page, log } = await newPage(b, { w, h, mobile: w < 800, theme });
    await page.goto(BASE + 'legal.html', { waitUntil: 'load' });
    const r = await page.evaluate(() => {
      const ids = new Set([...document.querySelectorAll('[id]')].map((e) => e.id));
      const anchors = [...document.querySelectorAll('a[href^="#"]')].map((a) => a.getAttribute('href').slice(1));
      const brokenAnchors = anchors.filter((id) => !ids.has(id));
      const minFont = Math.min(...[...document.querySelectorAll('.legal p, .legal li')].map((e) => parseFloat(getComputedStyle(e).fontSize)));
      const heads = [...document.querySelectorAll('h1,h2,h3,h4')].map((x) => +x.tagName[1]);
      let jump = false; for (let i = 1; i < heads.length; i++) if (heads[i] - heads[i - 1] > 1) jump = true;
      return { ancres: anchors.length, ancresCassées: brokenAnchors, policeMin: minFont, h1: heads.filter((x) => x === 1).length, sautDeNiveau: jump, débordement: document.documentElement.scrollWidth - innerWidth, lang: document.documentElement.lang };
    });
    // Liens vers l’accueil et ancres de l’accueil
    const hrefs = await page.evaluate(() => [...document.querySelectorAll('a[href]')].map((a) => a.href).filter((u) => !u.includes('#') || u.includes('index') || /\/#/.test(u)));
    const status = [];
    for (const u of [...new Set(hrefs)]) { const res = await page.request.get(u); status.push(`${res.status()} ${u.replace(BASE, '/')}`); }
    if (w === 375) await page.screenshot({ path: `${__dirname}/out/legal-${w}-${theme}.png` });
    console.log(BROWSER, `${w} ${theme}`, JSON.stringify(r), '| liens :', status.join(', '), '| console :', log.console.length);
    await ctx.close();
  }
  await b.close();
})();
