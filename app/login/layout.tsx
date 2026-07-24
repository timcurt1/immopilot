import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion",
  description: "Connectez-vous à votre espace agence ImmoPilot.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
