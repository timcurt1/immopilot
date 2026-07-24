import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Politique relative aux cookies",
  description: "Quels cookies utilise le site ImmoPilot et comment gérer vos préférences.",
};

export default function CookiesPage() {
  return (
    <LegalPage title="Politique relative aux cookies" path="/legal/cookies">
      <p>
        Ce site et l'application ImmoPilot utilisent un nombre limité de cookies et technologies similaires, nécessaires au
        fonctionnement du service ou destinés à mesurer son audience de façon respectueuse de la vie privée.
      </p>
      <p>
        <b>Cookies strictement nécessaires</b>
        <br />
        Ces cookies permettent l'authentification, le maintien de la session et la sécurité du site. Ils ne peuvent pas être
        désactivés, car le service ne fonctionnerait pas sans eux.
      </p>
      <p>
        <b>Cookies de mesure d'audience</b>
        <br />
        Lorsqu'un outil d'analyse est activé, il est configuré pour rester respectueux du RGPD (données agrégées, absence de
        profilage publicitaire). Aucune donnée n'est partagée à des fins publicitaires.
      </p>
      <p>
        <b>Gestion de vos préférences</b>
        <br />
        Vous pouvez à tout moment modifier vos préférences de cookies non essentiels depuis les paramètres de votre
        navigateur. [Un bandeau de gestion des cookies dédié pourra être ajouté ici selon l'outil retenu.]
      </p>
      <p>
        <b>Durée de conservation</b>
        <br />
        Les cookies déposés ont une durée de vie limitée [durée à définir] et sont automatiquement supprimés à l'expiration
        de cette période.
      </p>
    </LegalPage>
  );
}
