"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, XCircle, ClipboardCheck, Wand2 } from "lucide-react";
import type { ComponentProps } from "react";
import { updateVisitStatus, saveVisitReport, structureVisitNotesAction } from "@/lib/actions";
import { assembleVisitReport } from "@/lib/logic";
import { Field, inputClass, textareaClass } from "@/components/ui/Field";
import { Badge } from "@/components/marketing/Badge";
import type { Visit } from "@/lib/types";

const STATUS_TONE: Record<Visit["status"], ComponentProps<typeof Badge>["tone"]> = {
  "À confirmer": "amber",
  Confirmée: "green",
  Effectuée: "brand",
  Annulée: "red",
};

function ReportForm({
  visit,
  onSaved,
}: {
  visit: Visit;
  onSaved: (report: {
    impression: string;
    positives: string;
    concerns: string;
    signatureLikelihood: string;
    nextStep: string;
    generatedAt: string;
  }) => void;
}) {
  const [impression, setImpression] = useState(visit.report_impression || "");
  const [positives, setPositives] = useState(visit.report_positives || "");
  const [concerns, setConcerns] = useState(visit.report_concerns || "");
  const [likelihood, setLikelihood] = useState(visit.report_signature_likelihood || "Moyenne");
  const [nextStep, setNextStep] = useState(visit.report_next_step || "");
  const [status, setStatus] = useState("");
  const [rawNotes, setRawNotes] = useState("");
  const [structuring, setStructuring] = useState(false);
  const [structureSource, setStructureSource] = useState<"ai" | "fallback" | null>(null);

  async function save() {
    const result = await saveVisitReport(visit.id, { impression, positives, concerns, signatureLikelihood: likelihood, nextStep, rawNotes });
    setStatus(result.ok ? "Compte-rendu enregistré." : `Erreur : ${result.error}`);
    if (result.ok) {
      onSaved({ impression, positives, concerns, signatureLikelihood: likelihood, nextStep, generatedAt: new Date().toISOString() });
    }
  }

  async function structure() {
    if (!rawNotes.trim()) return;
    setStructuring(true);
    setStructureSource(null);
    const result = await structureVisitNotesAction(rawNotes);
    setStructuring(false);
    if (result.ok) {
      if (result.impression) setImpression(result.impression);
      if (result.positives) setPositives(result.positives);
      if (result.concerns) setConcerns(result.concerns);
      if (result.signatureLikelihood) setLikelihood(result.signatureLikelihood);
      if (result.nextStep) setNextStep(result.nextStep);
      setStructureSource(result.source || "ai");
      setStatus("");
    } else {
      setStatus(`Erreur : ${result.error}`);
    }
  }

  return (
    <div className="mt-3 rounded-xl border border-line bg-surface p-4">
      <Field label="Notes libres (juste après la visite)">
        <textarea
          className={textareaClass}
          value={rawNotes}
          onChange={(e) => setRawNotes(e.target.value)}
          placeholder="Notez à chaud vos impressions, ce qui a plu, les réserves, l’état d’esprit du candidat…"
        />
      </Field>
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={structure}
          disabled={!rawNotes.trim() || structuring}
          className="inline-flex items-center gap-2 h-9 px-3 rounded-xl border border-line text-xs font-semibold text-ink-soft hover:text-ink hover:border-ink/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Wand2 size={13} /> {structuring ? "Structuration…" : "Structurer avec l’IA"}
        </button>
        {structureSource && (
          <Badge tone={structureSource === "ai" ? "brand" : "neutral"}>{structureSource === "ai" ? "IA" : "Repli local"}</Badge>
        )}
      </div>
      <Field label="Impression générale">
        <select className={inputClass} value={impression} onChange={(e) => setImpression(e.target.value)}>
          <option value="">Choisir…</option>
          <option>Très positive</option>
          <option>Positive</option>
          <option>Mitigée</option>
          <option>Négative</option>
        </select>
      </Field>
      <Field label="Points positifs">
        <textarea className={textareaClass} value={positives} onChange={(e) => setPositives(e.target.value)} />
      </Field>
      <Field label="Points de vigilance">
        <textarea className={textareaClass} value={concerns} onChange={(e) => setConcerns(e.target.value)} />
      </Field>
      <Field label="Probabilité de signature">
        <select className={inputClass} value={likelihood} onChange={(e) => setLikelihood(e.target.value)}>
          <option>Élevée</option>
          <option>Moyenne</option>
          <option>Faible</option>
        </select>
      </Field>
      <Field label="Prochaine étape">
        <input className={inputClass} value={nextStep} onChange={(e) => setNextStep(e.target.value)} placeholder="Relancer, attendre, clôturer…" />
      </Field>
      <button
        onClick={save}
        className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-ink text-white text-sm font-semibold hover:bg-brand-700 transition-colors"
      >
        <ClipboardCheck size={15} /> Enregistrer le compte-rendu
      </button>
      {status && <p className="mt-3 text-sm text-muted">{status}</p>}
    </div>
  );
}

