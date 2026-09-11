import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { ApplicationTable } from "@/components/ApplicationTable";
import { NewProspectForm } from "@/components/NewProspectForm";
import { getApplications } from "@/lib/data";

export const metadata: Metadata = { title: "Candidatures", robots: { index: false, follow: false } };

export default async function ApplicationsPage() {
  const applications = await getApplications();
  return (
    <AppShell title="Candidatures" subtitle="Liste filtrable des dossiers locatifs.">
      <div className="grid gap-6">
        <section className="rounded-2xl bg-ink text-white p-8">
          <span className="text-xs font-semibold uppercase tracking-wide text-white/60">Flux locatif</span>
          <h2 className="mt-3 font-display font-bold text-3xl tracking-tight leading-tight">
            Traiter les dossiers
            <br />
            <span className="bg-gradient-to-r from-brand-300 to-violet-300 bg-clip-text text-transparent">
              avec méthode.
            </span>
          </h2>
          <p className="mt-4 text-sm text-white/70 leading-relaxed max-w-xl">
            Chaque dossier est relié à un bien, des documents, une timeline, une visite et une prochaine action.
          </p>
        </section>
        <NewProspectForm />
        <ApplicationTable applications={applications} />
      </div>
    </AppShell>
  );
}
