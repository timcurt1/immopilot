import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { TasksClient } from "@/components/TasksClient";
import { getTasks, getApplications, getAgencyTeam } from "@/lib/data";

export const metadata: Metadata = { title: "Tâches", robots: { index: false, follow: false } };

export default async function TasksPage() {
  const [tasks, applications, team] = await Promise.all([getTasks(), getApplications(), getAgencyTeam()]);

  return (
    <AppShell title="Tâches" subtitle="Rappels et actions à traiter, centralisés et assignables à l’équipe.">
      <TasksClient tasks={tasks} applications={applications} team={team} />
    </AppShell>
  );
}
