import type { Metadata } from "next";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { DocumentChecklist } from "@/components/DocumentChecklist";
import { CandidateUpload } from "@/components/CandidateUpload";
import { getCurrentCandidateApplication, getDocuments, completionRate } from "@/lib/data";

export const metadata: Metadata = { title: "Espace candidat", robots: { index: false, follow: false } };

export default async function CandidatePage() {
  const application = await getCurrentCandidateApplication();

  if (!application) {
    return (
      <main className="appShell">
        <Topbar title="Portail candidat" subtitle="Espace simple pour compléter son dossier." />
        <div className="layout">
          <Sidebar />
          <section className="main">
            <section className="glass hero">
              <span className="kicker">Candidat</span>
              <h2>
                Aucun dossier trouvé
                <br />
                <span className="grad">pour ce compte.</span>
              </h2>
              <p>Connecte-toi avec l’email utilisé pour ta candidature, ou contacte ton agence.</p>
            </section>
          </section>
        </div>
      </main>
    );
  }

  const docs = await getDocuments(application.id);
  const completion = completionRate(docs);

  return (
    <main className="appShell">
      <Topbar title="Portail candidat" subtitle="Espace simple pour compléter son dossier." />
      <div className="layout">
        <Sidebar />
        <section className="main">
          <div className="grid2">
            <section className="glass hero">
              <span className="kicker">Candidat</span>
              <h2>
                Bonjour {application.first_name}.
                <br />
                <span className="grad">Votre dossier avance.</span>
              </h2>
              <p>
                Demande pour {application.property?.title}. Ajoutez vos documents, suivez votre progression et confirmez votre
                visite.
              </p>
              <div className="card">
                <b>Progression</b>
                <div className="progress" style={{ marginTop: 10 }}>
                  <div style={{ width: `${completion}%` }} />
                </div>
                <p style={{ color: "var(--muted)", fontSize: 13 }}>{completion}% complet</p>
              </div>
              <div className="notice">
                <b>Message de l’agence</b>
                <p>{application.last_message || "Aucun message pour le moment."}</p>
              </div>
            </section>
            <section className="glass" style={{ padding: 14 }}>
              <h3 style={{ marginTop: 0, color: "var(--navy)" }}>Documents demandés</h3>
              {docs.length ? <DocumentChecklist documents={docs} /> : <p style={{ color: "var(--muted)" }}>Aucun document demandé pour le moment.</p>}
            </section>
          </div>
          <CandidateUpload applicationId={application.id} documents={docs} />
        </section>
      </div>
    </main>
  );
}
