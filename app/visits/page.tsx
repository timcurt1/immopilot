import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { VisitsClient } from "@/components/VisitsClient";
import { getVisits } from "@/lib/data";

export const metadata: Metadata = { title: "Visites", robots: { index: false, follow: false } };

export default async function VisitsPage() {
  const visits = await getVisits();
  return (
    <AppShell title="Visites" subtitle="Programmation, confirmation et comptes-rendus.">
      <VisitsClient visits={visits} />
    </AppShell>
  );
}
