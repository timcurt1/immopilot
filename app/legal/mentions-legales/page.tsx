import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site et du logiciel ImmoPilot.",
};

export default function MentionsLegalesPage() {
  return (
    <LegalPage title="Mentions légales" path="/legal/mentions-legales">
      <p>
        <b>Éditeur du site</b>
        <br />
        Tim Curt
        <br />
        Directeur de la publication : Tim Curt
        <br />
        Email : support.immopilot.world@gmail.com
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
        L’ensemble des contenus présents sur ce site (textes, logo, interface) est la propriété de Tim Curt, sauf
        mention contraire.
      </p>
      <p>
        <b>Contact</b>
        <br />
        Pour toute question relative à ces mentions légales : support.immopilot.world@gmail.com.
      </p>
    </LegalPage>
  );
}
