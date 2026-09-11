import { Clock } from "lucide-react";
import type { TimelineEvent } from "@/lib/types";

export function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5">
      <h3 className="font-display font-bold text-lg text-ink mb-4">Journal d&rsquo;activité</h3>
      {events.length === 0 ? (
        <p className="text-sm text-muted">Aucun événement journalisé pour ce dossier.</p>
      ) : (
        <ul className="space-y-3">
          {events.map((event) => (
            <li key={event.id} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface text-ink-soft">
                <Clock size={14} />
              </span>
              <div>
                <p className="text-sm text-ink">{event.label}</p>
                <p className="text-xs text-muted">{new Date(event.created_at).toLocaleString("fr-FR")}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
