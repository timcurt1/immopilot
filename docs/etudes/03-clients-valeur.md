# Phase 3 — Clients, segments et proposition de valeur

## 1. Segments

| Segment | Critères mesurables | Intérêt | Difficulté |
|---|---|---|---|
| **S1 — Petite agence indépendante qui loue** (cible de lancement) | 1 à 5 personnes, titulaire d’une carte G, 4 à 15 mises en location par mois, pas de service location dédié | Le gérant décide seul. Les douleurs sont fortes (il fait tout lui-même). Peu d’intégrations attendues | Budget serré, peur du changement |
| S2 — Agence de gestion moyenne | 6 à 15 personnes, 15 à 40 mises en location par mois, service location dédié | Valeur élevée (offre Agence) | Exige des intégrations au logiciel métier, décision à plusieurs |
| S3 — Réseau local, 2 à 5 agences | Plusieurs points de vente | Revenu par client élevé | Cycle long, besoins de consolidation que le produit n’a pas encore |

**Choix : S1 en Auvergne-Rhône-Alpes, en commençant par Clermont-Ferrand.**
- **Pourquoi S1** : un seul décideur, et les fonctions actuelles suffisent sans intégration.
- **Pourquoi Clermont** : vente directe en personne possible, et l’expérience du fondateur en agence (stage chez Foncia) donne crédibilité et vocabulaire.
- **Confiance moyenne**, à valider par les entretiens de la Phase 6.

## 2. Persona décisionnel (S1)

- **Qui décide et paie** : le ou la gérant(e), souvent aussi négociateur.
- **Qui utilise** : le gérant et 1 ou 2 collaborateurs ; l’assistant(e) location s’il y en a un.
- **Déclencheurs** : un pic de candidatures (rentrée, zone tendue), une erreur ou un oubli coûteux (candidat sans réponse, pièce non conforme demandée), l’arrivée d’un nouveau collaborateur.
- **Freins** :
  1. Peur de changer et temps de formation.
  2. Ressaisie si l’outil n’est pas relié au logiciel métier.
  3. RGPD : données sensibles des candidats.
  4. Crédibilité d’un éditeur d’une seule personne.
  5. Coût qui s’ajoute au logiciel existant.

## 3. Valeur économique (méthode transparente)

**Formule** : `heures gagnées par mois = annonces × candidats par annonce × minutes gagnées par candidature / 60`. On valorise ensuite au coût horaire chargé (calculs dans `calculs.py`).

| Paramètre | Basse | Centrale | Haute | Étiquette |
|---|---|---|---|---|
| Annonces de location par mois | 4 | 8 | 15 | `[HYPOTHÈSE]` |
| Candidats par annonce | 12,5 | 14,75 | 17 | `[FAIT]` Manda S1 et S2 2025 (13 au S1 2026) |
| Minutes gagnées par candidature | 3 | 6 | 10 | `[HYPOTHÈSE]` |
| Coût horaire chargé | 16 € | 20 € | 25 € | `[HYPOTHÈSE]`, borne basse = SMIC (`[FAIT]` J7) × 1,30 |
| **Heures gagnées par mois** | **2,5 h** | **11,8 h** | **42,5 h** | `[CALCUL]` |
| **Valeur par mois** | **40 €** | **236 €** | **1 062 €** | `[CALCUL]` |
| Valeur par an | 480 € | 2 832 € | 12 750 € | `[CALCUL]` |

**Plafond « value-based »** (10 à 20 % de la valeur, scénario central) : **24 à 47 € HT par mois** `[CALCUL]`.
- L’offre d’entrée doit se situer dans cette zone.
- Pour une agence qui publie 15 annonces par mois (scénario haut), même à 6 minutes gagnées par candidature, la valeur atteint 510 €/mois : 79 € en représentent 15 % `[CALCUL]`. Cela justifie l’offre Agence pour ces volumes.

**Ce que la valeur n’inclut pas** et qu’il faudra mesurer :
- les loyers gagnés par une relocation plus rapide (un jour de vacance de moins = 1/30 du loyer pour le bailleur, et des honoraires encaissés plus tôt) ;
- le risque d’amende évité (M6).

## 4. Proposition de valeur

**Phrase principale** : « Chaque candidature arrive complète, triée et suivie : vous louez plus vite sans y passer vos journées. »

Trois preuves, toutes des fonctions réelles :
1. **Dossiers complets** : le candidat dépose lui-même ses pièces dans son portail, et l’IA les classe (`aiClassifyDocument`).
2. **Le bon dossier d’abord** : un score par candidature et une synthèse IA du dossier (`aiSummarizeDossier`).
3. **Personne n’est oublié** : statuts, tâches assignées, réponses rédigées par l’IA et envoyées depuis la fiche (`aiDraftMessage`, `sendMessageToCandidate`).
