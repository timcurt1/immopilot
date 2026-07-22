"use client";

import { useState } from "react";
import { inviteTeammate } from "@/lib/actions";
import type { Profile } from "@/lib/types";

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
          ? "Mode démo : l’invitation n’est pas réellement envoyée."
          : `Invitation envoyée à ${email}.`
        : `Erreur : ${result.error}`
    );
    if (result.ok) setEmail("");
  }

  return (
    <>
      {team.length > 0 && (
        <div className="list" style={{ marginBottom: 14 }}>
          {team.map((p) => (
            <div key={p.id} className="rowCard" style={{ gridTemplateColumns: "1fr auto" }}>
              <div>
                <b>{p.full_name || p.email}</b>
                <p style={{ margin: "4px 0 0", color: "var(--muted)", fontSize: 12 }}>{p.email}</p>
              </div>
              <span className="chip blue">{p.role}</span>
            </div>
          ))}
        </div>
      )}
      <div className="field">
        <label>Email du coéquipier</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="collegue@agence.fr" />
      </div>
      <div className="field">
        <label>Rôle</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          {ROLES.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
      </div>
      <button className="btn primary" style={{ width: "100%" }} onClick={invite} disabled={pending}>
        {pending ? "Envoi…" : "Inviter"}
      </button>
      {status && <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 10 }}>{status}</p>}
    </>
  );
}
