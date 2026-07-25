import type { Metadata } from "next";
import Link from "next/link";
import { Plus, ExternalLink } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { getApplications, getProperties } from "@/lib/data";

export const metadata: Metadata = { title: "Biens", robots: { index: false, follow: false } };

export default async function PropertiesPage() {
  const [properties, applications] = await Promise.all([getProperties(), getApplications()]);

  return (
    <AppShell title="Biens" subtitle="Pilotage par logement et candidatures liées.">
      <div className="grid gap-6">
        <section className="rounded-2xl bg-ink text-white p-8">
          <span className="text-xs font-semibold uppercase tracking-wide text-white/60">Vue par bien</span>
          <h2 className="mt-3 font-display font-bold text-3xl tracking-tight leading-tight">
            Une agence pilote
            <br />
            <span className="bg-gradient-to-r from-brand-300 to-violet-300 bg-clip-text text-transparent">
              aussi par logement.
            </span>
          </h2>
          <p className="mt-4 text-sm text-white/70 leading-relaxed max-w-xl">
            Pour chaque bien : candidatures reçues, visites, dossiers prêts et candidat recommandé.
          </p>
          <Link
            href="/properties/new"
            className="mt-6 inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-white text-ink text-sm font-semibold hover:bg-white/90 transition-colors"
          >
            <Plus size={16} /> Ajouter un bien
          </Link>
        </section>

        {properties.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line bg-white p-10 text-center">
            <p className="text-muted mb-4">Aucun bien enregistré pour le moment.</p>
            <Link
              href="/properties/new"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-ink text-white text-sm font-semibold hover:bg-brand-700 transition-colors"
            >
              <Plus size={16} /> Ajouter ton premier bien
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {properties.map((p) => {
              const apps = applications.filter((a) => a.property_id === p.id);
              const best = apps.slice().sort((a, b) => b.score - a.score)[0];
              return (
                <div key={p.id} className="rounded-2xl border border-line bg-white p-5 flex flex-col">
                  <h3 className="font-display font-bold text-lg text-ink">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {p.address} · {p.rent} € CC
                  </p>
                  <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-surface p-3">
                    <div>
                      <p className="font-display font-bold text-lg text-ink">{apps.length}</p>
                      <p className="text-[11px] text-muted">Candidats</p>
                    </div>
                    <div>
                      <p className="font-display font-bold text-lg text-ink">
                        {apps.filter((a) => a.visit_status === "Confirmée").length}
                      </p>
                      <p className="text-[11px] text-muted">Visites</p>
                    </div>
                    <div>
                      <p className="font-display font-bold text-lg text-ink">
                        {apps.filter((a) => a.stage === "Prêt à valider").length}
                      </p>
                      <p className="text-[11px] text-muted">Prêts</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 mt-auto pt-4">
                    {best && (
                      <Link
                        href={`/applications/${best.id}`}
                        className="inline-flex items-center h-9 px-3.5 rounded-lg bg-ink text-white text-sm font-semibold hover:bg-brand-700 transition-colors"
                      >
                        Ouvrir recommandé
                      </Link>
                    )}
                    <Link
                      href={`/apply/${p.id}`}
                      target="_blank"
                      className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg border border-line text-sm font-medium text-ink-soft hover:text-ink hover:border-ink/30 transition-colors"
                    >
                      Lien de candidature <ExternalLink size={13} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AppShell>
  );
}
