# ImmoPilot — Brief du site marketing (immopilot.world)

## 1. Audit (phase 0)

- Le dépôt contient l’application Next.js (vues Agent / Candidat, ⌘K, export CSV, toasts avec Annuler…) et une ancienne vitrine marketing en Next/Tailwind (`app/(marketing)`).
- Le nouveau site est **indépendant** et statique : `immopilot-site/`. L’ancienne vitrine n’est pas supprimée (l’application en dépend pour le routage).
- Couleur d’accent retrouvée dans l’app : `--color-brand-500: #3557ff`. On la garde comme accent unique, avec un dégradé vers le cyan `#22d3ee` utilisé avec parcimonie (mots-clés de titres, CTA principal, halos).
- Vocabulaire métier repris de l’app : « Nouveau », « Dossier en cours », « À relancer », « Prêt à valider », « Signé » ; pièces : pièce d’identité, avis d’imposition, contrat de travail, garant.

## 2. Promesse & copy

**Promesse :** « Vendez des résultats, pas des outils » → louer plus vite, perdre moins de temps sur les dossiers, n’oublier aucun candidat.

Variantes de titre hero étudiées :

1. **« Vos candidatures. Sous contrôle. »** ← retenue : deux temps (le problème possédé / la maîtrise), rythme Apple, compréhensible en 1 s par un gérant d’agence.
2. « Chaque dossier. À sa place. » — juste, mais plus froid, centré outil.
3. « Louez plus vite. Sans rien oublier. » — très orienté résultat ; réutilisée comme accroche du CTA/benefices.

Ton : vouvoiement, phrases courtes, vocabulaire métier, zéro jargon technique.

## 3. Arborescence (une page = 15 scènes)

| # | Ancre | Scène | Ce que l’animation raconte |
|---|---|---|---|
| 1 | — | Nav en verre | Se compacte au scroll, se cache en descendant, revient en remontant |
| 2 | `#top` | Hero | Mots en cascade (ressort amorti 1.0) ; mockup en tilt 1:1 au pointeur, retour en ressort ; au scroll il grandit et s’ancre |
| 3 | `#chaos` | Le chaos | Pièces éparpillées (PDF, e-mails, SMS, tableurs) aspirées vers le bon dossier → « avant / après » |
| 4 | `#tri` | Le tri | Liste qui se filtre, se classe par score, badges de sidebar en direct, surbrillance glissante |
| 5 | `#commande` | ⌘K | La palette se matérialise (flou + échelle), tape une commande, exécute ; ⌘K réel sur tout le site |
| 6 | `#actions` | Actions en un geste | Démo manipulable : sélection multiple, swipe 1:1 avec élan + rubber-band, export CSV réel, toast Annuler |
| 7 | `#vues` | Deux vues, un flux | Contrôle segmenté iOS (glissable) ; carte candidat partagée qui « morphe » entre vue Agent et vue Candidat |
| 8 | `#benefices` | Bénéfices | Carrousel draggable : projection d’élan (0.998), snap, rubber-band aux bords |
| 9 | `#chiffres` | Chiffres | Compteurs au scroll ; faits produit réels + résultats `[À COMPLÉTER]` |
| 10 | `#theme` | Clair / sombre | L’interface bascule de thème au scroll (volet en `transform` uniquement) |
| 11 | `#securite` | Sécurité & RGPD | Message sobre, faits à valider `[À COMPLÉTER]` |
| 12 | `#tarifs` | Tarifs | 3 cartes en verre, toggle mensuel/annuel à ressort |
| 13 | `#faq` | FAQ | Accordéons interruptibles (FLIP en `transform`), `<details>` natif sans JS |
| 14 | `#demo` | CTA final | Formulaire minimal, validation inline |
| 15 | — | Footer | Liens, légal `[À COMPLÉTER]` |

## 4. Design tokens

- Fond sombre `#05060a`, élévation `#0d0f16` / `#151821` ; texte `#f5f5f7`, secondaire `#a1a1aa` (AA sur fond), lignes `rgba(255,255,255,.1)`.
- Thème clair `#fbfbfd` / `#ffffff` / `#f2f3f7` ; texte `#1d1d1f`, secondaire `#5b5b66`.
- Accent : `#5b78ff` en sombre (contraste AA sur noir), `#2f50f0` en clair. Dégradé `#3557ff → #22d3ee`.
- Statuts : vert `#30d158`/`#16a34a`, ambre `#ffb340`/`#b45309`, rouge `#ff6961`/`#dc2626`.
- Typo : pile système Apple, `font-optical-sizing: auto`. Display `clamp(2.75rem, 8vw, 7rem)` / lh 1.02 / −0.04em ; H2 `clamp(2.25rem, 5.5vw, 4.5rem)` / −0.03em ; corps 1.0625rem / lh 1.5 / 0 ; petit texte +0.01em.
- Rayons : 12 / 20 / 28 px. Espacement en `rem`.
- Matériaux : nav « regular glass » `blur(20px) saturate(180%)` + liseré clair en haut ; cartes « thick glass » `blur(40px)` statique + ombre plus profonde. Jamais deux verres clairs empilés.

## 5. Décisions de mouvement (justifiées par `apple-design`)

- **Moteur de ressorts maison (`assets/js/spring.js`, ~2 Ko)** paramétré comme Apple (amortissement + réponse), plutôt que Motion. Raison : le skill (§18, « caveat ») signale que Motion part d’une valeur périmée quand on écrit `style.transform` à la main pendant un geste ; notre moteur repart toujours de la **valeur affichée** et garde la **vitesse** lors d’un re-ciblage (§3, pas de « mur de briques »), avec 0 dépendance.
- **Pas de GSAP / Lenis.** Les scènes « pinned » utilisent `position: sticky` + une progression calculée depuis le scroll natif : aucun scroll-jacking, clavier/ancres/remontée intacts (§5 du cahier des charges). Lenis altérerait la sensation native : écarté.
- **Entrées non gestuelles** (révélations, cascade du hero) en CSS avec une courbe `linear()` qui **échantillonne un ressort amorti 1.0, réponse 0.45 s** : pas de JS sur le chemin du LCP.
- **Ressorts par défaut** : amortissement 1.0, réponse 0.35 s. **Rebond 0.8** uniquement après un geste avec élan (swipe d’une ligne, lancer du carrousel, curseur du contrôle segmenté).
- **Projection d’élan** : `(v/1000)·0.998/(1−0.998)` puis snap au point le plus proche ; décision ouvrir/fermer par le **signe de la vitesse**.
- **Rubber-band** : `(x·d·0.55)/(d+0.55·|x|)` aux bords du carrousel, du swipe et du contrôle segmenté.
- **Cohérence spatiale** : la palette ⌘K sort de son déclencheur et y retourne ; la barre d’actions groupées entre et sort par le bas.
- **Accessibilité** : `prefers-reduced-motion` → scènes non épinglées, état final affiché, fondus courts ; `prefers-reduced-transparency` → surfaces opaques ; `prefers-contrast: more` → bordures franches. Thème : fondu enchaîné (View Transitions) sans flash de luminosité.
- **Performance** : uniquement `transform` / `opacity` animés ; flou animé ≤ 12 px ; pas de `transition: all` ; scènes initialisées et mises à jour seulement quand elles sont visibles (`IntersectionObserver`).
