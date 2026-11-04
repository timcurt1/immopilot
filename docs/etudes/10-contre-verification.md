# Phase 10 — Contre-vérification (sans complaisance)

## 1. Audit des sources (12 sources critiques revérifiées par une requête différente)

| Donnée | Résultat de l’audit | Action |
|---|---|---|
| Cartes « gestion » CCI : 15 437 | Confirmé (Immo Matin), recoupé par Parcours Immo : 15 430, date différente. La somme des baisses par catégorie ne correspond pas au titre de l’article (écart non résolu) | Gardé : ordre de grandeur fiable, détail fragile |
| Manda : 17 candidats par annonce au 2e semestre 2025 | Confirmé sur manda.fr | Gardé |
| Manda : candidats au 1er semestre 2025 | **Contradiction** : 12,5 (Journal de l’Agence) contre 13 (Manda S2) | Les deux sont signalés ; le site utilise le chiffre le plus récent |
| Manda : 1er semestre 2026 | **Nouveau** : 13 candidats par annonce, délai médian de 22 jours | **Corrigé** : c’est ce chiffre qui figure sur le site, pas l’ancien |
| Franchise TVA 37 500 € | Confirmé ; baisse à 25 000 € abandonnée (plusieurs sources) | Gardé |
| Plafond micro 83 600 € | Concordant entre 3 sources ; 77 700 € était le plafond de 2025 | Gardé |
| Taux d’intérêt légal professionnel S2 2026 : 2,75 % | Confirmé (5 sources) | Gardé |
| GreenLoc : gratuit, plus de 600 agences | Confirmé, mais par un annuaire tiers ; pas de scoring trouvé | Gardé, avec la mention « annuaire tiers » |
| Supabase Pro 25 $ | Concordant ; doute sur la facturation par organisation ou par projet | Gardé ; vérifier avant la production |
| Resend : gratuit 3 000/mois, Pro 20 $ | Concordant ; doute sur le palier de 100 000 e-mails (sans incidence) | Gardé |
| Stripe 1,5 % + 0,25 € et Billing 0,7 % | Concordant ; le SEPA à 0,7 % évoqué dans une requête est faux (c’est 0,35 € par prélèvement) | Corrigé dans `99-sources` |
| Anthropic : Haiku et Sonnet | Page officielle lue | Gardé |

## 2. Cohérence des calculs

`python3 docs/etudes/calculs.py` recalcule tout et **vérifie par assertion** que les prix du site (`data-price-month` = 39 et 79) et la remise (15 %) correspondent à la grille. Le contrôle est OK au 4 novembre 2026. Les montants affichés dans le navigateur (33,15 € / 397,80 € et 67,15 € / 805,80 €) correspondent au script, dans Chromium et dans WebKit.

## 3. Avocat du diable

| Décision | Meilleur argument contre | La décision tient-elle ? |
|---|---|---|
| Segment : petite agence indépendante à Clermont | Peu de volume par agence (valeur basse : 40 €/mois) et tension locative de Clermont inconnue, alors que Paris et Nice dépassent 40 candidats par annonce | **Oui, sous condition.** C’est le segment accessible en personne. Si plus de la moitié des entretiens montrent moins de 4 mises en location par mois, viser les agences de gestion moyennes (S2) ou une zone plus tendue (Lyon) |
| Essentiel à 39 € | GreenLoc est gratuit pour la collecte | **Oui.** ImmoPilot ne se vend pas sur la collecte mais sur l’IA, les visites et le suivi. Si les agences jugent la collecte gratuite suffisante, c’est le critère NO-GO de la Phase 6, pas un problème de prix |
| Agence à 79 € | Prix égal au prix d’appel d’un CRM complet (Hektor « dès 79 € ») pour un outil plus étroit | **Fragile.** Justifié pour les volumes élevés seulement. Tester 59 € dans le questionnaire Gabor-Granger (question 7) |
| Facturation par agence | Une agence de 10 personnes paie comme une agence de 3 dans l’offre Agence | **Oui.** Les plafonds d’utilisateurs (3 et 10) font office d’échelons, et c’est l’unité du code |
| Offre Agence mise en avant | Le segment de lancement achètera Essentiel | **Oui.** Mettre une offre en avant sert d’ancrage, pas forcément de volume |
| Essai de 30 jours sans carte | Peu de conversion automatique | **Oui.** En vente directe, l’essai est accompagné : la conversion se fait au rendez-vous de fin d’essai |

## 4. Risques classés

| Risque | Gravité | Mitigation |
|---|---|---|
| **Produit** : écart entre la promesse et le code (export CSV, actions groupées, thème sombre de l’app, tri) | Élevée, corrigée sur le site | Les éléments sont marqués « à venir ». Priorités à développer : 1) export CSV (réversibilité), 2) tri par score, 3) actions groupées |
| **Produit** : aucune intégration au logiciel métier, ressaisie des biens | Élevée | Import CSV des biens, puis connecteur au CRM le plus cité en entretien |
| **Marché** : concurrence gratuite (GreenLoc, DossierFacile) | Élevée | Différenciation par l’IA et les visites ; envisager un import DossierFacile |
| **Légal** : données sensibles des candidats, sous-traitance RGPD | Élevée | Région UE pour Supabase, DPA signés, registre, CGV relues (`07`) |
| **Légal** : la check-list des pièces doit rester dans la liste du décret 2015-1437 | Moyenne | Auditer les types de pièces proposés par l’app |
| **Exécution solo** : disponibilité pendant les études, support | Élevée | Promettre peu (aucun délai affiché), viser 20 clients, regrouper les démos |
| **Exécution** : `lib/plans.ts` et Stripe pas encore alignés sur la grille | Moyenne | À faire avant la première facture |

## 5. Ce qui reste non vérifié (et ce que seuls des entretiens peuvent confirmer)

**Non vérifié faute d’accès aux pages officielles** (politique réseau) :
- prix officiels des concurrents (aucun ne publie de grille complète) ;
- pages URSSAF et service-public ;
- avis Capterra et G2 ;
- comptage SIRENE par département.

**Seuls des entretiens peuvent confirmer** :
- le nombre de mises en location par mois ;
- les minutes passées par candidature ;
- le budget logiciel ;
- la fourchette de prix acceptable (Van Westendorp) ;
- la valeur perçue de l’IA ;
- l’usage de GreenLoc et DossierFacile à Clermont.

**Non mesuré** : la tension locative à Clermont-Ferrand, et la part d’agences indépendantes parmi les titulaires de la carte G.
