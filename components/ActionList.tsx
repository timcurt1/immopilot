import Link from "next/link";
import type { Application, RentalDocument, Task } from "@/lib/types";
import { nextBestAction } from "@/lib/data";
import { Badge } from "@/components/marketing/Badge";

const PRIORITY_TONE = { high: "red", medium: "amber", low: "brand" } as const;

export function ActionList({ tasks, applications, documents }: { tasks: Task[]; applications: Application[]; documents: RentalDocument[] }) {
  const rows = tasks
    .map((t) => {
      const app = applications.find((a) => a.id === t.application_id);
      const docs = documents.filter((d) => d.application_id === t.application_id);
      return { t, app, action: app ? nextBestAction(app, docs) : t.title };
    })
    .filter((r) => r.app);

  if (rows.length === 0) {
    return <p className="text-sm text-muted py-2">Aucune action ouverte pour le moment.</p>;
  }

  return (
    <div className="grid gap-2.5">
      {rows.map(
        ({ t, app, action }) =>
          app && (
            <div key={t.id} className="flex items-center gap-3.5 rounded-2xl border border-line bg-white p-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-violet-500 text-white text-xs font-bold">
                {app.first_name[0]}
                {app.last_name[0]}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-ink truncate">{t.title}</p>
                <p className="mt-0.5 text-xs text-muted truncate">
                  {app.first_name} {app.last_name} · {action}
                </p>
                <div className="mt-2 flex items-center gap-1.5">
                  <Badge tone={PRIORITY_TONE[t.priority]}>{t.priority}</Badge>
                  <Badge tone="brand">Score {app.score}</Badge>
                </div>
              </div>
              <Link
                href={`/applications/${app.id}`}
                className="shrink-0 inline-flex items-center h-9 px-3.5 rounded-lg bg-ink text-white text-sm font-semibold hover:bg-brand-700 transition-colors"
              >
                Traiter
              </Link>
            </div>
          )
      )}
    </div>
  );
}
