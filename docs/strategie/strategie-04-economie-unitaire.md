# Phase 4 — Économie unitaire

Calculs : `strategie-modele-chiffre.xlsx`, onglets `Economie_unitaire` et `Capacite`. Toutes les hypothèses se modifient dans l'onglet `Hypotheses`.

## 1. Coût d'un appel

| Poste | Valeur | Étiquette |
|---|---|---|
| Vapi, frais de plateforme | 0,05 $/min | [Source, extrait docs.vapi.ai] |
| ElevenLabs Agents | 0,08 $/min (LLM et téléphonie en plus) | [Source, extrait elevenlabs.io] |
| Total Vapi observé | 0,15 à 0,40 $/min selon la stack | [Source, extraits CloudTalk (30/07/2026), happyrobot.ai] |
| Zadarma : numéro fixe français | ≈ 2 $/mois, appels entrants gratuits | [Source, extrait zadarma.com] |
| Coût retenu, stack actuelle | **0,15 €/min** (de 0,10 à 0,35 €) | [Estimation] |
| Coût retenu, version produit hébergée dans l'UE | **0,22 €/min** (de 0,12 à 0,40 €) ; Famulor affiche dès 0,11 €/min tout compris, à Francfort | [Estimation] ; [Source, extrait famulor.io] |
| Durée d'un appel | 2 min (de 1,5 à 3 min) | [Estimation] |
| **Coût d'un appel** | **≈ 0,30 €** en service, ≈ 0,44 € en produit | [Calcul] |

À ne pas oublier : Vapi facture **2 000 $/mois** son option de conformité santé américaine (HIPAA) [Source, extrait vapi.ai]. Cette option ne vaut pas HDS. Elle montre surtout qu'une offre « santé conforme » coûte cher chez ce fournisseur.

## 2. Marge par cabinet à 149 € HT par mois

[Calcul, onglet `Economie_unitaire`]

| Appels traités par mois | 50 | 100 | 200 | 500 |
|---|---|---|---|---|
| Coût des appels (service) | 15 € | 30 € | 60 € | 150 € |
| Marge brute (service) | 132 € (89 %) | 117 € (79 %) | 87 € (59 %) | −3 € (−2 %) |
| Marge après 1 h de suivi valorisée à 20 € | 112 € | 97 € | 67 € | −23 € |
| Marge brute (produit) | 125 € (84 %) | 103 € (69 %) | 59 € (40 %) | −73 € |
| Prix équivalent par appel | 2,98 € | 1,49 € | 0,74 € | 0,30 € |

**Lecture** :
1. Le forfait est rentable tant que l'agent traite moins de 200 appels par mois. Au-delà, il faut un plafond ou un prix par appel (phase 8).
2. Face au télésecrétariat (0,50 à 1,20 € par appel [Source, extraits lonasante.com, callsens.fr]), 149 € ne sont compétitifs qu'à partir d'environ 150 appels par mois. Or ce sont les cabinets qui en reçoivent le plus qui coûtent le plus cher à servir.

## 3. Temps, acquisition, durée de vie

| Indicateur | Valeur | Étiquette |
|---|---|---|
| Installation | 5,5 h aujourd'hui ; 2 h après automatisation | [Projet] ; [Estimation] |
| Suivi | 1 h par mois et par cabinet (service) ; 0,2 h (produit) | [Estimation] |
| Acquisition | 15 h par client gagné (de 8 à 40 h), soit 300 € de temps | [Estimation] : aucune donnée réelle, 0 client pour 11 entretiens |
| Résiliation | 3 %/mois (de 2 à 6 %) | [Source, extraits] SaaS PME : 2,5 à 5 %/mois |
| Durée de vie | ≈ 33 mois | [Calcul] 1/0,03 |
| Valeur vie client (marge brute) | ≈ 3 900 € | [Calcul] |
| Retour sur acquisition + installation | ≈ 3,5 mois ; rapport valeur vie / coût ≈ 9,5x | [Calcul] |

Ces ratios sont bons **sur le papier**. Le chiffre le plus fragile est le temps d'acquisition, totalement inconnu.

## 4. À partir de combien de cabinets le service fait exploser notre temps ?

Temps disponible : 20 h × 4,33 = 86,6 h/mois, dont 45 % pour la livraison, soit **39 h** [Calcul ; part de 45 % = Hypothèse].

| Nouveaux cabinets par mois | Plafond en service (5,5 h d'installation, 1 h de suivi) | Installation automatisée (2 h) | Produit (2 h + 0,2 h de suivi) |
|---|---|---|---|
| 0 | 39 | 39 | 195 |
| 1 | 33 | 37 | 185 |
| 2 | 28 | 35 | 175 |
| 3 | 22 | 33 | 165 |
| 4 | 17 | 31 | 155 |

L'ancien plan prévoyait environ 5 cabinets pour 5 h par semaine. Avec 20 h par semaine à deux, le plafond se situe **entre 17 et 33 cabinets** selon le rythme de signature. À 149 €, cela fait 2 500 à 5 000 € de revenu mensuel. Dans le scénario central, la capacité est dépassée au **mois 25** [Calcul, onglet `Scenarios`].

## 5. Ce qu'il faut automatiser, et dans quel ordre

| Ordre | Quoi | Gain | Seuil de déclenchement |
|---|---|---|---|
| 1 | **Modèle d'agent unique** et formulaire d'accueil (horaires, motifs, consignes du cabinet), pour générer la configuration au lieu de l'écrire | Installation de 5,5 h à environ 2 h | Dès le 2e cabinet |
| 2 | **Compte rendu du matin automatique** (e-mail Resend envoyé à partir des transcriptions) | Suivi ÷ 2 ; le livrable visible devient gratuit à produire | Dès le 1er cabinet réel |
| 3 | **Contrôle qualité automatique** des appels : une IA note chaque transcription et signale les appels ratés | Suivi de 1 h à 0,3 h | À partir de 5 cabinets |
| 4 | **Guides de renvoi d'appel par opérateur** (Orange, SFR, Free Pro, standards) | Installation sans déplacement | À partir de 5 cabinets |
| 5 | **Prélèvement SEPA** et facturation automatique (Stripe ou GoCardless, à comparer) | Administration quasi nulle | Au 1er euro facturé |
| 6 | **Surveillance** : alerte si un numéro ne répond plus ou si le taux d'échec monte | Évite la panne silencieuse, risque n° 1 de résiliation [Supposé] | À partir de 10 cabinets |
| 7 | **Hébergement UE / HDS** de toute la chaîne voix (phase 10) | Rend le produit vendable à grande échelle en santé | Avant 20 cabinets de santé, ou dès le 1er si un juriste l'exige |

Pour tenir **20 cabinets** : étapes 1 à 5. Pour **50** : étapes 1 à 7, et une personne à mi-temps pour la vente ou le support. Pour **100** : c'est un produit (phase 5).

## Fin de phase 4

- **Appris** : la marge est bonne à faible volume, mais elle s'effondre précisément chez les cabinets qui ont le plus besoin du service.
- **Ce qui change** : il faut un plafond d'appels dans le forfait, ou un prix au volume. Et l'automatisation n° 1 (le modèle d'agent) doit passer avant toute prospection supplémentaire.
- **Plus grosse incertitude** : le nombre réel d'appels par cabinet, et le temps réel d'acquisition d'un client.
- **Meilleure objection** : ces marges supposent une stack non conforme HDS. Si la conformité impose une stack UE certifiée, le coût par minute peut doubler et le suivi s'alourdir. Ce qui me ferait changer d'avis : un devis réel d'une stack UE certifiée à moins de 0,20 €/min.
