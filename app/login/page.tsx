"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase, supabaseConfigured } from "@/lib/supabaseClient";
import { Logo } from "@/components/marketing/Logo";

export default function LoginPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("agent@agence.fr");
  const [agencyName, setAgencyName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [msg, setMsg] = useState("");

  async function signIn() {
    if (!supabaseConfigured || !supabase) {
      setMsg("Mode local : Supabase n’est pas encore configuré. Tu peux ouvrir le dashboard directement.");
      return;
    }
    if (mode === "signup") {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: { signup: true, agency_name: agencyName, first_name: firstName, last_name: lastName },
        },
      });
      setMsg(error ? error.message : "Lien magique envoyé par email. Clique dessus pour créer ton agence.");
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
          <Link href="/" style={{ display: "inline-block", marginBottom: 18 }}>
            <Logo />
          </Link>
          <span className="kicker">Connexion</span>
          <h2>
            Accès agence,
            <br />
            <span className="grad">agent et candidat.</span>
          </h2>
          <p>Chaque utilisateur dispose d'un rôle adapté : admin, manager, agent ou candidat.</p>
        </div>
        <div className="card">
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <button className={mode === "signin" ? "btn primary" : "btn ghost"} style={{ flex: 1 }} onClick={() => setMode("signin")}>
              Connexion
            </button>
            <button className={mode === "signup" ? "btn primary" : "btn ghost"} style={{ flex: 1 }} onClick={() => setMode("signup")}>
              Créer une agence
            </button>
          </div>
          {mode === "signup" && (
            <>
              <div className="field">
                <label>Nom de l’agence</label>
                <input value={agencyName} onChange={(e) => setAgencyName(e.target.value)} placeholder="Agence Dupont Immobilier" />
              </div>
              <div className="field">
                <label>Prénom</label>
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="field">
                <label>Nom</label>
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
            </>
          )}
          <div className="field">
            <label>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <button className="btn primary" style={{ width: "100%" }} onClick={signIn}>
            {mode === "signup" ? "Créer mon agence" : "Envoyer lien magique"}
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
