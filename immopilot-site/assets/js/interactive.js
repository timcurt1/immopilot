// Démos manipulables : palette ⌘K réelle, actions en un geste, deux vues, carrousel.
import { Spring, Tracker, reduced, clamp, rubberband, project, flip, flipSpring } from "./spring.js";
import { PEOPLE, tone, icon } from "./mock.js";
import { toast, track, toggleTheme, segmented } from "./ui.js";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/* ================= PALETTE ⌘K RÉELLE ================= */
export function initCmdk() {
  const root = $("[data-cmdk]"); const panel = $("[data-cmdk-panel]", root);
  const scrim = $(".cmdk-scrim", root); const input = $("[data-cmdk-input]", root); const list = $("[data-cmdk-list]", root);
  const go = (id) => () => {
    const el = document.getElementById(id); if (!el) return;
    el.scrollIntoView({ behavior: reduced.matches ? "auto" : "smooth" }); history.replaceState(null, "", `#${id}`);
    if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true }); // le focus suit la navigation
  };
  const CMDS = [
    ["arrow", "Demander une démo", "Action", () => { go("demo")(); setTimeout(() => $("#f-name").focus({ preventScroll: true }), 600); }],
    ["sun", "Basculer le thème clair / sombre", "Action", toggleTheme],
    ["home", "Accueil", "Aller à", go("top")], ["inbox", "Avant / après", "Aller à", go("chaos")],
    ["list", "Le tri intelligent", "Aller à", go("tri")], ["cmd", "Palette de commandes", "Aller à", go("commande")],
    ["check", "Actions groupées, export CSV", "Aller à", go("actions")], ["users", "Vue Agent et vue Candidat", "Aller à", go("vues")],
    ["spark", "Bénéfices", "Aller à", go("benefices")], ["shield", "Sécurité et RGPD", "Aller à", go("securite")],
    ["file", "Tarifs", "Aller à", go("tarifs")], ["bell", "Questions fréquentes", "Aller à", go("faq")],
    ["mail", "Écrire à l’équipe", "Action", () => { location.href = "mailto:contact@immopilot.world"; }],
  ];
  let res = CMDS, sel = 0, isOpen = false, lastFocus = null;
  const s = new Spring(0, { response: 0.3, precision: 0.002, onUpdate: (v) => {
    panel.style.opacity = v; scrim.style.opacity = v;
    if (reduced.matches) { panel.style.transform = ""; panel.style.filter = ""; return; }
    panel.style.transform = `scale(${0.95 + v * 0.05})`;
    const b = (1 - v) * 8; panel.style.filter = b > 0.2 ? `blur(${b.toFixed(1)}px)` : "";
  }, onRest: (v) => { if (v === 0) { root.hidden = true; } } });

  function render() {
    const q = norm(input.value.trim());
    res = q ? CMDS.filter(([, l, g]) => norm(`${l} ${g}`).includes(q)) : CMDS;
    sel = clamp(sel, 0, Math.max(0, res.length - 1));
    list.innerHTML = res.length ? res.map(([ic, l, g], i) =>
      `<li role="option" id="cmd-${i}" aria-selected="${i === sel}">${icon(ic)}<span>${l}</span><span class="grp">${g}</span></li>`).join("")
      : `<li class="empty" role="option" aria-disabled="true">Aucun résultat pour « ${input.value.replace(/[<>&]/g, "")} »</li>`;
    input.setAttribute("aria-activedescendant", res.length ? `cmd-${sel}` : "");
  }
  function mark(i) {
    sel = i;
    $$("li", list).forEach((li, j) => li.setAttribute("aria-selected", String(j === i)));
    input.setAttribute("aria-activedescendant", `cmd-${i}`);
    const li = list.children[i]; li && li.scrollIntoView({ block: "nearest" });
  }
  function open(trigger) {
    if (isOpen) return;
    isOpen = true; lastFocus = document.activeElement;
    root.hidden = false; document.documentElement.dataset.cmdk = "open";
    root.style.pointerEvents = "";
    // La palette naît de son déclencheur (cohérence spatiale).
    const pr = panel.getBoundingClientRect();
    if (trigger && trigger.getBoundingClientRect) {
      const tr = trigger.getBoundingClientRect();
      panel.style.transformOrigin = `${clamp(tr.left + tr.width / 2 - pr.left, 0, pr.width)}px ${tr.top + tr.height / 2 - pr.top}px`;
    } else panel.style.transformOrigin = "50% 0";
    input.value = ""; sel = 0; render();
    s.to(1); input.focus();
    track("cmdk_open");
  }
  function close(restore = true) {
    if (!isOpen) return;
    isOpen = false; delete document.documentElement.dataset.cmdk;
    root.style.pointerEvents = "none"; // pendant le fondu de sortie, la page redevient cliquable immédiatement
    s.to(0);
    if (restore && lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  function run(i) {
    const c = res[i]; if (!c) return;
    close(false); track("cmdk_run", { cmd: c[1] }); c[3]();
    if (document.activeElement === document.body && lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); isOpen ? close() : open(); return; }
    if (!isOpen) return;
    if (e.key === "Escape") { e.preventDefault(); close(); }
    else if (e.key === "ArrowDown") { e.preventDefault(); if (res.length) mark((sel + 1) % res.length); }
    else if (e.key === "ArrowUp") { e.preventDefault(); if (res.length) mark((sel - 1 + res.length) % res.length); }
    else if (e.key === "Enter") { e.preventDefault(); run(sel); }
    else if (e.key === "Tab") { e.preventDefault(); input.focus(); } // piège de focus dans la boîte de dialogue
  });
  input.addEventListener("input", () => { sel = 0; render(); });
  list.addEventListener("pointermove", (e) => { const li = e.target.closest("li[id]"); if (li) { const i = Number(li.id.slice(4)); if (i !== sel) mark(i); } });
  list.addEventListener("click", (e) => { const li = e.target.closest("li[id]"); if (li) run(Number(li.id.slice(4))); });
  scrim.addEventListener("click", () => close());
  for (const b of $$("[data-cmdk-open]")) b.addEventListener("click", () => open(b));
}