export function VisitsClient({ visits }: { visits: Visit[] }) {
  const [localVisits, setLocalVisits] = useState(visits);
  const [openReportId, setOpenReportId] = useState<string | null>(null);
  const [statusById, setStatusById] = useState<Record<string, string>>({});

  async function changeStatus(visit: Visit, status: "Confirmée" | "Effectuée" | "Annulée") {
    const result = await updateVisitStatus(visit.id, status);
    if (result.ok) {
      setLocalVisits((vs) => vs.map((v) => (v.id === visit.id ? { ...v, status } : v)));
      setStatusById((s) => ({ ...s, [visit.id]: "" }));
    } else {
      setStatusById((s) => ({ ...s, [visit.id]: `Erreur : ${result.error}` }));
    }
  }

  if (localVisits.length === 0) {
    return <p className="text-sm text-muted py-2">Aucune visite programmée pour le moment.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-3">
      {localVisits.map((v) => {
        const hasReport = Boolean(v.report_generated_at);
        return (
          <div key={v.id} className="rounded-2xl border border-line bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-ink">
                  {v.application?.first_name} {v.application?.last_name}
                </p>
                <p className="text-xs text-muted mt-0.5">
                  {v.scheduled_at ? new Date(v.scheduled_at).toLocaleString("fr-FR") : "Date non définie"} ·{" "}
                  {v.address || "Adresse non renseignée"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge tone={STATUS_TONE[v.status]}>{v.status}</Badge>
                {v.application?.id && (
                  <Link href={`/applications/${v.application.id}`} className="text-xs font-semibold text-brand-600 hover:underline">
                    Voir le dossier
                  </Link>
                )}
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {v.status === "À confirmer" && (
                <button
                  onClick={() => changeStatus(v, "Confirmée")}
                  className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-positive-soft text-green-700 text-xs font-semibold hover:bg-green-100 transition-colors"
                >
                  <CheckCircle2 size={13} /> Confirmer
                </button>
              )}
              {(v.status === "À confirmer" || v.status === "Confirmée") && (
                <>
                  <button
                    onClick={() => changeStatus(v, "Effectuée")}
                    className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-brand-50 text-brand-700 text-xs font-semibold hover:bg-brand-100 transition-colors"
                  >
                    <ClipboardCheck size={13} /> Marquer effectuée
                  </button>
                  <button
                    onClick={() => changeStatus(v, "Annulée")}
                    className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-danger-soft text-red-700 text-xs font-semibold hover:bg-red-100 transition-colors"
                  >
                    <XCircle size={13} /> Annuler
                  </button>
                </>
              )}
              {v.status === "Effectuée" && (
                <button
                  onClick={() => setOpenReportId(openReportId === v.id ? null : v.id)}
                  className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg border border-line text-xs font-semibold text-ink-soft hover:text-ink hover:border-ink/30 transition-colors"
                >
                  <ClipboardCheck size={13} /> {hasReport ? "Voir/modifier le compte-rendu" : "Faire le compte-rendu"}
                </button>
              )}
            </div>
            {statusById[v.id] && <p className="mt-2 text-xs text-red-700">{statusById[v.id]}</p>}
            {hasReport && openReportId !== v.id && (
              <pre className="mt-3 whitespace-pre-wrap rounded-xl border border-line bg-surface p-4 text-xs text-ink-soft font-sans">
                {assembleVisitReport({
                  impression: v.report_impression || "",
                  positives: v.report_positives || "",
                  concerns: v.report_concerns || "",
                  signatureLikelihood: v.report_signature_likelihood || "",
                  nextStep: v.report_next_step || "",
                })}
              </pre>
            )}
            {openReportId === v.id && (
              <ReportForm
                visit={v}
                onSaved={(report) => {
                  setLocalVisits((vs) =>
                    vs.map((existing) =>
                      existing.id === v.id
                        ? {
                            ...existing,
                            report_impression: report.impression,
                            report_positives: report.positives,
                            report_concerns: report.concerns,
                            report_signature_likelihood: report.signatureLikelihood,
                            report_next_step: report.nextStep,
                            report_generated_at: report.generatedAt,
                          }
                        : existing
                    )
                  );
                  setOpenReportId(null);
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
