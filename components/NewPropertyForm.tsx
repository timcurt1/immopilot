"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProperty } from "@/lib/actions";
import { Field, inputClass } from "@/components/ui/Field";

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
    <section className="rounded-2xl border border-line bg-white p-6 max-w-xl">
      <Field label="Titre">
        <input className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="T2 — Paris 11e" />
      </Field>
      <Field label="Adresse">
        <input className={inputClass} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="12 rue de la République" />
      </Field>
      <Field label="Ville">
        <input className={inputClass} value={city} onChange={(e) => setCity(e.target.value)} placeholder="Paris" />
      </Field>
      <Field label="Loyer (€ CC)">
        <input className={inputClass} type="number" value={rent} onChange={(e) => setRent(e.target.value)} placeholder="1250" />
      </Field>
      <button
        onClick={submit}
        disabled={pending}
        className="w-full h-11 rounded-xl bg-ink text-white text-sm font-semibold hover:bg-brand-700 transition-colors disabled:opacity-60"
      >
        {pending ? "Création…" : "Créer le bien"}
      </button>
      {status && <p className="mt-3 text-sm text-muted">{status}</p>}
    </section>
  );
}
