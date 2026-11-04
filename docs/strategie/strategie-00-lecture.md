# Phase 0 — Lecture du projet et incohérences

Date : 4 novembre 2026. Rédigé par Claude pour Timéo. Rien n'est corrigé ici : tout est signalé.

## 1. Ce que j'ai pu lire, et ce que je n'ai pas pu lire

| Élément | Où | Lu ? | Remarque |
|---|---|---|---|
| Application ImmoPilot (Next.js 14, Supabase, Stripe, Resend, IA) | branche `main` et `claude/ecstatic-edison-tvcyhu` de `timcurt1/immopilot` | Oui (structure, `README.md`, `lib/plans.ts`) | Seul dépôt auquel cette session a accès |
| Études ImmoPilot du 4 novembre 2026 (`docs/etudes/00` à `99`), site statique `immopilot-site/` | branche `claude/jolly-carson-0g1s3m` | Oui (synthèse, produit réel, marché, contre-vérification, sources, validation) | Produites aujourd'hui par une autre session |
| Documents Imohtep : offre, spec, service, juridique, finances, plan à 30 jours, script de prospection, analyse de concurrence, kit LinkedIn, « 5-pourquoi-imohtep », suivi LinkedIn, feuille d'hypothèses | **Absents de tous les dépôts accessibles** | **Non** | `list_repos` ne renvoie que `timcurt1/immopilot`. Ils sont sans doute dans un Projet claude.ai ou un autre dossier |
| Site imohtep.com | web | **Non** | La politique réseau de cet environnement bloque la connexion (erreur 403 du proxy) |
| Pages MACSF sur le téléphone au cabinet | web | Non | En attente du texte que tu colleras |

Conséquence : pour Imohtep, ma seule source est ton prompt. Je ne peux pas vérifier les incohérences internes aux documents Imohtep ; je relève celles que le prompt décrit et celles qui apparaissent entre le prompt et le dépôt. **Action pour toi (10 min)** : déposer les documents Imohtep dans `docs/imohtep/` de ce dépôt, ou dans un dépôt que tu ajoutes à la session. Je referai alors cette phase.

## 2. Incohérences relevées

