// Point d’entrée : amélioration progressive (le contenu est lisible sans JS).
import { renderMocks } from "./mock.js";
import { initHero, initChaos, initTri, initCmdkDemo, initThemeScene } from "./scenes.js";
import { initCmdk, initActions, initViews, initCarousel } from "./interactive.js";
import { initNav, initTheme, initReveals, initPricing, initFaq, initForm, initMisc, initTracking } from "./ui.js";
import { refresh } from "./scroll.js";

const steps = [renderMocks, initMisc, initTracking, initTheme, initNav, initCmdk, initHero, initChaos, initTri,
  initCmdkDemo, initActions, initViews, initCarousel, initThemeScene, initReveals, initPricing, initFaq, initForm];
for (const fn of steps) {
  try { fn(); } catch (err) { console.error(`[ImmoPilot] ${fn.name}`, err); } // une scène en échec n’empêche pas les autres
}
// Les polices système et le layout final peuvent décaler les mesures : on recale une fois chargé.
addEventListener("load", refresh);
