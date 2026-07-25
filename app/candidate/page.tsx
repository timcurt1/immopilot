import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import { DocumentChecklist } from "@/components/DocumentChecklist";
import { CandidateUpload } from "@/components/CandidateUpload";
import { getCurrentCandidateApplication, getDocuments, completionRate } from "@/lib/data";

export const metadata: Metadata = { title: "Espace candidat", robots: { index: false, follow: false } };

export default async function CandidatePage() {
  const application = await getCurrentCandidateApplication();

  if (!application) {
    return (
      <AppShell title="Portail candidat" subtitle="Espace simple pour compléter son dossier.">
        <section className="rounded-2xl bg-ink text-white p-8">
          <span className="text-xs font-semibold uppercase tracking-wide text-white/60">Candidat</span>
          <h2 className="mt-3 font-display font-bold text-2xl tracking-tight leading-tight">
            Aucun dossier trouvé
            <br />
            <span className="bg-gradient-to-r from-brand-300 to-violet-300 bg-clip-text text-transparent">
              pour ce compte.
            </span>
          </h2>
          <p className="mt-3 text-sm text-white/70">
            Connecte-toi avec l&rsquo;email utilisé pour ta candidature, ou contacte ton agence.
          </p>
        </section>
      </AppShell>
    );
  }

  const docs = await getDocuments(application.id);
  const completion = completionRate(docs);

  return (
    <AppShell title="Portail candidat" subtitle="Espace simple pour compléter son dossier.">
      <div className="grid gap-6">
        <div className="grid lg:grid-cols-2 gap-6 items-start">
          <section className="rounded-2xl bg-ink text-white p-8">
            <span className="text-xs font-semibold uppercase tracking-wide text-white/60">Candidat</span>
            <h2 className="mt-3 font-display font-bold text-2xl tracking-tight leading-tight">
              Bonjour {application.first_name}.
              <br />
              <span className="bg-gradient-to-r from-brand-300 to-violet-300 bg-clip-text text-transparent">
                Votre dossier avance.
              </span>
            </h2>
            <p className="mt-3 text-sm text-white/70 leading-relaxed">
              Demande pour {application.property?.title}. Ajoutez vos documents, suivez votre progression et confirmez
              votre visite.
            </p>
            <div className="mt-5 rounded-xl bg-white/10 p-4">
              <p className="text-sm font-semibold">Progression</p>
              <div className="mt-2.5 h-2 rounded-full bg-white/15 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-brand-400 to-violet-400" style={{ width: `${completion}%` }} />
              </div>
              <p className="mt-1.5 text-xs text-white/70">{completion}% complet</p>
            </div>
            <div className="mt-3 rounded-xl bg-white/10 p-4">
              <p className="text-sm font-semibold">Message de l&rsquo;agence</p>
              <p className="mt-1 text-sm text-white/80">{application.last_message || "Aucun message pour le moment."}</p>
            </div>
          </section>
          <section className="rounded-2xl border border-line bg-white p-5">
            <h3 className="font-display font-bold text-lg text-ink mb-4">Documents demandés</h3>
            {docs.length ? <DocumentChecklist documents={docs} /> : <p className="text-sm text-muted">Aucun document demandé pour le moment.</p>}
          </section>
        </div>
        <CandidateUpload applicationId={application.id} documents={docs} />
      </div>
    </AppShell>
  );
}
