# Rapport — Contenu manquant du site ImmoPilot (4 novembre 2026)

> **Textes juridiques.** Les mentions légales, la politique de confidentialité et les CGV sont un **projet de rédaction**. Je ne suis pas un cabinet d’avocats : ils doivent être relus par un juriste ou un avocat avant la mise en ligne.

## Constat de départ

Le bloc « Données fournies par moi » ne contenait que deux informations : **facturation mensuelle** et **remise annuelle de −15 %**. Toutes les autres rubriques étaient encore les exemples du modèle.

Conformément à la règle « ne jamais inventer », tout le reste est resté en marqueurs visibles `[À COMPLÉTER : …]` / `[À VALIDER]` : **78 marqueurs** au total, listés par `python3 _qa/content-check.py`.

## 1. Ce qui a été renseigné

### Tarifs (commit `0eab8ec`)

- **Section** : `index.html:365-399`. Calcul : `assets/js/ui.js:200` (`initPricing`).
- **Source unique** :
  - `data-price-month` sur chaque offre (vide = inconnu) ;
  - `data-annual-discount="15"` sur la section.
  - Le prix annuel n’est jamais saisi : il est calculé.
- **Bascule « Annuel −15 % »** : réelle. Sous la grille (`index.html:398`), seules les mentions vraies sont affirmées (prix HT, TVA en sus, remise de 15 % en annuel), le reste est en marqueurs.
- **Retiré**, car non sourcé :
  - les noms Starter / Croissance / Premium (mes propositions de la première version) et leurs contenus ;
  - le badge « Recommandé ».

### Chiffres clés (commit `700eba2`)

- **Section** : `index.html:309-330`, sources en commentaire (`index.html:312-319`).
- **Retiré** : trois résultats non prouvés (heures gagnées, vacance locative, dossiers traités) et « 100 % en français », non vérifiable sur toute l’application.
- **Remplacés par** six chiffres produit comptés dans le code (tableau 3).
- **Compteur inchangé** : la valeur finale est identique avec JS, sans JS et en mouvement réduit (vérifié).

### Mentions légales, confidentialité, CGV (commit `8d6c53e`)

- **Fichier** : `legal.html`, 195 lignes.
- **Structure** :
  - sommaire, date de mise à jour, bandeau « projet » ;
  - Mentions (`legal.html:51`) : éditeur, hébergeur, propriété intellectuelle, données, responsabilité, droit applicable ;
  - Confidentialité (`legal.html:91`) : données exactes du formulaire, aucun cookie, stockage local du thème, prestataires de l’application ;
  - CGV (`legal.html:124-190`) : 14 articles B2B.
- **Références juridiques citées** :
  - RGPD art. 6-1-b, 15 à 21, 28 et 77 ;
  - Code de commerce L. 441-10 et D. 441-5 (indemnité de 40 €) ;
  - Code civil art. 1218 ;
  - LCEN, citée sans numéro d’article (sa numérotation a pu évoluer : à vérifier par le juriste).
- **Accueil** :
  - « Données hébergées dans l’Union européenne » retiré (aucune source) ;
  - « Chaque action est horodatée » corrigé en « les étapes clés de chaque dossier sont horodatées » (`index.html:359`, preuve : `lib/timeline.ts`, `supabase/schema.sql:11`).
- **Typographie française** (espaces fines insécables) sur le texte visible des deux pages : `_qa/typo.py`, idempotent.

### Formulaire de démo (commit `62357f0`)

- **Formulaire** : `index.html:426-441`. Logique : `assets/js/ui.js:280-345`.
- **Destination** : l’attribut `action` du formulaire, vide pour l’instant [À COMPLÉTER].
- **Supprimé partout** : le repli `mailto:contact@immopilot.world`. Cette adresse était un placeholder que j’avais inventé dans la première version (pied de page, palette ⌘K, page légale, JS).
- **Ajouts** :
  - champ piège (`index.html:432`) et délai minimal de 3 s ;
  - états d’envoi (en cours, succès, erreur, hors ligne) ;
  - mention RGPD sous le bouton (`index.html:435`) ;
  - message de succès sans promesse de délai.

## 2. Données manquantes (bloquantes pour la mise en ligne)

Le détail ligne par ligne est dans `docs/a-completer.md`.

