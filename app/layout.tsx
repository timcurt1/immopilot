import "./globals.css";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const jbmono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jbmono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://immopilot.fr"),
  title: {
    default: "ImmoPilot — L'IA pensée pour les professionnels de l'immobilier",
    template: "%s — ImmoPilot",
  },
  description:
    "ImmoPilot centralise vos prospects, qualifie automatiquement les demandes et aide vos équipes à traiter chaque dossier immobilier plus rapidement, sans perdre la dimension humaine du métier.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "ImmoPilot",
    title: "ImmoPilot — L'IA pensée pour les professionnels de l'immobilier",
    description:
      "Le copilote intelligent qui centralise, qualifie et accompagne le suivi de vos prospects, dossiers et visites.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ImmoPilot — L'IA pensée pour les professionnels de l'immobilier",
    description: "Moins de tâches répétitives. Plus de temps pour vos clients.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${jakarta.variable} ${jbmono.variable}`}>
      <body className="font-sans antialiased text-ink bg-paper">{children}</body>
    </html>
  );
}
