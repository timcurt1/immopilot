"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProperty } from "@/lib/actions";

export function NewPropertyForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [rent, setRent] = useState("");
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);

  async function submit() {
    if (!title || !city || !rent) {
      setStatus("Renseigne au moins le titre, la ville et le loyer.");
      return;
    }
    setPending(true);
    const result = await createProperty({ title, address, city, rent: Number(rent) });
    setPending(false);
    if (result.ok) {
      router.push("/properties");
      return;
    }
    setStatus(`Erreur : ${result.error}`);
  }

  return (
    <section className="glass" style={{ padding: 24, maxWidth: 560 }}>
      <div className="field">
        <label>Titre</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="T2 — Paris 11e" />
      </div>
      <div className="field">
        <label>Adresse</label>
        <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="12 rue de la République" />
      </div>
      <div className="field">
        <label>Ville</label>
        <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Paris" />
      </div>
      <div className="field">
        <label>Loyer (€ CC)</label>
        <input type="number" value={rent} onChange={(e) => setRent(e.target.value)} placeholder="1250" />
      </div>
      <button className="btn primary" style={{ width: "100%" }} onClick={submit} disabled={pending}>
        {pending ? "Création…" : "Créer le bien"}
      </button>
      {status && <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 10 }}>{status}</p>}
    </section>
  );
}
