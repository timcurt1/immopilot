import Link from "next/link";
import { FolderKanban, Home as HomeIcon, MessageSquare, ShieldCheck } from "lucide-react";
import { PLAN_ORDER, PLANS } from "@/lib/plans";

const FEATURES = [
  {
    icon: FolderKanban,
    title: "Candidatures pilotées",
    body: "Chaque dossier locatif est scoré, suivi et relié à une prochaine action claire : relancer, valider, confirmer une visite.",
  },
  {
    icon: HomeIcon,
    title: "Un bien, un lien",
    body: "Chaque logement a son lien de candidature public à partager : les dossiers arrivent directement dans l'agence.",
  },
  {
    icon: MessageSquare,
    title: "Messages assistés par IA",
    body: "Génère des relances et des réponses en un clic, l'agent garde toujours la main avant l'envoi.",
  },
  {
    icon: ShieldCheck,
    title: "Sécurisé par conception",
    body: "Chaque agence est isolée (Row Level Security Supabase), les documents sont stockés dans un coffre privé.",
  },
];

export default function Home() {
  return (
    <main className="appShell" style={{ display: "grid", gap: 24 }}>
      <section className="glass hero" style={{ maxWidth: 980, margin: "0 auto", width: "100%" }}>
        <span className="kicker">ImmoPilot · SaaS pour agences immobilières</span>
        <h2>
          Le pilotage locatif
          <br />
          <span className="grad">prêt pour ton agence.</span>
        </h2>
        <p>
          Candidatures, documents, biens, portail candidat et messages IA dans un seul outil. Inscris ton agence et reçois ta
          première candidature en quelques minutes.
        </p>
        <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
          <Link className="btn primary" href="/login">
            Créer mon agence
          </Link>
          <Link className="btn ghost" href="/login">
            Connexion
          </Link>
        </div>
      </section>

      <section style={{ maxWidth: 980, margin: "0 auto", width: "100%" }}>
        <div className="grid4">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="card">
                <Icon size={22} color="var(--blue)" />
                <h3 style={{ color: "var(--navy)", fontSize: 16, marginBottom: 6 }}>{f.title}</h3>
                <p style={{ color: "var(--muted)", fontSize: 13 }}>{f.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section style={{ maxWidth: 980, margin: "0 auto", width: "100%" }}>
        <div className="glass hero" style={{ marginBottom: 14 }}>
          <span className="kicker">Tarifs</span>
          <h2>Un palier par taille d’agence</h2>
        </div>
        <div className="grid3">
          {PLAN_ORDER.map((id) => (
            <div key={id} className="card">
              <b style={{ color: "var(--navy)" }}>{PLANS[id].label}</b>
              <p style={{ fontSize: 32, color: "var(--navy)", margin: "6px 0" }}>
                {PLANS[id].price}€<span style={{ fontSize: 14, color: "var(--muted)" }}> /mois</span>
              </p>
              <p style={{ fontSize: 13, color: "var(--muted)" }}>
                Jusqu’à {PLANS[id].maxProperties === Infinity ? "un nombre illimité de" : PLANS[id].maxProperties} biens
                <br />
                {PLANS[id].maxUsers === Infinity ? "Utilisateurs illimités" : `Jusqu’à ${PLANS[id].maxUsers} utilisateurs`}
              </p>
              <Link className="btn primary" style={{ width: "100%", marginTop: 12 }} href="/login">
                Choisir {PLANS[id].label}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ maxWidth: 980, margin: "0 auto", width: "100%", padding: "14px 4px", display: "flex", gap: 16, color: "var(--muted)", fontSize: 12 }}>
        <Link href="/legal/mentions-legales">Mentions légales</Link>
        <Link href="/legal/confidentialite">Confidentialité</Link>
        <Link href="/legal/cgu-cgv">CGU & CGV</Link>
      </footer>
    </main>
  );
}
