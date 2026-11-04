# Phase 6 — Défensibilité et concurrence

Toutes les données concurrentielles sont des **extraits de recherche du 4 novembre 2026, pages non ouvertes** (blocage réseau). Avant tout usage, vérifier sur les pages officielles, et ne jamais citer un concurrent dans un texte pour un cabinet sans cette vérification.

## 1. Carte des concurrents

| Concurrent | Type | Prix relevé | Forces | Limites | Risque qu'il nous écrase |
|---|---|---|---|---|---|
| **Doctolib, Assistant téléphonique** (techno Aaron.ai, rachetée en mai 2024) | Agent vocal de l'éditeur d'agenda | ≈ 99 € TTC/mois pour les médecins et les dentistes, 49 € TTC pour les ostéopathes et les podologues, rapporté par la presse ; aucun prix officiel trouvé | Lancé en **décembre 2025, d'abord chez les généralistes et les dentistes** ; écrit dans le vrai agenda ; présenté comme certifié HDS ; déjà chez le client | Ne sert que les cabinets Doctolib ; produit standard | **Très élevé** |
| **Recept AI** (Budgie SAS, Paris) | « Télésecrétariat IA pour dentistes » | NON TROUVÉ | Revendique plus de 2 000 professionnels dentaires et 1 M€ d'ARR (déclaratif, une seule source) | Non vérifié | Élevé |
| **Vocca** (Paris) | Agent vocal de prise de rendez-vous | NON TROUVÉ | 5,5 M$ en seed (septembre 2025), 20 M$ en série A (octobre 2026) ; hôpital Rothschild ; plus de 100 établissements ; revendique un hébergement HDS | Cible les établissements, pas les petits cabinets [Supposé] | Moyen à élevé |
| **Dentina** (CloudTalk) | Réceptionniste IA dentaire | 299 à 399 €/mois, facturés à l'année | 2,2 M$ de CA en 2025 (Latka), autofinancé | Prix élevé | Moyen |
| **Ainora** (Lituanie) | Agent vocal, marque blanche | NON TROUVÉ | Intégrations annoncées avec Julie, Veasy et LOGOSw ; offre pour revendeurs | Peu présent localement [Supposé] | Moyen ; c'est aussi un **fournisseur possible** |
| Famulor, Fonio, Nordflux, SchedulingKit | Plateformes d'agents vocaux | Famulor dès 0,11 €/min ; SchedulingKit 39 $/mois (non conforme HIPAA selon sa FAQ) | Prix bas, libre-service | Pas de service local | Moyen |
| **Télésecrétariat humain** (Callmed, Medicall, STC, partenaires Doctolib) | Standard à distance | 0,50 € HT à 1,20 € TTC par appel ; 35 € TTC à 599 € TTC par mois | Voix humaine, habitudes, gros volumes | Coût par appel, horaires | Moyen : c'est l'ancrage de prix (phase 8) |
| **Éditeurs dentaires** (Logjia = LOGOSw + Julie, avec l'IA JULiA ; Veasy/Cegedim avec Maiia) | Logiciels de cabinet | — | Possèdent l'agenda et les données | Aucune API publique trouvée | Élevé s'ils ajoutent la voix |
| Prise de rendez-vous en ligne (Doctolib, Maiia) | Substitut | — | Déplace la demande hors du téléphone | Une partie des patients appelle quand même [Supposé] | Structurel |
| Kynara, Tennor, CareCall | Cités dans le document de septembre | NON TROUVÉS | — | « CareCall » n'apparaît que comme projet de hackathon | À reconfirmer : le document de septembre est peut-être erroné |

Sources : en-contact.com, rcpt.ai, callsens.fr, tech.eu (22/05/2024 et 25/09/2025), hitconsultant.net (05/10/2026), welcometothejungle.com, cloudtalk.io (24/09/2026), getlatka.com, ainora.lt, famulor.io, schedulingkit.com, lonasante.com, tandemhealth.ai. Le registre complet est dans `strategie-99-sources.md`.

## 2. Qu'est-ce qui nous empêcherait d'être copiés en trois mois ?

**Rien.** Un agent Vapi se configure en une journée. Nos prompts, notre site et nos scripts se copient. Il n'y a aujourd'hui **aucune barrière**.

## 3. Ce qui peut devenir un avantage avec le temps

| Avantage possible | Se construit comment | Réaliste pour nous ? |
|---|---|---|
| **Relation locale et service** (on vient, on règle, on rappelle) | Les 10 premiers clients à Clermont | **Oui**, c'est le seul avantage dès le jour 1, mais il ne passe pas à l'échelle |
| **Données d'appels par métier** (motifs, heures, taux de résolution) | Le compte rendu du matin agrégé sur 50 cabinets et plus | Oui à partir de 50 cabinets ; cela améliore le modèle d'agent par métier |
| **Accord de distribution** (fournisseur de téléphonie, comptable, groupement, revendeur) | Phase 7 | Possible ; c'est le seul levier d'échelle accessible sans levée |
| **Coût de changement** (numéro, consignes réglées, historique) | Durée | Faible : un renvoi se désactive en une minute |
| Intégrations aux éditeurs | Partenariat | Peu probable à court terme (pas d'API) |
| Marque | Années | Non |

## 4. La question de septembre : l'accueil téléphonique est-il « déjà occupé » ?

Le document de septembre l'avait écarté pour cette raison. **L'obstacle est plus fort aujourd'hui qu'en septembre**, pas plus faible. Doctolib a lancé son assistant téléphonique en décembre 2025, d'abord pour les dentistes, à un prix rapporté **inférieur** au nôtre (≈ 82,50 € HT contre 149 € HT), dans l'agenda que 10 cabinets sur 10 disent apprécier (H6).

Ce n'est pas un obstacle **seulement** pour :
1. les cabinets qui n'utilisent pas Doctolib (agenda LOGOSw seul, rendez-vous par téléphone) : leur part est inconnue [Non vérifié] ;
2. un usage que Doctolib ne couvre pas : le débordement le lundi, la ligne d'annulation du soir, le compte rendu au titulaire. C'est à vérifier ; Doctolib couvre peut-être déjà tout cela [Non vérifié] ;
3. une verticale où Doctolib n'est pas présent : l'immobilier, et a priori le vétérinaire [Non vérifié].

**Expérience E0, la plus urgente** : demander aux 10 cabinets si Doctolib leur a proposé l'assistant, à quel prix, et s'ils l'utilisent (phase 12).

## Fin de phase 6

- **Appris** : le marché dentaire de l'accueil vocal par IA est occupé par l'éditeur d'agenda lui-même et par deux jeunes entreprises françaises financées ou revendiquant un volume important.
- **Ce qui change** : en dentaire, Imohtep ne peut se défendre que par le service local et par un usage que Doctolib ne couvre pas, ce qui reste à prouver. La sortie de la verticale dentaire devient un scénario sérieux (phase 11).
- **Plus grosse incertitude** : la pénétration réelle de l'assistant Doctolib chez les dentistes de Clermont.
- **Meilleure objection** : un concurrent puissant prouve que le marché existe. Être le service local qui installe et règle (y compris l'outil de Doctolib, ou Ainora en marque blanche) peut être une vraie activité. **Ce qui me ferait changer d'avis** : des cabinets qui ont essayé l'assistant Doctolib et l'ont arrêté pour une raison qu'un service local règle.
