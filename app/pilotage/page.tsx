import type { Metadata } from "next";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { MetricCard } from "@/components/MetricCard";
import { getApplications, getDocuments, getTasks, getVisits, completionRate, isInactive, hoursSinceUpdate } from "@/lib/data";

export const metadata: Metadata = { title: "Pilotage", robots: { index: false, follow: false } };

const PRIORITY_LABELS: { key: "high" | "medium" | "low"; label: string }[] = [
  { key: "high", label: "Haute" },
  { key: "medium", label: "Moyenne" },
  { key: "low", label: "Basse" },
];

export default async function PilotagePage() {
  const [applications, documents, tasks, visits] = await Promise.all([
    getApplications(),
    getDocuments(),
    getTasks(),
    getVisits(),
  ]);

  const docsByApp = (id: string) => documents.filter((d) => d.application_id === id);

  const totalActifs = applications.length;

  const stageCounts = new Map<string, number>();
  for (const app of applications) {
    stageCounts.set(app.stage, (stageCounts.get(app.stage) ?? 0) + 1);
  }
  const stageBreakdown = Array.from(stageCounts.entries())
    .map(([stage, count]) => ({ stage, count }))
    .sort((a, b) => b.count - a.count);

  const blocked = applications
    .filter((a) => isInactive(a, 48))
    .map((a) => ({ app: a, hours: hoursSinceUpdate(a) }))
    .sort((a, b) => (b.hours ?? 0) - (a.hours ?? 0));

  const completionRates = applications.map((a) => completionRate(docsByApp(a.id)));
  const avgCompletion = completionRates.length
    ? Math.round(completionRates.reduce((sum, r) => sum + r, 0) / completionRates.length)
    : 100;

  const now = Date.now();
  const in7Days = now + 7 * 86400000;
  const visitesAVenir = visits.filter(
    (v) => v.scheduled_at && new Date(v.scheduled_at).getTime() >= now && new Date(v.scheduled_at).getTime() <= in7Days
  );
  const visitesEnAttente = visits.filter((v) => v.status === "À confirmer");

  const openTasks = tasks.filter((t) => t.status === "open");
  const tasksByPriority = PRIORITY_LABELS.map(({ key, label }) => ({
    key,
    label,
    count: openTasks.filter((t) => t.priority === key).length,
  }));

  const opportunities = applications.filter((a) => a.score >= 75 && a.visit_status !== "Confirmée");

  return (
    <AppShell
      title="Pilotage"
      subtitle="Vue d’ensemble pour les responsables : délais, dossiers bloqués, opportunités."
    >
      <div className="grid gap-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard label="Dossiers actifs" value={totalActifs} chip="total" tone="blue" />
          <MetricCard label="Bloqués depuis 48h+" value={blocked.length} chip="délai" tone={blocked.length ? "red" : "green"} />
          <MetricCard label="Complétude moyenne" value={`${avgCompletion}%`} chip="documents" tone={avgCompletion >= 75 ? "green" : "amber"} />
          <MetricCard label="Opportunités à traiter" value={opportunities.length} chip="visites" tone="amber" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="rounded-2xl border border-line bg-white p-5">
            <h3 className="font-display font-bold text-lg text-ink mb-4">Répartition par statut</h3>
            {stageBreakdown.length === 0 ? (
              <p className="text-sm text-muted">Aucun dossier pour le moment.</p>
            ) : (
              <div className="grid gap-3">
                {stageBreakdown.map(({ stage, count }) => (
                  <div key={stage}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-medium text-ink">{stage}</span>
                      <span className="text-muted">{count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-surface overflow-hidden">
                      <div
                        className="h-full rounded-full bg-brand-500"
                        style={{ width: `${totalActifs ? Math.round((count / totalActifs) * 100) : 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-line bg-white p-5">
            <h3 className="font-display font-bold text-lg text-ink mb-1">Dossiers bloqués depuis plus de 48h</h3>
            <p className="text-sm text-muted mb-4">
              {blocked.length} dossier{blocked.length > 1 ? "s" : ""} sans mise à jour depuis au moins 48h.
            </p>
            {blocked.length === 0 ? (
              <p className="text-sm text-muted">Aucun dossier bloqué actuellement.</p>
            ) : (
              <div className="grid gap-2">
                {blocked.map(({ app, hours }) => (
                  <Link
                    key={app.id}
                    href={`/applications/${app.id}`}
                    className="flex items-center justify-between rounded-xl border border-line px-3.5 py-2.5 text-sm hover:border-brand-200 transition-colors"
                  >
                    <span className="font-medium text-ink">
                      {app.first_name} {app.last_name}
                    </span>
                    <span className="text-xs text-muted">
                      {hours !== null ? `${Math.round(hours)} h sans mise à jour` : "Inactif"}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="rounded-2xl border border-line bg-white p-5">
            <h3 className="font-display font-bold text-lg text-ink mb-4">Visites</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-line p-4">
                <strong className="font-display font-bold text-2xl text-ink">{visitesAVenir.length}</strong>
                <p className="mt-1 text-sm text-muted">À venir sous 7 jours</p>
              </div>
              <div className="rounded-xl border border-line p-4">
                <strong className="font-display font-bold text-2xl text-ink">{visitesEnAttente.length}</strong>
                <p className="mt-1 text-sm text-muted">En attente de confirmation</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-line bg-white p-5">
            <h3 className="font-display font-bold text-lg text-ink mb-4">Tâches ouvertes par priorité</h3>
            <div className="grid gap-3">
              {tasksByPriority.map(({ key, label, count }) => (
                <div key={key}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium text-ink">{label}</span>
                    <span className="text-muted">{count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-surface overflow-hidden">
                    <div
                      className={`h-full rounded-full ${key === "high" ? "bg-red-500" : key === "medium" ? "bg-amber-500" : "bg-brand-500"}`}
                      style={{ width: `${openTasks.length ? Math.round((count / openTasks.length) * 100) : 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="rounded-2xl border border-line bg-white p-5">
          <h3 className="font-display font-bold text-lg text-ink mb-1">Opportunités nécessitant une action</h3>
          <p className="text-sm text-muted mb-4">
            Profils avec un score ≥ 75 dont la visite n’est pas encore confirmée.
          </p>
          {opportunities.length === 0 ? (
            <p className="text-sm text-muted">Aucune opportunité en attente pour le moment.</p>
          ) : (
            <div className="grid gap-2">
              {opportunities.map((app) => (
                <Link
                  key={app.id}
                  href={`/applications/${app.id}`}
                  className="flex items-center justify-between rounded-xl border border-line px-3.5 py-2.5 text-sm hover:border-brand-200 transition-colors"
                >
                  <span className="font-medium text-ink">
                    {app.first_name} {app.last_name}
                  </span>
                  <span className="text-xs text-muted">
                    Score {app.score} · Visite {app.visit_status.toLowerCase()}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}