/* ================= ACTIONS EN UN GESTE ================= */
const DEMO = [PEOPLE[0], PEOPLE[3], PEOPLE[4], PEOPLE[1], PEOPLE[7]].map((p) => ({ ...p }));

export function initActions() {
  const card = $("[data-actions-demo]"); if (!card) return;
  const list = $("[data-act-list]", card); const bar = $("[data-act-bar]", card);
  const countEl = $("[data-act-count]", card); const empty = $("[data-act-empty]", card);
  let data = DEMO.map((p) => ({ ...p })); const selected = new Set(); const rows = new Map();
  const OPEN = 3 * 76; // largeur des actions révélées (3 boutons)
  let openRow = null;

  function build(p) {
    const li = document.createElement("li");
    li.className = "act-row"; li.dataset.id = p.id;
    li.innerHTML =
      `<div class="act-front"><button type="button" class="ck" role="checkbox" aria-checked="false" aria-label="Sélectionner ${p.n}" aria-keyshortcuts="ArrowLeft ArrowRight"><span>${icon("check")}</span></button>` +
      `<span class="av" style="--h:${p.h}">${p.i}</span><span class="who"><b>${p.n}</b><small>${p.bien}</small></span>` +
      `<span class="badge ${tone(p.st)}" data-st>${p.st}</span></div>` +
      `<div class="act-under"><button type="button" class="u-call" data-u="call" tabindex="-1">${icon("phone")}Appeler</button>` +
      `<button type="button" class="u-mail" data-u="mail" tabindex="-1">${icon("mail")}E-mail</button>` +
      `<button type="button" class="u-arch" data-u="archive" tabindex="-1">${icon("archive")}Archiver</button></div>`;
    const front = $(".act-front", li);
    const x = new Spring(0, { response: 0.35, precision: 0.3, onUpdate: (v) => { front.style.transform = v ? `translate3d(${v.toFixed(1)}px,0,0)` : ""; } });
    const r = { li, front, x, p, open: false };
    rows.set(p.id, r);
    bindSwipe(r);
    return li;
  }
  function setOpen(r, open, velocity = 0) {
    r.open = open;
    r.x.to(open ? -OPEN : 0, { velocity, damping: Math.abs(velocity) > 300 ? 0.8 : 1 });
    $$(".act-under button", r.li).forEach((b) => { b.tabIndex = open ? 0 : -1; });
    if (open) { if (openRow && openRow !== r) setOpen(openRow, false); openRow = r; }
    else if (openRow === r) openRow = null;
  }
  function bindSwipe(r) {
    const tr = new Tracker(); let g = null;
    r.front.addEventListener("pointerdown", (e) => {
      if (e.button) return;
      r.x.stop(); // attraper l’élément en vol : on repart de la valeur affichée
      g = { id: e.pointerId, sx: e.clientX, sy: e.clientY, from: r.x.value, mode: null, onCk: !!e.target.closest(".ck") };
      tr.reset(); tr.add(r.x.value);
      r.front.style.backgroundColor = "var(--elev-2)"; // retour immédiat au pointer-down
    });
    r.front.addEventListener("pointermove", (e) => {
      if (!g || e.pointerId !== g.id) return;
      const dx = e.clientX - g.sx, dy = e.clientY - g.sy;
      if (!g.mode) {
        if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) { g.mode = "x"; r.front.setPointerCapture(e.pointerId); }
        else if (Math.abs(dy) > 8) { g.mode = "y"; r.front.style.backgroundColor = ""; }
      }
      if (g.mode !== "x") return;
      let v = g.from + dx;
      if (v > 0) v = rubberband(v, 200);
      else if (v < -OPEN) v = -OPEN + rubberband(v + OPEN, 200);
      r.x.set(v); tr.add(v);
    });
    const end = (e) => {
      if (!g || e.pointerId !== g.id) return;
      r.front.style.backgroundColor = "";
      if (g.mode === "x") {
        const v = tr.velocity();
        const proj = r.x.value + project(v);
        // Le sens de la vitesse décide d’abord ; sinon, la projection.
        const open = Math.abs(v) > 300 ? v < 0 : proj < -OPEN / 2;
        setOpen(r, open, v);
      } else if (!g.mode && e.type === "pointerup") {
        if (r.open) setOpen(r, false);
        else if (!g.onCk) toggle(r.p.id);
      }
      g = null;
    };
    r.front.addEventListener("pointerup", end); r.front.addEventListener("pointercancel", end);
    const ck = $(".ck", r.li);
    ck.addEventListener("click", (e) => { if (e.detail === 0 || e.pointerType === "") toggle(r.p.id); else if (!g) toggle(r.p.id); });
    ck.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); setOpen(r, true); }
      if (e.key === "ArrowRight" || e.key === "Escape") { e.preventDefault(); setOpen(r, false); }
    });
    $(".act-under", r.li).addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      const u = b.dataset.u; setOpen(r, false);
      if (u === "call") toast(`Démo : appel vers ${r.p.n} (lien tel: dans l’app)`);
      else if (u === "mail") toast(`Démo : e-mail à ${r.p.n} (lien mailto: dans l’app)`);
      else archive([r.p.id]);
      track("demo_action", { action: u });
    });
  }
  function toggle(id) {
    selected.has(id) ? selected.delete(id) : selected.add(id);
    const r = rows.get(id);
    r.li.classList.toggle("is-sel", selected.has(id));
    $(".ck", r.li).setAttribute("aria-checked", String(selected.has(id)));
    syncBar();
  }
  // Barre d’actions : entre et sort par le bas (même chemin).
  const bs = new Spring(0, { response: 0.35, precision: 0.002, onUpdate: (v) => {
    bar.style.opacity = v; bar.style.transform = reduced.matches ? "" : `translate3d(0,${(1 - v) * 130}%,0) scale(${0.96 + v * 0.04})`;
  }, onRest: (v) => { if (v === 0) bar.hidden = true; } });
  function syncBar() {
    const n = selected.size;
    countEl.textContent = `${n} sélectionné${n > 1 ? "s" : ""}`;
    if (n) { bar.hidden = false; bs.to(1); } else bs.to(0);
  }
  function render() {
    list.innerHTML = ""; rows.clear(); selected.clear(); openRow = null;
    data.forEach((p) => list.append(build(p)));
    empty.hidden = data.length > 0; syncBar();
  }
  function archive(ids) {
    const removed = ids.map((id) => ({ p: data.find((d) => d.id === id), at: data.findIndex((d) => d.id === id) })).sort((a, b) => a.at - b.at);
    const fade = removed.map(({ p }) => rows.get(p.id));
    let left = fade.length, cancelled = false;
    const springs = [];
    for (const r of fade) {
      selected.delete(r.p.id);
      springs.push(new Spring(1, { response: 0.28, precision: 0.01, onUpdate: (v) => { r.li.style.opacity = v; r.front.style.transform = `translate3d(${(1 - v) * -40}px,0,0)`; },
        onRest: () => { if (--left === 0) commit(); } }).to(0));
    }
    syncBar();
    function commit() {
      if (cancelled || !fade.every((r) => r.li.isConnected)) return; // annulé ou démo réinitialisée entre-temps
      flip($$(".act-row", list), () => { fade.forEach((r) => { r.li.remove(); rows.delete(r.p.id); }); });
      data = data.filter((d) => !ids.includes(d.id));
      empty.hidden = data.length > 0;
    }
    toast(`${ids.length} dossier${ids.length > 1 ? "s" : ""} archivé${ids.length > 1 ? "s" : ""}`, { undo: () => {
      // Annuler : on réinsère à la place d’origine, les voisins glissent (FLIP).
      cancelled = true; springs.forEach((sp) => sp.stop());
      const cur = $$(".act-row", list);
      flip(cur, () => {
        for (const { p, at } of removed) {
          if (data.some((d) => d.id === p.id)) { const r = rows.get(p.id); if (r) { r.li.style.opacity = ""; r.front.style.transform = ""; } continue; }
          data.splice(at, 0, p);
          const li = build(p); li.style.opacity = "0";
          list.insertBefore(li, list.children[at] || null);
          new Spring(0, { response: 0.35, precision: 0.01, onUpdate: (v) => { li.style.opacity = v; } }).to(1);
        }
      });
      empty.hidden = data.length > 0;
      track("demo_undo");
    } });
  }
  bar.addEventListener("click", (e) => {
    const b = e.target.closest("[data-act]"); if (!b) return;
    const ids = data.filter((d) => selected.has(d.id)).map((d) => d.id);
    const a = b.dataset.act; track("demo_action", { action: a, n: ids.length });
    if (a === "archive") return archive(ids);
    if (a === "csv") return exportCsv(data.filter((d) => selected.has(d.id)));
    if (a === "relance") {
      const prev = ids.map((id) => [id, data.find((d) => d.id === id).st]);
      const setSt = (id, st) => { const el = $("[data-st]", rows.get(id).li); el.textContent = st; el.className = `badge ${tone(st)}`; data.find((d) => d.id === id).st = st; };
      ids.forEach((id) => setSt(id, "Relancé"));
      toast(`${ids.length} relance${ids.length > 1 ? "s" : ""} envoyée${ids.length > 1 ? "s" : ""}`, { undo: () => prev.forEach(([id, st]) => rows.has(id) && setSt(id, st)) });
    }
  });
  $("[data-act-reset]", card).addEventListener("click", () => { data = DEMO.map((p) => ({ ...p })); render(); });
  render();
}

