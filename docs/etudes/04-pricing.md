# Phase 4 — Pricing (décisions chiffrées)

**Confiance globale : moyenne.**
- Le prix repose sur un benchmark tiers, une valeur estimée et les coûts réels.
- Aucune réponse client n’existe encore : le questionnaire Van Westendorp + Gabor-Granger (Phase 6) est prêt, mais sans réponses.

## 1. Grille finale

| | **Essentiel** | **Agence** ★ (mise en avant) | **Réseau** |
|---|---|---|---|
| Prix mensuel | **39 € HT / mois / agence** | **79 € HT / mois / agence** | Sur devis |
| En annuel (−15 %) | 33,15 € HT/mois, soit 397,80 € HT/an | 67,15 € HT/mois, soit 805,80 € HT/an | Sur devis |
| Pour qui | Petite agence, jusqu’à environ 8 mises en location par mois | Agence avec un service location, au-delà de 8 mises en location par mois | Plusieurs agences |
| Utilisateurs | Jusqu’à 3 | Jusqu’à 10 | Sur mesure |
| Biens actifs | Jusqu’à 10 | Jusqu’à 50 | Sur mesure |
| Inclus | Candidatures et score, formulaire de candidature par bien, portail candidat, pièces classées par IA, modèles de messages et e-mails aux candidats, recherche ⌘K | Tout Essentiel + synthèse IA des dossiers, brouillons IA, qualification IA des prospects, visites et comptes rendus, tâches d’équipe, pilotage (statistiques), assistant IA | Tout Agence + accompagnement au déploiement |

**Autres conditions.**
- **Essai** : 30 jours, sans carte bancaire, avec mise en route accompagnée. Le code ne contient pas de logique d’essai : l’essai est donc géré à la main (compte créé par le fondateur). C’est cohérent avec une vente directe.
- **Engagement** : aucun, résiliable chaque mois.
- **Frais de mise en place** : aucun.
- **Paiement** : carte bancaire, via Stripe (présent dans le code). Le prélèvement SEPA est possible chez Stripe (0,35 € par prélèvement, K5) mais n’est pas configuré : à ajouter plus tard.

**D’où viennent les limites.** 3 utilisateurs / 10 biens et 10 utilisateurs / 50 biens sont les limites déjà codées dans `lib/plans.ts:9-17`. Elles sont reprises telles quelles pour la cohérence.

**À aligner avant toute facturation** : `lib/plans.ts` affiche encore les prix d’exemple 49 / 129 / 299 € avec les libellés Starter / Pro / Agence. Il faut aussi créer les Price IDs Stripe correspondants.

## 2. Justification de chaque prix

**39 € (Essentiel)**
- Dans la zone value-based du scénario central, 24 à 47 € (`03`).
- Moitié d’un CRM d’entrée de gamme (79 à 89 € chez les tiers, C2 à C4), donc acceptable en complément d’un CRM.
- Assez haut pour ne pas paraître « gratuit-like » face à GreenLoc, et pour couvrir les coûts : la marge brute hors coûts fixes est de 88,9 % `[CALCUL]`.

**79 € (Agence)**
- Cible le volume élevé : 15 % de la valeur d’une agence à 15 annonces par mois (`03`).
- Ramené à 10 utilisateurs, cela fait moins de 8 € par utilisateur, contre « 89 € par utilisateur » chez Netty (C4). C’est l’argument d’ancrage.
- 79 est un prix psychologique (sous le seuil de 80) déjà pratiqué dans le secteur (Hektor « dès 79 € », C2).

**Réseau sur devis**
- Les besoins multi-agences (consolidation, droits par agence) ne sont pas encore développés : afficher un prix serait promettre ce qui n’existe pas.

**Unité « par agence »**
- C’est l’unité de l’abonnement dans le code (`agencies.plan`, `supabase/schema.sql:3`, quantité 1 au paiement).
- Elle n’incite pas à limiter les comptes, ce qui fait adopter l’outil par toute l’équipe.
- Elle est simple à comprendre.

