# Phase 1 — Les 5 pourquoi, version complète

Légende : **[Fait]** = issu des entretiens (score de la feuille d'hypothèses) ou d'une source ; **[Supposé]** = mon hypothèse, non vérifiée ; **[Reco]** = ma recommandation. Chaque pourquoi supposé porte la question exacte à poser. Les questions portent sur des faits passés, jamais sur des intentions.

Règle respectée : aucune parole de dentiste n'est citée, faute de verbatim relevé.

## 1. Les hypothèses du terrain, une par une

### H1 — Les lapins sont la première douleur (9/10) [Fait]

| Niveau | Pourquoi ? | Statut | Question à poser |
|---|---|---|---|
| 1 | Pourquoi les lapins font-ils mal ? Le fauteuil reste vide et le temps du praticien est perdu | [Supposé], cohérent avec Doctolib : 4,7 % de « pas venu, pas prévenu » chez les dentistes [Source, communiqué Doctolib du 3 juillet 2024, cité dans le prompt, non relu] | « La semaine dernière, combien de rendez-vous n'ont pas été honorés ? Qu'avez-vous fait de ces créneaux ? » |
| 2 | Pourquoi le créneau reste-t-il vide ? Parce qu'on l'apprend trop tard pour le remplir | [Supposé] ; Doctolib : un créneau annulé moins de 48 h avant n'est remplacé que dans 49 % des cas [Source, idem] | « Le dernier patient qui a annulé la veille : comment l'avez-vous su, à quelle heure, et le créneau a-t-il été repris ? » |
| 3 | Pourquoi l'apprend-on trop tard ? Soit le patient ne prévient pas, soit il essaie et n'y arrive pas | [Supposé] — c'est l'hypothèse centrale | « Vous est-il arrivé qu'un patient absent vous dise ensuite qu'il avait essayé d'appeler ? Combien de fois ce mois-ci ? » |
| 4 | Pourquoi n'y arrive-t-il pas ? Ligne occupée pendant les soins, cabinet fermé le soir, et pas de Doctolib pour tous les patients | [Supposé] | « Quelle part de vos patients prend rendez-vous par téléphone plutôt qu'en ligne ? Vos patients peuvent-ils annuler en ligne ? » |
| 5 | Pourquoi personne ne le mesure ? Un appel non décroché ne laisse pas de trace visible dans le logiciel | [Supposé], c'est le 5 pourquoi n° 1 du projet | « Pouvez-vous voir sur votre box ou votre téléphone la liste des appels manqués d'hier ? » |

**Cause que nous pouvons changer** : le délai entre la décision d'annuler du patient et la connaissance de l'annulation par le cabinet. Nous ne pouvons rien contre les patients qui ne préviennent pas du tout.
**Limite honnête** : si la majorité des lapins sont des oublis purs (pas des tentatives d'annulation ratées), l'agent vocal ne les réduit pas. Les rappels par SMS existent déjà (H1 dit « malgré les SMS »).

### H2 — Les appels manqués ne pèsent que dans les gros cabinets (3/10, partielle) [Fait]

| Niveau | Pourquoi ? | Statut | Question |
|---|---|---|---|
| 1 | Pourquoi 7 cabinets sur 10 disent-ils que ce n'est pas un problème ? Ils ne voient pas les appels perdus | [Supposé] | « Combien d'appels avez-vous manqués hier ? Comment le savez-vous ? » |
| 2 | Pourquoi ne les voient-ils pas ? Personne ne compte ; le patient rappelle ou va ailleurs sans laisser de message | [Supposé] | « Quand un patient tombe sur la messagerie, laisse-t-il un message ? Sur 10, combien ? » |
| 3 | Pourquoi les petits cabinets en souffrent-ils moins ? Peu d'appels, et patientèle fidèle qui rappelle | [Supposé] — **peut être tout simplement vrai** | « Combien d'appels recevez-vous par jour, à peu près ? Et un lundi ? » |
| 4 | Pourquoi les gros cabinets en souffrent-ils ? Volume au-dessus de ce qu'une personne décroche entre deux tâches | [Supposé] | « Qui décroche quand la secrétaire est déjà au téléphone ? » |
| 5 | Pourquoi ne s'équipent-ils pas déjà ? Télésecrétariat jugé cher ou impersonnel, ou déjà en place | [Supposé] | « Avez-vous déjà utilisé ou étudié un télésecrétariat ? Pourquoi l'avoir gardé ou arrêté ? » |

**Cause que nous pouvons changer** : l'invisibilité. Nous ne pouvons pas créer un volume d'appels qui n'existe pas. **Conséquence [Reco]** : la cible n'est pas « tous les cabinets » mais ceux qui reçoivent assez d'appels ; il faut un critère chiffré (voir expérience E1).

### H3 — L'agenda n'occupe un temps plein qu'avec une secrétaire dédiée (3/3) [Fait]

Chaîne : la secrétaire gère l'agenda → parce que le téléphone et le comptoir arrivent en même temps → parce que le cabinet a assez d'activité pour payer une secrétaire → donc ces cabinets ont déjà quelqu'un qui décroche → **la valeur de l'agent pour eux est le débordement (ligne occupée, pause, soir), pas le remplacement**. Question : « Pendant que votre secrétaire est au téléphone, combien d'autres appels sonnent dans le vide ? Le voyez-vous ? »
**Cause actionnable** : les heures où la secrétaire ne peut pas décrocher (pauses, comptoir, fermeture).

### H4 — La stérilisation prend plus de temps que le téléphone (5/10) [Fait]

Chaîne : la stérilisation est le temps le plus lourd → parce qu'elle est obligatoire et manuelle → parce qu'aucun logiciel ne la fait → **nous non plus**. Pourquoi c'est important : le temps n'est pas l'argument (5 pourquoi n° 2 : le coût est l'interruption). Question : « Quand vous êtes en soin et que le téléphone sonne, que se passe-t-il ? Qui décroche, et combien de fois par jour ? »
**Cause actionnable** : aucune pour nous. **[Reco]** Ne jamais vendre du « temps gagné ».

### H5 — Les appels arrivent en pics (4/10, à tester) [Fait partiel]

Chaîne : pics le lundi et les veilles de vacances → parce que les douleurs du week-end et les départs se concentrent → parce que les patients appellent tous au même moment → la ligne est saturée exactement quand la demande est la plus forte. Question : « Le lundi matin, combien d'appels entre 8 h et 10 h ? Et un mercredi ? »
**Cause actionnable** : le débordement des pics. **[Reco]** Une offre « débordement du lundi et des veilles de vacances » est plus petite et plus facile à accepter qu'un renvoi permanent.

### H6 — Les cabinets sont satisfaits de leurs outils (10/10) [Fait]

Chaîne : ils sont satisfaits → parce que Logosw et Doctolib font bien ce pour quoi ils ont été achetés → parce que le problème restant est **avant** le logiciel (le patient n'a pas encore atteint l'agenda) → donc ne rien remplacer. **Mais** : le mode « agenda » sur Google Agenda remplace leur agenda (phase 0, incohérence n° 3).
Question : « Quand un rendez-vous est pris par téléphone, où est-il noté, par qui, en combien de temps ? »
**Cause actionnable** : ne rien toucher à leur agenda ; tout envoyer au secrétariat, qui saisit.

### H7 — La valeur d'un patient est faible et rarement chiffrée (4/10) [Fait]

Chaîne : pas chiffrée → parce qu'un nouveau patient n'est pas rare (demande forte, pénurie de dentistes [Non vérifié pour Clermont]) → donc perdre un appel ne coûte rien de visible → **un argument « patients perdus » ne portera pas**. Question : « Prenez-vous de nouveaux patients en ce moment ? Combien de demandes refusez-vous par semaine ? »
**Conséquence [Reco]** : si les cabinets refusent déjà des patients, l'argument « ne perdez plus d'appels » est faux pour eux. L'argument devient « moins d'interruptions » et « créneaux libérés connus à temps ».

### H8 — Budget logiciel de quelques centaines d'euros par an (4/10, à tester) [Fait partiel]

Chaîne : budget faible → parce que les logiciels sont vus comme un coût fixe, pas comme un levier → donc 149 €/mois paraît énorme face à un logiciel, mais peut paraître faible face à une heure de secrétariat. Question : « Combien payez-vous par mois pour votre téléphone, votre logiciel et, si vous en avez un, votre télésecrétariat ? »
**Cause actionnable** : l'ancrage. On se compare au coût de l'accueil téléphonique, pas au logiciel (phase 8).

### H9 — Décision rapide, mais pas toujours par l'utilisateur (4/10) [Fait]

Chaîne : celui qui paie (dentiste titulaire) n'est pas celui qui ressent (secrétaire, assistante) → le dentiste ne voit pas la gêne → donc il faut que la gêne devienne visible pour lui, en chiffres, sans effort. Question : « Le dernier achat pour le cabinet (matériel ou service) : qui l'a proposé, qui a décidé, en combien de temps ? »
**Cause actionnable** : rendre visible au payeur ce que vit l'utilisatrice. C'est exactement la « petite chose » de Thibault (phase 2).

### H10 — L'automatisation est bien accueillie, mais pas testée en voix (9/10) [Fait]

Chaîne : bien accueillie en principe → parce que « automatiser » est abstrait → l'acceptation réelle se joue à l'écoute de la voix (5 pourquoi n° 6) et à la réaction des patients (non testée). Question, après avoir fait écouter un enregistrement : « Si votre patient le plus âgé tombait sur cette voix, que se passerait-il ? »
**Cause actionnable** : faire écouter avant de parler de prix.

### Les 5 pourquoi du projet, challengés

| N° | Conclusion du projet | Mon verdict | Pourquoi |
|---|---|---|---|
| 1 | La perte est silencieuse | **Plausible, non prouvé** | Si elle est silencieuse, 7/10 peuvent avoir raison : il n'y a peut-être pas de perte. Seul un comptage tranche (E1) |
| 2 | Le coût est l'interruption, pas le temps | **Le plus solide** | Cohérent avec H4 et H3 |
| 3 | Le trou est en amont des logiciels | **Solide, mais contredit par le mode « agenda »** | Voir H6 |
| 4 | Celui qui paie n'est pas celui qui ressent | **Solide** (H9) | Implique un livrable visible pour le payeur |
| 5 | Prix ancré sur les logiciels | **Mal tiré** | C'est un risque, pas un levier. Ancrer sur le télésecrétariat |
| 6 | L'acceptation se joue à l'écoute | **Plausible**, non testé | Test E4 |

## 2. Les 5 pourquoi appliqués à notre situation

### Pourquoi aucun cabinet ne s'est encore engagé ?

| Niveau | Pourquoi ? | Statut |
|---|---|---|
| 1 | Parce que nous n'avons rien demandé de précis : aucun cabinet n'a reçu une proposition avec une date, un prix et un geste à faire | [Supposé] — à confirmer : combien de propositions écrites ont été faites ? Si zéro, c'est la cause |
| 2 | Parce que nous n'avons rien à montrer : aucun appel réel de bout en bout n'a été testé | [Fait, prompt] |
| 3 | Parce que nous avons construit le discours (site, posts, scripts) avant la preuve technique | [Fait, prompt] |
| 4 | Parce que le discours est plus confortable que le test : un test peut échouer | [Supposé] |
| 5 | Parce que nous n'avons pas fixé de seuil d'abandon daté | [Fait : aucun critère d'arrêt chiffré dans le prompt] |

**Cause actionnable** : un appel de bout en bout enregistré avant le 14 novembre, et une proposition écrite à 3 cabinets avec une date.

### Pourquoi cela ne vaudrait-il pas des millions aujourd'hui ?

Parce que 0 € de revenu → parce qu'aucune preuve que des cabinets paient → parce que la douleur adressée est confirmée par 3/10 → parce que le produit a été choisi par élimination (après le SaaS de courriers) plutôt qu'à partir de la douleur n° 1 → parce que la douleur n° 1 (lapins) est difficile à adresser sans toucher aux données du cabinet. **Cause actionnable** : tester si l'annulation impossible explique une part des lapins. Si oui, l'offre et la douleur se rejoignent. Si non, l'offre doit changer de douleur ou de métier.

### Pourquoi les autres idées n'ont pas décollé ?

| Idée | Chaîne de pourquoi (résumée) | Cause racine commune |
|---|---|---|
| ImmoPilot | Aucun client → aucun entretien d'agence avant de coder (le guide d'entretien date du 4 novembre 2026, après des mois de développement) → le produit est né d'une envie de construire → | **Construire avant de vérifier la douleur** |
| Agence B2B pour l'immobilier | Aucun client → scripts écrits, peu ou pas envoyés [Non vérifié] → offre de « services » sans résultat mesurable → | **Vendre une méthode sans preuve de résultat** |
| Imhotep courriers | Abandonné en un mois → la douleur (14 % du temps administratif [Source secondaire citée dans le prompt]) est réelle mais diffuse → le médecin ne paie pas pour gagner du temps diffus | **Douleur réelle, mais pas ressentie dans la journée** |
| Projet incubateur « IA pour entreprises » | Resté une idée → aucune cible précise → impossible de prospecter « les entreprises » | **Pas de client nommable** |

**Le schéma récurrent** : chaque idée a été abandonnée avant le test qui l'aurait tranchée, puis remplacée par une idée plus séduisante. Le risque n° 1 d'Imohtep n'est ni technique ni commercial : c'est d'être abandonné de la même façon avant le 14 novembre. **[Reco]** Les critères d'arrêt de la phase 11 sont datés pour cette raison.

## 3. Même méthode dans un autre secteur : l'agence immobilière

But : vérifier que la méthode ne dépend pas du dentaire.

| Niveau | Pourquoi ? | Statut | Question |
|---|---|---|---|
| Point de départ | Une agence rate des appels sur ses annonces | [Supposé] | « Combien d'appels sur vos annonces la semaine dernière ? Combien sans réponse ? » |
| 1 | Pourquoi ça fait mal ? Un appel sur un bien à vendre peut être un futur mandat | [Supposé] | « Votre dernier mandat de vente : d'où venait le premier contact ? » |
| 2 | Pourquoi les rate-t-elle ? Les agents sont en visite, donc le téléphone sonne quand personne n'est là | [Supposé] | « Où sont les agents un samedi après-midi ? Qui décroche ? » |
| 3 | Pourquoi personne ne compte ? Le portail (SeLoger, Leboncoin) envoie des e-mails ; les appels, eux, ne laissent pas de trace | [Supposé] | « Les portails vous donnent-ils le nombre d'appels reçus par annonce ? » |
| 4 | Pourquoi ne s'équipent-elles pas ? Les standards à distance existent, mais l'agence pense que le client veut parler à un agent | [Supposé] | « Avez-vous déjà testé un service d'accueil téléphonique ? » |
| 5 | Cause actionnable | Le délai de rappel du contact entrant | — |

**Conclusion** : la méthode est la même. **Différence de fond** : dans l'immobilier, la valeur d'un contact est élevée et se chiffre (une commission de vente), alors que H7 dit le contraire pour le dentaire ; et il n'y a pas de données de santé. Cet écart est repris en phase 3 (matrice des verticales).

## 4. Grille de relevé de verbatims

À remplir pendant ou juste après chaque entretien. Une ligne par phrase. Copier la phrase **mot pour mot** ; si on n'est pas sûr du mot exact, écrire « paraphrase » et ne jamais la citer.

| N° entretien | Date | Cabinet (code, pas le nom) | Personne (rôle : titulaire, collaborateur, secrétaire, assistante) | Contexte (question posée juste avant) | Phrase exacte, entre guillemets | Mot pour mot ou paraphrase | Moment (minute ou étape de l'entretien) | Hypothèse touchée (H1 à H18) | Confirme / contredit / nuance | Accord pour citer (non / interne seulement / public anonyme / public nominatif) | Accord écrit reçu le |
|---|---|---|---|---|---|---|---|---|---|---|---|
| | | | | | | | | | | | |

Version tableur : feuille « Verbatims » du fichier `strategie-feuille-hypotheses.xlsx`.

## 5. Message aux 10 cabinets déjà rencontrés (brouillon, rien n'est envoyé)

Canal : SMS ou e-mail à la personne rencontrée. Trois lignes.

> Bonjour [prénom], merci encore pour notre échange du [date] sur le téléphone et les rendez-vous manqués.
> Pour être sûr de ne pas déformer vos propos, accepteriez-vous de me redire en deux ou trois phrases, par écrit ou en 5 minutes d'appel, comment se passent pour vous les appels manqués et les annulations de dernière minute ?
> Je ne citerai rien sans votre accord écrit, et seulement sous la forme que vous choisirez. Timéo (et Louis), Imohtep.

Remarque : « (et Louis) » dépend de l'incohérence n° 2 de la phase 0. À trancher avant envoi.

## Fin de phase 1

- **Appris** : la seule cause actionnable qui relie la douleur n° 1 (lapins) à notre offre est le **délai d'annulation**. Les autres causes actionnables sont l'interruption pendant les soins et le débordement des pics.
- **Ce qui change** : on cesse de vendre « les appels manqués » ; on teste « les annulations qui arrivent à temps » et « zéro interruption pendant les soins ».
- **Plus grosse incertitude** : la part des lapins qui viennent d'une tentative d'annulation ratée. Inconnue : peut être 0 % ou 30 %.
- **Meilleure objection** : les patients qui veulent annuler peuvent déjà le faire par SMS ou Doctolib ; l'hypothèse centrale peut être fausse dès la première semaine. **Ce qui me ferait changer d'avis** : si moins de 2 cabinets sur 5 se souviennent d'un patient absent qui avait essayé d'appeler, j'abandonne l'angle « lapins ».
