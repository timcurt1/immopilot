# ImmoPilot — Reste à compléter (mis à jour le 4 novembre 2026)

Tout ce qui n’a pas été fourni reste visible sur le site sous forme de marqueur ambre `[À COMPLÉTER : …]` ou `[À VALIDER]` : rien n’est inventé.

Pour tout retrouver :

```bash
python3 _qa/content-check.py
```

Ce script liste chaque marqueur avec `fichier:ligne`, les anciens placeholders, les liens cassés et la cohérence des prix et e-mails.

## 1. Tarifs — `immopilot-site/index.html`, section `#tarifs`

**Source unique** :
- Chaque offre a un attribut `data-price-month=""` sur sa balise `<b>` : mettez-y le prix mensuel HT, en nombre (`49` ou `129.9`), et remplacez le texte du marqueur par le même prix (`49 €`).
- La remise annuelle est l’attribut `data-annual-discount="15"` de la section.

**Calcul automatique** : le prix annuel est calculé par `assets/js/ui.js` (`initPricing`). Exemple vérifié dans le navigateur avec 49 :

| | Calcul | Résultat |
|---|---|---|
| Prix mensuel en facturation annuelle | 49 × (1 − 0,15) = 41,65 | 41,65 € HT / mois |
| Total facturé à l’année | 41,65 × 12 = 499,80 | 499,80 € HT |

Arrondi au centime.

| Marqueur | Ce qu’il faut fournir |
|---|---|
| nom de l’offre 1 / 2 / 3 | Nom commercial de chaque offre |
| cible de l’offre 1 / 2 / 3 | Une phrase : pour qui est l’offre |
| prix mensuel HT (×3) | Montant, ou « Sur devis » |
| par agence ou par utilisateur | Unité de facturation |
| limites et fonctionnalités incluses (×3) | Liste pour chaque offre |
| Engagement et résiliation | Sans engagement, ou durée minimale et préavis |
| Essai gratuit | Durée, ou « aucun » ; carte bancaire demandée ou non |
| Frais de mise en place | Montant, ou « aucun » |
| Moyens de paiement | Carte, prélèvement SEPA, virement… |
| Offre sur mesure | Oui / non |

**Mise en avant** : la carte du milieu garde le style mis en avant (design), mais son badge « Recommandé » a été retiré, faute de désignation.

**À arbitrer** : le code contient deux jeux d’offres contradictoires (voir le rapport `docs/contenu-rapport.md`).

## 2. Chiffres clés — `#chiffres`

Faits. Les six chiffres sont des faits produit comptés dans le code ; la source de chacun est en commentaire dans le HTML.

**À ajouter quand vous aurez des données réelles, avec leur source** : heures gagnées, jours de vacance locative en moins, dossiers traités, nombre d’agences clientes.

## 3. Mentions légales, confidentialité, CGV — `immopilot-site/legal.html`

| Bloc | Ce qu’il faut fournir |
|---|---|
| Éditeur (1.1) | Nom complet, forme juridique, capital (si société), adresse, SIREN/SIRET, RCS ou RNE, TVA (ou mention art. 293 B du CGI), directeur de la publication, e-mail, téléphone |
| Hébergeur du site (1.2) | Nom, adresse, téléphone |
| Contact RGPD (1.4, 2.1, 2.5) | E-mail du contact RGPD ou du DPO |
| Tribunal (1.6, art. 13) | Ressort du tribunal compétent |
| Hébergement de l’app (2.4, art. 9) | Hébergeur, pays, garanties de transfert hors UE |
| Prestataires (2.4) | Confirmer Supabase, Stripe, Resend, Anthropic en production |
| CGV art. 5 | Prix, moyens de paiement, échéance, préavis de révision, taux de pénalité de retard (au moins trois fois le taux d’intérêt légal), frais de mise en place |
| CGV art. 6 et 7 | Engagement, préavis, délai d’export puis de suppression, essai gratuit |
| CGV art. 8 | Support : canaux, horaires, délais |
| CGV art. 9 | Délai d’information sur les sous-traitants ; DPA disponible ou non |
| CGV art. 12 et 13 | Durée de confidentialité après le contrat ; délai de notification des modifications |
| À valider | Nom « ImmoPilot », base légale du formulaire, conservation 3 ans, plafond de responsabilité (12 mois), médiation non applicable |

**À faire relire par un juriste ou un avocat avant la mise en ligne.**

## 4. Formulaire de démo — `immopilot-site/index.html`, `#demo`

| Marqueur | Ce qu’il faut faire |
|---|---|
| service et URL | Choisir un service, créer le compte, puis coller l’URL publique dans l’attribut `action="…"` du `<form>`. Mode d’emploi : README, section Formulaire |
| éditeur (mention RGPD) | Identité du responsable du traitement |
| 3 ans [À VALIDER] | Confirmer la durée de conservation |

Tant que `action` est vide, le formulaire affiche « L’envoi du formulaire n’est pas encore activé » et n’envoie rien.

## 5. Autres marqueurs existants (hors des 4 blocs)

- **Sécurité** (`#securite`) : hébergeur et pays, délai et procédure d’effacement, durée de conservation et contact RGPD.
- **FAQ** : délai de mise en route, import de données, hébergement et sous-traitants, engagement.
- **Pied de page** : e-mail de contact, raison sociale et SIREN.
