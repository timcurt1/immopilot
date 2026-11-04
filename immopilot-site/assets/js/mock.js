// Mockups de l’UI ImmoPilot reconstruite en HTML/CSS. Données FICTIVES de démonstration.

export const PEOPLE = [
  { id: 1, n: "Camille Durand", i: "CD", h: 228, bien: "T2 · Lyon 3e", st: "Dossier en cours", score: 78 },
  { id: 2, n: "Yanis Benali", i: "YB", h: 12, bien: "Studio · Nantes", st: "Nouveau", score: 64 },
  { id: 3, n: "Léa Martin", i: "LM", h: 150, bien: "T3 · Bordeaux", st: "Prêt à valider", score: 92 },
  { id: 4, n: "Hugo Lefèvre", i: "HL", h: 280, bien: "T2 · Lyon 3e", st: "À relancer", score: 41 },
  { id: 5, n: "Inès Moreau", i: "IM", h: 330, bien: "T1 · Lille", st: "Dossier en cours", score: 85 },
  { id: 6, n: "Thomas Girard", i: "TG", h: 195, bien: "T3 · Bordeaux", st: "Nouveau", score: 57 },
  { id: 7, n: "Sarah Petit", i: "SP", h: 40, bien: "Studio · Nantes", st: "Prêt à valider", score: 88 },
  { id: 8, n: "Nathan Roux", i: "NR", h: 260, bien: "T4 · Toulouse", st: "À relancer", score: 36 },
];

const TONE = { "Nouveau": "b-info", "Dossier en cours": "b-warn", "À relancer": "b-ko", "Prêt à valider": "b-ok", "Dossier complet": "b-ok", "Pièces manquantes": "b-ko", "Relancé": "b-info" };
export const tone = (st) => TONE[st] || "b-info";
export const icon = (id) => `<svg aria-hidden="true"><use href="#i-${id}"/></svg>`;

export const row = (p) =>
  `<div class="row" data-id="${p.id}"><span class="av" style="--h:${p.h}">${p.i}</span>` +
  `<span class="who"><b>${p.n}</b><small>${p.bien}</small></span>` +
  `<span class="badge ${tone(p.st)}" data-st>${p.st}</span>` +
  `<span class="score"><i style="--s:${p.score / 100}"></i><span>${p.score}</span></span></div>`;

const SIDE = [["home", "Tableau de bord"], ["inbox", "Candidatures", "c"], ["bell", "À relancer", "r"], ["cal", "Visites"], ["list", "Biens"], ["mail", "Messages"]];

function shell(title, inner, hl) {
  const items = SIDE.map(([ic, label, b], i) =>
    `<span class="s-item${i === hl ? " on" : ""}">${icon(ic)}${label}${b === "c" ? '<span class="s-badge" data-badge="c">24</span>' : b === "r" ? '<span class="s-badge warn" data-badge="r">5</span>' : ""}</span>`).join("");
  return `<div class="app-in"><div class="chrome"><i></i><i></i><i></i><span class="url">app.immopilot.world</span></div>` +
    `<aside class="side"><div class="s-logo"><svg><use href="#i-logo"/></svg><span class="wm">immo<b>PILOT</b></span></div><span class="side-hl" data-hl></span>${items}</aside>` +
    `<div class="main"><div class="m-top"><h5>${title}</h5><div class="m-search">${icon("search")}<span>Rechercher…</span><kbd>⌘K</kbd></div><span class="m-av"></span></div>${inner}</div></div>`;
}

const dashboard = () => shell("Bonjour Julie",
  `<div class="kpis"><div class="kpi"><small>Nouvelles candidatures</small><b>12</b><em>+4 aujourd’hui</em></div>` +
  `<div class="kpi"><small>Dossiers complets</small><b>8</b><em>prêts à valider</em></div>` +
  `<div class="kpi"><small>Relances du jour</small><b>5</b><em>2 déjà faites</em></div>` +
  `<div class="kpi"><small>Visites cette semaine</small><b>3</b><em>jeudi, vendredi</em></div></div>` +
  `<div class="panel-t">Priorités du jour <small>Trier : urgence</small></div>` +
  `<div class="rows">${[3, 1, 4, 5, 7].map((id) => row(PEOPLE[id - 1])).join("")}</div>`, 0);

const tri = () => shell("Candidatures",
  `<div class="chips" data-chips><span class="on" data-chip>Toutes</span><span data-chip>Dossier complet</span><span data-chip>À relancer</span><span class="sort" data-sort>Trier : date</span></div>` +
  `<div class="rows" data-rows>${PEOPLE.map(row).join("")}</div>`, 1);

export function renderMocks(root = document) {
  for (const el of root.querySelectorAll("[data-mock]")) {
    const k = el.dataset.mock;
    el.innerHTML = k === "tri" ? tri() : dashboard();
  }
  placeHighlights(root);
}

/** Place la surbrillance de la sidebar sur l’élément actif (mesuré, pas codé en dur). */
export function placeHighlights(root = document) {
  for (const side of root.querySelectorAll(".side")) {
    const on = side.querySelector(".s-item.on");
    const hl = side.querySelector("[data-hl]");
    if (on && hl) hl.style.transform = `translate3d(0,${on.offsetTop}px,0)`;
  }
}
