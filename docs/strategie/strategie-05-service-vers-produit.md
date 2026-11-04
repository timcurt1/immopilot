# Phase 5 — Du service au produit

## 1. Architecture de passage

| Brique | Aujourd'hui (agence) | Demain (produit répétable) | Ce qui reste humain |
|---|---|---|---|
| Vente | Rendez-vous au cabinet, à deux | Relevé d'une semaine proposé à distance, démonstration par l'écoute, signature électronique | Le premier rendez-vous avec le titulaire, tant qu'on vend en local |
| Installation | 5,5 h, configuration écrite à la main | Formulaire de 10 minutes → configuration générée → guide de renvoi par opérateur | La vérification du premier appel réel |
| Agent vocal | Vapi + ElevenLabs, réglé par cabinet | Un modèle par métier, paramétré par cabinet (horaires, motifs, consignes) | Les consignes médicales : on renvoie vers le cabinet ou vers le 15, l'agent ne trie jamais |
| Sortie | E-mail au secrétariat | **Compte rendu du matin** + alerte immédiate pour les annulations du jour | — |
| Suivi | Écoute manuelle des appels | Notation automatique des transcriptions, alertes | L'examen hebdomadaire des appels signalés |
| Facturation | Aucune | Prélèvement SEPA automatique | — |
| **Ce qui disparaît** | Le mode « agenda » sur Google Agenda (phase 0, n° 3), les déplacements pour installer, le réglage à la main | | |

## 2. Quand faut-il une interface, des intégrations, la certification HDS ?

| Élément | Devient indispensable quand… | Signal client qui le justifie | Coût | Étiquette |
|---|---|---|---|---|
| **Interface** (historique des appels, réglages) | Plus de 20 cabinets, ou quand le suivi par e-mail dépasse 0,5 h par cabinet et par mois | Au moins 3 titulaires demandent à « revoir un appel » ou à changer eux-mêmes leurs horaires | 20 à 40 h de développement en réutilisant l'application ImmoPilot (authentification, Supabase, Resend) | [Estimation] |
| **Intégration à l'agenda** (Logosw/Julie, devenus Logjia en janvier 2026 ; Veasy de Cegedim, plus de 10 000 praticiens revendiqués) | Au moins 30 % des prospects refusent à cause de la double saisie | Refus motivés notés dans la feuille d'hypothèses | Inconnu : aucune API publique trouvée. Ainora et Tandem annoncent des intégrations avec LOGOSw | [Source, extraits tandemhealth.ai, ainora.lt] ; coût NON TROUVÉ |
| **Hébergement HDS** | **Dès le premier patient réel**, si un juriste confirme que transcriptions et enregistrements sont des données de santé hébergées pour le compte du cabinet | Pas un signal client : une obligation | Certification propre : 20 000 à 80 000 € sur 3 ans et 6 à 9 mois de projet (sources non officielles). Alternative : s'appuyer sur des sous-traitants certifiés et stocker tout dans l'EEE | [Source, extraits legiscope.com, esante.gouv.fr] |

**Point de rupture réglementaire** : l'exigence 28 du référentiel HDS v2 impose un stockage dans l'EEE, sous-traitants compris. Tous les certificats doivent être en v2 depuis le 16 mai 2026 [Source, extraits esante.gouv.fr]. Une stack Vapi + ElevenLabs aux États-Unis qui conserve des transcriptions est probablement **incompatible** [Supposé, à faire trancher par un juriste].

## 3. Trois trajectoires comparées

Revenu récurrent annualisé, en euros. [Calcul] à partir de l'onglet `Scenarios`, avec des corrections [Estimation] expliquées dans la colonne « Base ».

