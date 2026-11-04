// Scènes scrubbées au scroll (réversibles, aucune capture du scroll) : hero, chaos, tri, ⌘K, thème.
import { Spring, reduced, clamp, lerp, range, smooth } from "./spring.js";
import { scene } from "./scroll.js";
import { PEOPLE, tone, icon, placeHighlights } from "./mock.js";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const T = (el, t) => { el.style.transform = t; };

/* ================= HERO ================= */
export function initHero() {
  const sec = $("#top"); if (!sec) return;
  const copy = $("[data-hero-copy]", sec); const vis = $("[data-hero-visual]", sec); const tilt = $("[data-tilt]", sec);
  let dy = 0;
  scene(sec, (p) => {
    if (reduced.matches) { T(copy, ""); copy.style.opacity = ""; T(vis, ""); return; }
    const a = smooth(range(p, 0, 0.55));
    copy.style.opacity = String(1 - range(p, 0.05, 0.4));
    T(copy, `translate3d(0,${-a * 60}px,0) scale(${1 - a * 0.05})`);
    // Le mockup monte, grandit et s’ancre au centre de l’écran.
    T(vis, `translate3d(0,${a * dy}px,0) scale(${0.94 + a * 0.12})`);
  }, { onResize: () => {
    const h = vis.offsetHeight * 1.06;
    dy = Math.min(0, (innerHeight - h) / 2 - vis.offsetTop);
  } });

  // Tilt au pointeur : ressorts X/Y indépendants, retour amorti quand le pointeur sort.
  const rx = new Spring(0, { response: 0.2, precision: 0.01, onUpdate: render });
  const ry = new Spring(0, { response: 0.2, precision: 0.01, onUpdate: render });
  function render() { T(tilt, `rotateX(${rx.value.toFixed(2)}deg) rotateY(${ry.value.toFixed(2)}deg)`); }
  const stage = $(".stage", sec);
  stage.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse" || reduced.matches) return;
    const r = vis.getBoundingClientRect();
    const px = clamp(((e.clientX - r.left) / r.width) * 2 - 1, -1, 1);
    const py = clamp(((e.clientY - r.top) / r.height) * 2 - 1, -1, 1);
    ry.to(px * 5, { response: 0.2 }); rx.to(-py * 4, { response: 0.2 });
  });
  stage.addEventListener("pointerleave", () => { rx.to(0, { response: 0.5 }); ry.to(0, { response: 0.5 }); });
}

/* ================= CHAOS → ORDRE ================= */
const DOCS = [
  ["pdf", "bulletin_salaire_09.pdf"], ["mail", "Re: Dossier T2 Lyon"], ["img", "CNI_recto.jpg"], ["pdf", "avis_imposition.pdf"],
  ["sms", "« Vous avez reçu mon dossier ? »"], ["xls", "candidats_v3_FINAL.xlsx"], ["mail", "Fwd: garant"], ["pdf", "contrat_travail.pdf"],
  ["img", "IMG_4021.HEIC"], ["mail", "Candidature studio Nantes"], ["pdf", "quittance_août.pdf"], ["sms", "Rappeler M. Benali ??"],
  ["pdf", "attestation_employeur.pdf"], ["mail", "Pièces manquantes ?"], ["img", "scan_passeport.png"], ["pdf", "garant_avis.pdf"],
  ["xls", "suivi_relances.xlsx"], ["mail", "Visite samedi ?"], ["pdf", "RIB.pdf"], ["sms", "« Toujours dispo ? »"],
];
const KIND_ICON = { pdf: "file", mail: "mail", img: "file", sms: "phone", xls: "list" };
function rng(seed) { return () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }

export function initChaos() {
  const sec = $("#chaos"); if (!sec) return;
  const stage = $(".stage", sec); const field = $("[data-chaos-field]", sec); const app = $("[data-chaos-app]", sec);
  const before = $("[data-chaos-before]", sec); const after = $("[data-chaos-after]", sec);
  const ppl = [PEOPLE[0], PEOPLE[2], PEOPLE[4], PEOPLE[1], PEOPLE[6]];
  app.innerHTML = `<div class="ca-head"><b>Candidatures</b><small>5 dossiers · triés</small></div>` + ppl.map((p) =>
    `<div class="ca-row"><span class="av" style="--h:${p.h}">${p.i}</span><span class="who"><b>${p.n}</b><small>${p.bien}</small>` +
    `<span class="ca-slots"><i></i><i></i><i></i><i></i></span></span>` +
    `<span class="ca-badges"><span class="badge b-ko">Pièces manquantes</span><span class="badge b-ok">Dossier complet</span></span></div>`).join("");
  const rows = $$(".ca-row", app);
  const N = innerWidth < 640 ? 12 : DOCS.length;
  field.innerHTML = DOCS.slice(0, N).map(([k, t]) => `<span class="doc-chip" data-k="${k}">${icon(KIND_ICON[k])}${t}</span>`).join("");
  const chips = $$(".doc-chip", field);
  const rand = rng(7);
  const items = chips.map((el, i) => ({ el, row: i % rows.length, slot: Math.floor(i / rows.length) % 4, sx: rand(), sy: rand(), rot: (rand() - 0.5) * 24, depth: 0.6 + rand() * 0.8 }));
  let W = 0, H = 0;
  const measure = () => {
    W = stage.clientWidth; H = stage.clientHeight;
    const sr = stage.getBoundingClientRect();
    for (const it of items) {
      it.w = it.el.offsetWidth; it.h = it.el.offsetHeight;
      // Départ : autour de l’interface et dans les marges, jamais sur le titre.
      const band = it.sy < 0.28 || it.sy > 0.78 || W < 960;
      it.x0 = band ? it.sx * (W - it.w) : W * 0.46 + it.sx * (W * 0.54 - it.w);
      it.y0 = (W < 960 ? 0.3 * H : 0.04 * H) + it.sy * ((W < 960 ? 0.66 : 0.9) * H - it.h);
      const slot = rows[it.row].querySelectorAll(".ca-slots i")[it.slot].getBoundingClientRect();
      it.x1 = slot.left - sr.left + slot.width / 2 - it.w / 2; it.y1 = slot.top - sr.top + slot.height / 2 - it.h / 2;
    }
  };
  const fills = rows.map((r) => $$(".ca-slots i", r));
  const badges = rows.map((r) => $$(".ca-badges .badge", r));
  scene(sec, (p) => {
    const order = smooth(range(p, 0.08, 0.5));
    app.style.opacity = String(0.55 + order * 0.45);
    T(app, `scale(${0.96 + order * 0.04})`);
    const counts = rows.map(() => 0);
    items.forEach((it, i) => {
      const st = 0.1 + (i / items.length) * 0.4;
      const t = smooth(range(p, st, st + 0.28));
      const drift = range(p, 0, 0.3) * -40 * it.depth;
      const x = lerp(it.x0, it.x1, t);
      const y = lerp(it.y0 + drift, it.y1, t) - Math.sin(t * Math.PI) * 50; // arc qui « montre » la destination
      T(it.el, `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) rotate(${(it.rot * (1 - t)).toFixed(2)}deg) scale(${(1 - t * 0.65).toFixed(3)})`);
      it.el.style.opacity = String(1 - range(t, 0.82, 1));
      if (t > 0.97) counts[it.row]++;
    });
    rows.forEach((r, k) => {
      const per = items.filter((it) => it.row === k).length;
      fills[k].forEach((f, j) => f.style.setProperty("--f", j < Math.round((counts[k] / per) * 4) ? 1 : 0));
      const done = counts[k] >= per ? 1 : 0;
      badges[k][0].style.opacity = String(1 - done); badges[k][1].style.opacity = String(done);
    });
    const b = range(p, 0.42, 0.56), a = range(p, 0.52, 0.66);
    before.style.opacity = String(1 - b); T(before, `translate3d(0,${-b * 20}px,0)`);
    after.style.opacity = String(a); T(after, `translate3d(0,${(1 - a) * 20}px,0)`);
  }, { onResize: () => { for (const it of items) T(it.el, ""); measure(); } });
}

