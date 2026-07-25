import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Une question sur ImmoPilot, votre projet ou votre environnement logiciel ? Contactez notre équipe.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
