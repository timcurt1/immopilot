import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { AssistantClient } from "@/components/AssistantClient";
import { getApplications } from "@/lib/data";

export const metadata: Metadata = { title: "Assistant IA", robots: { index: false, follow: false } };

export default async function AssistantPage() {
  const applications = await getApplications();
  return (
    <AppShell
      title="Assistant IA"
      subtitle="Pose une question sur tes dossiers, l’IA propose une réponse, jamais une action automatique."
    >
      <AssistantClient applications={applications} />
    </AppShell>
  );
}
