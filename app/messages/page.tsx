import type { Metadata } from "next";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { MessagesClient } from "@/components/MessagesClient";
import { getApplications } from "@/lib/data";

export const metadata: Metadata = { title: "Messages", robots: { index: false, follow: false } };

export default async function MessagesPage() {
  const applications = await getApplications();
  return (
    <main className="appShell">
      <Topbar title="Messages IA" subtitle="Modèles prêts à adapter par l’agent." />
      <div className="layout">
        <Sidebar />
        <section className="main">
          <MessagesClient applications={applications} />
        </section>
      </div>
    </main>
  );
}
