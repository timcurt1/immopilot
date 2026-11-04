# Synthèse exécutive — ImmoPilot (4 novembre 2026)

## En une page

- **Segment de lancement** : petites agences indépendantes qui louent (1 à 5 personnes, titulaires de la carte « gestion »), à Clermont-Ferrand puis en Auvergne-Rhône-Alpes. En France, 15 437 professionnels détiennent une carte « gestion » (CCI, 01/01/2025).
- **Positionnement** : « De l’annonce au choix du locataire : chaque candidature complète, triée et suivie, à côté de votre logiciel actuel. »
  - Plus complet que la collecte gratuite (GreenLoc, DossierFacile), moins cher qu’un CRM.
- **Grille** :
  - **Essentiel 39 € HT / mois / agence** (3 utilisateurs) ;
  - **Agence 79 € HT** (10 utilisateurs, mise en avant) ;
  - **Réseau sur devis** ;
  - −15 % en annuel, essai de 30 jours sans carte bancaire, sans engagement.
- **Économie du modèle** : marge brute d’environ 85 % à 20 clients ; 2 clients couvrent les coûts techniques (Supabase, Vercel).
- **MRR visé à 12 mois** : 510 € (prudent), **1 020 € (central, 20 agences)**, 1 785 € (ambitieux).
- **Constat majeur** : le site présentait des fonctions absentes du code (export CSV, actions groupées, appel / e-mail, Annuler, thème sombre de l’app). Elles sont maintenant marquées « à venir ».
- **Premières actions** :
  1. 12 entretiens d’agences (`06`).
  2. Création de la micro-entreprise et demande du statut d’étudiant-entrepreneur (SNEE).
  3. Développer l’export CSV et le tri par score.

## Tableau des décisions

| Décision | Choix | Alternatives écartées | Preuves | Confiance | À valider comment |
|---|---|---|---|---|---|
| Segment | Petite agence indépendante qui loue, Clermont | Gestion moyenne (S2), réseaux | Vente directe possible, fonctions suffisantes sans intégration | Moyenne | Grille go / no-go (`06` §4) |
| Unité de facturation | Par agence, avec plafond d’utilisateurs | Par utilisateur, par lot, freemium | Unité du code (`agencies.plan`) ; critiques de coût par utilisateur (Netty) | Moyenne | Questionnaire de prix et entretiens |
| Prix d’entrée | 39 € HT | 29 €, 49 € | Zone value-based de 24 à 47 € ; CRM à 79–89 € (tiers) | Moyenne | Van Westendorp (≥ 30 réponses) |
| Offre cœur | 79 € HT, mise en avant | 59 €, 99 € | 15 % de la valeur à 15 annonces par mois ; moins de 8 € par utilisateur | Faible à moyenne | Gabor-Granger : 59 € contre 79 € |
| Remise annuelle | −15 % | — | Donnée fournie par Timéo | Élevée | — |
| Essai et engagement | 30 jours sans carte, sans engagement | Freemium, engagement de 12 mois | Concurrent gratuit ; engagement de 12 mois reproché (Hektor) | Moyenne | Taux essai → client |
| Chiffres clés du site | 5 chiffres produit + 13 candidats par annonce (Manda S1 2026) | Estimation d’heures gagnées (non publiée) | Code + baromètre Manda | Élevée | — |
| Statut juridique | Micro-entreprise + SNEE | SASU | Chiffre d’affaires prévu bien sous 37 500 € (TVA) et 83 600 € | Moyenne | Expert-comptable |
| Pénalités de retard | 3 fois le taux légal (8,25 % au 2e semestre 2026) + 40 € | Taux plus élevé | Minimum légal B2B | Élevée | Juriste |
| Formulaire | Formspree, Web3Forms en alternative | Netlify Forms | 50 envois gratuits suffisent ; adresse masquée | Moyenne | Volume réel de demandes |
| Offre fondateurs | −30 % pendant 12 mois, 10 agences (non publiée) | Rabais à vie, fausse rareté | Échange contre retours et référence | Moyenne | Décision de Timéo |

## Index

**Études** (`docs/etudes/`) :
- `00-produit-reel.md` ;
- `01-marche.md` ;
- `02-concurrence.md` + `02-concurrence.csv` ;
- `03-clients-valeur.md` ;
- `04-pricing.md` ;
- `05-positionnement-chiffres-cles.md` ;
- `06-validation.md` ;
- `07-juridique.md` ;
- `08-funnel-demo.md` ;
- `10-contre-verification.md` ;
- `99-sources.md` (registre des sources et des hypothèses) ;
- `calculs.py` (calculs et contrôle site ↔ grille).

**Modifications du site** (commit « Phase 9 ») :

| Fichier | Section | Changement |
|---|---|---|
| `immopilot-site/index.html` | Tarifs (`#tarifs`) | Grille, mentions sous la grille |
| | JSON-LD (offres) | Mêmes prix |
| | Chiffres (`#chiffres`) | « 13 candidats par annonce » |
| | Actions (`#actions`) | « à venir » |
| | Bénéfices, Thème, Tri, FAQ | Reformulations conformes au code |
| `immopilot-site/legal.html` | CGV | Articles 3, 5, 6 et 7 |
| `immopilot-site/assets/css/main.css` | Tarifs | Couleur des prix (`.amount b`), alignement des listes (`.price ul`) |

## Registre

Sources (URL, date de consultation 2026-11-04) et hypothèses : voir `99-sources.md`.

## Ce que Timéo doit faire, dans l’ordre

| # | Action | Durée estimée |
|---|---|---|
| 1 | Lire et valider la grille et les décisions ci-dessus | 1 h |
| 2 | Mener 12 entretiens d’agences, puis envoyer le questionnaire de prix (`06`) | 2 à 3 semaines |
| 3 | Demander le statut d’étudiant-entrepreneur (Clermont Auvergne PEPITE), puis créer la micro-entreprise (vérifier BIC ou BNC et ACRE sur urssaf.fr) | 1 à 3 semaines |
| 4 | Créer `contact@` et `demo@immopilot.world`, puis le compte Formspree, et coller l’URL dans `action` | 1 h |
| 5 | Renseigner l’identité légale, l’hébergeur et le contact RGPD dans `legal.html` ; faire relire les CGV et la politique de confidentialité par un juriste | 1 à 2 semaines |
| 6 | Supabase de production en région UE ; signer les DPA ; tenir le registre des traitements ; devis d’assurance RC Pro | 2 à 4 h |
| 7 | Aligner `lib/plans.ts` et les Price IDs Stripe sur 39 / 79 € | 1 h |
| 8 | Développer l’export CSV et le tri par score, puis retirer les mentions « à venir » correspondantes | Selon le développement |

## Annuler

- **Tout ce travail** : `git checkout avant-etudes -- immopilot-site docs` (tag local), ou le commit `44a4692`.
- **Seulement le site** : `git revert` sur le commit « Phase 9 ».
