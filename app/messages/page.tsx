import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { MessagesClient } from "@/components/MessagesClient";
import { getApplications, getDocuments } from "@/lib/data";

export const metadata: Metadata = { title: "Messages", robots: { index: false, follow: false } };

export default async function MessagesPage() {
  const [applications, documents] = await Promise.all([getApplications(), getDocuments()]);
  return (
    <AppShell title="Messages IA" subtitle="Modèles prêts à adapter par l'agent.">
      <MessagesClient applications={applications} documents={documents} />
    </AppShell>
  );
}