| Marqueur | Emplacement | À fournir | Pourquoi c’est bloquant |
|---|---|---|---|
| Identité de l’éditeur (nom, forme, adresse, SIREN, RCS/RNE, TVA, directeur de publication, contact) | `legal.html` 1.1, pied de page | Vos informations légales | Mentions LCEN obligatoires pour un site professionnel |
| Hébergeur du site | `legal.html` 1.2 | Nom, adresse, téléphone | Mention obligatoire |
| Service et URL du formulaire | `index.html:426` (`action`) | Service choisi + URL publique | Sans cela, aucune demande de démo n’est reçue |
| Contact RGPD | `legal.html` 1.4, 2.1, 2.5 | E-mail | Exercice des droits (RGPD art. 12 à 22) |
| Offres : noms, prix, unité, contenus | `index.html:380-394` | Grille tarifaire | Section Tarifs et CGV art. 5 vides |
| Engagement, essai, paiement, frais | `index.html:398`, CGV art. 5 à 7 | Conditions commerciales | Clauses contractuelles essentielles |
| Taux des pénalités de retard | CGV art. 5 | Taux (au moins trois fois le taux d’intérêt légal) | Mention obligatoire en B2B |
| Hébergement de l’app, pays, transferts hors UE | `legal.html` 2.4, CGV art. 9, `#securite` | Hébergeur et région Supabase, garanties | Information RGPD (art. 13, 28, 44 et suivants) |
| Tribunal compétent | `legal.html` 1.6, art. 13 | Ressort | Clause attributive incomplète |
| Durées et délais (export, suppression, notification, confidentialité) | CGV art. 6, 9, 12, 13 | Vos choix | Clauses incomplètes |

## 3. Sources et calculs

### Chiffres clés

| Valeur | Libellé | Source (fichier:ligne) | Comment c’est compté |
|---|---|---|---|
| 10 | modules | `lib/navItems.ts:22-33` | Entrées de `NAV_ITEMS` |
| 4 | rôles d’accès | `supabase/schema.sql:4` | `role in ('admin','manager','agent','candidate')` |
| 2 | vues dédiées | `lib/navItems.ts:38`, `app/candidate/page.tsx` | Vue collaborateur et portail candidat |
| 5 | statuts par pièce | `supabase/schema.sql:7` | manquant, à vérifier, validé, refusé, non requis |
| 4 | statuts de visite | `supabase/schema.sql:37` | À confirmer, Confirmée, Effectuée, Annulée |
| 1 | raccourci ⌘K | `components/CommandPalette.tsx:21` | `metaKey`/`ctrlKey` + `k` |

### Prix

| Donnée | Source |
|---|---|
| Remise annuelle 15 % | Vos données (bloc A) |
| Formule | Prix annuel par mois = mensuel × 0,85 ; total annuel = ce montant × 12 ; arrondi au centime |
| Vérification (test navigateur, valeur injectée sans modifier le fichier) | 49 € → 41,65 € HT/mois → 499,80 € HT/an ; 129,90 € → 110,42 € HT/mois → 1 325,04 € HT/an |
| Montants | Aucun publié (voir décisions) |

### Autres faits utilisés

| Fait | Source |
|---|---|
| Aucun cookie ni ressource externe sur le site | Recherche dans `immopilot-site` : 0 URL externe chargée, 0 `document.cookie` |
| Préférence de thème en stockage local | `index.html:35`, `assets/js/ui.js:100` |
| Prestataires de l’application | `lib/ai.ts:15` (Anthropic), `lib/email.ts:2` (Resend), `app/api/stripe/checkout/route.ts` (Stripe), `lib/supabase*.ts` (Supabase) |

## 4. Tests réalisés (Playwright)

| Vérification | Chromium | WebKit (Safari) |
|---|---|---|
| Matrice audit : 11 viewports (Chromium) / 375, 768, 1440 (WebKit) × clair/sombre × 41 paliers | ✅ 0 erreur, 0 débordement, CLS ≤ 0,0001, logo conforme | ✅ idem (1 non-réapparition de la nav, non reproduite : 12/12 au même schéma) |
| Formulaire : 10 scénarios (non configuré, vides, e-mail invalide, envoi + double clic, erreur 500, hors ligne, robot × 2, clavier seul, mobile 375) | ✅ 10/10 | ✅ 10/10 |
| Prix : calcul annuel, avec / sans JS | ✅ | — |
| Chiffres : valeur finale animé / sans JS / mouvement réduit | ✅ | — |
| Page légale : ancres, liens, h1 unique, pas de saut de niveau, texte ≥ 16 px mobile, `lang="fr"`, clair/sombre | ✅ | ✅ |
| Interactions du site (⌘K, actions, vues, carrousel, FAQ, tarifs, thème) | ✅ | ✅ (audit précédent) |
| Non-régression des sections non modifiées (66 captures avant/après) | ✅ 32 identiques ; écarts = typographie française et un décalage sous-pixel du volet de thème | — |
| Recherche globale (marqueurs, lorem, TODO, `href="#"`, ancien e-mail, liens) | ✅ 78 marqueurs listés, 0 placeholder, 0 lien cassé | — |

