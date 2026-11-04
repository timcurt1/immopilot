# Phase 7 — Décisions juridiques et administratives (propositions argumentées)

> **À faire relire par un juriste ou un expert-comptable.** Ce ne sont pas des conseils d’avocat.

Les sources officielles (service-public.fr, urssaf.fr, impots.gouv.fr) n’ont pas pu être ouvertes depuis l’environnement. Les chiffres ci-dessous sont des `[FAIT — extrait]` concordants, à vérifier sur ces sites avant toute démarche.

## 1. Structure de démarrage

| Critère | Micro-entreprise | SASU / EURL |
|---|---|---|
| Plafond de chiffre d’affaires (services) | 83 600 € en 2026 (J1) | Aucun |
| Cotisations | Proportionnelles au chiffre d’affaires : 21,2 % en BIC services ou 25,6 % en BNC (J3). Rien à payer sans chiffre d’affaires | Fixes ou liées à la rémunération, avec expert-comptable (≈ 1 000 à 2 500 €/an `[HYPOTHÈSE]`) |
| TVA | Franchise en base jusqu’à 37 500 € (J2), avec la mention « TVA non applicable, art. 293 B du CGI » | Selon le régime |
| Protection du patrimoine | Patrimoine professionnel séparé par défaut depuis 2022 (statut EI) `[À VÉRIFIER]` | Responsabilité limitée aux apports |
| Crédibilité face aux agences | Suffisante pour un petit éditeur, à condition d’avoir des CGV propres | Meilleure perception, utile pour les réseaux |
| Coût et délai de création | Gratuit, en ligne (guichet INPI) | Frais d’annonce et de dépôt, statuts à rédiger |

**Recommandation : micro-entreprise**, sous ces conditions :
- activité de services rattachée au bon régime : BIC ou BNC, à confirmer avec l’URSSAF pour une activité d’édition de logiciel en SaaS ;
- passage en société dès qu’un associé, une levée de fonds ou un chiffre d’affaires approchant 37 500 € (TVA) est en vue ;
- dans le scénario central, environ 12 k€ d’ARR à 12 mois restent largement sous les deux seuils `[CALCUL]`.

**Confiance moyenne.** La décision finale appartient à Timéo.

**Statut étudiant.**
- **Statut national d’étudiant-entrepreneur (SNEE)** : candidature auprès de **Clermont Auvergne PEPITE** (porté par Clermont Auvergne INP d’après un document de 2021, à confirmer). Il maintient les droits étudiants et donne accès à un accompagnement et à des espaces de travail (J6). Il faut aussi vérifier les dispositifs propres à Clermont School of Business (incubateur) : `[NON TROUVÉ]`.
- **ACRE** : pour une création à partir du 01/07/2026, la réduction est ramenée à 25 %, et la demande doit être faite sous 60 jours (J4). L’éligibilité dépend de la situation (âge, statut) : à vérifier sur urssaf.fr.

## 2. À décider ou à créer avant la mise en ligne

| Élément | Proposition | Statut |
|---|---|---|
| Immatriculation, SIRET, mention TVA | Après création. Aucun numéro n’est inventé | `[À COMPLÉTER]` |
| Adresse publiée | Si c’est le domicile, une **domiciliation commerciale** permet de ne pas l’afficher | Décision de Timéo |
| E-mail professionnel | `contact@immopilot.world` et `demo@immopilot.world` **à créer** sur le domaine. Ils n’existent pas aujourd’hui et ne sont pas utilisés sur le site | Action |
| Hébergeur du site | Vercel, si le déploiement se fait là : 3 projets Vercel sont reliés au dépôt. Ses coordonnées légales sont à recopier depuis sa page légale officielle, non lisible ici | `[À COMPLÉTER]` |
| Hébergement de l’application | Supabase : choisir une **région UE** à la création du projet de production et l’indiquer dans la politique de confidentialité | Action |
| Sous-traitance RGPD (DPA) | ImmoPilot est sous-traitant des agences (article 28 du RGPD) ; signer les DPA de Supabase, Resend, Stripe et Anthropic, et proposer un DPA aux clients | Action |
| Registre des traitements | Deux traitements à documenter : prospects (formulaire de démo) et données clients traitées pour le compte des agences (sous-traitance) | Action |
| Cookies | Aucun traceur sur le site, donc pas de bandeau. À revoir si un outil de mesure est ajouté | Conforme aujourd’hui |
| Assurance RC Pro | Recommandée pour un éditeur de logiciel qui traite des données sensibles ; demander 2 devis | Action |
| CGV | Projet existant (`immopilot-site/legal.html`), à mettre à jour avec la grille de la Phase 4 | Fait en Phase 9 |
| Pénalités de retard | **Proposition : 3 fois le taux d’intérêt légal**, le minimum légal, soit 8,25 % au 2e semestre 2026 (J5), plus l’indemnité forfaitaire de 40 € | Proposé, à valider |
| Conservation des prospects | 3 ans après le dernier contact | Proposé, à valider |
| Plafond de responsabilité | Montant payé au cours des 12 derniers mois | Proposé, à valider |
