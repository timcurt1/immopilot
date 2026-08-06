import Link from "next/link";
import { ArrowRight, AlertTriangle, Users, Calendar, FileWarning, Mail, Sparkles, TrendingUp } from "lucide-react";
import { DemoPageHeader } from "@/components/demo/DemoPageHeader";
import { StatusBadge } from "@/components/demo/StatusBadge";
import { DEMO_KPIS, DEMO_PROSPECTS, DEMO_TASKS, DEMO_VISITS } from "@/lib/demoContent";

const METRICS = [
  { label: "Nouveaux prospects", value: "6", icon: Users },
  { label: "Demandes urgentes", value: "3", icon: AlertTriangle },
  { label: "Visites aujourd'hui", value: DEMO_VISITS.length.toString(), icon: Calendar },
  { label: "Dossiers incomplets", value: DEMO_KPIS.dossiersIncomplets.toString(), icon: FileWarning },
];

export default function DemoOverviewPage() {
  const urgentTasks = DEMO_TASKS.filter((t) => t.priority === "Élevée").slice(0, 4);

  return (
    <>
      <DemoPageHeader
        title="Bonjour Léa, voici votre journée"
        description="Mercredi 24 juillet — Agence Bellevue Immobilier"
        actions={
          <span className="inline-flex items-center gap-1.5 rounded-full bg-positive-soft text-green-700 px-3 py-1.5 text-xs font-semibold">
            <TrendingUp size={13} /> {DEMO_KPIS.demandesTraitees} demandes traitées
          </span>
        }
      />

      <div className="px-6 md:px-8 pb-12 grid gap-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {METRICS.map((m) => (
            <div key={m.label} className="rounded-2xl border border-line bg-white p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                  <m.icon size={15} />
                </span>
              </div>
              <p className="text-2xl font-display font-bold text-ink">{m.value}</p>
              <p className="text-xs text-muted mt-0.5">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6">
          <div className="rounded-2xl border border-line bg-white overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-line">
              <p className="font-semibold text-ink text-sm">Relances recommandées par ImmoPilot</p>
              <Link href="/demo/taches" className="text-xs font-semibold text-brand-600 flex items-center gap-1">
                Toutes les tâches <ArrowRight size={12} />
              </Link>
            </div>
            <ul>
              {urgentTasks.map((t) => (
                <li key={t.id} className="flex items-center gap-3 px-5 py-3.5 border-b border-line last:border-0">
                  <AlertTriangle size={15} className="text-amber-500 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-ink truncate">{t.title}</p>
                  </div>
                  <Link
                    href={`/demo/prospects/${t.prospect}`}
                    className="text-xs font-semibold text-brand-600 shrink-0 hover:underline"
                  >
                    Ouvrir
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-ink text-white p-6">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 mb-4">
              <Sparkles size={16} />
            </span>
            <p className="font-display font-bold text-lg mb-2">Suggestion ImmoPilot</p>
            <p className="text-sm text-white/75 leading-relaxed mb-4">
              3 dossiers nécessitent une relance et une visite démarre dans 45 minutes. Je peux préparer les messages de
              relance pour Camille et Thomas.
            </p>
            <Link href="/demo/assistant" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white">
              Ouvrir l'assistant <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-line bg-white overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-line">
              <p className="font-semibold text-ink text-sm">Visites du jour</p>
              <Link href="/demo/visites" className="text-xs font-semibold text-brand-600 flex items-center gap-1">
                Voir tout <ArrowRight size={12} />
              </Link>
            </div>
            <ul>
              {DEMO_VISITS.map((v) => (
                <li key={v.id} className="flex items-center gap-3 px-5 py-3.5 border-b border-line last:border-0 text-sm">
                  <span className="font-semibold text-ink w-12 shrink-0">{v.time}</span>
                  <span className="flex-1 min-w-0 text-ink-soft truncate">
                    {v.prospect} — {v.property}
                  </span>
                  <StatusBadge value={v.status} />
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-line bg-white overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-line">
              <p className="font-semibold text-ink text-sm">Prospects prioritaires</p>
              <Link href="/demo/prospects" className="text-xs font-semibold text-brand-600 flex items-center gap-1">
                Voir tout <ArrowRight size={12} />
              </Link>
            </div>
            <ul>
              {DEMO_PROSPECTS.filter((p) => p.urgency === "Élevée").slice(0, 4).map((p) => (
                <li key={p.id} className="flex items-center gap-3 px-5 py-3.5 border-b border-line last:border-0">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-brand-700 text-xs font-bold shrink-0">
                    {p.firstName[0]}
                    {p.lastName[0]}
                  </span>
                  <div className="min-w-0 flex-1">
                    <Link href={`/demo/prospects/${p.id}`} className="text-sm text-ink font-medium hover:underline truncate block">
                      {p.firstName} {p.lastName}
                    </Link>
                    <p className="text-xs text-muted truncate">{p.nextAction}</p>
                  </div>
                  <StatusBadge value={p.status} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-white p-5 flex items-center gap-3">
          <Mail size={16} className="text-brand-600 shrink-0" />
          <p className="text-sm text-ink-soft">
            <span className="font-semibold text-ink">3 nouveaux messages</span> nécessitent une réponse.
          </p>
          <Link href="/demo/messages" className="ml-auto text-xs font-semibold text-brand-600 flex items-center gap-1">
            Ouvrir la messagerie <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </>
  );
}
