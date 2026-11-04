# Synthèse — Imohtep, 4 novembre 2026

## La réponse franche, en une page

**Quelle idée ?** Imohtep, mais pas sous sa forme actuelle. L'offre « agent vocal pour les appels manqués des dentistes » répond à une douleur confirmée par **3 cabinets sur 10**. Elle arrive aussi sur un marché que **Doctolib occupe depuis décembre 2025** avec son propre assistant téléphonique IA, d'abord chez les dentistes, à environ 99 € TTC par mois selon la presse (moins que nos 149 € HT). Recept AI et Vocca sont également financés ou revendiquent un volume important [Source, extraits de recherche, à vérifier : phase 6]. Le document de septembre avait raison : l'accueil téléphonique dentaire est occupé, et il l'est davantage aujourd'hui.

**Ce qui reste solide** : la douleur n° 1 (les lapins, 9/10) ; le coût de l'interruption pendant les soins ; et la « petite chose » de Thibault, qui n'est pas l'agent mais **le chiffre que le cabinet n'a pas** (appels non décrochés sur une semaine) et **le compte rendu du matin** (ce qui est arrivé pendant qu'il soignait).

**Quelle trajectoire ?** Trois temps.
1. **D'ici au 5 décembre** : tester dans le dentaire, à 0 €, les deux angles qui pourraient échapper à Doctolib : les **annulations** qui n'arrivent pas à joindre le cabinet (hypothèse centrale) et le **débordement** chez les cabinets à fort volume.
2. **Porte de décision du 19 décembre** (décision qui appartient à Timéo) : rester sur le dentaire, ou porter le même produit (« la ligne qui répond, et le compte rendu du lendemain ») vers une verticale **sans données de santé ni Doctolib**. L'immobilier est le meilleur candidat : nous en avons déjà le vocabulaire et les scripts.
3. **Socle** : une agence rentable de 20 à 33 clients au maximum à deux (35 à 60 k€ par an). Elle ne devient un produit que si la preuve arrive.

**Quelle probabilité d'atteindre « plusieurs millions » ?** Définition retenue : au moins 1 M€ de revenu récurrent annuel, une croissance supérieure à 30 % par an et au moins 70 % de marge brute, soit environ 2 à 4 M€ de valeur aux multiples relevés (2 à 4x) [Calcul sur extraits sourcés, phase 3]. À 149 €, cela représente **560 cabinets**, et Clermont n'en compte qu'environ 115 [Estimation]. Le scénario central du modèle donne environ **105 k€ par an au bout de 3 ans**, soit une valeur de 0,2 à 0,4 M€. Le scénario ambitieux donne environ 510 k€ par an [Calcul]. Ma probabilité honnête d'atteindre 1 M€ de revenu récurrent en 5 ans est de **2 à 5 %** [Estimation, marge large]. Celle d'avoir une petite activité rentable (30 à 60 k€ par an) en 2 ans est de **25 à 35 %**.

**Ce qui doit être vrai pour y arriver** :
1. une douleur payante, mesurée chez le client, et non couverte par son éditeur (E0, E1, E2) ;
2. une installation en moins de 2 h et un suivi quasi nul (produit) ;
3. un canal qui vend pour nous (fournisseur de téléphonie, comptable ou revendeur) ;
4. une conformité tranchée (HDS) ou une verticale qui n'en a pas besoin ;
5. au moins un fondateur à plein temps d'ici 2028.

**Ce qui, si c'est faux, nous fait changer de cap** :
- au moins 5 cabinets sur 10 déjà équipés de l'assistant Doctolib et satisfaits (14 novembre) ;
- au plus 1 cabinet sur 10 qui cite une annulation ratée (21 novembre) ;
- moins de 5 appels non décrochés par semaine et par cabinet (5 décembre) ;
- 0 engagement écrit au 31 janvier 2027.

## Lundi matin (9 novembre)

1. **E0** : demander aux 10 cabinets si Doctolib leur a proposé son assistant téléphonique. Le message est à valider par Timéo (1,5 h, 0 €).
2. **E10** : ouvrir dans ton navigateur les pages Doctolib Assistant et Recept AI et noter les prix (30 min).
3. **E7** : premier appel de bout en bout à blanc (Vapi + Zadarma + e-mail), enregistré (2 h, quelques euros : coût récurrent à valider).
4. Ouvrir le journal des contributions Timéo / Louis (5 min).
5. Déposer les documents Imohtep dans `docs/imohtep/` pour que la phase 0 puisse être refaite (10 min).

**Coût des 90 jours** : 15 à 60 €, environ 240 h à deux. **Prochaine expérience** : E0, avec un seuil d'abandon à 5 cabinets sur 10 équipés et satisfaits.

---

## Ce que chaque étape nous a appris, et ce que nous gardons

| Étape | Leçon | Ce que nous gardons |
|---|---|---|
| ImmoPilot | On a construit avant de vérifier la douleur ; l'application dépasse ce que le marché a demandé | Le code (authentification, Supabase, e-mails Resend, appels IA) pour un futur compte rendu ou une interface ; la méthode d'étude sourcée ; le guide d'entretien « faits passés » |
| Agence B2B pour l'immobilier | « Vendre des résultats » ne suffit pas sans résultat mesurable | Les scripts, le traitement des objections, le vocabulaire des agences : utiles pour une 2e verticale |
| Imhotep courriers | Une douleur réelle mais diffuse ne se vend pas | La règle « ressenti dans la journée » |
| Projet de l'incubateur | « Les entreprises » n'est pas une cible | Le récit de mission, pour le dossier SNEE ou SquareLab |
| Imohtep | 11 entretiens, mais aucun verbatim ; le discours est arrivé avant la preuve | La feuille d'hypothèses, la relation avec 10 cabinets, le vocabulaire dentaire |

## La mission commune est-elle la bonne base ?

**Comme récit, oui. Comme offre, non.** « Aider les petites structures à passer à l'IA » décrit une société de conseil : chaque client est un projet différent, et cela ne passe pas à l'échelle. Ce qui peut grandir est **un seul usage répété dans plusieurs métiers** : « la ligne qui répond quand vous ne pouvez pas, et le compte rendu du lendemain ». La mission sert à choisir les métiers (petites structures, appels qui interrompent un geste), pas à ajouter des offres.

## Les trois prolongements

| Prolongement | Verdict | Pourquoi |
|---|---|---|
| Même agent pour d'autres professions de santé (kinés, ostéopathes, généralistes) | **Non, pour l'instant** | Mêmes obstacles (HDS) ; Doctolib y propose son assistant à 49 € TTC pour les ostéopathes et à 99 € TTC pour les médecins, selon la presse [Source, extraits] |
| Autres tâches pour les mêmes cabinets | **Oui, une seule** : la ligne d'annulation du soir et le compte rendu du matin, qui touchent la douleur n° 1. Plus tard, la relance des devis non signés, mais elle exige des données et une intégration | C'est la réorientation à tester (E2, E6) |
| Autres secteurs de proximité, dont l'immobilier | **Meilleur potentiel d'échelle, non testé** | Ni HDS ni Doctolib, valeur d'un contact plus élevée, scripts existants (matrice de la phase 3 : 27/35 contre 19/35 pour le dentaire) |
| Hors de la liste : **intégrateur local** d'outils déjà conformes (y compris en marque blanche, par exemple Ainora) | Possible comme activité de service, plafond bas | Revenu plus rapide, aucune défense à long terme |

## Index des documents

| Phase | Document |
|---|---|
| 0 | `strategie-00-lecture.md` |
| 1 | `strategie-01-cinq-pourquoi.md` |
| 2 | `strategie-02-petite-chose.md` |
| 3 | `strategie-03-chemin-millions.md` |
| 4 | `strategie-04-economie-unitaire.md` |
| 5 | `strategie-05-service-vers-produit.md` |
| 6 | `strategie-06-concurrence.md` |
| 7 | `strategie-07-mise-sur-le-marche.md` |
| 8 | `strategie-08-prix.md` |
| 9 | `strategie-09-structure-argent-associe.md` |
| 10 | `strategie-10-conformite-risque.md` |
| 11 | `strategie-11-avant-mortem.md` |
| 12 | `strategie-12-dix-experiences.md` |
| 13 | `strategie-13-plans-90-jours-3-ans.md` |
| Modèle chiffré | `strategie-modele-chiffre.xlsx` |
| Hypothèses, verbatims, tableau du dimanche | `strategie-feuille-hypotheses.xlsx` |
| Script de 15 minutes | `strategie-script-appel-15-minutes.md` |
| Tableau de bord | `strategie-tableau-de-bord.md` |
| Sources | `strategie-99-sources.md` |

**Meilleure objection contre cette synthèse** : tout repose sur des extraits de presse non ouverts (Doctolib, Recept AI). Si l'assistant Doctolib n'est en fait qu'une bêta peu diffusée, le dentaire redevient jouable. E0 et E10 tranchent cela en 2 heures.
