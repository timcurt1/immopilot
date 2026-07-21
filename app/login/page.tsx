"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase, supabaseConfigured } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("agent@agence.fr");
  const [msg, setMsg] = useState("");

  async function signIn() {
    if (!supabaseConfigured || !supabase) {
      setMsg("Mode local : Supabase n’est pas encore configuré. Tu peux ouvrir le dashboard directement.");
      return;
    }
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setMsg(error ? error.message : "Lien magique envoyé par email.");
  }

  return (
    <main className="appShell" style={{ display: "grid", placeItems: "center" }}>
      <section className="glass" style={{ width: "min(980px,100%)", display: "grid", gridTemplateColumns: "1fr 420px", gap: 18, padding: 18 }}>
        <div className="hero">
          <span className="kicker">Connexion SaaS</span>
          <h2>
            Accès agence,
            <br />
            <span className="grad">agent et candidat.</span>
          </h2>
          <p>En production, chaque utilisateur aura un rôle : admin, manager, agent ou candidat.</p>
        </div>
        <div className="card">
          <h1 style={{ marginTop: 0, color: "var(--navy)" }}>Connexion</h1>
          <div className="field">
            <label>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <button className="btn primary" style={{ width: "100%" }} onClick={signIn}>
            Envoyer lien magique
          </button>
          {msg && <p style={{ color: "var(--muted)", fontSize: 13 }}>{msg}</p>}
          {!supabaseConfigured && (
            <Link className="btn ghost" style={{ width: "100%", marginTop: 10 }} href="/dashboard">
              Continuer en mode démo
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
