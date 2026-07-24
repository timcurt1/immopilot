import { AlertTriangle, Calendar, CheckCircle2, Clock, FileWarning, MessageSquare, Sparkles, Users } from "lucide-react";

const METRICS = [
  { label: "Nouveaux prospects", value: "24", tone: "brand" },
  { label: "Demandes à traiter", value: "9", tone: "amber" },
  { label: "Visites programmées", value: "6", tone: "brand" },
  { label: "Dossiers en attente", value: "4", tone: "amber" },
];

const TASKS = [
  { label: "Relancer Camille Lefèvre — sans réponse depuis 3 jours", tag: "Relance", urgent: true },
  { label: "Dossier de Jordan Taylor — pièce manquante (avis d'imposition)", tag: "Document", urgent: true },
  { label: "Préparer la visite de 15h30 — T2 Clermont-Ferrand", tag: "Visite", urgent: false },
  { label: "Valider le dossier de Thomas Nguyen — complet", tag: "Validation", urgent: false },
];

const FLOATING = [
  { icon: Users, text: "8 prospects à relancer", position: "top-[6%] -left-4 md:-left-10", delay: "0s" },
  { icon: FileWarning, text: "3 dossiers incomplets détectés", position: "top-[32%] -right-4 md:-right-12", delay: "0.6s" },
  { icon: CheckCircle2, text: "Compte rendu de visite généré", position: "bottom-[24%] -left-6 md:-left-14", delay: "1.2s" },
  { icon: Sparkles, text: "Nouvelle demande qualifiée", position: "top-[2%] right-[8%] md:right-[14%]", delay: "0.3s" },
  { icon: MessageSquare, text: "Réponse client préparée", position: "bottom-[4%] right-[2%] md:right-[6%]", delay: "0.9s" },
];

export function HeroMockup() {
  return (
    <div className="relative mx-auto max-w-5xl">
      <div className="hidden md:block">
        {FLOATING.map((f, i) => {
          const Icon = f.icon;
          return (
            <div
              key={i}
              className={`absolute z-10 ${f.position} animate-float`}
              style={{ animationDelay: f.delay }}
            >
              <div className="flex items-center gap-2 rounded-2xl bg-white border border-line shadow-[0_16px_40px_rgba(15,23,42,0.12)] px-3.5 py-2.5 text-xs font-semibold text-ink">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand-50 text-brand-600 shrink-0">
                  <Icon size={13} />
                </span>
                {f.text}
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative rounded-3xl border border-line bg-white shadow-[0_40px_120px_rgba(15,23,42,0.16)] overflow-hidden">
        <div className="flex items-center justify-between border-b border-line px-6 py-4 bg-surface/60">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-danger/70" />
            <span className="h-3 w-3 rounded-full bg-warning/70" />
            <span className="h-3 w-3 rounded-full bg-positive/70" />
          </div>
          <p className="text-xs font-medium text-muted">Tableau de bord — Agence Bellevue Immobilier</p>
          <div className="w-14" />
        </div>

        <div className="grid md:grid-cols-[1fr_260px]">
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-muted">Bonjour Léa, voici votre journée</p>
                <p className="font-display font-bold text-lg text-ink">Mercredi 24 juillet</p>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-positive-soft text-green-700 px-3 py-1.5 text-xs font-semibold">
                <CheckCircle2 size={13} /> 78% des demandes traitées
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              {METRICS.map((m) => (
                <div key={m.label} className="rounded-xl border border-line bg-white p-3.5">
                  <p className="text-[11px] text-muted mb-1.5 leading-tight">{m.label}</p>
                  <p className="text-2xl font-display font-bold text-ink">{m.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-line overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-surface/60 border-b border-line">
                <p className="text-sm font-semibold text-ink">Tâches du jour</p>
                <span className="text-[11px] text-muted flex items-center gap-1">
                  <Clock size={12} /> Priorisées par ImmoPilot
                </span>
              </div>
              <ul>
                {TASKS.map((t, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 px-4 py-3 border-b border-line last:border-0 text-sm"
                  >
                    {t.urgent ? (
                      <AlertTriangle size={15} className="text-amber-500 shrink-0" />
                    ) : (
                      <CheckCircle2 size={15} className="text-brand-500 shrink-0" />
                    )}
                    <span className="flex-1 text-ink-soft truncate">{t.label}</span>
                    <span className="hidden sm:inline text-[11px] font-semibold text-muted bg-surface rounded-full px-2 py-1 shrink-0">
                      {t.tag}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="hidden md:flex flex-col border-l border-line bg-surface/40 p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-white">
                <Sparkles size={14} />
              </span>
              <p className="text-sm font-semibold text-ink">Assistant ImmoPilot</p>
            </div>
            <div className="rounded-xl bg-white border border-line p-3 text-xs text-ink-soft mb-3">
              Quelles sont les urgences de l'agence aujourd'hui ?
            </div>
            <div className="rounded-xl bg-brand-50 border border-brand-100 p-3 text-xs text-ink leading-relaxed">
              3 dossiers nécessitent une relance et 1 visite démarre dans 45 minutes. Je peux préparer les messages de relance.
            </div>
            <div className="mt-auto pt-4 flex items-center gap-2 text-[11px] text-muted">
              <Calendar size={12} /> Prochaine visite — 15h30
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
