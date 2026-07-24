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

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ImmoPilot",
  url: "https://immopilot.fr",
  logo: "https://immopilot.fr/logo.png",
  description:
    "ImmoPilot est un copilote intelligent qui centralise les prospects, qualifie les demandes et accompagne le suivi quotidien des agences immobilières.",
  sameAs: ["https://www.linkedin.com"],
};

const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ImmoPilot",
  url: "https://immopilot.fr",
  inLanguage: "fr-FR",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${jakarta.variable} ${jbmono.variable}`}>
      <body className="font-sans antialiased text-ink bg-paper">
        {children}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }}
        />
      </body>
    </html>
  );
}
