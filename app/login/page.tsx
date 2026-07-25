"use client";

import { useState } from "react";
import Link from "next/link";
import { supabaseConfigured } from "@/lib/supabaseConfig";
import { Logo } from "@/components/marketing/Logo";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { Field, inputClass } from "@/components/ui/Field";

export default function LoginPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("agent@agence.fr");
  const [agencyName, setAgencyName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [msg, setMsg] = useState("");

  async function signIn() {
    if (!supabaseConfigured) {
      setMsg("Mode local : Supabase n'est pas encore configuré. Tu peux ouvrir le dashboard directement.");
      return;
    }
    const { supabase } = await import("@/lib/supabaseClient");
    if (!supabase) {
      setMsg("Mode local : Supabase n'est pas encore configuré. Tu peux ouvrir le dashboard directement.");
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
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-paper px-4 py-12">
      <AmbientBackground parallax />
      <div className="relative w-full max-w-4xl rounded-3xl border border-line bg-white shadow-[0_40px_100px_rgba(15,23,42,0.12)] overflow-hidden grid md:grid-cols-[1fr_420px]">
        <div className="p-10 flex flex-col justify-center">
          <Link href="/" className="inline-flex mb-8">
            <Logo />
          </Link>
          <span className="inline-flex w-max items-center rounded-full border border-brand-100 bg-brand-50 px-3.5 py-1.5 text-xs font-semibold text-brand-700 mb-5">
            Connexion
          </span>
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-ink tracking-tight leading-tight">
            Accès agence,
            <br />
            <span className="bg-gradient-to-r from-brand-600 to-violet-500 bg-clip-text text-transparent">
              agent et candidat.
            </span>
          </h1>
          <p className="mt-4 text-muted leading-relaxed">
            Chaque utilisateur dispose d&rsquo;un rôle adapté : admin, manager, agent ou candidat.
          </p>
        </div>
        <div className="bg-surface p-8 md:p-10 flex flex-col justify-center border-t md:border-t-0 md:border-l border-line">
          <div className="flex gap-2 mb-5">
            <button
              onClick={() => setMode("signin")}
              className={`flex-1 h-10 rounded-xl text-sm font-semibold transition-colors ${
                mode === "signin" ? "bg-ink text-white" : "bg-white border border-line text-ink-soft hover:border-ink/30"
              }`}
            >
              Connexion
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 h-10 rounded-xl text-sm font-semibold transition-colors ${
                mode === "signup" ? "bg-ink text-white" : "bg-white border border-line text-ink-soft hover:border-ink/30"
              }`}
            >
              Créer une agence
            </button>
          </div>
          {mode === "signup" && (
            <>
              <Field label="Nom de l'agence">
                <input className={inputClass} value={agencyName} onChange={(e) => setAgencyName(e.target.value)} placeholder="Agence Dupont Immobilier" />
              </Field>
              <Field label="Prénom">
                <input className={inputClass} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </Field>
              <Field label="Nom">
                <input className={inputClass} value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </Field>
            </>
          )}
          <Field label="Email">
            <input className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} />
          </Field>
          <button
            onClick={signIn}
            className="w-full h-11 rounded-xl bg-ink text-white text-sm font-semibold hover:bg-brand-700 transition-colors"
          >
            {mode === "signup" ? "Créer mon agence" : "Envoyer lien magique"}
          </button>
          {msg && <p className="mt-3 text-sm text-muted">{msg}</p>}
          {!supabaseConfigured && (
            <Link
              href="/dashboard"
              className="mt-3 w-full inline-flex items-center justify-center h-11 rounded-xl border border-line bg-white text-sm font-semibold text-ink hover:border-ink/30 transition-colors"
            >
              Continuer en mode démo
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
