// Briques transverses : suivi, toasts, nav, thème, contrôle segmenté, révélations,
// compteurs, tarifs, FAQ, formulaire.
import { Spring, Tracker, reduced, clamp, rubberband, project, flipSpring } from "./spring.js";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ---------- Suivi de conversion : sans cookie, prêt à brancher ---------- */
export function track(name, props = {}) {
  const detail = { event: name, ...props, ts: Date.now() };
  window.dispatchEvent(new CustomEvent("immopilot:track", { detail }));
  if (Array.isArray(window.dataLayer)) window.dataLayer.push(detail);
  if (typeof window.plausible === "function") window.plausible(name, { props });
}
export function initTracking() {
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-track]");
    if (t && !(t.tagName === "BUTTON" && t.type === "submit")) track(t.dataset.track);
  });
}

/* ---------- Toasts : entrée et sortie par le même chemin (bas) ---------- */
export function toast(msg, { undo, ms = 5000 } = {}) {
  const region = $("[data-toasts]");
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `<svg aria-hidden="true"><use href="#i-check"/></svg><span></span>`;
  el.querySelector("span").textContent = msg;
  if (undo) {
    const b = document.createElement("button");
    b.type = "button"; b.className = "t-undo"; b.textContent = "Annuler";
    b.addEventListener("click", () => { undo(); close(); });
    el.append(b);
  }
  region.append(el);
  const s = new Spring(0, { response: 0.35, precision: 0.002, onUpdate: (v) => {
    el.style.opacity = v;
    el.style.transform = reduced.matches ? "" : `translate3d(0,${(1 - v) * 24}px,0) scale(${0.96 + v * 0.04})`;
  } });
  s.set(0).to(1);
  let timer;
  const arm = () => { clearTimeout(timer); timer = setTimeout(close, ms); };
  const hold = () => clearTimeout(timer);
  el.addEventListener("pointerenter", hold); el.addEventListener("pointerleave", arm);
  el.addEventListener("focusin", hold); el.addEventListener("focusout", arm);
  arm();
  function close() { clearTimeout(timer); s.onRest = (v) => { if (v === 0) el.remove(); }; s.to(0); }
  // Un seul toast à la fois au-delà de 2.
  const all = $$(".toast", region); if (all.length > 2) all[0].remove();
  return close;
}

