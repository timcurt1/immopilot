# Phase 2 — Concurrence (benchmark réel, 4 novembre 2026)

Le tableau complet, avec une ligne par concurrent et ses sources, est dans `02-concurrence.csv`.

**Réserve générale.** Aucun grand logiciel métier ne publie ses prix. Les montants ci-dessous viennent de comparateurs tiers et sont signalés comme tels. Les pages officielles n’ont pas pu être ouvertes depuis l’environnement (politique réseau).

## 1. Trois cercles

| Cercle | Acteurs | Prix d’entrée | Unité |
|---|---|---|---|
| **(b) Spécialistes candidatures / dossiers** — concurrence directe | GreenLoc, DossierFacile, Dossier.immo, CheckFile | **0 €** (GreenLoc gratuit, DossierFacile gratuit) ; CheckFile environ 0,30 € par fichier | Non publique |
| **(a) Logiciels métier d’agence** (CRM, transaction, gestion) | Hektor, Apimo, Netty/Modelo, ImmoFacile/AC3, Lockimmo, Ublo | 49 à 99 €/mois en prix d’appel (tiers) ; 103,79 €/mois de moyenne pour 343 logiciels immobiliers (C10) | Agence, utilisateur ou lot |
| **(c) Solutions « maison »** | Excel, e-mail, agenda, CRM génériques | 0 € en apparence | — |

## 2. Matrice prix × périmètre

```
 prix ↑
  250 € |                    Netty/Modelo (options)   Lockimmo (haut)
  100 € |        ImmoPilot Agence (79)      Hektor · Apimo · Netty (appel)
   50 € |   ImmoPilot Essentiel (39)   ImmoFacile (bas)
    0 € | GreenLoc · DossierFacile                       Excel/e-mail
        +-------------------------------------------------------→ périmètre
          collecte de dossiers   tri + suivi + visites + IA   CRM / gestion complète
```

## 3. Où est l’espace libre ?

- **Entre le gratuit spécialisé** (GreenLoc, DossierFacile), qui collecte les dossiers, **et le CRM complet** à 80–250 €/mois, qui gère surtout la transaction et la diffusion.
- **La promesse d’ImmoPilot** : tout ce qui se passe entre la publication de l’annonce et le choix du locataire, dans un seul écran.
  - Ce qui existe : collecte via le portail candidat, pièces classées par IA, score, réponses rédigées par IA, visites avec compte rendu, tâches d’équipe.
  - Ce que ça évite : remplacer le CRM de l’agence ou payer un tout-en-un.
- **Positionnement prix** : un complément du CRM existant. Moins cher qu’un CRM, plus complet que la collecte gratuite.
- **Risque principal** : GreenLoc est gratuit et revendique plus de 600 agences. ImmoPilot doit donc gagner sur ce que la collecte seule ne fait pas (IA, visites, suivi d’équipe), et non sur la collecte elle-même. Il faut aussi éviter de prétendre détecter les faux documents tant que ce n’est pas le cas.

## 4. Faiblesses citées chez les concurrents

Extraits courts, tous tirés des sources listées dans `99-sources.md`. Aucun avis vérifié (Capterra, Trustpilot) n’a pu être lu.

- **Hektor** : des clients évoquent un engagement de douze mois (Hackceleration, C2).
- **Netty** : le coût réel dépasse le prix d’appel, « entre 158 € et 250 € par mois avec un site web » (Diffuze, C4).
- **Lockimmo, Ublo** : sur devis, avec frais de mise en place (setup) chez Ublo (C6, C7).
- **Dossiers incomplets** : environ « 40 % » à la première soumission, et environ « 20 minutes » de vérification manuelle par dossier, d’après un cas client commercial de CheckFile (C11).

**Ce que je n’ai pas pu faire** : collecter des notes et des avis Capterra, G2 ou Google vérifiables. Les pages étaient bloquées et les extraits insuffisants, donc ces données sont `[NON TROUVÉ]`.
