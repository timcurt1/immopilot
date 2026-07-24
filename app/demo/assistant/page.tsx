"use client";

import { useState } from "react";
import { Sparkles, Check, Pencil, X, Database } from "lucide-react";
import { DemoPageHeader } from "@/components/demo/DemoPageHeader";

type Answer = {
  summary: string;
  sources: string[];
  actions: string[];
  confidence: "Élevée" | "Moyenne";
};

const QUESTIONS: { q: string; a: Answer }[] = [
  {
    q: "Quels prospects dois-je relancer aujourd'hui ?",
    a: {
      summary: "3 prospects n'ont pas reçu de réponse depuis plus de 48h : Camille Lefèvre, Thomas Nguyen et Amélie Roussel.",
      sources: ["Fiches prospects", "Historique des échanges"],
      actions: ["Préparer une relance pour Camille Lefèvre", "Préparer une relance pour Thomas Nguyen"],
      confidence: "Élevée",
    },
  },
  {
    q: "Résume-moi le dossier de cette candidate.",
    a: {
      summary: "Camille Lefèvre recherche un T2 à Clermont-Ferrand pour 700 € CC. Dossier qualifié à 87/100, deux pièces encore manquantes : contrat de travail et avis d'imposition.",
      sources: ["Fiche prospect", "Documents associés"],
      actions: ["Demander les pièces manquantes", "Générer une synthèse PDF"],
      confidence: "Élevée",
    },
  },
  {
    q: "Prépare un message pour demander les documents manquants.",
    a: {
      summary: "« Bonjour Camille, pour finaliser votre dossier, pourriez-vous nous transmettre votre contrat de travail et votre dernier avis d'imposition ? Merci d'avance. »",
      sources: ["Modèle de message", "Documents manquants du dossier"],
      actions: ["Envoyer ce message", "Modifier avant envoi"],
      confidence: "Moyenne",
    },
  },
  {
    q: "Quels candidats correspondent à ce logement ?",
    a: {
      summary: "2 candidats correspondent au T1 de Clermont-Ferrand Jaude : Paul Simon (budget compatible) et un profil similaire suivi la semaine dernière.",
      sources: ["Critères des prospects", "Fiche du bien"],
      actions: ["Proposer le bien à Paul Simon", "Voir la liste complète"],
      confidence: "Moyenne",
    },
  },
  {
    q: "Quelles sont les urgences de l'agence ?",
    a: {
      summary: "3 dossiers nécessitent une relance, 1 dossier est prêt à valider (Sophie Marchal) et une demande d'intervention urgente a été signalée par Amélie Roussel.",
      sources: ["Tableau de bord", "Tâches en cours"],
      actions: ["Ouvrir le dossier de Sophie Marchal", "Ouvrir la demande d'Amélie Roussel"],
      confidence: "Élevée",
    },
  },
  {
    q: "Prépare ma visite de 15 h 30.",
    a: {
      summary: "Visite de 15h30 : Camille Lefèvre pour le T2 de Clermont-Ferrand centre. Points à vérifier : luminosité, proximité des transports, disponibilité rapide souhaitée.",
      sources: ["Agenda", "Fiche prospect", "Fiche bien"],
      actions: ["Ouvrir la fiche de préparation", "Ajouter une note avant la visite"],
      confidence: "Élevée",
    },
  },
];

export default function DemoAssistantPage() {
  const [thread, setThread] = useState<{ q: string; a: Answer }[]>([]);
  const [status, setStatus] = useState<Record<number, "validated" | "cancelled">>({});

  function ask(item: { q: string; a: Answer }) {
    setThread((prev) => [...prev, item]);
  }

  return (
    <>
      <DemoPageHeader title="Assistant ImmoPilot" description="Posez une question en langage naturel pour retrouver une information ou préparer une action." />

      <div className="px-6 md:px-8 pb-12">
        <div className="rounded-2xl border border-line bg-white overflow-hidden flex flex-col min-h-[500px]">
          <div className="flex-1 p-6 grid gap-5 overflow-y-auto">
            {thread.length === 0 && (
              <p className="text-sm text-muted">Choisissez une question ci-dessous pour démarrer.</p>
            )}
            {thread.map((item, i) => (
              <div key={i} className="grid gap-3">
                <div className="ml-auto max-w-md rounded-2xl rounded-tr-sm bg-ink text-white px-4 py-2.5 text-sm">
                  {item.q}
                </div>
                <div className="max-w-lg rounded-2xl rounded-tl-sm border border-line bg-surface px-5 py-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={14} className="text-brand-600" />
                    <span className="text-xs font-semibold text-ink">Assistant ImmoPilot</span>
                    <span
                      className={`ml-auto text-[10px] font-semibold rounded-full px-2 py-0.5 ${
                        item.a.confidence === "Élevée" ? "bg-positive-soft text-green-700" : "bg-warning-soft text-amber-700"
                      }`}
                    >
                      Confiance {item.a.confidence}
                    </span>
                  </div>
                  <p className="text-sm text-ink-soft leading-relaxed mb-3">{item.a.summary}</p>
                  <div className="flex items-center gap-1.5 text-[11px] text-muted mb-3">
                    <Database size={11} />
                    Sources : {item.a.sources.join(", ")}
                  </div>
                  <div className="grid gap-1.5 mb-3">
                    {item.a.actions.map((act) => (
                      <p key={act} className="text-xs text-ink bg-white border border-line rounded-lg px-3 py-2">
                        {act}
                      </p>
                    ))}
                  </div>
                  {status[i] ? (
                    <p className={`text-xs font-semibold ${status[i] === "validated" ? "text-green-700" : "text-muted"}`}>
                      {status[i] === "validated" ? "Action validée (simulation)" : "Action annulée"}
                    </p>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setStatus((s) => ({ ...s, [i]: "validated" }))}
                        className="inline-flex items-center gap-1 h-8 px-3 rounded-lg bg-ink text-white text-xs font-semibold hover:bg-brand-700"
                      >
                        <Check size={12} /> Valider
                      </button>
                      <button className="inline-flex items-center gap-1 h-8 px-3 rounded-lg border border-line text-xs font-semibold text-ink-soft hover:text-ink">
                        <Pencil size={12} /> Modifier
                      </button>
                      <button
                        onClick={() => setStatus((s) => ({ ...s, [i]: "cancelled" }))}
                        className="inline-flex items-center gap-1 h-8 px-3 rounded-lg border border-line text-xs font-semibold text-ink-soft hover:text-ink"
                      >
                        <X size={12} /> Annuler
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-line p-4 flex flex-wrap gap-2">
            {QUESTIONS.map((item) => (
              <button
                key={item.q}
                onClick={() => ask(item)}
                className="rounded-full border border-line bg-white px-3.5 py-2 text-xs font-medium text-ink-soft hover:border-brand-300 hover:text-ink transition-colors"
              >
                {item.q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
