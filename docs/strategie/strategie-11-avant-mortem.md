# Phase 11 — Avant-mortem

Exercice : nous sommes en mai 2028, Imohtep a échoué. Pourquoi ?

## 1. Les dix causes les plus probables

Probabilité et gravité notées de 1 à 5 [Estimation]. Classement par produit probabilité × gravité.

| Rang | Cause | Prob. | Grav. | Signal d'alerte précoce | Parade |
|---|---|---|---|---|---|
| 1 | **Abandon avant le test décisif**, comme pour les quatre idées précédentes (phase 1) | 4 | 5 | Une nouvelle idée « plus prometteuse » apparaît avant le 5 décembre ; les expériences E0 à E3 ne sont pas faites | Critères d'arrêt datés (§ 2) ; interdiction de lancer une nouvelle idée avant une porte de décision |
| 2 | **Doctolib Assistant** est déjà chez nos cabinets, ou y arrive | 4 | 5 | Au moins 3 cabinets sur 10 l'ont reçu en proposition (E0) | Viser les cabinets sans Doctolib, un usage non couvert, ou une autre verticale |
| 3 | **La douleur est trop faible** : peu d'appels non décrochés, l'hypothèse des annulations est fausse | 3 | 5 | E1 : moins de 5 appels non décrochés par semaine ; E2 : au plus 1 cabinet sur 10 | Changer de douleur (annulations) ou de verticale |
| 4 | **Le temps fond** : examens, stages, et les 20 h deviennent 5 h | 4 | 4 | Tableau du dimanche : moins de 12 h à deux pendant deux semaines | Plan réduit : garder E0 à E3 seulement ; ne jamais signer plus de cabinets que le plafond de la phase 4 |
| 5 | **Blocage HDS / RGPD** : aucun cabinet ne peut légalement brancher la stack actuelle | 3 | 4 | Avis du juriste défavorable | Stack UE certifiée (coût plus élevé), revente d'un outil certifié, ou verticale hors santé |
| 6 | **Désaccord entre associés** ou départ de l'un des deux | 3 | 4 | Écart durable des heures dans le journal des contributions ; aucune note signée au premier euro | Journal dès maintenant ; note d'une page avant le premier euro (phase 9) |
| 7 | **Prix non défendable** face au télésecrétariat et à Doctolib | 3 | 3 | Test de prix : 4 cabinets sur 5 jugent 149 € trop cher | Prix par appel, plafond, ou offre plus étroite et moins chère |
| 8 | **Qualité de l'agent** : erreurs, latence, panne silencieuse, donc résiliation | 3 | 3 | Moins de 90 % d'appels réussis dans le tableau du dimanche | Contrôle qualité automatique, alertes (phase 4, étapes 3 et 6) |
| 9 | **Incident d'urgence mal orienté** | 1 | 5 | Un appel qui mentionne une douleur ou un saignement n'a pas déclenché la phrase « appelez le 15 » | Règle « jamais de triage », testée à blanc avant chaque mise en service |
| 10 | **Dispersion** : ImmoPilot, une 2e verticale et Imohtep en parallèle | 3 | 3 | Plus de 20 % des heures sur autre chose qu'Imohtep avant la porte du 19 décembre | Une seule idée active jusqu'au 19 décembre |

## 2. Critères d'abandon et de changement de cap

| Idée | Critère | Date | Chiffre | Action si atteint |
|---|---|---|---|---|
| **Imohtep, angle « appels manqués », dentaire** | Relevé E1 sur au moins 3 cabinets | 5 décembre 2026 | Moyenne inférieure à 5 appels non décrochés par semaine et par cabinet | Abandonner l'angle « appels manqués » en dentaire |
| **Imohtep, angle « annulations »** | Question E2 | 21 novembre 2026 | Au plus 1 cabinet sur 10 cite un patient qui voulait annuler sans pouvoir joindre le cabinet | Abandonner l'hypothèse centrale |
| **Imohtep face à Doctolib** | E0 | 14 novembre 2026 | Au moins 5 cabinets sur 10 utilisent déjà l'assistant Doctolib et en sont satisfaits | Sortir du dentaire « Doctolib » : décision à soumettre (cabinets sans Doctolib, ou 2e verticale) |
| **Imohtep dans son ensemble** | Engagements écrits (renvoi à blanc accepté ou pilote signé) | 31 janvier 2027 | 0 engagement écrit | Arrêter Imohtep dentaire ; ne garder que la 2e verticale si E9 est positive ; sinon pause et bilan |
| **Imohtep, passage à l'échelle** | Cabinets payants | 30 juin 2027 | Moins de 5 cabinets payants | Rester une petite activité (trajectoire a) ou arrêter ; ne pas lever |
| **Trajectoire « plusieurs millions »** | Revenu récurrent | 31 décembre 2027 | Moins de 3 000 €/mois et croissance inférieure à 10 %/mois sur 6 mois | Abandonner l'objectif « plusieurs millions » pour ce projet |
| **ImmoPilot** | Décision explicite | 14 novembre 2026 | Aucune heure prévue dans le plan à 90 jours | Archiver (tag git) ; réutiliser seulement le code utile à Imohtep |
| **Agence B2B pour l'immobilier** | — | — | Remplacée par Imohtep | Rouvrir seulement comme 2e verticale d'Imohtep, si E9 est positive |
| **Imhotep courriers** | — | — | Abandonnée le 14 octobre | Ne pas rouvrir ; la douleur n'était pas ressentie dans la journée |
| **Projet de l'incubateur** | — | — | Sans client nommable | Le recycler comme récit de mission (« la ligne qui répond pour les petites structures ») dans le dossier SNEE ou SquareLab, pas comme produit |

## Fin de phase 11

- **Appris** : la cause d'échec la plus probable n'est pas le marché, c'est notre propre schéma d'abandon.
- **Ce qui change** : les critères sont datés et chiffrés, et une seule idée reste active jusqu'au 19 décembre.
- **Plus grosse incertitude** : la tenue des 20 h par semaine pendant les examens.
- **Meilleure objection** : des critères trop stricts peuvent tuer une idée juste à cause d'un échantillon de 3 à 10 cabinets. C'est pour cela que la plupart déclenchent un changement de cap, pas un arrêt.
