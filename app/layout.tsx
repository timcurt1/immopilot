import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ImmoPilot V25 SaaS",
  description: "Base SaaS pour agences immobilières",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