| # | Incohérence | Entre quoi et quoi | Gravité | Pourquoi ça compte |
|---|---|---|---|---|
| 1 | Textes publics (posts, script, kit LinkedIn) : « six dentistes » | Feuille d'hypothèses : 11 entretiens dans 10 cabinets | Moyenne | Un chiffre public faux, même sous-estimé, abîme la crédibilité le jour où un dentiste recoupe |
| 2 | Site : « Timéo et Louis » | Modèle de contrat : « Timéo seul » | Élevée | Le cocontractant doit être une personne identifiée. Le jour du premier contrat, il faut savoir qui signe et qui encaisse (voir phase 9) |
| 3 | Mode « agenda » écrit dans **Google Agenda** | H6 : 10/10 cabinets satisfaits de Logosw ou Doctolib, donc leur agenda est là | **Très élevée** | Un rendez-vous pris dans un Google Agenda que le cabinet n'utilise pas crée un double agenda, donc des doublons. Le mode « agenda » ne marche que si le cabinet recopie, ce qui contredit « rien à changer chez eux » (5 pourquoi n° 3). Le mode « demande » est le seul cohérent aujourd'hui |
| 4 | Douleur n° 1 : les lapins (H1, 9/10) | Offre : les appels manqués (H2, 3/10) | **Très élevée** | L'offre répond à une douleur confirmée par 3 cabinets sur 10. C'est le problème structurel du projet (phase 1) |
| 5 | Document de septembre : accueil téléphonique écarté car « déjà occupé » (Doctolib, Tennor, Kynara, CareCall) | Choix du 14 octobre : agent vocal d'accueil | Élevée | Aucun document lu n'explique ce qui a changé. Réponse en phase 6 |
| 6 | 5 pourquoi n° 5 : « 149 €/mois font plusieurs fois le budget logiciel déclaré » présenté comme un enseignement | Le prix reste 149 € | Élevée | C'est un argument contre le prix, pas pour. Le vrai point de comparaison est le télésecrétariat (35 € TTC à 400 € HT par mois), voir phase 8 |
| 7 | « Il ne faut rien changer chez eux » | Le renvoi d'appel est un changement sur leur ligne, et il coûte peut-être des minutes au cabinet | Moyenne | Un renvoi vers un numéro fixe ou mobile est facturé à l'abonné qui renvoie, sauf forfait illimité [Non vérifié pour chaque opérateur]. À demander en entretien |
| 8 | Prompt : ImmoPilot = « un seul fichier HTML », « exports CSV », « mise de côté » | Dépôt : application Next.js + Supabase + Stripe ; export CSV **absent du code** (`docs/etudes/00-produit-reel.md`) ; études, grille de prix (39 / 79 € HT) et plan d'action ImmoPilot produits **le 4 novembre 2026** | Élevée | Soit ImmoPilot est vraiment abandonné et ce travail d'aujourd'hui est du temps perdu, soit il ne l'est pas et vous avez deux projets. Il faut trancher (phase 11, critères d'arrêt) |
| 9 | Prix ImmoPilot dans le code : 49 / 129 / 299 € (`lib/plans.ts`) | Études du 4 novembre : 39 / 79 € HT | Faible (projet en pause) | À aligner seulement si ImmoPilot reprend |
| 10 | Prompt : « état au 5 novembre 2026 », « sources lues le 5 novembre 2026 » | Date système de cette session : 4 novembre 2026 | Faible | Probable faute de frappe. J'utilise le 4 novembre 2026 comme date de lecture |
| 11 | Plans existants calculés pour < 5 h/semaine, Timéo seul, plafond ~5 cabinets | Réalité : 2 × 10 h/semaine | Moyenne | Plafond recalculé en phase 4 : environ 15 à 20 cabinets sans automatisation |
| 12 | Pilote : « mise en place offerte puis 149 €/mois » | Mots interdits dans les textes cabinet : « essai », « abonnement » | Faible | Vérifier que la page d'offre n'utilise pas ces mots (non vérifiable : document non lu) |
| 13 | « Nous ne sommes pas certifiés HDS et nous le disons » | Vapi et ElevenLabs sont des sociétés américaines ; l'agent entend des motifs de consultation (donnée de santé) | **Très élevée** | Dire qu'on n'est pas certifié ne suffit pas si un hébergement HDS est obligatoire pour ce traitement. Voir phase 10 |
| 14 | 5 invitations LinkedIn le 12 octobre, aucun résultat noté dans le prompt | Plan de prospection | Faible | 5 invitations en 3 semaines ne testent rien. Le canal LinkedIn n'est pas évalué |
| 15 | Deux pages MACSF citées comme sources | Non lues | Faible | À intégrer dès réception du texte (phases 1 et 10) |

## 3. Ce que nous possédons réellement (actifs)

| Actif | Preuve | Réutilisable pour Imohtep ? |
|---|---|---|
| Application web complète avec authentification, base, e-mails, IA, paiement | dépôt `immopilot` | Oui, en partie : Resend (e-mails), appels IA (`lib/ai.ts`), Supabase. Utile le jour où un compte rendu ou une interface devient nécessaire (phase 5) |
| Méthode d'étude sourcée (registre de sources, `calculs.py`, contre-vérification) | `docs/etudes/` | Oui : même méthode ici |
| Guide d'entretien sans question fermée, règle « faits passés, pas intentions » | `docs/etudes/06-validation.md` | Oui : repris dans le script de 15 minutes |
| 11 entretiens dentaires et une feuille d'hypothèses | prompt | Oui, c'est l'actif le plus précieux. Mais aucun verbatim noté |
| Vocabulaire de deux métiers (agence immobilière, cabinet dentaire) | prompt, code ImmoPilot | Oui pour une deuxième verticale |

## Fin de phase 0

- **Appris** : la base documentaire d'Imohtep n'est pas dans le dépôt ; ImmoPilot a été retravaillé aujourd'hui même ; le mode « agenda » sur Google Agenda contredit H6.
- **Ce qui change dans ma recommandation** : le mode « demande » (le secrétariat confirme) doit être le mode par défaut ; le mode « agenda » est à suspendre tant qu'il n'écrit pas dans l'agenda réel du cabinet.
- **Plus grosse incertitude** : la cohérence interne des documents Imohtep, que je n'ai pas pu lire.
- **Meilleure objection contre cette phase** : je juge des documents sans les avoir lus. Ce qui me ferait changer d'avis : leur lecture.