/** Export CSV compatible Excel FR : BOM UTF-8, séparateur « ; », fins de ligne CRLF. */
function exportCsv(items) {
  const esc = (v) => `"${String(v).replace(/"/g, '""')}"`;
  const lines = [["Candidat", "Bien", "Statut", "Score"], ...items.map((p) => [p.n, p.bien, p.st, p.score])].map((r) => r.map(esc).join(";"));
  const blob = new Blob(["﻿" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" });
  const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: "candidatures-immopilot-demo.csv" });
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  toast(`Export prêt : ${items.length} ligne${items.length > 1 ? "s" : ""}, lisible dans Excel`);
}

/* ================= DEUX VUES, UN FLUX ================= */
export function initViews() {
  const seg = $('[data-seg="views"]'); const stage = $("[data-view-stage]"); if (!seg || !stage) return;
  const card = $("[data-shared]", stage); const panel = $("#view-panel");
  const panes = { agent: $('[data-pane="agent"]', stage), candidat: $('[data-pane="candidat"]', stage) };
  const badge = $("[data-v-badge]", stage);
  const cx = new Spring(0, { response: 0.4, precision: 0.3, onUpdate: renderCard });
  const cy = new Spring(0, { response: 0.4, precision: 0.3, onUpdate: renderCard });
  function renderCard() { card.style.transform = cx.value || cy.value ? `translate3d(${cx.value.toFixed(1)}px,${cy.value.toFixed(1)}px,0)` : ""; }
  const fades = {};
  for (const [k, el] of Object.entries(panes)) {
    fades[k] = new Spring(k === "agent" ? 1 : 0, { response: 0.35, precision: 0.002, onUpdate: (v) => {
      el.style.opacity = v; el.style.transform = reduced.matches ? "" : `scale(${0.98 + v * 0.02})`;
    }, onRest: (v) => { if (v === 0) { el.hidden = true; el.style.position = ""; } } });
  }
  segmented(seg, (i, b) => {
    const k = b.dataset.view, other = k === "agent" ? "candidat" : "agent";
    panel.setAttribute("aria-labelledby", b.id);
    // FLIP de l’élément partagé : il glisse de sa place à la nouvelle.
    const first = card.getBoundingClientRect();
    const out = panes[other];
    if (!out.hidden) { // l’ancien volet sort en fondu, hors du flux
      const top = out.offsetTop; out.style.position = "absolute"; out.style.top = top + "px"; out.style.left = getComputedStyle(stage).paddingLeft; out.style.right = getComputedStyle(stage).paddingRight;
    }
    stage.classList.toggle("is-cand", k === "candidat");
    badge.textContent = k === "candidat" ? "Mon dossier · 50 %" : "Dossier en cours";
    panes[k].hidden = false; panes[k].style.position = "";
    fades[other].to(0); fades[k].to(1);
    const last = card.getBoundingClientRect();
    cx.set(cx.value + first.left - last.left).to(0, { velocity: cx.velocity });
    cy.set(cy.value + first.top - last.top).to(0, { velocity: cy.velocity });
    track("views_toggle", { view: k });
  });
}

