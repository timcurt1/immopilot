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
    <section className="glass hero" style={{ marginTop: 14 }}>
      <span className="kicker">Abonnement</span>
      <h2>
        Palier actuel :<br />
        <span className="grad">{PLANS[currentPlan as PlanId]?.label || currentPlan}</span>
      </h2>
      <p>Statut : {subscriptionStatus || "aucun abonnement actif (mode local ou essai)."}</p>
      <div className="grid3" style={{ marginTop: 14 }}>
        {PLAN_ORDER.map((id) => (
          <div key={id} className="card">
            <b>{PLANS[id].label}</b>
            <p style={{ color: "var(--muted)" }}>{PLANS[id].price} € / mois</p>
            <p style={{ fontSize: 12, color: "var(--muted)" }}>
              Jusqu’à {PLANS[id].maxProperties === Infinity ? "∞" : PLANS[id].maxProperties} biens ·{" "}
              {PLANS[id].maxUsers === Infinity ? "∞" : PLANS[id].maxUsers} utilisateurs
            </p>
            <button className="btn primary" style={{ width: "100%", marginTop: 10 }} onClick={() => upgrade(id)} disabled={pending === id || currentPlan === id}>
              {currentPlan === id ? "Palier actuel" : pending === id ? "…" : "Choisir"}
            </button>
          </div>
        ))}
      </div>
      <button className="btn ghost" style={{ marginTop: 14 }} onClick={manage} disabled={pending === "portal"}>
        Gérer mon abonnement
      </button>
      {status && <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 10 }}>{status}</p>}
    </section>
  );
}
