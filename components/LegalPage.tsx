import Link from "next/link";
import type { ReactNode } from "react";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="appShell" style={{ display: "grid", placeItems: "center" }}>
      <section className="glass hero" style={{ maxWidth: 760, width: "100%" }}>
        <Link className="btn ghost" href="/" style={{ width: "max-content", marginBottom: 14 }}>
          ← Retour à l’accueil
        </Link>
        <div className="notice" style={{ marginBottom: 18 }}>
          <b>⚠️ Modèle à faire relire par un professionnel du droit</b>
          <p>
            Ce texte est un point de départ générique, pas un document juridique validé. Vu la nature des données traitées
            (revenus, pièces d’identité, situation locative), fais-le relire avant toute mise en ligne réelle, et remplace les
            champs entre crochets par les informations exactes de ta société.
          </p>
        </div>
        <h1 style={{ color: "var(--navy)" }}>{title}</h1>
        <div style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.7 }}>{children}</div>
      </section>
    </main>
  );
}
