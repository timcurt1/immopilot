"use client";

import { useState } from "react";
import { CalendarPlus } from "lucide-react";
import { scheduleVisit } from "@/lib/actions";
import { Field, inputClass } from "@/components/ui/Field";
import type { Visit } from "@/lib/types";

export function VisitScheduler({ applicationId, visits }: { applicationId: string; visits: Visit[] }) {
  const [localVisits, setLocalVisits] = useState(visits);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);

  async function submit() {
    if (!date) {
      setStatus("Choisis une date.");
      return;
    }
    const scheduledAt = new Date(date).toISOString();
    setPending(true);
    const result = await scheduleVisit(applicationId, scheduledAt);
    setPending(false);
    if (result.ok) {
      setLocalVisits((vs) => [...vs, { id: `pending-${scheduledAt}`, application_id: applicationId, scheduled_at: scheduledAt, status: "À confirmer" }]);
      setDate("");
    }
    setStatus(result.ok ? "Visite programmée." : `Erreur : ${result.error}`);
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <h3 className="font-display font-bold text-lg text-ink mb-1">Visites</h3>
      {localVisits.length > 0 ? (
        <div className="grid gap-2 mb-4 mt-3">
          {localVisits.map((v) => (
            <div key={v.id} className="flex items-center justify-between rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm">
              <span className="text-ink-soft">{v.scheduled_at ? new Date(v.scheduled_at).toLocaleString("fr-FR") : "Date non définie"}</span>
              <span className="text-xs font-semibold text-ink">{v.status}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-1 mb-4 text-sm text-muted">Aucune visite programmée pour ce dossier.</p>
      )}
      <Field label="Programmer une visite">
        <input type="datetime-local" className={inputClass} value={date} onChange={(e) => setDate(e.target.value)} />
      </Field>
      <button
        onClick={submit}
        disabled={pending}
        className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-ink text-white text-sm font-semibold hover:bg-brand-700 transition-colors disabled:opacity-60"
      >
        <CalendarPlus size={15} /> {pending ? "Envoi…" : "Programmer"}
      </button>
      {status && <p className="mt-3 text-sm text-muted">{status}</p>}
    </div>
  );
}
