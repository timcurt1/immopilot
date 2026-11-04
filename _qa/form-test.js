// Tests du formulaire de démo. AUCUN envoi réel : l’URL du service est simulée (formspree.invalid)
// et chaque requête vers elle est interceptée et servie par le test.
const { launch, BASE, BROWSER } = require('./lib');
const FAKE = 'https://formspree.invalid/f/test-qa';
const fill = async (page, v = {}) => {
  await page.fill('#f-name', v.nom ?? 'Camille Test');
  await page.fill('#f-mail', v.email ?? 'camille@agence-test.invalid');
  await page.fill('#f-agency', v.agence ?? 'Agence Test');
  await page.selectOption('#f-lots', v.lots ?? '100 à 300');
};
(async () => {
  const b = await launch();
  const R = [];
  const mk = async ({ configured = true, w = 1440, h = 900, server = 200 } = {}) => {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, ...(BROWSER !== 'firefox' && w < 800 ? { isMobile: true, hasTouch: true } : {}) });
    const page = await ctx.newPage();
    const sent = []; const log = [];
    page.on('console', (m) => ['error', 'warning'].includes(m.type()) && log.push(m.text()));
    page.on('pageerror', (e) => log.push(e.message));
    if (configured) await page.route('**/', async (r) => { const res = await r.fetch(); const t = (await res.text()).replace('data-demo-form novalidate method="post"', `data-demo-form novalidate method="post" action="${FAKE}"`); await r.fulfill({ response: res, body: t }); });
    await page.route(FAKE, async (r) => { sent.push(r.request().postDataJSON()); await new Promise((x) => setTimeout(x, 400)); await r.fulfill({ status: server, contentType: 'application/json', body: '{"ok":true}' }); });
    await page.goto(BASE, { waitUntil: 'load' });
    await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; document.getElementById('demo').scrollIntoView(); });
    await page.waitForTimeout(400);
    return { ctx, page, sent, log };
  };
  const st = (page) => page.evaluate(() => ({ status: document.querySelector('[data-form-status]').textContent, done: !document.querySelector('[data-form-done]').hidden, focus: document.activeElement.id || document.activeElement.className, errs: [...document.querySelectorAll('.field .err')].map((e) => e.textContent).filter(Boolean) }));

  { const { ctx, page, sent, log } = await mk({ configured: false }); await page.focus('#f-name'); await fill(page); await page.waitForTimeout(3100); await page.click('[type=submit]'); await page.waitForTimeout(300); const s = await st(page); R.push(['1. Service non configuré', s.status.includes('pas encore activé') && sent.length === 0 && !s.done, `message « ${s.status} », requêtes ${sent.length}`]); R.push(['   console', log.length === 0, log.join(' | ') || '0']); await ctx.close(); }
  { const { ctx, page, sent } = await mk(); await page.click('[type=submit]'); await page.waitForTimeout(300); const s = await st(page); R.push(['2. Champs vides', s.errs.length === 4 && s.focus === 'f-name' && sent.length === 0, `${s.errs.length} erreurs (${s.errs.join(' / ')}), focus ${s.focus}`]); await ctx.close(); }
  { const { ctx, page, sent } = await mk(); await page.focus('#f-name'); await fill(page, { email: 'camille@agence' }); await page.waitForTimeout(3100); await page.click('[type=submit]'); await page.waitForTimeout(300); const s = await st(page); R.push(['3. E-mail invalide', s.errs.length === 1 && sent.length === 0, `« ${s.errs[0]} », focus ${s.focus}`]); await ctx.close(); }
  { const { ctx, page, sent } = await mk(); await page.focus('#f-name'); await fill(page); await page.waitForTimeout(3100);
    await page.click('[type=submit]'); const during = await page.evaluate(() => { const b = document.querySelector('[type=submit]'); return `${b.disabled ? 'désactivé' : 'actif'}, « ${b.textContent.trim()} », aria-busy=${b.getAttribute('aria-busy')}`; });
    await page.click('[type=submit]', { force: true }).catch(() => {}); await page.waitForTimeout(900); const s = await st(page);
    R.push(['4. Envoi valide + double clic', sent.length === 1 && s.done && s.focus.includes('form-done'), `requêtes ${sent.length}, pendant l’envoi : ${during}, succès affiché ${s.done}, focus ${s.focus}`]);
    R.push(['   contenu envoyé', sent[0] && !('_gotcha' in sent[0]) && Object.keys(sent[0]).join(',') === 'nom,email,agence,lots', sent[0] ? JSON.stringify(sent[0]) : '—']); await ctx.close(); }
  { const { ctx, page, sent } = await mk({ server: 500 }); await page.focus('#f-name'); await fill(page); await page.waitForTimeout(3100); await page.click('[type=submit]'); await page.waitForTimeout(900); const s = await st(page); const en = await page.evaluate(() => !document.querySelector('[type=submit]').disabled); R.push(['5. Erreur du service (500)', s.status.includes('n’a pas abouti') && !s.done && en, `« ${s.status} », bouton réactivé ${en}`]); await ctx.close(); }
  { const { ctx, page, sent } = await mk(); await page.focus('#f-name'); await fill(page); await page.waitForTimeout(3100); await ctx.setOffline(true); await page.click('[type=submit]'); await page.waitForTimeout(500); const s = await st(page); R.push(['6. Hors ligne', /hors ligne|connexion/.test(s.status) && sent.length === 0 && !s.done, `« ${s.status} », requêtes ${sent.length}`]); await ctx.close(); }
  { const { ctx, page, sent } = await mk(); await page.focus('#f-name'); await fill(page); await page.evaluate(() => { document.getElementById('f-site').value = 'http://spam.invalid'; }); await page.waitForTimeout(3100); await page.click('[type=submit]'); await page.waitForTimeout(500); const s = await st(page); R.push(['7. Robot (champ piège rempli)', sent.length === 0 && s.done, `requêtes ${sent.length}, succès simulé ${s.done}`]); await ctx.close(); }
  { const { ctx, page, sent } = await mk(); await page.focus('#f-name'); await fill(page); await page.click('[type=submit]'); await page.waitForTimeout(500); const s = await st(page); R.push(['8. Robot (envoi < 3 s)', sent.length === 0 && s.done, `requêtes ${sent.length}`]); await ctx.close(); }
  { const { ctx, page, sent } = await mk(); await page.focus('#f-name');
    await page.keyboard.type('Camille Clavier'); await page.keyboard.press('Tab'); await page.keyboard.type('camille@agence-test.invalid'); await page.keyboard.press('Tab'); await page.keyboard.type('Agence Clavier'); await page.keyboard.press('Tab');
    await page.keyboard.press(BROWSER === 'webkit' ? 'Space' : 'ArrowDown'); if (BROWSER === 'webkit') await page.selectOption('#f-lots', '100 à 300');
    const honey = await page.evaluate(() => document.getElementById('f-site').tabIndex);
    await page.waitForTimeout(3100); await page.focus('#f-agency'); await page.keyboard.press('Enter'); await page.waitForTimeout(900); const s = await st(page);
    R.push(['9. Clavier seul (Tab, Entrée)', sent.length === 1 && s.done && honey === -1, `requêtes ${sent.length}, champ piège hors tabulation ${honey === -1}`]); await ctx.close(); }
  { const { ctx, page } = await mk({ w: 375, h: 667 }); const m = await page.evaluate(() => ({ ox: document.documentElement.scrollWidth - innerWidth, font: Math.min(...[...document.querySelectorAll('.field input, .field select')].map((e) => parseFloat(getComputedStyle(e).fontSize))), hp: document.getElementById('f-site').getBoundingClientRect().left < 0 }));
    await page.evaluate(() => document.querySelector('[data-demo-form]').scrollIntoView({ block: 'start' })); await page.waitForTimeout(700); await page.screenshot({ path: `${__dirname}/out/form-375-${BROWSER}.png` });
    R.push(['10. Mobile 375 px', m.ox === 0 && m.font >= 16 && m.hp, `débordement ${m.ox}, police des champs ${m.font} px (≥ 16 : pas de zoom iOS), champ piège hors écran ${m.hp}`]); await ctx.close(); }
  for (const [n, ok, d] of R) console.log(`${BROWSER.padEnd(8)} ${ok ? '✅' : '❌'} ${n} — ${d}`);
  await b.close();
})();
