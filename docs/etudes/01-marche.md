# Phase 1 — Marché (TAM / SAM / SOM)

Sources : `99-sources.md`. Calculs : `calculs.py`. Date : 4 novembre 2026.

## 1. Combien de cibles ?

| Mesure | Valeur | Étiquette |
|---|---|---|
| Cartes « gestion immobilière » (fichier CCI) au 01/01/2025 | **15 437** (−176 sur un an) | [FAIT — extrait, recoupé] M1 |
| Cartes « transaction » | 42 221 | [FAIT — extrait] M1 |
| Entreprises 68.31Z « Agences immobilières » | 56 218 en 2016 ; inclut les agents commerciaux, donc sans rapport direct avec le nombre d’agences | [FAIT — extrait] M2 |
| Agences « physiques » | 30 000 à 32 000 | Estimation tierce, faible fiabilité (M3) |
| Bailleurs privés confiant la gestion à un professionnel | 35 % (données 2013) | [FAIT — extrait] M4 |

**Lecture.** La location est le cœur de cible. Le meilleur indicateur disponible est le nombre de **cartes G (gestion)** : un professionnel qui gère des locations pour le compte de tiers doit la détenir (loi Hoguet). Les agences qui ne font que de la transaction (carte T sans G) ne sont pas dans la cible principale.

**Limites.**
- Une carte correspond à une personne morale, pas à un établissement : un réseau de 10 agences peut n’avoir qu’une carte.
- La répartition indépendantes / réseaux et la répartition régionale sont `[NON TROUVÉ]`. Le comptage SIRENE direct (API officielle) a été bloqué par la politique réseau de l’environnement : à refaire sur annuaire-entreprises.data.gouv.fr, filtres NAF 68.31Z et 68.32A, département 63.

## 2. TAM / SAM / SOM

Prix moyen retenu (Phase 4) : ARPA (revenu moyen par agence) = 51 € HT/mois, soit **612 € HT/an** `[CALCUL]` (mix 70 % Essentiel à 39 € et 30 % Agence à 79 €).

| Niveau | Formule | Résultat |
|---|---|---|
| **TAM** : toutes les structures titulaires d’une carte G | 15 437 × 612 € | **≈ 9,4 M€/an** `[CALCUL]` |
| **SAM** : indépendantes et petits réseaux, hypothèse 50 / 60 / 70 % | 15 437 × 0,6 × 612 € | **≈ 5,7 M€/an** (4,7 à 6,6) `[CALCUL]` sur `[HYPOTHÈSE]` |
| **SOM 12 mois** : capacité d’une personne seule | 10 / 20 / 35 clients × 612 € | **≈ 6 k€ / 12 k€ / 21 k€ d’ARR**, soit 0,1 % à 0,4 % du SAM `[CALCUL]` |

**Pourquoi un SOM de 20 clients en scénario central** `[HYPOTHÈSE]` :
- Vente directe par le fondateur : environ 4 démonstrations par semaine, en parallèle des études.
- Environ 15 % de conversion démonstration → client, à mesurer (Phase 6).
- Cycle de vente estimé de 2 à 6 semaines.

Cela donne environ 2 clients par mois au rythme de croisière, soit environ 20 sur 12 mois en tenant compte de la montée en charge.

## 3. Tendances utiles pour le produit

| Tendance | Fait | Conséquence pour ImmoPilot |
|---|---|---|
| Liste limitative des pièces exigibles (ALUR, décret 2015-1437) | Amende jusqu’à 3 000 € (M6) | Argument de **conformité** : la check-list des pièces doit se limiter aux pièces autorisées. À vérifier dans le produit |
| Tension locative | 13 candidats par annonce (S1 2026), 41 à Paris, 43 à Nice ; délai médian 22 jours (M5) | Le volume de dossiers justifie l’outil, surtout en zone tendue. À Clermont, la tension est `[NON TROUVÉ]` |
| DPE : location interdite pour les G depuis 2025, les F en 2028 | Environ 600 000 logements G loués (M7) | Moins de biens à louer, donc des annonces plus disputées. Pas de fonction DPE dans ImmoPilot : hors périmètre |
| DossierFacile (service public gratuit, programme partenaires) | C9 | Concurrent gratuit pour la collecte, mais aussi une **intégration possible** (import d’un dossier DossierFacile), à mettre dans la feuille de route |
| IA dans les logiciels métier | Apimo propose une offre « CRM AI » (C3) | L’IA seule ne différencie plus longtemps : il faut la vendre sur un résultat concret (synthèse, brouillon de réponse, compte rendu) |
| Recul du marché des agences | Fermetures et baisse des cartes (M1, M3) | Agences sous pression sur les coûts : prix d’entrée bas, aucun engagement |
