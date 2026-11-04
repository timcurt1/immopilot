# Phase 10 — Conformité et risques

Aucune page officielle n'a pu être ouverte : les sources sont des extraits de recherche du 4 novembre 2026, à revérifier sur cnil.fr, esante.gouv.fr, eur-lex et economie.gouv.fr. Ceci n'est pas un avis juridique.

| Sujet | Ce qui est établi (source) | Ce qui est incertain | Ce qu'un juriste doit trancher | Coût | Peut tuer l'entreprise ? |
|---|---|---|---|---|---|
| **HDS** | Référentiel v2 (arrêté du 26/04/2024). Tous les certificats en v2 depuis le **16/05/2026**. **Exigence 28 : stockage dans l'EEE, chez l'hébergeur et ses sous-traitants**. Doit être certifié quiconque héberge des données de santé pour le compte d'un tiers, en sous-traitant au sens de l'article 28 du RGPD (esante.gouv.fr, webinaires ANS du 15/10/2025 et du 18/03/2026) | Un agent qui transcrit sans conserver « héberge »-t-il ? Les sources secondaires divergent | Qualification de notre activité ; stack admissible (Vapi et ElevenLabs aux États-Unis) | Certification propre : 20 à 80 k€ sur 3 ans et 6 à 9 mois (sources non officielles). Ou une stack chez des sous-traitants certifiés dans l'EEE : coût par minute plus élevé (phase 4) | **Oui**, en santé : un service non conforme ne peut pas être vendu à grande échelle |
| **RGPD** | Le cabinet est responsable du traitement, nous sommes sous-traitant : **contrat écrit obligatoire avant la prestation** (art. 28 ; guide CNIL). Données de santé = catégorie particulière (art. 9). AIPD **non requise** pour la gestion des rendez-vous d'un praticien **exerçant seul**. Pour un cabinet **de groupe** qui partage un système d'information, elle devrait être nécessaire. Le traitement « à grande échelle » est présumé à risque (CNIL) | Notre propre AIPD dès que nous servons de nombreux cabinets | Modèle de contrat de sous-traitance ; registre ; AIPD | Quelques heures, avec les modèles de la CNIL | Non, si c'est fait avant le premier appel réel |
| **Transferts hors UE** | Le Data Privacy Framework UE–États-Unis est valide. Le Tribunal de l'UE a rejeté le recours Latombe le 03/09/2025 ; un pourvoi est possible (leclubdesjuristes.com, next.ink) | Certification DPF de Vapi et d'ElevenLabs NON TROUVÉE ; le DPF ne lève pas l'exigence HDS de localisation dans l'EEE | Compatibilité des fournisseurs | — | Lié au HDS |
| **Enregistrement des appels** | CNIL (contexte du travail) : enregistrements conservés 6 mois au plus, comptes rendus 1 an. Information préalable de la personne | Règles exactes d'information de l'appelant (fiche non lue) | Texte d'annonce au début de l'appel ; durée de conservation | 0 € | Non |
| **AI Act** | Art. 50 (dire à la personne qu'elle parle à une IA) **applicable depuis le 02/08/2026**, sans report. Le *Digital Omnibus* (règlement 2026/1744, en vigueur le 27/07/2026) reporte le haut risque de l'annexe III au 02/12/2027. **Le triage de patients en urgence relève du haut risque** (annexe III, 5(d)), selon des sources secondaires | Frontière entre « prendre un motif » et « trier » | Le périmètre exact de ce que l'agent peut dire | 0 € si l'agent ne trie jamais | **Oui**, si l'agent trie : obligations de haut risque hors de notre portée |
| **Urgences et responsabilité** | Urgence dentaire : le 15, avec régulation par un chirurgien-dentiste les dimanches et jours fériés (ARS AURA). RC Pro informatique : environ 180 à 400 €/an pour un indépendant (extraits) | Prix d'une RC Pro qui couvre la santé ; aucune jurisprudence trouvée | Clauses de limitation de responsabilité ; script d'urgence | Devis RC Pro (Hiscox, MMA, Orus) | **Oui** : un seul incident grave (douleur ou saignement mal orienté) détruit la réputation locale |
| **Démarchage** | Depuis le **11/08/2026**, démarcher un **consommateur** par téléphone exige son consentement préalable ; Bloctel est supprimé (economie.gouv.fr, 27/07/2026). En B2B, l'opt-in ne s'appliquerait pas (source secondaire). E-mail B2B possible sans consentement s'il est lié à la profession, avec opposition simple (cnil.fr) | Le statut d'un cabinet libéral (professionnel, donc B2B) | Confirmer sur la fiche DGCCRF | 0 € | Non |
| **Déontologie dentaire** | L'interdiction générale de publicité est levée depuis le décret 2020-1658 ; l'exercice ne doit pas être pratiqué comme un commerce (R.4127-215) | Position de l'ONCD sur l'IA au téléphone. La lettre n° 227 (janvier 2026) contient un éditorial « Intelligence artificielle », non lu | Aucun texte public de l'agent ne doit faire de promotion du cabinet | 0 € | Non |
| **MACSF** (risques du téléphone au cabinet) | Pages non lues | — | — | — | À intégrer dès que Timéo colle le texte |

## Ce que nous pouvons faire sans attendre (avant toute démarche juridique)

- **Tout à blanc** : patients fictifs, numéros de test, aucun vrai patient.
- **L'agent ne trie jamais** : toute mention de douleur forte, de saignement, de gonflement ou de traumatisme déclenche la même phrase. Exemple fictif à valider : « Pour une urgence, appelez le 15. Je transmets aussi votre message au cabinet. »
- **Données minimales** : nom, numéro de rappel, créneau concerné. Jamais le motif médical détaillé dans le compte rendu.

## Ce qui peut tuer l'entreprise, par ordre

1. **Le HDS** : une stack américaine qui conserve des transcriptions de patients.
2. **Un incident d'urgence** mal orienté.
3. **Le triage**, qui ferait basculer l'agent en haut risque au sens de l'AI Act.

## Fin de phase 10

- **Appris** : la conformité santé favorise les acteurs qui sont déjà HDS (Doctolib, Vocca) ; c'est une barrière **contre** nous.
- **Ce qui change** : le premier appel réel d'un patient attend l'avis d'un juriste sur le HDS et le contrat de sous-traitance. Tout le reste se fait à blanc.
- **Plus grosse incertitude** : la qualification HDS d'un agent sans conservation.
- **Meilleure objection** : des concurrents vendent déjà des stacks proches sans HDS revendiqué (Famulor, SchedulingKit). Le risque est peut-être surestimé en pratique. Mais « d'autres le font » n'est pas une protection, et Imohtep dit publiquement ne pas être certifié. Ce qui me ferait changer d'avis : un avis écrit d'un juriste spécialisé en santé.
