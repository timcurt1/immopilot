"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, X } from "lucide-react";
import { createProspectFromText } from "@/lib/actions";
import { Field, inputClass, textareaClass } from "@/components/ui/Field";
import { Badge } from "@/components/marketing/Badge";

type Result = {
  ok: boolean;
  error?: string;
  id?: string;
  source?: "ai" | "fallback";
  matchedProperty?: string | null;
  extraction?: { need: string; propertyType: string; budget: number | null; location: string; urgency: string; score: number; reasoning: string };
};

export function NewProspectForm() {
  const [open, setOpen] = useState(false);
  const [rawText, setRawText] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  async function submit() {
    if (!rawText.trim() || !firstName.trim() || !lastName.trim() || !email.trim()) return;
    setPending(true);
    setResult(null);
    const r = await createProspectFromText({ rawText, first_name: firstName, last_name: lastName, candidate_email: email, phone: phone || undefined });
    setPending(false);
    setResult(r as Result);
    if (r.ok) {
      setRawText("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-ink text-white text-sm font-semibold hover:bg-brand-700 transition-colors"
      >
        <Sparkles size={15} /> Nouveau prospect (texte libre)
      </button>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-display font-bold text-lg text-ink">Nouveau prospect à partir d&rsquo;un texte libre</h3>
          <p className="mt-1 text-sm text-muted">
            Colle un email ou un message reçu : ImmoPilot extrait le besoin, le budget, la localisation et l&rsquo;urgence, calcule un
            score de qualification, et propose le bien le plus compatible.
          </p>
        </div>
        <button onClick={() => setOpen(false)} className="text-muted hover:text-ink shrink-0">
          <X size={18} />
        </button>
      </div>
      <Field label="Message reçu">
        <textarea
          className={`${textareaClass} min-h-[110px]`}
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          placeholder="Bonjour, je cherche un T2 à Clermont-Ferrand, budget 700€, disponible rapidement, proche des transports. Merci !"
        />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <Field label="Prénom">
          <input className={inputClass} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </Field>
        <Field label="Nom">
          <input className={inputClass} value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </Field>
        <Field label="Email">
          <input className={inputClass} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Field label="Téléphone (optionnel)">
          <input className={inputClass} value={phone} onChange={(e) => setPhone(e.target.value)} />
        </Field>
      </div>
      <button
        onClick={submit}
        disabled={pending}
        className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-ink text-white text-sm font-semibold hover:bg-brand-700 transition-colors disabled:opacity-60"
      >
        <Sparkles size={15} /> {pending ? "Qualification en cours…" : "Qualifier et créer le prospect"}
      </button>

      {result && !result.ok && <p className="mt-3 text-sm text-red-700">Erreur : {result.error}</p>}
      {result && result.ok && result.extraction && (
        <div className="mt-4 rounded-xl border border-line bg-surface p-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge tone="green">Qualification du lead : {result.extraction.score}/100</Badge>
            <Badge tone={result.source === "ai" ? "brand" : "neutral"}>{result.source === "ai" ? "IA" : "Repli local"}</Badge>
          </div>
          <p className="text-sm text-ink-soft">
            {result.extraction.propertyType} · {result.extraction.location} ·{" "}
            {result.extraction.budget ? `${result.extraction.budget} €` : "budget non précisé"} · urgence {result.extraction.urgency}
          </p>
          <p className="mt-1 text-xs text-muted">{result.extraction.reasoning}</p>
          <p className="mt-2 text-xs text-muted italic">
            Ce score mesure la clarté et l&rsquo;urgence de la demande (type de bien, budget, localisation) — pas la solvabilité. Aucune
            donnée financière (revenus, garant) n&rsquo;est encore disponible à ce stade ; le score sera à ajuster une fois le dossier
            complété.
          </p>
          {result.matchedProperty && <p className="mt-2 text-sm text-ink">Bien compatible proposé : {result.matchedProperty}</p>}
          {result.id && (
            <Link href={`/applications/${result.id}`} className="mt-3 inline-flex items-center text-sm font-semibold text-brand-600 hover:underline">
              Ouvrir la fiche créée
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
