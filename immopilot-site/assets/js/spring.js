// Moteur de ressorts « à la Apple » : amortissement + réponse (s), interruptible,
// repart toujours de la valeur AFFICHÉE et conserve la vitesse lors d’un re-ciblage.

export const reduced = matchMedia("(prefers-reduced-motion: reduce)");
export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const range = (p, a, b) => clamp((p - a) / (b - a));
export const smooth = (t) => t * t * (3 - 2 * t);

/** Rubber-band : plus on dépasse, moins l’élément suit. */
export function rubberband(x, dim, c = 0.55) {
  return (x * dim * c) / (dim + c * Math.abs(x));
}
/** Projection d’élan (Designing Fluid Interfaces) — décélération 0.998. */
export function project(v, d = 0.998) {
  return ((v / 1000) * d) / (1 - d);
}

const active = new Set();
let raf = 0;
let last = 0;
function frame(now) {
  const dt = Math.min(0.064, (now - last) / 1000 || 1 / 60);
  last = now;
  for (const s of active) s._step(dt);
  raf = active.size ? requestAnimationFrame(frame) : 0;
}
function wake() {
  if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); }
}

export class Spring {
  constructor(value = 0, { damping = 1, response = 0.35, precision = 0.01, onUpdate, onRest } = {}) {
    this.value = this.target = value;
    this.velocity = 0;
    Object.assign(this, { damping, response, precision, onUpdate, onRest });
  }
  get moving() { return active.has(this); }
  /** Re-cible depuis la valeur courante ; `velocity` (unités/s) = passage de relais du geste. */
  to(target, { velocity, damping, response } = {}) {
    if (velocity !== undefined) this.velocity = velocity;
    if (damping !== undefined) this.damping = reduced.matches ? 1 : damping;
    if (response !== undefined) this.response = response;
    this.target = target;
    active.add(this); wake();
    return this;
  }
  /** Saut immédiat (suivi 1:1 pendant un geste). */
  set(v) {
    this.value = this.target = v; this.velocity = 0;
    active.delete(this);
    this.onUpdate && this.onUpdate(v);
    return this;
  }
  stop() { active.delete(this); this.velocity = 0; return this; }
  _step(dt) {
    const k = (2 * Math.PI / this.response) ** 2;
    const c = (4 * Math.PI * this.damping) / this.response;
    const n = Math.ceil(dt / 0.004);
    const h = dt / n;
    for (let i = 0; i < n; i++) {
      const a = -k * (this.value - this.target) - c * this.velocity;
      this.velocity += a * h;
      this.value += this.velocity * h;
    }
    if (Math.abs(this.velocity) < this.precision * 8 && Math.abs(this.value - this.target) < this.precision) {
      this.value = this.target; this.velocity = 0;
      active.delete(this);
      this.onUpdate && this.onUpdate(this.value);
      this.onRest && this.onRest(this.value);
      return;
    }
    this.onUpdate && this.onUpdate(this.value);
  }
}

/** Historique court de positions → vitesse au relâchement (px/s). */
export class Tracker {
  constructor() { this.h = []; }
  reset() { this.h = []; }
  add(x) { this.h.push([x, performance.now()]); if (this.h.length > 8) this.h.shift(); }
  velocity() {
    const h = this.h;
    if (h.length < 2) return 0;
    const [x1, t1] = h[h.length - 1];
    if (performance.now() - t1 > 80) return 0; // le doigt s’est arrêté avant de lâcher
    let i = 0;
    while (i < h.length - 2 && t1 - h[i][1] > 100) i++;
    const [x0, t0] = h[i];
    const dt = (t1 - t0) / 1000;
    return dt > 0 ? (x1 - x0) / dt : 0;
  }
}

/** Ressorts par élément pour animations FLIP (transform uniquement). */
const flipY = new WeakMap();
export function flipSpring(el) {
  let s = flipY.get(el);
  if (!s) {
    s = new Spring(0, { response: 0.4, precision: 0.3, onUpdate: (v) => { el.style.transform = v ? `translate3d(0,${v.toFixed(2)}px,0)` : ""; } });
    flipY.set(el, s);
  }
  return s;
}
/** Mesure, mute le DOM, puis rejoue l’écart en ressort depuis la position affichée. */
export function flip(els, mutate) {
  const before = new Map(els.map((el) => [el, el.getBoundingClientRect().top]));
  mutate();
  for (const [el, top] of before) {
    if (!el.isConnected) continue;
    const dy = top - el.getBoundingClientRect().top;
    if (Math.abs(dy) < 0.5) continue;
    const s = flipSpring(el);
    s.set(s.value + dy).to(0, { velocity: s.velocity });
  }
}
