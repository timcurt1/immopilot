# Phase 8 — Formulaire de démo et funnel

## 1. Service de réception

Comparatif sur extraits de recherche (F1) ; les pages officielles n’ont pas pu être ouvertes.

| Service | Gratuit | Avantages | Limites |
|---|---|---|---|
| **Web3Forms** | 250 envois/mois | Aucun compte complexe, clé publique prévue pour être côté client | Clé visible dans le HTML ; pas de pièces jointes en gratuit |
| Formspree | 50 envois/mois ; payant dès 15 $/mois | Adresse masquée, champ anti-spam `_gotcha` natif, tableau de bord | Plafond gratuit bas |
| Netlify Forms | Informations contradictoires | Natif sur Netlify | Ne fonctionne que sur Netlify ; or le site vise Vercel |

**Recommandation : Formspree**, avec Web3Forms en alternative.
- **Pour** : 50 demandes de démo par mois suffisent largement au lancement, puisque l’objectif central est 4 démos par semaine. L’adresse de réception n’apparaît jamais dans le HTML, et le champ piège déjà en place (`_gotcha`) est reconnu nativement.
- **Contre** : au-delà de 50 demandes par mois, Formspree devient payant ; on bascule alors sur Web3Forms (250 gratuits) sans toucher au site, simplement en changeant l’attribut `action`.

**Adresse de réception** : `[À COMPLÉTER : e-mail de réception]`. Timéo n’en a pas fourni.
- Créer `demo@immopilot.world` sur le domaine.
- Ne pas utiliser d’adresse personnelle.
- Aucune adresse n’est inventée ici.

## 2. Parcours

1. **Formulaire** : 4 champs (nom, e-mail professionnel, agence, nombre de lots). C’est déjà le minimum. Ne pas ajouter le téléphone, qui fait perdre des conversions `[HYPOTHÈSE courante, non mesurée]`.
2. **Message affiché** : « Merci, votre demande est bien envoyée. Nous revenons vers vous pour convenir d’un créneau. » Il est déjà en place, sans promesse de délai.
3. **Délai promis** : aucun sur le site tant que le fondateur ne peut pas le tenir. Objectif interne : répondre sous 1 jour ouvré.
4. **E-mail de confirmation automatique** : réponse automatique Formspree, à activer dans son tableau de bord. Texte proposé :
   > Bonjour [Nom], merci pour votre demande de démo ImmoPilot. Je vous écris personnellement très bientôt pour fixer un créneau de 30 minutes. — Timéo
5. **Suivi** : une feuille Google Sheets ou un CRM gratuit, avec les colonnes date, agence, ville, lots, source, statut (nouveau, contacté, démo, essai, client, perdu) et prochaine action.

## 3. Séquence de relance (si pas de réponse après le premier contact)

| Délai | Objet | Message |
|---|---|---|
| J+2 | « Votre démo ImmoPilot » | Rappel bref, avec 2 créneaux proposés |
| J+6 | « Une question sur vos candidatures » | Une question concrète : « Combien de dossiers incomplets recevez-vous par annonce ? », avec réponse en un mot possible |
| J+14 | « Je clôture votre demande » | Dernier message poli et porte ouverte ; aucune autre relance ensuite |
