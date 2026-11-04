# ImmoPilot — site marketing (immopilot.world)

Site statique, sans framework ni étape de build : `index.html` + `assets/`. Toutes les animations sont en JavaScript vanilla (modules ES), sans dépendance externe.

## Lancer en local

Les modules ES ne se chargent pas en `file://` : il faut un petit serveur.

```bash
cd immopilot-site
python3 -m http.server 8080
```

Puis ouvrez http://localhost:8080.

## Déployer

Le dossier `immopilot-site/` se déploie tel quel.

- **Vercel** : « Add New Project » → importez le dépôt → *Root Directory* : `immopilot-site` (seul réglage à faire : le reste — pas de build, en-têtes de cache et de sécurité — est dans `vercel.json`). Si l’application Next.js du même dépôt est déjà sur Vercel, créez un **second** projet pour le site : les deux cohabitent.
- **Netlify** / **Cloudflare Pages** : dossier de publication `immopilot-site`, pas de commande de build. Le fichier `_headers` (cache + en-têtes de sécurité) est lu automatiquement.

### Brancher le domaine immopilot.world

1. Chez l’hébergeur : *Domains* → ajoutez `immopilot.world` et `www.immopilot.world`.
2. Chez le registrar : créez les enregistrements DNS indiqués par l’hébergeur (en général un `A` ou `ALIAS` pour la racine, un `CNAME` pour `www`).
3. Choisissez la version principale (sans `www` : c’est celle des balises `canonical`, Open Graph et du `sitemap.xml`) et redirigez l’autre vers elle.
4. HTTPS est activé automatiquement par l’hébergeur.

## Où modifier quoi

| Je veux changer… | Fichier |
|---|---|
| Les textes, la FAQ, les offres | `index.html` (une section par scène, balisée `<!-- ============ N. NOM ============ -->`) |
| Les prix | `index.html`, section `#tarifs` : attributs `data-price-month` et `data-price-year` de chaque `<b>`, plus le texte affiché |
| La couleur d’accent | `assets/css/main.css`, couche `tokens` : `--accent`, `--accent-strong`, `--grad` (une fois pour le thème sombre, une fois pour le clair) |
| Les autres couleurs, rayons, tailles de titre | `assets/css/main.css`, couches `tokens` et `base` |
| La destination du formulaire de démo | `assets/js/ui.js` : `FORM_ENDPOINT` (URL Formspree, CRM, webhook) et `CONTACT_EMAIL`. Sans URL, le formulaire ouvre la messagerie du visiteur avec la demande pré-remplie. |
| Les données fictives des maquettes | `assets/js/mock.js` (`PEOPLE`) |
| Les commandes de la palette ⌘K | `assets/js/interactive.js` (`CMDS`) |
| Le logo | Symbole SVG `#i-logo` en haut de `index.html` (blanc en sombre, marine `#1e2742` en clair, point bleu `--logo-dot`) ; favicon `assets/img/favicon.svg` ; fichier d’origine : `assets/img/logo-immopilot-original.webp` |
| Les pages légales | `legal.html` |
| Titre, description, image de partage | `<head>` de `index.html` ; image : `assets/img/og.png` (1200×630) |

## Suivi de conversion (sans cookie)

Chaque CTA porte `data-track="…"`. Les événements (`cta_hero`, `demo_submit`, `cmdk_open`, `billing_toggle`…) sont :

- émis en `CustomEvent("immopilot:track")` sur `window` ;
- poussés dans `window.dataLayer` si celui-ci existe ;
- envoyés à Plausible si son script est présent (`window.plausible`), qui fonctionne sans cookie.

Si vous ajoutez un traceur qui dépose des cookies (GA4, Meta Pixel…), vous devrez ajouter un bandeau de consentement.

## Architecture

```
index.html             Page unique : 15 scènes, contenu lisible sans JS
legal.html             Mentions légales / confidentialité / CGV ([À COMPLÉTER])
assets/css/main.css    @layer tokens → base → components → mock → scenes → a11y
assets/js/spring.js    Ressorts Apple (amortissement + réponse), Tracker de vitesse, projection, rubber-band, FLIP
assets/js/scroll.js    Scènes épinglées : progression 0→1 depuis le scroll natif (sticky), IntersectionObserver
assets/js/mock.js      Maquettes de l’UI ImmoPilot (HTML/CSS) + données fictives
assets/js/scenes.js    Hero, chaos → ordre, tri, ⌘K (démo), thème
assets/js/interactive.js  ⌘K réel, actions en un geste (swipe, sélection, CSV, Annuler), deux vues, carrousel
assets/js/ui.js        Nav, thème, toasts, contrôle segmenté, révélations, compteurs, tarifs, FAQ, formulaire, suivi
```

Vérification de la syntaxe JS :

```bash
for f in assets/js/*.js; do node --check "$f"; done
```

Décisions de design et de mouvement : voir `../docs/brief.md`.
