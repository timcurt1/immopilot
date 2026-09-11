"use client";

import { useState } from "react";
import { UserX } from "lucide-react";
import { inviteTeammate, removeTeammate, updateTeammateRole } from "@/lib/actions";
import type { Profile } from "@/lib/types";
import { Field, inputClass } from "@/components/ui/Field";
import { Badge } from "@/components/marketing/Badge";

const ROLES = [
  { value: "agent", label: "Agent" },
  { value: "manager", label: "Manager" },
  { value: "admin", label: "Admin" },
];

export function TeamInviteForm({
  team,
  currentRole,
  currentProfileId,
}: {
  team: Profile[];
  currentRole?: string;
  currentProfileId?: string;
}) {
  const [members, setMembers] = useState(team);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("agent");
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
  const [roleErrors, setRoleErrors] = useState<Record<string, string>>({});
  const [removingId, setRemovingId] = useState<string | null>(null);

  const isAdmin = currentRole === "admin";

  async function changeRole(profileId: string, newRole: string) {
    const previous = members;
    setMembers((prev) => prev.map((p) => (p.id === profileId ? { ...p, role: newRole } : p)));
    setRoleErrors((prev) => ({ ...prev, [profileId]: "" }));
    const result = await updateTeammateRole(profileId, newRole);
    if (!result.ok) {
      setMembers(previous);
      setRoleErrors((prev) => ({ ...prev, [profileId]: result.error || "Une erreur est survenue." }));
    }
  }

  async function revoke(profileId: string) {
    if (!window.confirm("Révoquer ce coéquipier ? Il perdra immédiatement son accès.")) return;
    setRemovingId(profileId);
    const result = await removeTeammate(profileId);
    setRemovingId(null);
    if (result.ok) {
      setMembers((prev) => prev.filter((p) => p.id !== profileId));
    } else {
      setRoleErrors((prev) => ({ ...prev, [profileId]: result.error || "Une erreur est survenue." }));
    }
  }

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
      {members.length > 0 && (
        <div className="grid grid-cols-1 gap-2.5 mb-5">
          {members.map((p) => (
            <div key={p.id} className="rounded-xl border border-line bg-white p-3.5">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink truncate">{p.full_name || p.email}</p>
                  <p className="mt-0.5 text-xs text-muted truncate">{p.email}</p>
                </div>
                {isAdmin ? (
                  <div className="flex items-center gap-2 shrink-0">
                    {p.id === currentProfileId ? (
                      <Badge tone="brand">{p.role} (toi)</Badge>
                    ) : (
                      <select
                        className="h-9 rounded-lg border border-line bg-white px-2.5 text-xs font-semibold text-ink outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-colors"
                        value={p.role}
                        onChange={(e) => changeRole(p.id, e.target.value)}
                      >
                        {ROLES.map((r) => (
                          <option key={r.value} value={r.value}>
                            {r.label}
                          </option>
                        ))}
                      </select>
                    )}
                    {p.id !== currentProfileId && (
                      <button
                        onClick={() => revoke(p.id)}
                        disabled={removingId === p.id}
                        className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-line text-red-600 hover:bg-red-50 transition-colors disabled:opacity-60"
                        aria-label="Révoquer"
                        title="Révoquer"
                      >
                        <UserX size={15} />
                      </button>
                    )}
                  </div>
                ) : (
                  <Badge tone="brand">{p.role}</Badge>
                )}
              </div>
              {roleErrors[p.id] && <p className="mt-2 text-xs text-red-600">{roleErrors[p.id]}</p>}
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
