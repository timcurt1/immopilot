"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { CheckCircle2, XCircle, UserRound } from "lucide-react";
import { assignTask, updateTaskStatus } from "@/lib/actions";
import { Badge } from "@/components/marketing/Badge";
import type { Application, Profile, Task } from "@/lib/types";

const PRIORITY_TONE: Record<Task["priority"], ComponentProps<typeof Badge>["tone"]> = {
  high: "red",
  medium: "amber",
  low: "neutral",
};

const PRIORITY_LABEL: Record<Task["priority"], string> = {
  high: "Haute",
  medium: "Moyenne",
  low: "Basse",
};

const PRIORITY_ORDER: Record<Task["priority"], number> = { high: 0, medium: 1, low: 2 };

const STATUS_LABEL: Record<Task["status"], string> = {
  open: "Ouverte",
  done: "Terminée",
  ignored: "Ignorée",
};

const STATUS_TONE: Record<Task["status"], ComponentProps<typeof Badge>["tone"]> = {
  open: "brand",
  done: "green",
  ignored: "neutral",
};

const selectClass =
  "h-9 rounded-lg border border-line bg-white px-2.5 text-xs font-medium text-ink-soft outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-colors";

export function TasksClient({
  tasks,
  applications,
  team,
}: {
  tasks: Task[];
  applications: Application[];
  team: Profile[];
}) {
  const [localTasks, setLocalTasks] = useState(tasks);
  const [showAll, setShowAll] = useState(false);
  const [errorById, setErrorById] = useState<Record<string, string>>({});

  const applicationById = useMemo(() => {
    const map = new Map<string, Application>();
    for (const app of applications) map.set(app.id, app);
    return map;
  }, [applications]);

  const visibleTasks = useMemo(() => {
    const filtered = showAll ? localTasks : localTasks.filter((t) => t.status === "open");
    return [...filtered].sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);
  }, [localTasks, showAll]);

  async function handleAssign(taskId: string, assignedTo: string | null) {
    const previous = localTasks;
    setLocalTasks((ts) => ts.map((t) => (t.id === taskId ? { ...t, assigned_to: assignedTo } : t)));
    const result = await assignTask(taskId, assignedTo);
    if (result.ok) {
      setErrorById((e) => ({ ...e, [taskId]: "" }));
    } else {
      setLocalTasks(previous);
      setErrorById((e) => ({ ...e, [taskId]: `Erreur : ${result.error}` }));
    }
  }

  async function handleStatus(taskId: string, status: Task["status"]) {
    const previous = localTasks;
    setLocalTasks((ts) => ts.map((t) => (t.id === taskId ? { ...t, status } : t)));
    const result = await updateTaskStatus(taskId, status);
    if (result.ok) {
      setErrorById((e) => ({ ...e, [taskId]: "" }));
    } else {
      setLocalTasks(previous);
      setErrorById((e) => ({ ...e, [taskId]: `Erreur : ${result.error}` }));
    }
  }

  if (localTasks.length === 0) {
    return <p className="text-sm text-muted py-2">Aucune tâche pour le moment.</p>;
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm text-muted">
          {visibleTasks.length} tâche{visibleTasks.length > 1 ? "s" : ""} {showAll ? "au total" : "ouverte" + (visibleTasks.length > 1 ? "s" : "")}
        </p>
        <label className="flex items-center gap-2 text-xs font-semibold text-ink-soft">
          <input type="checkbox" checked={showAll} onChange={(e) => setShowAll(e.target.checked)} className="h-3.5 w-3.5 rounded border-line" />
          Afficher terminées / ignorées
        </label>
      </div>

      {visibleTasks.length === 0 ? (
        <p className="text-sm text-muted py-2">Aucune tâche ouverte pour le moment.</p>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {visibleTasks.map((t) => {
            const app = applicationById.get(t.application_id);
            return (
              <div key={t.id} className="rounded-2xl border border-line bg-white p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-ink">{t.title}</p>
                    <p className="mt-0.5 text-xs text-muted truncate">
                      {app ? (
                        <Link href={`/applications/${app.id}`} className="text-brand-600 hover:underline">
                          {app.first_name} {app.last_name}
                          {app.property?.title ? ` · ${app.property.title}` : ""}
                        </Link>
                      ) : (
                        "Dossier introuvable"
                      )}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <Badge tone={PRIORITY_TONE[t.priority]}>{PRIORITY_LABEL[t.priority]}</Badge>
                      {showAll && <Badge tone={STATUS_TONE[t.status]}>{STATUS_LABEL[t.status]}</Badge>}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <UserRound size={14} className="text-muted" />
                    <select
                      className={selectClass}
                      value={t.assigned_to ?? ""}
                      onChange={(e) => handleAssign(t.id, e.target.value || null)}
                    >
                      <option value="">Non assignée</option>
                      {team.map((member) => (
                        <option key={member.id} value={member.id}>
                          {member.full_name || member.email}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {t.status === "open" && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => handleStatus(t.id, "done")}
                      className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-positive-soft text-green-700 text-xs font-semibold hover:bg-green-100 transition-colors"
                    >
                      <CheckCircle2 size={13} /> Marquer terminée
                    </button>
                    <button
                      onClick={() => handleStatus(t.id, "ignored")}
                      className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg border border-line text-xs font-semibold text-ink-soft hover:text-ink hover:border-ink/30 transition-colors"
                    >
                      <XCircle size={13} /> Ignorer
                    </button>
                  </div>
                )}
                {errorById[t.id] && <p className="mt-2 text-xs text-red-700">{errorById[t.id]}</p>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
