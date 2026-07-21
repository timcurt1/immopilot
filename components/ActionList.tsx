import Link from "next/link";
import type { Application, RentalDocument, Task } from "@/lib/types";
import { nextBestAction } from "@/lib/data";

export function ActionList({ tasks, applications, documents }: { tasks: Task[]; applications: Application[]; documents: RentalDocument[] }) {
  const rows = tasks
    .map((t) => {
      const app = applications.find((a) => a.id === t.application_id);
      const docs = documents.filter((d) => d.application_id === t.application_id);
      return { t, app, action: app ? nextBestAction(app, docs) : t.title };
    })
    .filter((r) => r.app);

  if (rows.length === 0) {
    return <p className="emptyState">Aucune action ouverte pour le moment.</p>;
  }

  return (
    <div className="list">
      {rows.map(
        ({ t, app, action }) =>
          app && (
            <div key={t.id} className="rowCard">
              <div className="avatar">
                {app.first_name[0]}
                {app.last_name[0]}
              </div>
              <div>
                <b>{t.title}</b>
                <p style={{ margin: "4px 0 0", color: "var(--muted)", fontSize: 12 }}>
                  {app.first_name} {app.last_name} · {action}
                </p>
                <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                  <span className={`chip ${t.priority === "high" ? "red" : t.priority === "medium" ? "amber" : "blue"}`}>{t.priority}</span>
                  <span className="chip blue">Score {app.score}</span>
                </div>
              </div>
              <Link className="btn primary" href={`/applications/${app.id}`}>
                Traiter
              </Link>
            </div>
          )
      )}
    </div>
  );
}
