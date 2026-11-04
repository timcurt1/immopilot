# ImmoPilot — Reste à compléter (mis à jour le 4 novembre 2026, après les études)

Les décisions de prix et de positionnement viennent de `docs/etudes/` (synthèse : `docs/etudes/00-synthese.md`). Ce qui manque encore reste visible sur le site sous forme de marqueur ambre `[À COMPLÉTER]` / `[À VALIDER]`.

Pour tout lister :

```bash
python3 _qa/content-check.py
```

Pour vérifier que les prix du site correspondent aux calculs :

```bash
python3 docs/etudes/calculs.py
```

## 1. Tarifs — renseignés

- **Grille** : Essentiel 39 € HT, Agence 79 € HT, Réseau sur devis ; −15 % en annuel, essai de 30 jours sans carte bancaire, sans engagement. Mêmes valeurs dans le JSON-LD et les CGV.
- **Source unique** : `data-price-month` de chaque offre et `data-annual-discount` de la section `#tarifs`.
- **Reste** :
  - `[À COMPLÉTER]` mention TVA, selon le statut : en micro-entreprise sous le seuil, « TVA non applicable, art. 293 B du CGI » ;
  - aligner `lib/plans.ts` (prix d’exemple 49 / 129 / 299 €) et les Price IDs Stripe sur 39 / 79 €.

## 2. Chiffres clés — renseignés

Cinq chiffres produit comptés dans le code, plus « 13 candidats par annonce » (baromètre Manda, 1er semestre 2026, source visible).

## 3. Mentions légales, confidentialité, CGV — `immopilot-site/legal.html`

| À fournir | Où |
|---|---|
| Identité de l’éditeur : nom, forme, capital, adresse (ou domiciliation), SIREN/SIRET, RCS/RNE, TVA, directeur de la publication, e-mail, téléphone | 1.1, CGV art. 14, pied de page |
| Hébergeur du site : nom, adresse, téléphone | 1.2 |
| Contact RGPD | 1.4, 2.1, 2.5 |
| Hébergement de l’application (région Supabase) et garanties de transfert | 2.4, CGV art. 9, section Sécurité |
| Service d’envoi du formulaire | 2.2 |
| Tribunal compétent | 1.6, CGV art. 13 |
| Délais : préavis de révision des prix, export puis suppression, information sur les sous-traitants, confidentialité, notification des modifications | CGV art. 5, 6, 9, 12, 13 |
| Accord de sous-traitance (DPA) disponible ou non | CGV art. 9 |

**À valider** : nom « ImmoPilot », base légale du formulaire, conservation 3 ans, pénalités égales à trois fois le taux légal, plafond de responsabilité (12 mois), médiation non applicable, transmission des données sur demande en attendant l’export.

**À faire relire par un juriste avant la mise en ligne.**

## 4. Formulaire de démo

Créer `demo@immopilot.world`, ouvrir un compte Formspree (recommandé, voir `docs/etudes/08-funnel-demo.md`) et coller l’URL dans l’attribut `action` du `<form>`. Mode d’emploi dans le README.

## 5. Fonctionnalités marquées « à venir » sur le site

À retirer de cette liste au fur et à mesure qu’elles sont développées dans l’application :
- export CSV ;
- sélection multiple et actions groupées ;
- appel et e-mail depuis la liste ;
- Annuler ;
- envoi groupé ;
- thème sombre de l’application.