| Trajectoire | Scénario | Mois 12 | Mois 24 | Mois 36 | Base |
|---|---|---|---|---|---|
| **(a) Agence rentable, reste petite** (dentaire puis proximité, Clermont et environs) | Prudent | 2 700 | 6 900 | 14 700 | Modèle, scénario prudent |
| | Central | 13 700 | 46 000 | **≈ 59 000** | Modèle, plafonné à environ 33 cabinets (onglet `Capacite`) |
| | Ambitieux | 20 000 | 59 000 | 59 000 | Plafond de capacité atteint au mois 24 ; au-delà, il faut embaucher |
| **(b) Produit vertical dentaire** (France) | Prudent | 2 700 | 7 000 | 15 000 | Doctolib capte le marché |
| | Central | 13 700 | 46 000 | 105 000 | Modèle, scénario central |
| | Ambitieux | 38 600 | 159 000 | 510 000 | Modèle, scénario ambitieux (199 €, 15 cabinets par mois l'année 3) |
| **(c) Plateforme voix pour plusieurs professions de proximité** (santé et services) | Prudent | 2 700 | 10 000 | 25 000 | [Estimation] dispersion |
| | Central | 13 700 | 60 000 | 180 000 | [Estimation] 2e verticale à partir du mois 12 |
| | Ambitieux | 38 600 | 250 000 | 1 000 000 | [Estimation] 2 verticales et un partenaire de distribution ; levée d'amorçage au mois 15 |

| Trajectoire | Besoin de financement | Temps requis de notre part | Probabilité estimée | Principal point de rupture |
|---|---|---|---|---|
| (a) | 0 à 2 000 € (RC Pro, outils) | 20 h/semaine suffisent jusqu'à environ 30 cabinets | **25 à 35 %** d'atteindre 30 k€/an en 24 mois [Estimation, marge large] | Le plafond de temps, et l'arrivée de Doctolib chez nos propres clients |
| (b) | 30 à 100 k€ : conformité HDS, une personne à temps plein ; Bourse French Tech jusqu'à 30 k€, prêts d'honneur de 2 à 75 k€ [Source, extraits] | Au moins un fondateur à plein temps dès l'année 2 | **5 à 10 %** d'atteindre 300 k€/an en 36 mois [Estimation] | Doctolib Assistant (≈ 99 € TTC rapportés), Recept AI, Vocca (25 M$ levés), HDS |
| (c) | 300 k€ à 1 M€ (amorçage) | Deux fondateurs à plein temps, puis 5 à 7 personnes | **2 à 5 %** d'atteindre 1 M€/an en 48 mois [Estimation] | Dispersion ; il faut gagner une première verticale avant d'en ouvrir une deuxième |

Ces probabilités ne sortent d'aucune étude. Ce sont mes estimations à partir de l'état réel (0 client, 20 h/semaine, concurrents financés). Repère indirect : selon ChartMogul, près de la moitié de 6 525 éditeurs SaaS atteignent 1 M$ d'ARR **en 10 ans**, et ce sont des éditeurs qui ont déjà des clients payants [Source, extrait chartmogul.com].

## 4. Recommandation

- **Jusqu'au 14 novembre** : rien ne change (décisions du 14 octobre).
- **Décision à soumettre à Timéo** (porte du 19 décembre 2026, phase 13) : viser la trajectoire **(a) comme socle et (c) comme option**, pas la (b). Raisons : le dentaire n'est pas assez défendable face à Doctolib pour justifier un produit vertical financé. Une agence rentable à 30 à 60 k€/an finance l'apprentissage. La plateforme (c) ne se justifie que si une deuxième verticale montre une douleur nettement plus forte (H17).
  - **Coût** : 2 à 3 semaines d'entretiens dans une 2e verticale (environ 20 h).
  - **Risques** : dispersion ; perte de la seule base de terrain que nous avons (le dentaire).

## Fin de phase 5

- **Appris** : la certification HDS et l'absence d'API chez les éditeurs dentaires font du produit vertical dentaire un pari coûteux, avec un concurrent intégré à l'agenda.
- **Ce qui change** : je recommande l'agence comme socle, et une plateforme multi-métiers seulement si la preuve arrive. Un produit dentaire seul n'est pas recommandé.
- **Plus grosse incertitude** : l'interprétation juridique HDS appliquée à un agent qui ne conserve rien. Une stack « sans conservation » pourrait changer la donne.
- **Meilleure objection** : Recept AI revendique plus de 2 000 professionnels dentaires et 1 M€ d'ARR en France [Source, extrait welcometothejungle.com, déclaratif]. Si c'est vrai, un produit dentaire français à 1 M€ existe déjà, ce qui prouve que la trajectoire (b) est possible. **Ce qui me ferait changer d'avis** : la confirmation indépendante de ces chiffres, et un angle que ni eux ni Doctolib ne couvrent.
