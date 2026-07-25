import Link from "next/link";
import { Linkedin } from "lucide-react";
import { Logo } from "./Logo";

const COLUMNS = [
  {
    title: "Produit",
    links: [
      { href: "/solution", label: "Solution" },
      { href: "/fonctionnalites", label: "Fonctionnalités" },
      { href: "/cas-dusage", label: "Cas d'usage" },
      { href: "/tarifs", label: "Tarifs" },
      { href: "/securite", label: "Sécurité" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { href: "/ressources", label: "Centre de ressources" },
      { href: "/demo", label: "Démo interactive" },
      { href: "/demande-demo", label: "Demander une démo" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { href: "/a-propos", label: "À propos" },
      { href: "/contact", label: "Contact" },
      { href: "/login", label: "Connexion" },
      { href: "/statut", label: "Statut du service" },
    ],
  },
  {
    title: "Légal",
    links: [
      { href: "/legal/mentions-legales", label: "Mentions légales" },
      { href: "/legal/confidentialite", label: "Politique de confidentialité" },
      { href: "/legal/cookies", label: "Politique relative aux cookies" },
      { href: "/legal/cgu-cgv", label: "Conditions générales" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto max-w-6xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          <div className="col-span-2">
            <Logo tagline />
            <p className="mt-4 text-sm text-muted leading-relaxed max-w-xs">
              ImmoPilot — L'intelligence artificielle au service des professionnels de l'immobilier.
            </p>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ImmoPilot sur LinkedIn"
              className="mt-5 inline-flex items-center justify-center w-9 h-9 rounded-lg border border-line text-ink-soft hover:text-ink hover:border-ink/30 transition-colors"
            >
              <Linkedin size={16} />
            </a>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-4">{col.title}</p>
              <ul className="grid gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-ink-soft hover:text-ink transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 pt-8 border-t border-line flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-xs text-muted">
          <p>© {new Date().getFullYear()} ImmoPilot. Tous droits réservés.</p>
          <p>Hébergement européen · Conçu pour les professionnels de l'immobilier</p>
        </div>
      </div>
    </footer>
  );
}