/* ================= TRI ================= */
export function initTri() {
  const sec = $("#tri"); if (!sec) return;
  const app = $('[data-mock="tri"]', sec);
  const rowsBox = $("[data-rows]", app); const rows = $$(".row", rowsBox);
  const chips = $$("[data-chip]", app); const sort = $("[data-sort]", app);
  const steps = $$("[data-tri-steps] li", sec);
  const bc = $('[data-badge="c"]', app), br = $('[data-badge="r"]', app);
  // Pilule glissante sous le filtre actif (surbrillance glissante).
  const pill = document.createElement("span");
  pill.style.cssText = "position:absolute;left:0;top:0;border-radius:999px;background:var(--accent-strong);transform-origin:0 0;pointer-events:none";
  const chipBox = $("[data-chips]", app); chipBox.style.position = "relative"; chipBox.prepend(pill);
  chips.forEach((c) => { c.classList.remove("on"); c.style.position = "relative"; });

  const complete = (p) => p.st === "Prêt à valider" || (p.st === "Dossier en cours" && p.score >= 75);
  const base = PEOPLE.map((p) => p.id);
  const filtered = base.filter((id) => complete(PEOPLE[id - 1]));
  const sorted = [...filtered].sort((a, b) => PEOPLE[b - 1].score - PEOPLE[a - 1].score);
  const layout = (order) => Object.fromEntries(base.map((id) => [id, order.includes(id) ? { y: order.indexOf(id), o: 1 } : null]));
  const S = [layout(base), layout(filtered), layout(sorted), layout(sorted)];
  // Les lignes masquées restent à leur dernière position visible.
  for (let k = 1; k < S.length; k++) for (const id of base) if (!S[k][id]) S[k][id] = { y: S[k - 1][id].y, o: 0 };
  let rowH = 0, cr = [];
  const P = [0.06, 0.32, 0.58, 0.84];
  let lastStep = -1, lastS3 = -1;
  scene(sec, (p) => {
    let s = 0;
    for (let k = 0; k < P.length - 1; k++) {
      const g = P[k + 1] - P[k];
      if (p >= P[k]) s = k + smooth(range(p, P[k] + g * 0.15, P[k + 1] - g * 0.15));
    }
    const k0 = Math.floor(Math.min(s, 2.999)), t = s - k0;
    rows.forEach((el) => {
      const id = Number(el.dataset.id), a = S[k0][id], b = S[k0 + 1][id];
      const y = lerp(a.y, b.y, t) * rowH, o = lerp(a.o, b.o, t);
      // Une ligne qui remonte se « soulève » au-dessus des autres pendant le trajet.
      const up = b.y < a.y && t > 0 && t < 1, lift = up ? Math.sin(t * Math.PI) * 0.025 : 0;
      el.classList.toggle("lift", up);
      T(el, `translate3d(0,${y.toFixed(1)}px,0) scale(${(0.97 + o * 0.03 + lift).toFixed(3)})`);
      el.style.opacity = String(o);
    });
    // Filtre actif : la pilule glisse de « Toutes » vers « Dossier complet ».
    const f = clamp(s), c0 = cr[0], c1 = cr[1];
    if (c0) T(pill, `translate3d(${lerp(c0.x, c1.x, f)}px,${c0.y}px,0) scaleX(${lerp(1, c1.w / c0.w, f)})`);
    chips[0].style.color = f < 0.5 ? "#fff" : ""; chips[1].style.color = f >= 0.5 ? "#fff" : "";
    sort.textContent = s >= 1.5 ? "Trier : score ↓" : "Trier : date";
    // Étape 4 : statuts et compteurs de la sidebar en direct.
    const t3 = clamp(s - 2);
    const s3 = Math.round(t3 * 6);
    if (s3 !== lastS3) {
      lastS3 = s3;
      bc.textContent = String(24 + Math.round(t3 * 3)); br.textContent = String(5 - Math.round(t3 * 2));
      const ines = $('[data-id="5"] [data-st]', app);
      const st = t3 > 0.5 ? "Prêt à valider" : "Dossier en cours";
      ines.textContent = st; ines.className = `badge ${tone(st)}`;
    }
    const step = Math.round(s);
    if (step !== lastStep) { lastStep = step; steps.forEach((li, i) => li.classList.toggle("is-active", i === step)); }
  }, { onResize: () => {
    rowH = rows[0].offsetHeight + parseFloat(getComputedStyle(rowsBox).rowGap || "0") + 6;
    const bx = chipBox.getBoundingClientRect();
    cr = chips.slice(0, 2).map((c) => { const r = c.getBoundingClientRect(); return { x: r.left - bx.left, y: r.top - bx.top, w: r.width, h: r.height }; });
    pill.style.width = cr[0].w + "px"; pill.style.height = cr[0].h + "px";
    placeHighlights(sec);
  } });
}

