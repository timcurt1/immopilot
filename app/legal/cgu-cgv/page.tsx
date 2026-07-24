import { LegalPage } from "@/components/LegalPage";

export default function CguCgvPage() {
  return (
    <LegalPage title="Conditions générales d’utilisation et de vente" path="/legal/cgu-cgv">
      <p>
        Les présentes conditions régissent l’accès et l’utilisation d’ImmoPilot, service SaaS de gestion locative édité par
        [Raison sociale], par toute agence immobilière cliente (« le Client »).
      </p>
      <p>
        <b>1. Objet</b>
        <br />
        ImmoPilot permet à une agence de gérer ses biens, candidatures locatives, documents associés et communications avec
        les candidats.
      </p>
      <p>
        <b>2. Abonnement et tarifs</b>
        <br />
        L’accès est proposé par abonnement mensuel sans engagement, selon les paliers Starter, Pro et Agence décrits sur la
        page tarifs. Les tarifs sont exprimés hors taxes et facturés mensuellement via Stripe.
      </p>
      <p>
        <b>3. Durée et résiliation</b>
        <br />
        L’abonnement est résiliable à tout moment depuis l’espace de gestion de l’abonnement (portail Stripe), avec effet à
        la fin de la période en cours. Aucun remboursement au prorata n’est effectué sauf disposition légale contraire.
      </p>
      <p>
        <b>4. Responsabilités du Client</b>
        <br />
        Le Client est responsable de la licéité des données qu’il traite via ImmoPilot (notamment le respect du RGPD vis-à-vis
        des candidats locataires) et de la confidentialité de ses identifiants.
      </p>
      <p>
        <b>5. Disponibilité et support</b>
        <br />
        [Raison sociale] met en œuvre les moyens raisonnables pour assurer la disponibilité du service, sans garantie de
        continuité absolue. Le support est accessible à [contact@exemple.fr].
      </p>
      <p>
        <b>6. Droit applicable</b>
        <br />
        Les présentes conditions sont soumises au droit français. Tout litige relève des tribunaux compétents du ressort du
        siège social de [Raison sociale].
      </p>
    </LegalPage>
  );
}