**Non vérifié** :
- **Envoi réel du formulaire** : aucun service n’est choisi. Les tests simulent le service (`formspree.invalid`) et aucune requête n’est partie vers une vraie adresse.
- **E-mail de confirmation au prospect** : non demandé, rien d’implémenté.
- **iPhone réel.**
- **Validation HTML W3C officielle** : vérifiés à la place les identifiants, les labels, la hiérarchie des titres et les ancres.

## 5. Décisions pour vous

1. **Prix.** Le code contient deux grilles, aucune confirmée :
   - **Option A** : celle de l’application, `lib/plans.ts:5-27`, Starter / Pro / Agence à 49 / 129 / 299 € par mois, jusqu’à 10 / 50 / ∞ biens et 3 / 10 / ∞ utilisateurs. Elle est marquée « Prix et limites d’exemple » (`lib/plans.ts:3`) et c’est elle qui alimente le paiement Stripe.
   - **Option B** : celle de l’ancienne vitrine, `lib/marketingContent.ts:70-120`, Essentiel / Agence / Réseau, sur devis.

   Les deux se contredisent aussi sur l’unité : abonnement par agence (`supabase/schema.sql:3`, `route.ts:41`) ou tarif « selon le nombre d’utilisateurs » (`lib/marketingContent.ts:55`). **Choisissez, puis je remplis** : il suffit de renseigner `data-price-month`, et il faudra aligner `lib/plans.ts` sur les mêmes montants pour que le paiement corresponde au site.
2. **Service du formulaire.**
   - **Formspree** : le plus simple, adresse masquée, anti-spam natif, plan gratuit limité.
   - **Web3Forms** : gratuit, clé publique visible dans le HTML.

   Le câblage fonctionne pour les deux : il suffit de remplir l’attribut `action` (mode d’emploi dans le README). Aucun repli `mailto` n’est conservé, puisqu’aucune adresse n’a été fournie.
3. **Adresse personnelle**, si vous êtes une personne physique. Options à vérifier avec le juriste, je n’en choisis aucune :
   - une **adresse de domiciliation** commerciale (société de domiciliation) comme adresse publiée ;
   - l’**anonymat partiel** prévu par la LCEN : il ne concerne que les éditeurs **non professionnels**, qui peuvent ne communiquer leur identité qu’à l’hébergeur. Il ne s’applique a priori pas à une activité commerciale comme ImmoPilot.
4. **À valider** :
   - **plafond de responsabilité** à 12 mois de facturation (CGV art. 11) ;
   - **conservation des prospects** 3 ans après le dernier contact ;
   - **base légale du formulaire** : mesures précontractuelles ;
   - **médiation de la consommation** non applicable (B2B uniquement) ;
   - **nom « ImmoPilot »** comme dénomination.
5. **Cookies.** Aucun traceur, donc **aucun bandeau de consentement nécessaire** aujourd’hui. Le stockage local du thème est un choix demandé par le visiteur. Si vous ajoutez un outil de mesure ou un pixel, un bandeau deviendra obligatoire.
6. **Design (non modifié).**
   - La carte du milieu garde son style « mise en avant », sans badge : à confirmer, ou à retirer si aucune offre n’est recommandée.
   - La mention RGPD sous le bouton reste en 13 px, comme le reste des petites notes du site, pour ne pas changer le design.
   - Les blocs révélés au scroll restent invisibles tant qu’ils ne sont entrés que dans les 8 % du bas de l’écran (comportement de révélation existant).

## 6. Annuler

- **Tout le travail de contenu** : `git checkout avant-contenu -- immopilot-site` (tag local), ou le commit `687bffe`.
- **Un bloc précis** : `git revert` sur son commit — tarifs `0eab8ec`, chiffres `700eba2`, juridique `8d6c53e`, formulaire `62357f0`.
