import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { DocumentChecklist } from "@/components/DocumentChecklist";
import { ApplicationActions } from "@/components/ApplicationActions";
import { VisitScheduler } from "@/components/VisitScheduler";
import { getApplication, getDocuments, getVisits, completionRate, nextBestAction } from "@/lib/data";

export const metadata: Metadata = { title: "Détail de candidature", robots: { index: false, follow: false } };

export default async function ApplicationDetailPage({ params }: { params: { id: string } }) {
  const application = await getApplication(params.id);
  const documents = await getDocuments(params.id);
  const allVisits = await getVisits();
  const visits = allVisits.filter((v) => v.application_id === params.id);

  if (!application) {
    return (
      <AppShell title="Dossier introuvable" subtitle="Aucune candidature.">
        <p className="text-sm text-muted">Ce dossier n&rsquo;existe pas ou plus.</p>
      </AppShell>
    );
  }

  const completion = completionRate(documents);

  return (
    <AppShell title={`${application.first_name} ${application.last_name}`} subtitle="Fiche candidat, documents et actions IA.">
      <div className="grid gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">
          <section className="rounded-2xl bg-ink text-white p-8">
            <Link href="/applications" className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors mb-5">
              <ArrowLeft size={15} /> Retour
            </Link>
            <h2 className="font-display font-bold text-3xl tracking-tight leading-tight">
              {application.first_name} {application.last_name}
              <br />
              <span className="bg-gradient-to-r from-brand-300 to-violet-300 bg-clip-text text-transparent">
                {application.score} / 100
              </span>
            </h2>
            <p className="mt-4 text-sm text-white/70">
              {application.property?.title || "Bien non relié"} · {application.candidate_email} · {application.phone}
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-white/10 p-3.5">
                <p className="text-xs font-semibold text-white/60">Statut</p>
                <p className="mt-1 text-sm font-semibold">{application.stage}</p>
              </div>
              <div className="rounded-xl bg-white/10 p-3.5">
                <p className="text-xs font-semibold text-white/60">Visite</p>
                <p className="mt-1 text-sm font-semibold">{application.visit_status}</p>
              </div>
              <div className="rounded-xl bg-white/10 p-3.5">
                <p className="text-xs font-semibold text-white/60">Signature</p>
                <p className="mt-1 text-sm font-semibold">{application.signature_probability}%</p>
              </div>
            </div>
            <div className="mt-4 rounded-xl bg-white/10 p-3.5">
              <p className="text-xs font-semibold text-white/60 mb-2">Complétude documents</p>
              <div className="h-2 rounded-full bg-white/15 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-brand-400 to-violet-400" style={{ width: `${completion}%` }} />
              </div>
              <p className="mt-1.5 text-xs text-white/70">{completion}% complet</p>
            </div>
            <div className="mt-4 rounded-xl bg-white/10 p-3.5">
              <p className="text-sm font-semibold">Prochaine meilleure action</p>
              <p className="mt-1 text-sm text-white/80">{nextBestAction(application, documents)}</p>
            </div>
          </section>
          <aside className="rounded-2xl border border-line bg-white p-5">
            <h3 className="font-display font-bold text-lg text-ink mb-4">Documents</h3>
            <DocumentChecklist documents={documents} interactive />
          </aside>
        </div>
        <ApplicationActions application={application} documents={documents} />
        <VisitScheduler applicationId={application.id} visits={visits} />
      </div>
    </AppShell>
  );
}
