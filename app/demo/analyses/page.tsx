import { DemoPageHeader } from "@/components/demo/DemoPageHeader";
import { DEMO_KPIS } from "@/lib/demoContent";

const WEEK_VOLUME = [
  { day: "Lun", value: 8 }, { day: "Mar", value: 11 }, { day: "Mer", value: 9 },
  { day: "Jeu", value: 14 }, { day: "Ven", value: 12 }, { day: "Sam", value: 5 }, { day: "Dim", value: 2 },
];
const SOURCES = [
  { label: "Portails d'annonces", value: 44 },
  { label: "Site de l'agence", value: 28 },
  { label: "Téléphone", value: 18 },
  { label: "Recommandation", value: 10 },
];
const COLLABORATEURS = [
  { name: "Léa Bonnet", value: 18 },
  { name: "Karim Aziz", value: 15 },
  { name: "Nadia Fontaine", value: 9 },
];

const KPI_CARDS = [
  { label: "Volume de demandes (30 j)", value: DEMO_KPIS.totalDemandes },
  { label: "Temps moyen de première réponse", value: DEMO_KPIS.tempsReponseMoyen },
  { label: "Demandes traitées", value: DEMO_KPIS.demandesTraitees },
  { label: "Prospects actifs", value: DEMO_KPIS.prospectsActifs },
  { label: "Visites cette semaine", value: DEMO_KPIS.visitesSemaine },
  { label: "Conversions", value: DEMO_KPIS.conversions },
  { label: "Dossiers incomplets", value: DEMO_KPIS.dossiersIncomplets },
  { label: "Tâches en retard", value: DEMO_KPIS.tachesEnRetard },
];

export default function DemoAnalysesPage() {
  const maxWeek = Math.max(...WEEK_VOLUME.map((d) => d.value));

  return (
    <>
      <DemoPageHeader title="Analyses" description="Indicateurs illustratifs calculés à partir des données fictives de cette démonstration" />
      <div className="px-6 md:px-8 pb-12 grid gap-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {KPI_CARDS.map((k) => (
            <div key={k.label} className="rounded-2xl border border-line bg-white p-4">
              <p className="text-2xl font-display font-bold text-ink">{k.value}</p>
              <p className="text-xs text-muted mt-1 leading-snug">{k.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
          <div className="rounded-2xl border border-line bg-white p-6">
            <p className="font-semibold text-ink text-sm mb-6">Volume de demandes sur 7 jours</p>
            <div className="flex items-end gap-4 h-40">
              {WEEK_VOLUME.map((d) => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-brand-600 to-brand-400"
                    style={{ height: `${(d.value / maxWeek) * 100}%` }}
                  />
                  <span className="text-[11px] text-muted">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-white p-6">
            <p className="font-semibold text-ink text-sm mb-5">Sources des prospects</p>
            <div className="grid gap-3">
              {SOURCES.map((s) => (
                <div key={s.label}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-ink-soft">{s.label}</span>
                    <span className="font-semibold text-ink">{s.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-surface overflow-hidden">
                    <div className="h-full rounded-full bg-brand-500" style={{ width: `${s.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-white p-6">
          <p className="font-semibold text-ink text-sm mb-5">Activité par collaborateur</p>
          <div className="grid gap-3">
            {COLLABORATEURS.map((c) => (
              <div key={c.name} className="flex items-center gap-4">
                <span className="text-sm text-ink-soft w-32 shrink-0">{c.name}</span>
                <div className="flex-1 h-2.5 rounded-full bg-surface overflow-hidden">
                  <div className="h-full rounded-full bg-ink" style={{ width: `${(c.value / 18) * 100}%` }} />
                </div>
                <span className="text-sm font-semibold text-ink w-6 text-right">{c.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
