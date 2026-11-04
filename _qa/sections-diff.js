// Non-régression par section : même position relative dans chaque section, avant (8081) / après (8080).
const { launch, newPage, BROWSER, path, ensure } = require('./lib');
const { execFileSync } = require('child_process');
const SECTIONS = [['top', 0], ['top', 0.6], ['chaos', 0.4], ['chaos', 0.8], ['tri', 0.5], ['commande', 0.5], ['actions', -1], ['vues', -1], ['benefices', -1], ['theme', 0.5], ['faq', -1]];
const OUT = ensure(path.join(__dirname, 'out', `sections-${BROWSER}`));
(async () => {
  const b = await launch();
  for (const [w, h] of [[375, 667], [768, 1024], [1440, 900]]) for (const theme of ['dark', 'light']) {
    for (const [label, url] of [['avant', 'http://localhost:8081/'], ['apres', 'http://localhost:8080/']]) {
      const { ctx, page } = await newPage(b, { w, h, mobile: w < 800, theme });
      await page.goto(url, { waitUntil: 'load' }); await page.waitForTimeout(400);
      for (const [id, f] of SECTIONS) {
        await page.evaluate(([id, f]) => { document.documentElement.style.scrollBehavior = 'auto'; const el = document.getElementById(id); const top = el.getBoundingClientRect().top + scrollY; scrollTo(0, f < 0 ? top - 40 : top + f * Math.max(0, el.offsetHeight - innerHeight)); }, [id, f]);
        await page.waitForTimeout(1300); // révélations et ressorts terminés
        await page.screenshot({ path: path.join(OUT, `${label}-${w}-${theme}-${id}-${f}.png`) });
      }
      await ctx.close();
    }
  }
  await b.close();
  console.log(execFileSync('python3', ['-c', `
import glob, os
from PIL import Image, ImageChops
out = []
for a in sorted(glob.glob('${OUT}/avant-*.png')):
    p = a.replace('/avant-', '/apres-'); A = Image.open(a).convert('L'); B = Image.open(p).convert('L')
    # bande de la nav exclue : elle apparaît/disparaît selon le sens du dernier défilement
    A = A.crop((0, 90, A.width, A.height)); B = B.crop((0, 90, B.width, B.height))
    d = ImageChops.difference(A, B).point(lambda v: 255 if v > 40 else 0)
    out.append((d.histogram()[255] / (A.width * A.height), os.path.basename(a)[6:-4]))
out.sort(reverse=True)
same = sum(1 for x in out if x[0] < 0.001)
print(f'{len(out)} captures comparées, {same} identiques (< 0,1 % de pixels différents)')
for v, n in out[:8]: print(f'  {v*100:5.2f} %  {n}')
`]).toString());
})();
