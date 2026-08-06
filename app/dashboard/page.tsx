import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { MetricCard } from "@/components/MetricCard";
import { ActionList } from "@/components/ActionList";
import { getApplications, getDocuments, getTasks, completionRate } from "@/lib/data";

export const metadata: Metadata = { title: "Tableau de bord", robots: { index: false, follow: false } };

export default async function DashboardPage() {
  const [applications, documents, tasks] = await Promise.all([getApplications(), getDocuments(), getTasks()]);
  const ready = applications.filter(
    (a) => a.stage === "Prêt à valider" || completionRate(documents.filter((d) => d.application_id === a.id)) >= 95
  ).length;
  const missing = documents.filter((d) => d.status === "manquant" || d.status === "à vérifier").length;
  const signatures = applications.filter((a) => a.signature_probability >= 75).length;

  return (
    <AppShell title="Tableau de bord" subtitle="Actions du jour, dossiers prêts et priorités.">
      <div className="grid gap-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard label="Actions ouvertes" value={tasks.length} chip="à traiter" tone="amber" />
          <MetricCard label="Dossiers prêts" value={ready} chip="validation" tone="green" />
          <MetricCard label="Documents à traiter" value={missing} chip="relances" tone="amber" />
          <MetricCard label="Signatures probables" value={signatures} chip="business" tone="green" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="rounded-2xl bg-ink text-white p-8">
            <span className="text-xs font-semibold uppercase tracking-wide text-white/60">Daily Operations</span>
            <h2 className="mt-3 font-display font-bold text-3xl tracking-tight leading-tight">
              Ouvrir l&rsquo;app
              <br />
              <span className="bg-gradient-to-r from-brand-300 to-violet-300 bg-clip-text text-transparent">
                et savoir quoi faire.
              </span>
            </h2>
            <p className="mt-4 text-sm text-white/70 leading-relaxed">
              La version SaaS transforme chaque candidature en action concrète : relancer, demander un document, confirmer
              une visite ou valider le dossier.
            </p>
            <div className="mt-6 rounded-xl bg-white/10 p-4">
              <p className="text-sm font-semibold">Prochaine étape recommandée</p>
              <p className="mt-1 text-sm text-white/80">{tasks[0]?.title || "Aucune action urgente."}</p>
            </div>
          </section>
          <section className="rounded-2xl border border-line bg-white p-5">
            <h3 className="font-display font-bold text-lg text-ink mb-4">Tâches du jour</h3>
            <ActionList tasks={tasks} applications={applications} documents={documents} />
          </section>
        </div>
      </div>
    </AppShell>
  );
}
