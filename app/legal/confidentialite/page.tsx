import { LegalPage } from "@/components/LegalPage";

export default function ConfidentialitePage() {
  return (
    <LegalPage title="Politique de confidentialité" path="/legal/confidentialite">
      <p>
        [Raison sociale] (« nous ») édite ImmoPilot, un logiciel de gestion locative destiné aux agences immobilières. Cette
        politique décrit comment les données des utilisateurs (agences, agents) et des candidats locataires sont traitées.
      </p>
      <p>
        <b>Données collectées</b>
        <br />
        Identité et coordonnées des agents et candidats, données professionnelles et financières nécessaires à l’étude d’un
        dossier locatif (statut professionnel, revenus, garant), documents justificatifs (pièce d’identité, avis d’imposition,
        fiches de paie, RIB).
      </p>
      <p>
        <b>Finalité et base légale</b>
        <br />
        Ces données sont traitées pour permettre l’étude et le suivi des candidatures locatives, sur la base de l’exécution
        des démarches précontractuelles demandées par le candidat (art. 6.1.b du RGPD) et de l’intérêt légitime de l’agence.
      </p>
      <p>
        <b>Conservation</b>
        <br />
        Les dossiers non retenus sont conservés [durée à définir, ex : 3 mois] puis supprimés. Les dossiers des locataires en
        place sont conservés pour la durée du bail plus les délais légaux de prescription.
      </p>
      <p>
        <b>Hébergement et sécurité</b>
        <br />
        Les données sont hébergées chez Supabase (PostgreSQL), avec un cloisonnement strict par agence (Row Level Security) et
        un stockage des documents dans un espace privé non accessible publiquement.
      </p>
      <p>
        <b>Droits des personnes</b>
        <br />
        Conformément au RGPD, toute personne dispose d’un droit d’accès, de rectification, d’effacement et de portabilité de
        ses données. Ces demandes peuvent être adressées à [contact@exemple.fr] ou via le formulaire disponible dans les
        réglages de l’application.
      </p>
      <p>
        <b>Sous-traitants</b>
        <br />
        Supabase Inc. (base de données, authentification, stockage de fichiers), Vercel Inc. (hébergement applicatif), Stripe
        Inc. (paiement), [prestataire d’emailing] (envoi d’emails transactionnels).
      </p>
    </LegalPage>
  );
}
