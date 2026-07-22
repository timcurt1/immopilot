"use client";

import { useState } from "react";
import { submitApplication } from "@/lib/actions";

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
      <div className="notice">
        <b>Candidature envoyée</b>
        <p>Merci ! L’agence a bien reçu ton dossier et reviendra vers toi prochainement.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="field">
        <label>Prénom</label>
        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </div>
      <div className="field">
        <label>Nom</label>
        <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>
      <div className="field">
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="field">
        <label>Téléphone</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div className="field">
        <label>Ville actuelle</label>
        <input value={city} onChange={(e) => setCity(e.target.value)} />
      </div>
      <div className="field">
        <label>Statut professionnel</label>
        <input value={jobStatus} onChange={(e) => setJobStatus(e.target.value)} placeholder="CDI, CDD, étudiant…" />
      </div>
      <div className="field">
        <label>Revenu mensuel (€)</label>
        <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} />
      </div>
      <div className="field">
        <label>Garant</label>
        <input value={guarantorStatus} onChange={(e) => setGuarantorStatus(e.target.value)} placeholder="Oui, non, pas nécessaire…" />
      </div>
      <div className="field">
        <label>Revenu du garant (€)</label>
        <input type="number" value={guarantorIncome} onChange={(e) => setGuarantorIncome(e.target.value)} />
      </div>
      <button className="btn primary" style={{ width: "100%" }} onClick={submit} disabled={pending}>
        {pending ? "Envoi…" : "Envoyer ma candidature"}
      </button>
      {status && <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 10 }}>{status}</p>}
    </div>
  );
}
