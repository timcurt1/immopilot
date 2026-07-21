import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { DocumentChecklist } from "@/components/DocumentChecklist";
import { ApplicationActions } from "@/components/ApplicationActions";
import { getApplication, getDocuments, completionRate, nextBestAction } from "@/lib/data";

export default async function ApplicationDetailPage({ params }: { params: { id: string } }) {
  const application = await getApplication(params.id);
  const documents = await getDocuments(params.id);

  if (!application) {
    return (
      <main className="appShell">
        <Topbar title="Dossier introuvable" subtitle="Aucune candidature." />
      </main>
    );
  }

  const completion = completionRate(documents);

  return (
    <main className="appShell">
      <Topbar title={`${application.first_name} ${application.last_name}`} subtitle="Fiche candidat, documents et actions IA." />
      <div className="layout">
        <Sidebar />
        <section className="main">
          <div className="detailLayout">
            <section className="glass hero">
              <Link className="btn ghost" href="/applications">
                ← Retour
              </Link>
              <h2>
                {application.first_name} {application.last_name}
                <br />
                <span className="grad">{application.score} / 100</span>
              </h2>
              <p>
                {application.property?.title || "Bien non relié"} · {application.candidate_email} · {application.phone}
              </p>
              <div className="grid3" style={{ marginTop: 18 }}>
                <div className="card">
                  <b>Statut</b>
                  <p>{application.stage}</p>
                </div>
                <div className="card">
                  <b>Visite</b>
                  <p>{application.visit_status}</p>
                </div>
                <div className="card">
                  <b>Signature</b>
                  <p>{application.signature_probability}%</p>
                </div>
              </div>
              <div className="card" style={{ marginTop: 14 }}>
                <b>Complétude documents</b>
                <div className="progress" style={{ marginTop: 10 }}>
                  <div style={{ width: `${completion}%` }} />
                </div>
                <p style={{ color: "var(--muted)", fontSize: 13 }}>{completion}% complet</p>
              </div>
              <div className="notice" style={{ marginTop: 14 }}>
                <b>Prochaine meilleure action</b>
                <p>{nextBestAction(application, documents)}</p>
              </div>
            </section>
            <aside className="glass" style={{ padding: 14 }}>
              <h3 style={{ marginTop: 0, color: "var(--navy)" }}>Documents</h3>
              <DocumentChecklist documents={documents} />
            </aside>
          </div>
          <ApplicationActions application={application} documents={documents} />
        </section>
      </div>
    </main>
  );
}
