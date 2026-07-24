import type { Metadata } from "next";
import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { getApplications, getProperties } from "@/lib/data";

export const metadata: Metadata = { title: "Biens", robots: { index: false, follow: false } };

export default async function PropertiesPage() {
  const [properties, applications] = await Promise.all([getProperties(), getApplications()]);

  return (
    <main className="appShell">
      <Topbar title="Biens" subtitle="Pilotage par logement et candidatures liées." />
      <div className="layout">
        <Sidebar />
        <section className="main">
          <section className="glass hero">
            <span className="kicker">Vue par bien</span>
            <h2>
              Une agence pilote
              <br />
              <span className="grad">aussi par logement.</span>
            </h2>
            <p>Pour chaque bien : candidatures reçues, visites, dossiers prêts et candidat recommandé.</p>
            <Link className="btn primary" style={{ marginTop: 14, width: "max-content" }} href="/properties/new">
              + Ajouter un bien
            </Link>
          </section>
          {properties.length === 0 ? (
            <div className="emptyState">
              <p>Aucun bien enregistré pour le moment.</p>
              <Link className="btn primary" href="/properties/new">
                Ajouter ton premier bien
              </Link>
            </div>
          ) : (
            <div className="grid3">
              {properties.map((p) => {
                const apps = applications.filter((a) => a.property_id === p.id);
                const best = apps.slice().sort((a, b) => b.score - a.score)[0];
                return (
                  <div key={p.id} className="card">
                    <h3 style={{ marginTop: 0, color: "var(--navy)" }}>{p.title}</h3>
                    <p style={{ color: "var(--muted)" }}>
                      {p.address} · {p.rent} € CC
                    </p>
                    <div className="grid3" style={{ marginTop: 12 }}>
                      <div>
                        <b>{apps.length}</b>
                        <br />
                        <span style={{ fontSize: 11, color: "var(--muted)" }}>Candidats</span>
                      </div>
                      <div>
                        <b>{apps.filter((a) => a.visit_status === "Confirmée").length}</b>
                        <br />
                        <span style={{ fontSize: 11, color: "var(--muted)" }}>Visites</span>
                      </div>
                      <div>
                        <b>{apps.filter((a) => a.stage === "Prêt à valider").length}</b>
                        <br />
                        <span style={{ fontSize: 11, color: "var(--muted)" }}>Prêts</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
                      {best && (
                        <Link className="btn primary" href={`/applications/${best.id}`}>
                          Ouvrir recommandé
                        </Link>
                      )}
                      <Link className="btn ghost" href={`/apply/${p.id}`} target="_blank">
                        Lien de candidature ↗
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