/* ---------- Nav : compacte, se cache en descendant, revient en remontant ---------- */
export function initNav() {
  const nav = $("[data-nav]"); const bar = $(".nav-bar", nav);
  const links = $("#nav-links"); const btn = $("[data-menu-toggle]");
  let hidden = 0, compact = 0;
  const render = () => {
    bar.style.transform = `translate3d(0,${hide.value * -140}%,0) scale(${1 - comp.value * 0.025})`;
    bar.style.opacity = String(1 - hide.value * 0.6);
  };
  const hide = new Spring(0, { response: 0.4, precision: 0.002, onUpdate: render });
  const comp = new Spring(0, { response: 0.35, precision: 0.002, onUpdate: render });
  let lastY = scrollY, run = 0; // run : distance cumulée dans le sens courant du défilement
  addEventListener("scroll", () => {
    const y = scrollY, dy = y - lastY; lastY = y;
    run = Math.sign(dy) === Math.sign(run) ? run + dy : dy; // un défilement lent (petits pas) compte aussi
    const c = y > 48 ? 1 : y < 24 ? 0 : compact; // hystérésis : pas d’oscillation si le scroll hésite au seuil
    if (c !== compact) { compact = c; comp.to(c); }
    const open = links.classList.contains("is-open") || nav.contains(document.activeElement) || document.documentElement.dataset.cmdk === "open";
    let h = hidden;
    if (y < 120 || open) h = 0; else if (run > 6) h = 1; else if (run < -6) h = 0;
    if (h !== hidden) { hidden = h; hide.to(h); }
  }, { passive: true });
  nav.addEventListener("focusin", () => { if (hidden) { hidden = 0; hide.to(0); } });

  // Menu mobile : matérialisation depuis le bouton (transform-origin ancré).
  const m = new Spring(0, { response: 0.32, precision: 0.002, onUpdate: (v) => {
    links.style.opacity = v;
    links.style.transform = reduced.matches ? "" : `scale(${0.94 + v * 0.06})`;
  }, onRest: (v) => { if (v === 0) links.classList.remove("is-open"); } });
  const setMenu = (open) => {
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    $("use", btn).setAttribute("href", open ? "#i-x" : "#i-menu");
    if (open) { links.classList.add("is-open"); m.to(1); } else m.to(0);
  };
  btn.addEventListener("click", () => setMenu(btn.getAttribute("aria-expanded") !== "true"));
  links.addEventListener("click", (e) => { if (e.target.closest("a") && btn.offsetParent) setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") { setMenu(false); btn.focus(); } });
  document.addEventListener("pointerdown", (e) => { if (btn.getAttribute("aria-expanded") === "true" && !nav.contains(e.target)) setMenu(false); });
  matchMedia("(min-width: 961px)").addEventListener("change", () => { links.classList.remove("is-open"); links.style.cssText = ""; btn.setAttribute("aria-expanded", "false"); });
}

/* ---------- Thème : fondu enchaîné, jamais de flash ---------- */
export function setTheme(t) {
  const root = document.documentElement;
  const apply = () => {
    root.dataset.theme = t;
    try { localStorage.setItem("ip-theme", t); } catch (e) { /* stockage indisponible */ }
    $('meta[name="theme-color"]').content = t === "dark" ? "#05060a" : "#fbfbfd";
    for (const b of $$("[data-theme-toggle]")) b.setAttribute("aria-label", t === "dark" ? "Passer en thème clair" : "Passer en thème sombre");
  };
  if (document.startViewTransition && !reduced.matches) document.startViewTransition(apply); else apply();
  track("theme_toggle", { theme: t });
}
export const toggleTheme = () => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
export function initTheme() {
  for (const b of $$("[data-theme-toggle]")) b.addEventListener("click", toggleTheme);
  const t = document.documentElement.dataset.theme;
  for (const b of $$("[data-theme-toggle]")) b.setAttribute("aria-label", t === "dark" ? "Passer en thème clair" : "Passer en thème sombre");
}

/* ---------- Contrôle segmenté iOS : tap, glisser le curseur 1:1, clavier ---------- */
export function segmented(root, onChange) {
  const btns = $$("button", root); const thumb = $(".seg-thumb", root);
  const n = btns.length; root.style.setProperty("--n", n);
  let idx = Math.max(0, btns.findIndex((b) => b.getAttribute("aria-selected") === "true" || b.getAttribute("aria-checked") === "true"));
  const w = () => (root.clientWidth - 6) / n;
  const x = new Spring(idx, { response: 0.35, precision: 0.001, onUpdate: (v) => { thumb.style.transform = `translate3d(${v * w()}px,0,0)`; } });
  x.set(idx);
  const attr = btns[0].getAttribute("role") === "tab" ? "aria-selected" : "aria-checked";
  function select(i, { velocity = 0, bouncy = false, focus = false } = {}) {
    i = clamp(i, 0, n - 1);
    x.to(i, { velocity, damping: bouncy ? 0.8 : 1 });
    if (i === idx) return;
    idx = i;
    btns.forEach((b, j) => { b.setAttribute(attr, String(j === i)); b.tabIndex = j === i ? 0 : -1; });
    if (focus) btns[i].focus();
    onChange && onChange(i, btns[i]);
  }
  // Geste : feedback dès pointer-down ; si on attrape le curseur, il suit le doigt.
  const tr = new Tracker(); let drag = null;
  root.addEventListener("pointerdown", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    const r = root.getBoundingClientRect(); const pos = (e.clientX - r.left - 3) / w() - 0.5;
    drag = { id: e.pointerId, start: e.clientX, from: x.value, grab: Math.abs(pos - x.value) < 0.6, moved: false, b };
    b.style.opacity = ".7";
    root.setPointerCapture(e.pointerId); tr.reset(); tr.add(e.clientX);
    if (drag.grab) { x.stop(); thumb.style.transform += " scale(.97)"; }
  });
  root.addEventListener("pointermove", (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    tr.add(e.clientX);
    const dx = e.clientX - drag.start;
    if (Math.abs(dx) > 6) drag.moved = true;
    if (drag.grab && drag.moved) {
      let v = drag.from + dx / w();
      if (v < 0) v = rubberband(v, 1); else if (v > n - 1) v = n - 1 + rubberband(v - (n - 1), 1);
      x.set(v);
    }
  });
  const end = (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    drag.b.style.opacity = "";
    const vel = tr.velocity() / w();
    if (drag.grab && drag.moved) {
      const target = Math.round(clamp(x.value + project(vel * 1000, 0.99) / 1000, 0, n - 1));
      select(target, { velocity: vel, bouncy: Math.abs(vel) > 2 });
    } else if (e.type === "pointerup") {
      // Validation au relâcher, uniquement si le doigt est resté sur le bouton.
      const over = document.elementFromPoint(e.clientX, e.clientY);
      const b = over && over.closest("button");
      if (b && root.contains(b)) select(btns.indexOf(b)); else x.to(idx);
    } else x.to(idx);
    drag = null;
  };
  root.addEventListener("pointerup", end); root.addEventListener("pointercancel", end);
  root.addEventListener("click", (e) => { if (e.detail === 0) { const b = e.target.closest("button"); if (b) select(btns.indexOf(b)); } });
  root.addEventListener("keydown", (e) => {
    const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (d) { e.preventDefault(); select(idx + d, { focus: true }); }
    else if (e.key === "Home") { e.preventDefault(); select(0, { focus: true }); }
    else if (e.key === "End") { e.preventDefault(); select(n - 1, { focus: true }); }
  });
  addEventListener("resize", () => x.set(x.value));
  return { select };
}

/* ---------- Révélations & compteurs ---------- */
export function initReveals() {
  const io = new IntersectionObserver((es) => {
    for (const e of es) if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
  }, { rootMargin: "0px 0px -8% 0px" });
  $$(".reveal").forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 60}ms`; io.observe(el); });
  const nf = new Intl.NumberFormat("fr-FR");
  const cio = new IntersectionObserver((es) => {
    for (const e of es) {
      if (!e.isIntersecting) continue;
      cio.unobserve(e.target);
      const el = e.target; const to = Number(el.dataset.count);
      if (reduced.matches || !to) continue;
      new Spring(0, { response: 1.1, precision: 0.2, onUpdate: (v) => { el.textContent = nf.format(Math.round(v)); } }).set(0).to(to);
    }
  }, { threshold: 0.6 });
  $$("[data-count]").forEach((el) => cio.observe(el));
}

/* ---------- Tarifs : toggle mensuel / annuel ---------- */
export function initPricing() {
  const sec = $("#tarifs"); const seg = $('[data-seg="billing"]'); if (!sec || !seg) return;
  // Source unique : prix mensuel HT par offre (data-price-month) + remise annuelle (data-annual-discount, en %).
  const discount = Number(sec.dataset.annualDiscount) || 0;
  const fmt = (n) => new Intl.NumberFormat("fr-FR", { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 }).format(n) + " €";
  const round2 = (n) => Math.round(n * 100) / 100;
  const amounts = $$("[data-price-month]");
  const unitOf = (el) => el.parentElement.querySelector("[data-price-unit]");
  // Partie variable de l’unité (« / par agence »…) lue une seule fois dans le HTML.
  amounts.forEach((el) => { const u = unitOf(el); u.dataset.base = u.textContent.replace(/^HT \/ mois/, ""); });
  const view = (el, yearly) => {
    const raw = el.dataset.priceMonth; const month = Number(raw); const base = unitOf(el).dataset.base;
    if (!raw || !Number.isFinite(month)) {
      return { price: el.dataset.marker || (el.dataset.marker = el.textContent), unit: yearly ? `HT / mois${base}, facturé à l’année (−${discount} %)` : `HT / mois${base}` };
    }
    if (!yearly) return { price: fmt(month), unit: `HT / mois${base}` };
    const perMonth = round2(month * (1 - discount / 100));
    return { price: fmt(perMonth), unit: `HT / mois${base}, soit ${fmt(round2(perMonth * 12))} HT facturés à l’année` };
  };
  amounts.forEach((el) => { const v = view(el, false); el.textContent = v.price; unitOf(el).textContent = v.unit; });
  const springs = amounts.map((el) => new Spring(1, { response: 0.3, precision: 0.002, onUpdate: (v) => {
    el.style.opacity = v; el.style.transform = reduced.matches ? "" : `translate3d(0,${(1 - v) * 8}px,0)`;
  } }));
  segmented(seg, (i) => {
    amounts.forEach((el, j) => {
      const s = springs[j]; const v = view(el, i === 1);
      s.onRest = (o) => { if (o === 0) { el.textContent = v.price; s.onRest = null; s.to(1); } };
      s.to(0);
      unitOf(el).textContent = v.unit;
    });
    track("billing_toggle", { period: i ? "annuel" : "mensuel" });
  });
}

/* ---------- FAQ : <details> natif + FLIP en transform (interruptible) ---------- */
export function initFaq() {
  const list = $("[data-faq]"); if (!list) return;
  const items = $$("details", list);
  for (const d of items) {
    const sum = $("summary", d); const ans = $(".faq-a", d);
    const after = () => items.slice(items.indexOf(d) + 1);
    let closing = 0; // > 0 : fermeture en cours, vaut la hauteur repliée (px)
    const fade = new Spring(1, { response: 0.35, precision: 0.002, onUpdate: (v) => {
      ans.style.opacity = v; ans.style.transform = reduced.matches ? "" : `translate3d(0,${(1 - v) * -6}px,0)`;
    }, onRest: (v) => {
      if (v !== 0 || !closing) return;
      // Fin de la sortie : on replie réellement ; les éléments suivants, déjà remontés en transform, ne bougent pas.
      const h = closing; closing = 0; d.open = false;
      for (const el of after()) { const s = flipSpring(el); s.set(s.value + h).to(0, { velocity: s.velocity }); }
    } });
    sum.addEventListener("click", (e) => {
      e.preventDefault();
      const next = after();
      if (closing) { // interrompue : la réponse revient, les suivants redescendent, depuis leur position affichée
        closing = 0; fade.to(1);
        for (const el of next) flipSpring(el).to(0, { velocity: flipSpring(el).velocity });
        return;
      }
      if (!d.open) {
        const before = next.map((el) => el.getBoundingClientRect().top);
        d.open = true; fade.set(0).to(1); track("faq_open", { q: sum.textContent.trim() });
        if (reduced.matches) return;
        next.forEach((el, i) => { const s = flipSpring(el); s.set(s.value + before[i] - el.getBoundingClientRect().top).to(0, { velocity: s.velocity }); });
        return;
      }
      if (reduced.matches) { d.open = false; return; }
      // Sortie symétrique de l’entrée : la réponse s’efface pendant que les suivants remontent.
      const ref = next[0] || list;
      const top = ref.getBoundingClientRect().top; d.open = false;
      const h = top - ref.getBoundingClientRect().top; d.open = true; // mesure synchrone, sans rendu intermédiaire
      if (!next.length) { closing = 1; fade.to(0, { response: 0.3 }); return; } // dernière question : fondu puis repli
      if (h <= 0) { d.open = false; return; }
      closing = h; fade.to(0, { response: 0.4 });
      for (const el of next) flipSpring(el).to(-h, { velocity: flipSpring(el).velocity });
    });
  }
}

/* ---------- Formulaire de démo ---------- */
// Destination : attribut action du <form> (URL publique du service d’envoi). Vide = envoi pas encore activé.
const MIN_FILL_MS = 3000; // anti-spam : délai minimal entre la première interaction et l’envoi

export function initForm() {
  const form = $("[data-demo-form]"); if (!form) return;
  const status = $("[data-form-status]", form);
  const btn = $('button[type="submit"]', form); const label = $("[data-submit-label]", form);
  const idle = label.textContent;
  let startedAt = 0, sending = false;
  form.addEventListener("focusin", () => { if (!startedAt) startedAt = performance.now(); });
  const rules = {
    nom: (v) => v.trim().length >= 2 || "Indiquez votre nom.",
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || "Cette adresse e-mail semble incomplète.",
    agence: (v) => v.trim().length >= 2 || "Indiquez le nom de votre agence.",
    lots: (v) => !!v || "Choisissez une tranche.",
  };
  const check = (el) => {
    const r = rules[el.name](el.value);
    const f = el.closest(".field"); const err = $(".err", f);
    const ok = r === true;
    f.classList.toggle("bad", !ok); f.classList.toggle("good", ok);
    el.setAttribute("aria-invalid", String(!ok));
    err.textContent = ok ? "" : r;
    return ok;
  };
  for (const el of form.elements) {
    if (!rules[el.name]) continue;
    el.addEventListener("blur", () => { if (el.value) check(el); });
    el.addEventListener("input", () => { if (el.closest(".field").classList.contains("bad") || el.tagName === "SELECT") check(el); });
  }
  const setSending = (on) => {
    sending = on; btn.disabled = on; btn.classList.toggle("is-loading", on);
    btn.setAttribute("aria-busy", String(on)); label.textContent = on ? "Envoi en cours…" : idle;
  };
  const showDone = () => {
    const done = $("[data-form-done]", form);
    done.hidden = false;
    new Spring(0, { response: 0.4, precision: 0.002, onUpdate: (v) => { done.style.opacity = v; done.style.transform = reduced.matches ? "" : `scale(${0.97 + v * 0.03})`; } }).set(0).to(1);
    done.focus();
  };
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (sending) return; // double clic : un seul envoi
    status.textContent = "";
    const fields = [...form.elements].filter((el) => rules[el.name]);
    const bad = fields.filter((el) => !check(el));
    if (bad.length) { bad[0].focus(); return; }
    // Anti-spam : champ piège rempli, ou envoi sans interaction humaine plausible → succès simulé, aucun envoi.
    const bot = form.elements._gotcha.value !== "" || !startedAt || performance.now() - startedAt < MIN_FILL_MS;
    if (bot) { showDone(); return; }
    const endpoint = form.getAttribute("action");
    if (!endpoint) { status.textContent = "L’envoi du formulaire n’est pas encore activé. Merci de réessayer plus tard."; track("demo_not_configured"); return; }
    if (navigator.onLine === false) { status.textContent = "Vous semblez hors ligne. Vérifiez votre connexion, puis réessayez."; return; }
    const data = Object.fromEntries(new FormData(form));
    delete data._gotcha;
    setSending(true);
    track("demo_submit", { lots: data.lots });
    try {
      const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error(String(res.status));
      showDone();
    } catch (err) {
      status.textContent = navigator.onLine === false || err instanceof TypeError
        ? "L’envoi n’a pas abouti : la connexion semble interrompue. Vérifiez-la, puis réessayez."
        : "L’envoi n’a pas abouti. Merci de réessayer dans un instant.";
      track("demo_error");
    } finally { setSending(false); }
  });
}

/* ---------- Divers ---------- */
export function initMisc() {
  const mac = /Mac|iPhone|iPad/i.test(navigator.platform || navigator.userAgent);
  if (!mac) for (const k of $$("[data-mod-key]")) k.textContent = "Ctrl";
  for (const y of $$("[data-year]")) y.textContent = new Date().getFullYear();
}
