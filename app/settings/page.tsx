import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";

export default function SettingsPage() {
  return (
    <main className="appShell">
      <Topbar title="Réglages" subtitle="Préparation agence, sécurité et RGPD." />
      <div className="layout">
        <Sidebar />
        <section className="main">
          <div className="grid2">
            <section className="glass hero">
              <span className="kicker">Sécurité & RGPD</span>
              <h2>
                Prêt pour
                <br />
                <span className="grad">un pilote agence.</span>
              </h2>
              <p>
                Cette base prévoit les rôles, l’accès par agence, les documents privés, les traces d’activité et la séparation
                agent / candidat.
              </p>
              <div className="list">
                <div className="notice">
                  <b>Rôles</b>
                  <p>Admin, manager, agent, candidat.</p>
                </div>
                <div className="notice">
                  <b>Données</b>
                  <p>Supabase Postgres + Row Level Security.</p>
                </div>
                <div className="notice">
                  <b>Documents</b>
                  <p>Bucket privé rental-documents.</p>
                </div>
                <div className="notice">
                  <b>Pilote</b>
                  <p>Possible avec données anonymisées.</p>
                </div>
              </div>
            </section>
            <section className="glass hero">
              <span className="kicker">RGPD</span>
              <h2>Droits des candidats</h2>
              <p>
                Tout candidat peut demander l’accès, la rectification ou la suppression de ses données. Tant qu’un flux
                automatisé n’est pas branché, ces demandes sont traitées manuellement par l’agence.
              </p>
              <div className="notice">
                <b>Demande d’export ou de suppression</b>
                <p>Un candidat ou un agent peut envoyer une demande directement à l’agence.</p>
                <a
                  className="btn primary"
                  style={{ marginTop: 10, width: "100%" }}
                  href="mailto:rgpd@agence.fr?subject=Demande%20RGPD%20(export%20ou%20suppression)"
                >
                  Envoyer une demande RGPD
                </a>
              </div>
              <div className="notice" style={{ marginTop: 12 }}>
                <b>À faire avant une vraie mise en production</b>
                <p>Export automatisé des données, purge après le délai légal de conservation, journal des accès aux documents.</p>
              </div>
            </section>
          </div>
          <section className="glass hero" style={{ marginTop: 14 }}>
            <span className="kicker">Déploiement</span>
            <h2>Vercel + Supabase</h2>
            <p>Pour une vraie agence, il faut déployer sur Vercel, créer un projet Supabase, exécuter le schéma SQL et configurer les clés.</p>
            <pre className="card" style={{ whiteSpace: "pre-wrap", fontSize: 13 }}>
              npm install{"\n"}cp .env.example .env.local{"\n"}npm run dev
            </pre>
          </section>
        </section>
      </div>
    </main>
  );
}
