import { LegalPage } from "@/components/LegalPage";

export default function MentionsLegalesPage() {
  return (
    <LegalPage title="Mentions légales">
      <p>
        <b>Éditeur du site</b>
        <br />
        [Raison sociale], [forme juridique], au capital de [montant] €<br />
        Siège social : [Adresse complète]
        <br />
        SIRET : [Numéro SIRET] — RCS [Ville] [Numéro]
        <br />
        Directeur de la publication : [Nom, prénom]
        <br />
        Email : [contact@exemple.fr]
      </p>
      <p>
        <b>Hébergement</b>
        <br />
        Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis. La base de données et
        les fichiers sont hébergés par Supabase Inc.
      </p>
      <p>
        <b>Propriété intellectuelle</b>
        <br />
        L’ensemble des contenus présents sur ce site (textes, logo, interface) est la propriété de [Raison sociale], sauf
        mention contraire.
      </p>
      <p>
        <b>Contact</b>
        <br />
        Pour toute question relative à ces mentions légales : [contact@exemple.fr].
      </p>
    </LegalPage>
  );
}
