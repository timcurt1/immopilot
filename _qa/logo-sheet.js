// Planche logo : états × viewports × thèmes, avant (8081) / après (8080) → docs/qa/logo-planche.png
const { chromium, newPage, scrollToY, path } = require('./lib');
const { execFileSync } = require('child_process');
const fs = require('fs');
const OUT = path.join(__dirname, 'out', 'logo'); fs.mkdirSync(OUT, { recursive: true });
(async () => {
  const b = await chromium.launch();
  const files = [];
  for (const [label, url] of [['avant', 'http://localhost:8081/'], ['apres', 'http://localhost:8080/']])
    for (const theme of ['dark', 'light'])
      for (const [w, h] of [[320, 568], [390, 844], [768, 1024], [1440, 900], [2560, 1440]]) {
        const { ctx, page } = await newPage(b, { w, h, mobile: w < 800, theme });
        await page.goto(url, { waitUntil: 'load' }); await page.waitForTimeout(900);
        const shot = async (state, sel = 'header .brand') => {
          const box = await (await page.$(sel)).boundingBox();
          const f = path.join(OUT, `${label}-${theme}-${w}-${state}.png`);
          await page.screenshot({ path: f, clip: { x: Math.max(0, box.x - 12), y: Math.max(0, box.y - 10), width: box.width + 24, height: box.height + 20 } });
          files.push(f);
        };
        await shot('haut');
        await scrollToY(page, 3000); await page.waitForTimeout(300); await scrollToY(page, 2950); await page.waitForTimeout(800); await shot('compact');
        if (w < 961) { await scrollToY(page, 0); await page.waitForTimeout(500); await page.click('[data-menu-toggle]'); await page.waitForTimeout(500); await shot('menu'); await page.keyboard.press('Escape'); }
        await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; document.querySelector('footer .brand').scrollIntoView({ block: 'center' }); }); await page.waitForTimeout(500); await shot('footer', 'footer .brand');
        await ctx.close();
      }
  await b.close();
  execFileSync('python3', ['-c', `
import sys, glob, os
from PIL import Image, ImageDraw
fs = sys.argv[2:]; ims = [Image.open(f) for f in fs]
H = 70; ims = [i.resize((int(i.width * H / i.height), H)) for i in ims]
rows = {}
for f, i in zip(fs, ims):
    k = '-'.join(os.path.basename(f).split('-')[:3]); rows.setdefault(k, []).append((os.path.basename(f), i))
W = max(sum(i.width + 8 for _, i in r) for r in rows.values()) + 150
g = Image.new('RGB', (W, (H + 8) * len(rows)), (128, 128, 128)); d = ImageDraw.Draw(g)
for y, (k, r) in enumerate(rows.items()):
    d.text((6, y * (H + 8) + 28), k, fill=(255, 255, 255)); x = 150
    for n, i in r: g.paste(i, (x, y * (H + 8))); x += i.width + 8
g.save(sys.argv[1])
`, path.join(__dirname, '..', 'docs', 'qa', 'logo-planche.png'), ...files]);
  console.log('planche :', files.length, 'captures');
})();
