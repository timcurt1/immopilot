"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="appShell" style={{ display: "grid", placeItems: "center" }}>
      <section className="glass hero" style={{ maxWidth: 560, textAlign: "center" }}>
        <span className="kicker">Erreur</span>
        <h2>
          Un problème
          <br />
          <span className="grad">est survenu.</span>
        </h2>
        <p>L’équipe a été notifiée. Tu peux réessayer, ou contacter le support si ça persiste.</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 14 }}>
          <button className="btn primary" onClick={reset}>
            Réessayer
          </button>
          <a className="btn ghost" href="mailto:support@immopilot.example">
            Contacter le support
          </a>
        </div>
      </section>
    </main>
  );
}
