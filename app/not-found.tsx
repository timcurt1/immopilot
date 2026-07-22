import Link from "next/link";

export default function NotFound() {
  return (
    <main className="appShell" style={{ display: "grid", placeItems: "center" }}>
      <section className="glass hero" style={{ maxWidth: 560, textAlign: "center" }}>
        <span className="kicker">404</span>
        <h2>
          Cette page
          <br />
          <span className="grad">n’existe pas.</span>
        </h2>
        <p>Le lien est peut-être expiré, ou l’adresse a été mal copiée.</p>
        <Link className="btn primary" href="/" style={{ marginTop: 14, width: "max-content", margin: "14px auto 0" }}>
          Retour à l’accueil
        </Link>
      </section>
    </main>
  );
}
