# Audit QA — site immopilot.world (`immopilot-site/`)

Rétablir l’état d’avant l’audit : `git checkout 5ac17c8 -- immopilot-site` (commit d’avant l’audit ; tag local `avant-qa`).
Scripts et captures : `_qa/` (hors livraison ; captures dans `_qa/out/`, non versionnées).

## Phase 0 — Reconnaissance

- **Stack** : HTML/CSS/JS pur, sans build. Un `index.html` et un `legal.html`. 7 modules ES (`assets/js/`). Une feuille CSS en `@layer`.
- **Animation** : moteur de ressorts maison (`spring.js`, une seule boucle rAF partagée), scènes épinglées en `position: sticky` scrubbées depuis le scroll natif (`scroll.js`, IntersectionObserver + rAF), transitions CSS à courbe ressort `linear()`, View Transitions pour le thème.
  - Aucune librairie (pas de GSAP, Lenis, Lottie, Three.js), aucune vidéo, aucun canvas.
- **Polices et médias** : polices système (aucune police web). Aucune image raster dans la page. Les maquettes sont en HTML/CSS et les icônes en SVG `<use>`.
- **Scripts tiers** : aucun.
- **Logo, occurrences** :
  1. nav (normale / compactée / cachée-révélée, menu mobile ouvert) ;
  2. footer ;
  3. sidebar des maquettes (hero, ⌘K, thème clair + sombre) ;
  4. favicon SVG + PNG 32 ;
  5. apple-touch-icon 180 ;
  6. manifest ;
  7. og:image / twitter:image.
  - Il n’y a ni preloader, ni logo dans le hero.

## Phase 1 — Baseline

**Matrice exécutée** (Chromium 1243) :
- 11 viewports : 320×568, 375×667, 390×844, 430×932, 844×390 (paysage), 768×1024, 1024×768, 1280×800, 1440×900, 1920×1080, 2560×1440 ;
- × thème sombre et clair ;
- × 41 paliers de scroll (2,5 %), soit 902 captures.

**Mesures** :
- logo à t = 0/100/250/500/1000/2000 ms et tous les 4 paliers (nav révélée) ;
- contraste logo/fond sur pixels réels ;
- débordement horizontal ;
- texte coupé ;
- console et requêtes ;
- LCP, CLS, long tasks.

**Scénarios ciblés** (`_qa/scenarios.js`) :
- compteurs, image par image ;
- hero ;
- FAQ ;
- rechargement en pleine scène ;
- seuil de la nav ;
- ⌘K + molette ;
- fps à CPU ×1 et ×4 ;
- demi-tour ;
- retour arrière + resize ;
- mouvement réduit ;
- thème ;
- menu mobile ;
- JS en échec.

**Non disponible** : WebKit et Firefox. Leur téléchargement est bloqué par la politique réseau de l’environnement (`cdn.playwright.dev`). Les points Safari/Firefox ci-dessous sont des **risques relevés à la lecture du code, non vérifiés visuellement**.

**Résultats sains** (baseline) :
- 0 erreur / 0 warning console, 0 requête en échec ;
- 0 débordement horizontal (même `overflow-x: clip` neutralisé, ce qui protège Safari < 16) ;
- logo : visible, non recouvert et au ratio 1:1 à tous les instants et paliers testés, contraste ≥ 3:1 ;
- LCP 1,0–1,4 s ;
- pendant le scroll, le JS pèse < 2 % des échantillons CPU, sans long task.

## Tableau d’audit

