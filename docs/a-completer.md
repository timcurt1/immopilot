# ImmoPilot — Reste à compléter / à valider

Tout ce qui n’a pas été fourni est balisé dans le site par `[À COMPLÉTER]` ou `[À VALIDER]` (pastille ambre, bien visible). Rien n’a été inventé : aucun témoignage, aucun logo client, aucune statistique de résultat.

Pour tout retrouver : `grep -rn "À COMPLÉTER\|À VALIDER" immopilot-site`

## 1. Tarifs (`index.html`, section `#tarifs`)
- [ ] Prix Starter / Croissance / Premium, en mensuel **et** en annuel (attributs `data-price-month` / `data-price-year`, plus le texte affiché).
- [ ] Remise annuelle en % (bouton « Annuel »).
- [ ] Nombre d’agents inclus dans Croissance.
- [ ] À valider : « dossiers illimités » (Starter), « reprise de vos données » et « accompagnement dédié » (Premium).
- [ ] À valider : badge « Recommandé » sur Croissance.

## 2. Chiffres clés (`#chiffres`)
Les 3 premiers compteurs sont des faits produit (2 vues, 1 raccourci ⌘K, 100 % en français). Les 3 suivants attendent de **vraies mesures** :
- [ ] Heures gagnées par agent et par semaine.
- [ ] Jours de vacance locative en moins.
- [ ] Dossiers traités chaque mois.
Pour activer l’animation : remplacer `[À COMPLÉTER]` par `<span data-count="42">42</span>`.

## 3. Sécurité & RGPD (`#securite`, FAQ, `legal.html`)
- [ ] Hébergeur, pays d’hébergement, certification éventuelle.
- [ ] Délai et procédure de droit à l’effacement.
- [ ] Durée de conservation des dossiers, DPO / contact RGPD, sous-traitants.
- [ ] À vérifier dans l’app : l’affirmation « chaque action est horodatée dans l’historique » (la timeline existe, sa couverture exhaustive est à confirmer).

## 4. FAQ (`#faq`)
- [ ] Délai moyen de mise en route, accompagnement inclus.
- [ ] Import de données existantes (l’export CSV, lui, existe).
- [ ] Engagement et préavis de résiliation.

## 5. Formulaire de démo (`assets/js/ui.js`)
- [ ] `FORM_ENDPOINT` : URL de destination (Formspree, CRM, webhook). **Tant qu’elle est vide**, le formulaire ouvre la messagerie du visiteur avec la demande pré-remplie (aucune demande n’est perdue silencieusement, mais le visiteur doit cliquer « Envoyer »).
- [ ] `CONTACT_EMAIL` (actuellement `contact@immopilot.world`) : confirmer que la boîte existe. Elle apparaît aussi dans le footer, la palette ⌘K et `legal.html`.
- [ ] À valider : « Réponse sous 24 h ouvrées ».

## 6. Mentions légales (`legal.html`, footer)
- [ ] Raison sociale, forme, capital, siège, SIREN/RCS, TVA, directeur de publication, hébergeur du site.
- [ ] Politique de confidentialité complète et CGV (à faire relire par un juriste).

## 7. Choix à valider
- Accent : bleu de l’app `#3557ff` → cyan `#22d3ee` (dégradé réservé aux mots-clés et au CTA).
- Titre hero : « Vos candidatures. Sous contrôle. » (variantes dans `docs/brief.md`).
- Thème sombre par défaut ; le choix du visiteur est mémorisé dans son navigateur.
- Le carrousel des bénéfices n’est **pas** épinglé au scroll : on le fait glisser (élan + snap + rubber-band). L’épingler aurait détourné le scroll vertical, ce que le cahier des charges interdit (« jamais de piège »).
- Pas de GSAP, Lenis ni Motion : moteur de ressorts maison de 2 Ko (justification dans `docs/brief.md`, § 5).
- Prénom fictif « Julie » et candidats fictifs dans les maquettes, marqués « Données fictives de démonstration ».
- Les boutons Appeler / E-mail de la démo affichent un toast au lieu de lancer un vrai `tel:` / `mailto:` vers une personne fictive.
- L’ancienne vitrine Next.js (`app/(marketing)`) est toujours dans le dépôt : à retirer quand le nouveau site sera en ligne.