/* ================= ⌘K (démo scrubbée) ================= */
const DEMO_CMDS = [
  ["inbox", "Candidatures", "Aller à"], ["users", "Camille Durand", "Candidat"], ["bell", "Relances du jour", "Aller à"],
  ["mail", "Relancer les dossiers incomplets (3)", "Action"], ["home", "T2 · Lyon 3e", "Bien"],
  ["mail", "Relancer Hugo Lefèvre", "Action"], ["down", "Exporter en CSV", "Action"], ["cal", "Planifier une visite", "Action"],
];
export function initCmdkDemo() {
  const sec = $("#commande"); if (!sec) return;
  const pal = $("[data-cmdk-demo]", sec); const typed = $("[data-cmdk-typed]", sec);
  const list = $("[data-cmdk-results]", sec); const toastEl = $("[data-cmdk-toast]", sec);
  const word = "relancer";
  let lastQ = null, lastSel = null;
  scene(sec, (p) => {
    if (reduced.matches) p = 0.7; // mouvement réduit : on montre la palette ouverte, statique
    const open = smooth(range(p, 0.04, 0.18)) * (1 - smooth(range(p, 0.8, 0.88)));
    const blur = (1 - open) * 10; // flou animé < 20 px
    pal.style.opacity = String(open);
    T(pal, `scale(${0.94 + open * 0.06})`);
    pal.style.filter = blur > 0.2 && !reduced.matches ? `blur(${blur.toFixed(1)}px)` : "";
    const q = word.slice(0, Math.round(range(p, 0.2, 0.5) * word.length));
    if (q !== lastQ) {
      lastQ = q; lastSel = null;
      typed.textContent = q || "Rechercher…"; typed.style.color = q ? "" : "var(--text-3)";
      const res = DEMO_CMDS.filter(([, l]) => l.toLowerCase().includes(q));
      list.innerHTML = res.slice(0, 6).map(([ic, l, g]) => `<li>${icon(ic)}<span>${l}</span><span class="grp">${g}</span></li>`).join("");
    }
    const sel = p > 0.55 ? 0 : -1;
    if (sel !== lastSel) { lastSel = sel; $$("li", list).forEach((li, i) => li.setAttribute("aria-selected", String(i === sel))); }
    const first = list.firstElementChild;
    if (first) T(first, p > 0.74 && p < 0.82 ? "scale(.98)" : "");
    const tt = smooth(range(p, 0.84, 0.92));
    toastEl.style.opacity = String(tt);
    T(toastEl, `translate3d(0,${(1 - tt) * 24}px,0)`);
  });
}

/* ================= THÈME (volet en transform) ================= */
export function initThemeScene() {
  const sec = $("#theme"); if (!sec) return;
  const wipe = $("[data-theme-wipe]", sec), inner = $("[data-theme-wipe-in]", sec), edge = $("[data-theme-edge]", sec);
  const frame = $(".theme-frame", sec);
  let w = 0;
  scene(sec, (p) => {
    if (reduced.matches) { T(wipe, ""); T(inner, ""); return; }
    const t = smooth(range(p, 0.2, 0.75));
    T(wipe, `translate3d(${(1 - t) * 100}%,0,0)`);
    T(inner, `translate3d(${-(1 - t) * 100}%,0,0)`);
    T(edge, `translate3d(${(1 - t) * w}px,0,0)`);
    edge.style.opacity = String(t > 0.01 && t < 0.99 ? 1 : 0);
  }, { onResize: () => { w = frame.clientWidth; } });
}
