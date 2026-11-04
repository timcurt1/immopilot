// Profil CPU pendant un scroll continu (CPU ×4) : node _qa/profile-scroll.js
const { chromium, BASE, newPage } = require('./lib');
(async () => {
  const b = await chromium.launch();
  const { ctx, page } = await newPage(b, { w: 1440, h: 900, mobile: false });
  const cdp = await ctx.newCDPSession(page);
  await page.goto(BASE, { waitUntil: 'load' }); await page.waitForTimeout(600);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await cdp.send('Profiler.enable'); await cdp.send('Profiler.setSamplingInterval', { interval: 200 }); await cdp.send('Profiler.start');
  await page.evaluate(() => { window.__qa.longtasks = []; });
  for (let i = 0; i < 160; i++) { await page.mouse.wheel(0, 70); await page.waitForTimeout(16); }
  const { profile } = await cdp.send('Profiler.stop');
  const dt = {}; const byId = new Map(profile.nodes.map((n) => [n.id, n]));
  profile.samples.forEach((id, i) => { const n = byId.get(id); const k = `${n.callFrame.functionName || '(anon)'} ${n.callFrame.url.split('/').pop()}:${n.callFrame.lineNumber + 1}`; dt[k] = (dt[k] || 0) + (profile.timeDeltas[i] || 0) / 1000; });
  console.log('longtasks', await page.evaluate(() => window.__qa.longtasks));
  console.log(Object.entries(dt).sort((a, b) => b[1] - a[1]).slice(0, 16).map(([k, v]) => `${v.toFixed(1)}ms ${k}`).join('\n'));
  await b.close();
})();