**Offre mise en avant : Agence**
- C’est l’ancre (« recommandée pour un service location »), et Essentiel paraît accessible à côté.
- **Risque** : le segment de lancement (S1) achètera surtout Essentiel, ce qui est cohérent avec le mix 70/30 de `calculs.py`.

## 3. Alternatives écartées

1. **Par utilisateur (par exemple 15 € par utilisateur et par mois)** : freine l’adoption dans les petites équipes, et c’est l’unité de Netty, qui reçoit justement des critiques de coût (C4). Écartée.
2. **Gratuit + payant (freemium, comme GreenLoc)** : pour un fondateur seul, cela crée des coûts IA et du support sans revenu, et brouille la valeur. Écarté au profit d’un essai de 30 jours.
3. **Par lot ou par candidature** : la valeur est liée au volume, mais la facture devient imprévisible pour l’agence, et ImmoPilot ne gère pas de lots. Écarté.

## 4. Coûts et marge

Tous les détails sont dans `calculs.py`.

- **Coûts fixes** : Supabase Pro 25 $ + Vercel Pro 20 $, soit environ **40,50 €/mois** (K2, K3). On ajoute Resend Pro 20 $ (≈ 18 €) au-delà de 3 000 e-mails par mois (K4).
- **Coût variable par agence** :
  - IA : 0,16 € avec Haiku, 3,24 € avec Sonnet, sur l’hypothèse de 300 appels par mois (K1) ;
  - Stripe : 1,5 % + 0,25 € + Billing 0,7 % (K5), soit 1,11 € (Essentiel) et 1,99 € (Agence).
- **Marge brute** après coûts fixes : 75 % à 5 clients, 83 % à 10, **85 % à 20** `[CALCUL]`. C’est au-dessus de la médiane logicielle de 80 % (K6). Ces chiffres excluent le temps du fondateur (support), qui n’est pas encore une dépense.
- **Point mort technique** : **2 clients** couvrent les abonnements techniques (marge positive dès le 1er : +5,89 €) `[CALCUL]`.

## 5. Scénarios de MRR

ARPA = 51 € HT par mois.

| Scénario | Clients à 3 / 6 / 12 mois | MRR à 3 / 6 / 12 mois |
|---|---|---|
| Prudent | 2 / 5 / 10 | 102 € / 255 € / **510 €** |
| **Central** | 4 / 10 / 20 | 204 € / 510 € / **1 020 €** |
| Ambitieux | 6 / 15 / 35 | 306 € / 765 € / **1 785 €** |

**Sensibilité à 12 mois (central).**
- −20 % sur le prix : 816 € de MRR ; il faut 25 clients pour atteindre 1 020 €.
- +20 % : 1 224 € ; 16,7 clients suffisent.
- L’effet du prix sur le **volume** est inconnu tant que le questionnaire Van Westendorp n’a pas été rempli.

**Lecture.** Même en scénario ambitieux, ImmoPilot ne paie pas un salaire à 12 mois. C’est un projet à faire croître pendant les études. Le SNEE (statut national d’étudiant-entrepreneur) et la micro-entreprise sont adaptés (`07`).

## 6. Offre « fondateurs » (recommandée, non publiée sur le site)

**Conditions proposées.**
- Les **10 premières agences** obtiennent **−30 % pendant 12 mois** (Essentiel à 27,30 € HT, Agence à 55,30 € HT) `[CALCUL]`.
- En échange : un entretien de retour d’expérience par mois, et l’accord pour être cité comme client.

**Règles.**
- Aucune fausse rareté : n’afficher le nombre de places restantes que s’il est tenu à jour à la main.
- Elle n’est pas encore sur le site, puisque c’est une décision à prendre par Timéo : voir `00-synthese.md`.
