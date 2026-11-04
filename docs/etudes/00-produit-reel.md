# Phase 0 — Ce que le produit fait réellement (lecture du code, 4 novembre 2026)

**Règle** : seules les fonctionnalités présentes dans le code de l’application peuvent être vendues.

## 1. Fonctionnalités présentes (preuves dans le code)

| Fonctionnalité | Preuve |
|---|---|
| Candidatures : étapes, statuts, score, filtrage de la liste | `lib/actions.ts` (`updateApplicationStage`, `updateApplicationScore`), `components/ApplicationTable.tsx:21` (filtre) |
| Formulaire public de candidature par bien | `app/apply/[propertyId]/page.tsx`, `components/ApplyForm.tsx`, `submitApplication` |
| Pièces justificatives : dépôt, classement automatique par IA, validation (5 statuts) | `uploadDocument`, `suggestDocumentType`, `aiClassifyDocument` (`lib/ai.ts`), `updateDocumentStatus`, `supabase/schema.sql:7` |
| Portail candidat (le candidat voit et complète son dossier) | `app/candidate/page.tsx`, `components/CandidateUpload.tsx` |
| IA : qualification d’un prospect depuis un texte libre, synthèse de dossier, brouillons de messages, structuration des notes de visite, assistant | `lib/ai.ts` : `aiQualifyProspect`, `aiSummarizeDossier`, `aiDraftMessage`, `aiStructureVisitNotes`, `aiAnswerAssistant` |
| Envoi d’e-mails au candidat, modèles de messages | `sendMessageToCandidate`, `createMessageTemplate` (Resend, `lib/email.ts`) |
| Biens | `createProperty`, `app/properties` |
| Visites : planification, statut (4), compte rendu | `scheduleVisit`, `updateVisitStatus`, `saveVisitReport`, `supabase/schema.sql:37` |
| Tâches assignées | `assignTask`, `updateTaskStatus` |
| Recherche globale ⌘K | `components/CommandPalette.tsx:21`, `globalSearch` |
| Équipe : invitation, 4 rôles (admin, manager, agent, candidat) | `inviteTeammate`, `updateTeammateRole`, `supabase/schema.sql:4` |
| Pilotage (statistiques, réservé admin et manager) | `app/pilotage`, `lib/navItems.ts:28` |
| Abonnement Stripe (3 paliers d’exemple) | `lib/plans.ts`, `app/api/stripe/*` |
| Sécurité : politiques d’accès en base | `supabase/schema.sql` (`enable row level security`) |

**Hébergement et stockage** : Supabase (base PostgreSQL, authentification, stockage des fichiers). La région n’est pas indiquée dans le code `[NON TROUVÉ]` : à vérifier dans le tableau de bord Supabase.

## 2. Présenté sur le site mais ABSENT du code

| Affirmation du site | Constat |
|---|---|
| Export CSV compatible Excel | 0 occurrence de « csv » dans `app/`, `components/`, `lib/` |
| Sélection multiple et actions groupées | Aucune |
| Boutons « Appeler » (`tel:`) et « E-mail » par candidat | Aucun lien `tel:` ; `mailto:` présent seulement dans la gestion des erreurs, les réglages et l’en-tête |
| Toast « Annuler » | Aucun |
| Relances envoyées « à tout un groupe » | Envoi unitaire seulement |
| Thème sombre de l’application | Aucune classe `dark:` dans les composants de l’app : le site, lui, a les deux thèmes |
| Classement par score | Le score est affiché, il n’y a pas de tri |

Ces écarts sont corrigés sur le site en Phase 9 : les éléments sont retirés ou marqués « à venir ».

## 3. Job to be done et douleurs

**Job principal** : « Quand je publie une location, je veux recevoir des dossiers complets, voir vite les plus solides et répondre à tous les candidats, pour louer vite sans y passer mes journées ni oublier personne. »

Douleurs, avec leur source :
- **Volume** : 13 candidats par annonce en moyenne nationale au 1er semestre 2026, 41 à Paris et 43 à Nice (Manda, M5).
- **Dossiers incomplets et relances manuelles** : décrits par plusieurs éditeurs (Dossier.immo, CheckFile : « 40 % incomplets », C11). Ce sont des sources commerciales, donc à confirmer en entretien.
- **Contrainte réglementaire** : la liste des pièces exigibles est limitative et l’amende peut atteindre 3 000 € (décret 2015-1437, M6). Un dossier mal collecté est donc un risque juridique.
- **Concurrence gratuite** : DossierFacile (service public) et GreenLoc (offre gratuite) collectent déjà les dossiers (C1, C9).

## 4. Points faibles actuels (impact sur le prix et la feuille de route)

1. **Aucune intégration** aux logiciels métier (Hektor, Apimo, Modelo…) ni aux portails d’annonces. L’agence doit ressaisir les biens. C’est le frein n° 1 probable.
2. **Pas d’export de données**, alors que c’est attendu, notamment pour la réversibilité RGPD et contractuelle.
3. **Pas de signature électronique** ni d’import DossierFacile.
4. **Pas de vérification d’authenticité des documents** : GreenLoc s’appuie sur Finovox, ImmoPilot classe les pièces mais ne détecte pas les faux.
5. **Produit sans client ni historique**. Fondateur seul : support et disponibilité limités.
6. **Ce qui joue pour ImmoPilot** : l’IA intégrée (qualification, synthèse, brouillons, comptes rendus de visite), le portail candidat et la gestion des visites dans le même outil.
