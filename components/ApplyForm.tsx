"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { submitApplication } from "@/lib/actions";
import { Field, inputClass } from "@/components/ui/Field";

export function ApplyForm({ propertyId }: { propertyId: string }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [jobStatus, setJobStatus] = useState("");
  const [income, setIncome] = useState("");
  const [guarantorStatus, setGuarantorStatus] = useState("");
  const [guarantorIncome, setGuarantorIncome] = useState("");
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function submit() {
    if (!firstName || !lastName || !email) {
      setStatus("Renseigne au moins ton prénom, ton nom et ton email.");
      return;
    }
    setPending(true);
    const result = await submitApplication(propertyId, {
      first_name: firstName,
      last_name: lastName,
      candidate_email: email,
      phone,
      city,
      job_status: jobStatus,
      income: income ? Number(income) : undefined,
      guarantor_status: guarantorStatus,
      guarantor_income: guarantorIncome ? Number(guarantorIncome) : undefined,
    });
    setPending(false);
    if (result.ok) {
      setSubmitted(true);
      return;
    }
    setStatus(`Erreur : ${result.error}`);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-line bg-white p-8 text-center">
        <CheckCircle2 size={28} className="mx-auto text-green-600 mb-3" />
        <p className="font-display font-bold text-lg text-ink">Candidature envoyée</p>
        <p className="mt-2 text-sm text-muted">Merci ! L&rsquo;agence a bien reçu ton dossier et reviendra vers toi prochainement.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <Field label="Prénom">
        <input className={inputClass} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </Field>
      <Field label="Nom">
        <input className={inputClass} value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </Field>
      <Field label="Email">
        <input className={inputClass} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Field>
      <Field label="Téléphone">
        <input className={inputClass} value={phone} onChange={(e) => setPhone(e.target.value)} />
      </Field>
      <Field label="Ville actuelle">
        <input className={inputClass} value={city} onChange={(e) => setCity(e.target.value)} />
      </Field>
      <Field label="Statut professionnel">
        <input className={inputClass} value={jobStatus} onChange={(e) => setJobStatus(e.target.value)} placeholder="CDI, CDD, étudiant…" />
      </Field>
      <Field label="Revenu mensuel (€)">
        <input className={inputClass} type="number" value={income} onChange={(e) => setIncome(e.target.value)} />
      </Field>
      <Field label="Garant">
        <input className={inputClass} value={guarantorStatus} onChange={(e) => setGuarantorStatus(e.target.value)} placeholder="Oui, non, pas nécessaire…" />
      </Field>
      <Field label="Revenu du garant (€)">
        <input className={inputClass} type="number" value={guarantorIncome} onChange={(e) => setGuarantorIncome(e.target.value)} />
      </Field>
      <button
        onClick={submit}
        disabled={pending}
        className="w-full h-11 rounded-xl bg-ink text-white text-sm font-semibold hover:bg-brand-700 transition-colors disabled:opacity-60"
      >
        {pending ? "Envoi…" : "Envoyer ma candidature"}
      </button>
      {status && <p className="mt-3 text-sm text-muted">{status}</p>}
    </div>
  );
}
