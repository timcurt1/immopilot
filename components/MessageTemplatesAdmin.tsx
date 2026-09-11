"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { createMessageTemplate, deleteMessageTemplate, updateMessageTemplate } from "@/lib/actions";
import type { MessageTemplate } from "@/lib/types";
import { Field, inputClass, textareaClass } from "@/components/ui/Field";

export function MessageTemplatesAdmin({ templates }: { templates: MessageTemplate[] }) {
  const [items, setItems] = useState(templates);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [editPending, setEditPending] = useState(false);
  const [editError, setEditError] = useState("");

  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [createPending, setCreatePending] = useState(false);
  const [createError, setCreateError] = useState("");

  const [deletingId, setDeletingId] = useState<string | null>(null);

  function startEdit(t: MessageTemplate) {
    setEditingId(t.id);
    setEditTitle(t.title);
    setEditBody(t.body);
    setEditError("");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditTitle("");
    setEditBody("");
    setEditError("");
  }

  async function saveEdit(id: string) {
    if (!editTitle.trim() || !editBody.trim()) {
      setEditError("Le titre et le contenu sont requis.");
      return;
    }
    setEditPending(true);
    setEditError("");
    const result = await updateMessageTemplate(id, editTitle.trim(), editBody.trim());
    setEditPending(false);
    if (result.ok) {
      setItems((prev) => prev.map((t) => (t.id === id ? { ...t, title: editTitle.trim(), body: editBody.trim() } : t)));
      cancelEdit();
    } else {
      setEditError(result.error || "Une erreur est survenue.");
    }
  }

  async function remove(id: string) {
    if (!window.confirm("Supprimer ce modèle de message ?")) return;
    setDeletingId(id);
    const result = await deleteMessageTemplate(id);
    setDeletingId(null);
    if (result.ok) {
      setItems((prev) => prev.filter((t) => t.id !== id));
    } else {
      window.alert(result.error || "Une erreur est survenue.");
    }
  }

  async function create() {
    if (!newTitle.trim() || !newBody.trim()) {
      setCreateError("Le titre et le contenu sont requis.");
      return;
    }
    setCreatePending(true);
    setCreateError("");
    const result = await createMessageTemplate(newTitle.trim(), newBody.trim());
    setCreatePending(false);
    if (result.ok) {
      setItems((prev) => [
        ...prev,
        {
          id: `local-${Date.now()}`,
          agency_id: "",
          title: newTitle.trim(),
          body: newBody.trim(),
          created_at: new Date().toISOString(),
        },
      ]);
      setNewTitle("");
      setNewBody("");
    } else {
      setCreateError(result.error || "Une erreur est survenue.");
    }
  }

  return (
    <div>
      {items.length > 0 ? (
        <div className="grid gap-2.5 mb-5">
          {items.map((t) => (
            <div key={t.id} className="rounded-xl border border-line bg-white p-3.5">
              {editingId === t.id ? (
                <div>
                  <Field label="Titre">
                    <input className={inputClass} value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                  </Field>
                  <Field label="Contenu">
                    <textarea className={textareaClass} value={editBody} onChange={(e) => setEditBody(e.target.value)} />
                  </Field>
                  {editError && <p className="mb-3 text-sm text-red-600">{editError}</p>}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => saveEdit(t.id)}
                      disabled={editPending}
                      className="h-10 px-4 rounded-xl bg-ink text-white text-sm font-semibold hover:bg-brand-700 transition-colors disabled:opacity-60"
                    >
                      {editPending ? "Enregistrement…" : "Enregistrer"}
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="h-10 px-4 rounded-xl border border-line text-sm font-semibold text-ink-soft hover:bg-surface transition-colors"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-ink truncate">{t.title}</p>
                    <p className="mt-1 text-xs text-muted line-clamp-2">{t.body}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => startEdit(t)}
                      className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-line text-ink-soft hover:bg-surface transition-colors"
                      aria-label="Modifier"
                      title="Modifier"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => remove(t.id)}
                      disabled={deletingId === t.id}
                      className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-line text-red-600 hover:bg-red-50 transition-colors disabled:opacity-60"
                      aria-label="Supprimer"
                      title="Supprimer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="mb-5 text-sm text-muted">Aucun modèle de message pour l&rsquo;instant.</p>
      )}

      <div className="rounded-xl bg-surface border border-line p-4">
        <p className="text-sm font-semibold text-ink mb-3">Nouveau modèle</p>
        <Field label="Titre">
          <input className={inputClass} value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Relance visite" />
        </Field>
        <Field label="Contenu">
          <textarea
            className={textareaClass}
            value={newBody}
            onChange={(e) => setNewBody(e.target.value)}
            placeholder="Bonjour {prenom}, ..."
          />
        </Field>
        {createError && <p className="mb-3 text-sm text-red-600">{createError}</p>}
        <button
          onClick={create}
          disabled={createPending}
          className="h-10 px-4 rounded-xl bg-ink text-white text-sm font-semibold hover:bg-brand-700 transition-colors disabled:opacity-60"
        >
          {createPending ? "Création…" : "Créer le modèle"}
        </button>
      </div>
    </div>
  );
}
