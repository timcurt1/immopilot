"use client";

import { useState } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, FileDown, Mail, CalendarPlus, FileQuestion, Sparkles, UserCog, RefreshCcw, Check,
} from "lucide-react";
import { DemoPageHeader } from "@/components/demo/DemoPageHeader";
import { StatusBadge } from "@/components/demo/StatusBadge";
import { getProspect } from "@/lib/demoContent";

const ACTIONS = [
  { key: "email", label: "Préparer un e-mail", icon: Mail },
  { key: "relance", label: "Programmer une relance", icon: RefreshCcw },
  { key: "visite", label: "Ajouter une visite", icon: CalendarPlus },
  { key: "document", label: "Demander un document", icon: FileQuestion },
  { key: "synthese", label: "Générer une synthèse", icon: Sparkles },
  { key: "assigner", label: "Affecter à un collaborateur", icon: UserCog },
];

export default function ProspectDetailPage() {
  const params = useParams<{ id: string }>();
  const prospect = getProspect(params.id);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  if (!prospect) notFound();

  function trigger(label: string) {
    setConfirmation(label);
    setTimeout(() => setConfirmation(null), 2800);
  }

  return (
    <>
      <DemoPageHeader
        title={`${prospect.firstName} ${prospect.lastName}`}
        description={`${prospect.project} · ${prospect.propertyType} · ${prospect.location}`}
        actions={
          <button
            onClick={() => {
              setPdfGenerated(true);
              trigger("Fiche PDF générée");
            }}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-ink text-white text-sm font-semibold hover:bg-brand-700 transition-colors"
          >
            <FileDown size={15} /> {pdfGenerated ? "Fiche PDF prête" : "Générer la fiche PDF"}
          </button>
        }
      />

      <div className="px-6 md:px-8 pb-12">
        <Link href="/demo/prospects" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink mb-6">
          <ArrowLeft size={14} /> Retour aux prospects
        </Link>

        {confirmation && (
          <div className="mb-5 flex items-center gap-2 rounded-xl bg-positive-soft text-green-700 px-4 py-3 text-sm font-medium">
            <Check size={16} /> {confirmation} — action simulée dans cette démonstration.
          </div>
        )}

        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          <div className="grid gap-6">
            <div className="rounded-2xl border border-line bg-white p-6">
              <div className="flex items-center justify-between mb-5">
                <p className="font-semibold text-ink">Identité et critères</p>
                <StatusBadge value={prospect.status} />
              </div>
              <dl className="grid sm:grid-cols-2 gap-4 text-sm">
                <Info label="E-mail" value={prospect.email} />
                <Info label="Téléphone" value={prospect.phone} />
                <Info label="Budget" value={prospect.budget} />
                <Info label="Localisation recherchée" value={prospect.location} />
                <Info label="Situation" value={prospect.situation} />
                <Info label="Score de qualification" value={`${prospect.score} / 100`} />
                <Info label="Collaborateur assigné" value={prospect.assignedTo} />
                <Info label="Urgence" value={prospect.urgency} />
              </dl>
              {prospect.notes && (
                <div className="mt-5 rounded-xl bg-surface p-4 text-sm text-ink-soft">
                  <span className="font-semibold text-ink">Notes — </span>
                  {prospect.notes}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-line bg-white p-6">
              <p className="font-semibold text-ink mb-4">Documents</p>
              {prospect.documents.length === 0 ? (
                <p className="text-sm text-muted">Aucun document requis pour cette demande.</p>
              ) : (
                <ul className="grid gap-2.5">
                  {prospect.documents.map((d) => (
                    <li key={d.label} className="flex items-center justify-between rounded-lg border border-line px-4 py-2.5 text-sm">
                      <span className="text-ink-soft">{d.label}</span>
                      <StatusBadge value={d.status} />
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-2xl border border-line bg-white p-6">
              <p className="font-semibold text-ink mb-4">Historique</p>
              <ul className="grid gap-4">
                {prospect.timeline.map((t, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500 shrink-0" />
                    <div>
                      <p className="text-xs text-muted">{t.date}</p>
                      <p className="text-sm text-ink-soft">{t.label}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid gap-6 content-start">
            <div className="rounded-2xl border border-line bg-white p-5">
              <p className="font-semibold text-ink mb-4 text-sm">Actions recommandées</p>
              <div className="grid gap-2">
                {ACTIONS.map((a) => (
                  <button
                    key={a.key}
                    onClick={() => trigger(a.label)}
                    className="flex items-center gap-2.5 rounded-lg border border-line px-3.5 py-2.5 text-sm text-ink-soft hover:border-brand-300 hover:bg-brand-50/50 hover:text-ink transition-colors text-left"
                  >
                    <a.icon size={15} className="text-brand-600 shrink-0" />
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-ink text-white p-5">
              <Sparkles size={18} className="text-brand-300 mb-3" />
              <p className="font-semibold mb-2 text-sm">Prochaine action recommandée</p>
              <p className="text-sm text-white/75 leading-relaxed">{prospect.nextAction}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-muted mb-0.5">{label}</dt>
      <dd className="text-ink font-medium">{value}</dd>
    </div>
  );
}