| ID | Section | Navigateur / viewport | Symptôme | Preuve | Cause racine | Gravité |
|---|---|---|---|---|---|---|
| B1 | Toute la page | Chromium, tous | Si `main.js` ne se charge pas (réseau, 404, navigateur sans modules ES), 55 blocs de texte restent invisibles (sections `.reveal`, chaos « après »…). | Scénario « JS en échec » : 55 textes à opacité 0 | La classe `js` (qui masque l’état initial) est posée dans le `<head>` sans condition. Rien ne la retire si le module échoue. | **Bloquant** |
| B2 | Palette ⌘K | Chromium 1440 | La page défile derrière la boîte de dialogue modale (molette sur le voile : 3000 → 3900 px). | `cmdkLock` | Aucun verrouillage du défilement pendant `aria-modal`. | **Majeur** |
| B3 | Tri (mobile) | Chromium 320–430 | Le mockup saute de 23 px à chaque changement d’étape. | CLS 0,0224, source `DIV.app-tri` y 280→257 | En mobile seule l’étape active est affichée, et les étapes n’ont pas la même hauteur. | **Majeur** |
| B4 | Nav | Chromium 1440 | Compaction qui oscille quand le scroll hésite autour de 40 px. | `navThreshold` : l’échelle monte et descend à chaque micro-scroll | Seuil unique, sans hystérésis. | Mineur |
| B5 | Tri (rechargement en pleine scène) | Chromium 1440 | Première image : les 8 lignes empilées au même endroit. | `reload` : « rows-distinct-y=1/8 » puis 8/8 | Le premier calcul de la scène attend le callback asynchrone de l’IntersectionObserver. | Mineur |
| B6 | FAQ | Chromium 1440 | À la fermeture, la réponse disparaît d’un coup alors qu’elle apparaît en fondu à l’ouverture (sortie ≠ entrée). | `faq` : `open=false` dès la 1re image | `details.open = false` est appliqué immédiatement, sans sortie symétrique. | Mineur |
| B7 | Meta | Mobile clair | `theme-color` reste sombre (#05060a) quand la page se charge en thème clair (barre Safari / Android sombre sur page claire). | `theme` : `metaOnLoadLight = #05060a` | Le script de thème du `<head>` ne met pas à jour la meta (seul le bouton le fait). | Mineur |
| B8 | Chaos | Chromium | Points d’arrivée des pièces calculés pendant que la carte est à l’échelle 0,96 : léger décalage (≤ 4 %) après un resize. | Lecture de code (`scenes.js`, mesure sous transform) | Mesure d’un élément transformé. | Mineur |
| B9 | Logo (point bleu) | Firefox / Safari — **non vérifié** | Risque d’un point noir au lieu de bleu. | Lecture de code : `fill="var(--logo-dot)"` | `var()` dans un attribut de présentation SVG n’est pas garanti hors Chromium. | Majeur si avéré |
| B10 | Survols | iOS / Android — **non vérifié** | État de survol qui reste « collé » après un tap (boutons, liens de nav, footer). | Lecture de code : `:hover` sans `@media (hover: hover)` | Pas de garde de capacité de survol. | Mineur |
| B11 | Maquettes | Safari < 16 — **non vérifié** | Texte des maquettes à 17 px (maquettes déformées). | Lecture de code : `font-size: clamp(…, 1.12cqi, …)` sans repli | Unités `cqi` non supportées, donc déclaration invalide. | Mineur |
| B12 | Bords | iPhone paysage — **non vérifié** | Marge droite qui ignore l’encoche. | Lecture de code : `--gutter` n’utilise que `safe-area-inset-left` | Safe-area asymétrique. | Mineur |
| B13 | Verre | Navigateurs sans `backdrop-filter` — **non vérifié** | Surfaces translucides à 55 % sans flou : lisibilité réduite. | Lecture de code | Pas de repli `@supports`. | Mineur |

**Observations sans correction** (non-bugs ou choix de design) :
- **Long task de 52–67 ms au chargement** (forçage de layout à l’initialisation des maquettes) : sous le seuil LCP/INP, pas d’effet visible.
- **Captures « aller » ≠ « retour »** dans `reverse` : le défilement à la molette de Chromium est animé et continue après le positionnement instantané. Le test a été corrigé.
- **Bascule de thème** : fondu de ~400 ms, sans saut de luminosité. Délai de ~300 ms avant le début du fondu mesuré dans Chromium headless, à vérifier sur appareil réel.

**Ajouts découverts pendant les corrections** :

| ID | Section | Navigateur / viewport | Symptôme | Preuve | Cause racine | Gravité |
|---|---|---|---|---|---|---|
| B15 | ⌘K | Chromium 1024–1440 | Le toast « 3 relances envoyées », qui conclut la scène, est sous l’écran (top 887–913 px pour un viewport de 768–900 px) : jamais visible. | Mesure du rectangle du toast | Toast ancré au bas d’un mockup qui déborde volontairement sous l’écran. | **Majeur** |
| B16 | Chaos, tri | Chromium 320×568, 375×667 | Les visuels épinglés dépassent le bas de l’écran de 92 à 215 px. | `_qa/fit.js` | Visuel de taille fixe dans une scène épinglée de 100 svh. | **Majeur** |
| B17 | ⌘K (mobile) | Chromium 320–430 | Toast sur 3 lignes (« 3 / relances / envoyées »). | Planche de non-régression | Élément absolu décalé de `left: 50 %` sans largeur : on ne lui laisse que la moitié de la largeur. | Mineur |

---

# Résultats après corrections (Phase 5)

## 1. Bilan

**17 défauts trouvés, 17 corrigés.** Les défauts B9 à B14 sont corrigés par lecture du code (Safari/Firefox indisponibles ici) : correctif sans effet visible dans Chromium, vérifié.

| Catégorie | Défauts |
|---|---|
| Contenu / robustesse | B1 |
| Interaction | B2, B6 |
| Mise en page / sauts | B3, B5, B8, B16, B17 |
| Animation | B4, B6 |
| Logo | B9 (seul risque relevé ; aucun défaut constaté dans Chromium) |
| Compatibilité Safari / tactile | B10, B11, B12, B13, B14 |
| Méta | B7 |
| Visibilité | B15 |

**Régression introduite puis corrigée pendant le travail** : `scrollbar-gutter: stable` appliqué en permanence (premier correctif de B2) décalait toute la page de 7 px. La non-régression l’a détecté (`_qa/align.js` : titre à 137 px au lieu de 144 px), et la règle ne s’applique plus que palette ouverte.

## 2. Corrections

| Bug | Cause racine | Correctif | Preuve avant → après |
|---|---|---|---|
| B1 | Classe `js` posée sans condition | `index.html` : script du `<head>` (test `noModule`) + `onerror` du module | JS bloqué : 55 → 0 texte invisible |
| B2 | Pas de verrouillage du scroll en `aria-modal` | `main.css` : `html[data-cmdk="open"] { overflow: hidden; scrollbar-gutter: stable }` | Molette sur le voile : 3000→3900 px → 3000→3000 px |
| B3 | Étapes de hauteurs différentes, une seule affichée | `main.css` (responsive ≤ 960 px) : étapes superposées en grille | CLS 0,0224 → 0,0001 ; mockup immobile |
| B4 | Seuil unique à 40 px | `ui.js` `initNav` : hystérésis 48 / 24 px | Échelle qui oscillait → monotone |
| B5 | Premier calcul attendant l’observer | `scroll.js` `scene()` : premier état synchrone si la scène est à l’écran | 1re image « lignes 1/8 » → jamais d’état brut |
| B6 | `details.open = false` immédiat | `ui.js` `initFaq` : sortie inverse de l’entrée, interruptible | Réponse : disparition instantanée → fondu + remontée, repli sans saut (901 px) |
| B7 | Meta non mise à jour au chargement | `index.html` (script du `<head>`) | `#05060a` → `#fbfbfd` en clair |
| B8 | Mesure sous transform | `scenes.js` `initChaos` : mesure dans l’état final | Lecture de code ; aller = retour au pixel près |
| B9 | `var()` en attribut de présentation | `index.html` : `style="fill: var(--logo-dot)"` | Pixel du point identique (bleu) dans Chromium |
| B10 | `:hover` sans garde | `main.css` : `@media (hover: hover)` × 7 + `touch-action: manipulation` | Survol actif à la souris, inactif au tactile |
| B11 | `cqi` sans repli | `main.css` `.app-in` : repli en `vw` | Lecture de code |
| B12 | Safe-area gauche seule | `main.css` `--gutter` | Lecture de code |
| B13 | Pas de repli `backdrop-filter` | `main.css` `@supports not (…)` | Lecture de code |
| B14 | `100vw` inclut la barre de défilement | `main.css` `.car-track` : `100%` | Alignement carte/titre : 0 px d’écart |
| B15 | Toast ancré au mockup | `index.html` (toast déplacé dans la scène) + `main.css` | Toast sous l’écran → visible, 24 px du bas, partout |
| B16 | Visuel fixe > hauteur disponible | `scenes.js` : `fitScale()` (chaos, tri), uniquement si ça dépasse | Dépassement 92–215 px → 0 (−16 px de marge) ; inchangé dès 390 px |
| B17 | Absolu sans largeur | `main.css` `.toast-demo` : `width: max-content` | 3 lignes → 1 ligne |

Un commit par défaut ou par groupe cohérent : `git log 5ac17c8..HEAD`.

## 3. Matrice réalisée

**Matrice de base** : Chromium, 11 viewports × 2 thèmes × 41 paliers, avant et après.

**Non-régression** :
- 902 paliers comparés au pixel près (`_qa/diff.py`), dont 594 strictement identiques ;
- tous les écarts > 2 % ont été inspectés : ce sont les corrections voulues (B3, B15, B16) ou des captures prises pendant une révélation en cours.

**Logo** :
- présent, visible, non recouvert, ratio 1:1 aux instants 0–2000 ms et à tous les paliers testés ;
- contraste 14 à 19:1 (footer), ≥ 3:1 dans la nav sur tous les fonds traversés ;
- planche avant/après : `docs/qa/logo-planche.png` (72 captures : haut, compact, menu mobile, footer × 5 viewports × 2 thèmes).

**Scénarios** :
- **Bascule de thème** : fondu de ~400 ms, sans saut de luminosité.
- **Mouvement réduit** : scènes non épinglées, états finaux, aucun texte bloqué invisible.
- **Interactions — toutes vertes** :
  - ⌘K : clavier, Entrée, Échap, retour du focus ;
  - démo d’actions : sélection, CSV avec BOM, archiver / annuler, swipe ;
  - vues, carrousel, FAQ au clavier, tarifs ;
  - formulaire : validation inline ;
  - menu mobile ;
  - thème.
- **Aller/retour d’une scène scrubbée** : identique au pixel près hors curseur clignotant.
- **Resize** 1440 → 900 → 390 → 1440 : aucun débordement, lignes correctes.

**Mesures** :
- 0 erreur et 0 warning console, 0 requête en échec, 0 débordement horizontal, CLS ≤ 0,0001 partout ;
- LCP 1,0–1,2 s (Playwright), 2,0 s (Lighthouse mobile simulé) ;
- Lighthouse, 3 passes avant et 3 après :

| | Performance mobile | TBT | Lighthouse ordinateur |
|---|---|---|---|
| Avant | 98–99 | 70–140 ms | — |
| Après | 97–98 | 110–160 ms | Performance 100, Accessibilité 97, Bonnes pratiques 100, SEO 100 |

  Un premier passage isolé à 90 était une valeur aberrante, non reproduite. Le contraste encore signalé concerne les maquettes décoratives volontairement estompées.

- **Fluidité pendant le scroll** : aucune long task (il y en avait de 52 à 67 ms avant), médiane 16,7 ms par frame. 4 à 6 % de frames > 33 ms, même taux qu’avant : rendu logiciel sans GPU de cet environnement, pas du JS (< 2 % du CPU).

**Non vérifié** :
- Safari (macOS, iOS) et Firefox : téléchargement des navigateurs bloqué par le réseau de l’environnement (`cdn.playwright.dev`) ;
- iPhone / Android réels ;
- écran 120 Hz ;
- GPU réel ;
- barre de défilement classique Windows (B14) ;
- bfcache : Chromium headless n’a pas restauré la page depuis le cache, le retour arrière a été testé en rechargement.

## 4. Décisions pour vous (non modifiées)

- **320×568 (iPhone SE 1re génération)** : les visuels du chaos et du tri tiennent maintenant à l’écran, mais en petit (texte des maquettes ≈ 5–6 px). Alternative : ne pas épingler ces scènes sous 600 px de haut, ce qui veut dire supprimer l’animation sur ces écrans ; je ne l’ai donc pas fait.
- **Ordinateur** : les maquettes ⌘K et thème débordent volontairement sous l’écran (composition « à fond perdu »). Conservé.
- **Révélations** : un bloc qui n’est entré que dans les 8 % du bas de l’écran reste invisible jusqu’à franchir ce seuil, y compris en mouvement réduit (fondu court). C’est le design de la révélation.
- **`legal.html`** n’a ni logo ni navigation (seulement « Retour à l’accueil »).
- **Délai d’environ 300 ms entre le clic et le début du fondu de thème**, mesuré dans Chromium headless. À vérifier sur un appareil réel avant d’y toucher.
- **Long task de 50–60 ms au chargement** (mise en place des maquettes) : sans effet mesuré sur le LCP. On pourrait la différer, mais ce serait une restructuration.

## 5. Annuler

- Tout le site d’avant l’audit : `git checkout 5ac17c8 -- immopilot-site`.
- Une correction précise : `git revert <commit>` (liste : `git log --oneline 5ac17c8..HEAD`).
