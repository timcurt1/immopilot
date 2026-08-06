"use client";

import { useState } from "react";
import { PLAN_ORDER, PLANS, type PlanId } from "@/lib/plans";

export function BillingSection({ currentPlan, subscriptionStatus }: { currentPlan: string; subscriptionStatus: string | null }) {
  const [pending, setPending] = useState<string | null>(null);
  const [status, setStatus] = useState("");

  async function upgrade(plan: PlanId) {
    setPending(plan);
    setStatus("");
    const res = await fetch("/api/stripe/checkout", { method: "POST", body: JSON.stringify({ plan }) });
    const body = await res.json();
    setPending(null);
    if (!res.ok) {
      setStatus(`Erreur : ${body.error}`);
      return;
    }
    window.location.href = body.url;
  }

  async function manage() {
    setPending("portal");
    setStatus("");
    const res = await fetch("/api/stripe/portal", { method: "POST" });
    const body = await res.json();
    setPending(null);
    if (!res.ok) {
      setStatus(`Erreur : ${body.error}`);
      return;
    }
    window.location.href = body.url;
  }

  return (
    <section className="rounded-2xl border border-line bg-white p-6">
      <span className="text-xs font-semibold uppercase tracking-wide text-muted">Abonnement</span>
      <h2 className="mt-2 font-display font-bold text-2xl text-ink tracking-tight">
        Palier actuel : <span className="text-brand-600">{PLANS[currentPlan as PlanId]?.label || currentPlan}</span>
      </h2>
      <p className="mt-1 text-sm text-muted">Statut : {subscriptionStatus || "aucun abonnement actif (mode local ou essai)."}</p>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {PLAN_ORDER.map((id) => (
          <div key={id} className="rounded-xl border border-line p-4">
            <p className="font-semibold text-ink">{PLANS[id].label}</p>
            <p className="mt-1 text-sm text-muted">{PLANS[id].price} € / mois</p>
            <p className="mt-1 text-xs text-muted">
              Jusqu&rsquo;à {PLANS[id].maxProperties === Infinity ? "∞" : PLANS[id].maxProperties} biens ·{" "}
              {PLANS[id].maxUsers === Infinity ? "∞" : PLANS[id].maxUsers} utilisateurs
            </p>
            <button
              onClick={() => upgrade(id)}
              disabled={pending === id || currentPlan === id}
              className="w-full mt-3 h-10 rounded-lg bg-ink text-white text-sm font-semibold hover:bg-brand-700 transition-colors disabled:opacity-60"
            >
              {currentPlan === id ? "Palier actuel" : pending === id ? "…" : "Choisir"}
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={manage}
        disabled={pending === "portal"}
        className="mt-5 inline-flex items-center h-10 px-4 rounded-xl border border-line text-sm font-medium text-ink-soft hover:text-ink hover:border-ink/30 transition-colors disabled:opacity-60"
      >
        Gérer mon abonnement
      </button>
      {status && <p className="mt-3 text-sm text-muted">{status}</p>}
    </section>
  );
}
