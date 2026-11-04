// Scènes épinglées : progression 0→1 calculée depuis le scroll NATIF (position: sticky).
// Aucune capture du scroll ; mise à jour seulement des scènes visibles (IntersectionObserver).
import { clamp, reduced } from "./spring.js";

const scenes = [];
let queued = false;

const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    const s = scenes.find((x) => x.el === e.target);
    if (s) { s.on = e.isIntersecting; if (s.on) { s.p = -1; tick(); } }
  }
}, { rootMargin: "25% 0px" });

function measure(s) {
  if (reduced.matches) return 1;
  const r = s.el.getBoundingClientRect();
  const total = r.height - innerHeight;
  return total > 1 ? clamp(-r.top / total) : clamp((innerHeight - r.top) / (innerHeight + r.height));
}

export function tick() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(() => {
    queued = false;
    // Lectures d’abord, écritures ensuite (pas de layout thrashing).
    const reads = scenes.filter((s) => s.on).map((s) => [s, measure(s)]);
    for (const [s, p] of reads) if (p !== s.p) { s.p = p; s.update(p); }
  });
}

/** Enregistre une scène. `update(p)` ne doit écrire que transform / opacity. */
export function scene(el, update, { onResize } = {}) {
  if (!el) return;
  const s = { el, update, onResize, on: false, p: -1 };
  scenes.push(s);
  io.observe(el);
  onResize && onResize();
}

export function refresh() {
  for (const s of scenes) { s.onResize && s.onResize(); s.p = -1; }
  tick();
}

addEventListener("scroll", tick, { passive: true });
let rt;
addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(refresh, 120); });
reduced.addEventListener("change", refresh);