/* ================= CARROUSEL : élan projeté, snap, rubber-band ================= */
export function initCarousel() {
  const root = $("[data-carousel]"); if (!root) return;
  const track_ = $("[data-car-track]", root); const cards = $$(".ben-card", track_);
  const dots = $("[data-car-dots]", root);
  dots.innerHTML = cards.map(() => "<i></i>").join("");
  let snaps = [], max = 0, idx = 0;
  const o = new Spring(0, { response: 0.4, precision: 0.3, onUpdate: (v) => {
    track_.style.transform = `translate3d(${(-v).toFixed(1)}px,0,0)`;
    const i = nearest(v); if (i !== idx) { idx = i; paint(); }
  } });
  function measure() {
    const base = cards[0].offsetLeft;
    max = Math.max(0, track_.scrollWidth - root.clientWidth);
    snaps = cards.map((c) => Math.min(c.offsetLeft - base, max));
    snaps = snaps.filter((s, i) => i === 0 || s > snaps[i - 1] + 1);
    o.set(snaps[Math.min(idx, snaps.length - 1)] || 0);
  }
  const nearest = (v) => snaps.reduce((b, s, i) => (Math.abs(s - v) < Math.abs(snaps[b] - v) ? i : b), 0);
  function paint() { $$("i", dots).forEach((d, i) => d.classList.toggle("on", i === idx)); }
  const band = (v) => (v < 0 ? rubberband(v, root.clientWidth) : v > max ? max + rubberband(v - max, root.clientWidth) : v);
  const goTo = (i, velocity = 0) => { i = clamp(i, 0, snaps.length - 1); o.to(snaps[i], { velocity, damping: Math.abs(velocity) > 400 ? 0.8 : 1 }); };

  const tr = new Tracker(); let g = null, raw = 0;
  track_.addEventListener("pointerdown", (e) => {
    if (e.button) return;
    o.stop(); raw = o.value;
    g = { id: e.pointerId, sx: e.clientX, sy: e.clientY, from: o.value, mode: null };
    tr.reset(); tr.add(o.value);
  });
  track_.addEventListener("pointermove", (e) => {
    if (!g || e.pointerId !== g.id) return;
    const dx = e.clientX - g.sx, dy = e.clientY - g.sy;
    if (!g.mode) {
      if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) { g.mode = "x"; track_.setPointerCapture(e.pointerId); }
      else if (Math.abs(dy) > 8) { g.mode = "y"; }
    }
    if (g.mode !== "x") return;
    raw = g.from - dx; o.set(band(raw)); tr.add(raw);
  });
  const end = (e) => {
    if (!g || e.pointerId !== g.id) return;
    if (g.mode === "x") {
      const v = tr.velocity();
      const target = nearest(clamp(raw + project(v), 0, max));
      o.value = band(raw);
      goTo(target, v);
    } else if (!g.mode) goTo(nearest(o.value));
    g = null;
  };
  track_.addEventListener("pointerup", end); track_.addEventListener("pointercancel", end);
  // Trackpad : glisser horizontal à deux doigts, 1:1 puis snap.
  let wt;
  root.addEventListener("wheel", (e) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    e.preventDefault();
    o.stop(); raw = clamp(o.value + e.deltaX, -80, max + 80); o.set(band(raw));
    clearTimeout(wt); wt = setTimeout(() => goTo(nearest(raw)), 90);
  }, { passive: false });
  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); goTo(idx - 1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); goTo(idx + 1); }
  });
  $("[data-car-prev]", root).addEventListener("click", () => goTo(idx - 1));
  $("[data-car-next]", root).addEventListener("click", () => goTo(idx + 1));
  addEventListener("resize", measure);
  measure(); paint();
}
