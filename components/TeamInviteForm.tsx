"use client";

import { useState } from "react";
import { inviteTeammate } from "@/lib/actions";
import type { Profile } from "@/lib/types";
import { Field, inputClass } from "@/components/ui/Field";
import { Badge } from "@/components/marketing/Badge";

const ROLES = [
  { value: "agent", label: "Agent" },
  { value: "manager", label: "Manager" },
  { value: "admin", label: "Admin" },
];

export function TeamInviteForm({ team }: { team: Profile[] }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("agent");
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);

  async function invite() {
    if (!email) {
      setStatus("Renseigne un email.");
      return;
    }
    setPending(true);
    const result = await inviteTeammate(email, role);
    setPending(false);
    setStatus(
      result.ok
        ? result.local
          ? "Mode démo : l'invitation n'est pas réellement envoyée."
          : `Invitation envoyée à ${email}.`
        : `Erreur : ${result.error}`
    );
    if (result.ok) setEmail("");
  }

  return (
    <>
      {team.length > 0 && (
        <div className="grid gap-2.5 mb-5">
          {team.map((p) => (
            <div key={p.id} className="flex items-center justify-between gap-3 rounded-xl border border-line bg-white p-3.5">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink truncate">{p.full_name || p.email}</p>
                <p className="mt-0.5 text-xs text-muted truncate">{p.email}</p>
              </div>
              <Badge tone="brand">{p.role}</Badge>
            </div>
          ))}
        </div>
      )}
      <Field label="Email du coéquipier">
        <input className={inputClass} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="collegue@agence.fr" />
      </Field>
      <Field label="Rôle">
        <select className={inputClass} value={role} onChange={(e) => setRole(e.target.value)}>
          {ROLES.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
      </Field>
      <button
        onClick={invite}
        disabled={pending}
        className="w-full h-11 rounded-xl bg-ink text-white text-sm font-semibold hover:bg-brand-700 transition-colors disabled:opacity-60"
      >
        {pending ? "Envoi…" : "Inviter"}
      </button>
      {status && <p className="mt-3 text-sm text-muted">{status}</p>}
    </>
  );
}
