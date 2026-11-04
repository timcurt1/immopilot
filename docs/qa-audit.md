# Audit QA — site immopilot.world (`immopilot-site/`)

Rétablir l’état d’avant l’audit : `git checkout avant-qa -- immopilot-site` (tag `avant-qa`).
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
