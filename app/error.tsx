"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/marketing/Logo";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-paper px-6">
      <AmbientBackground />
      <div className="relative text-center max-w-md">
        <Link href="/" className="inline-flex mb-8">
          <Logo />
        </Link>
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-600 mb-3">Erreur</p>
        <h1 className="font-display font-extrabold text-4xl text-ink tracking-tight mb-4">Un problème est survenu.</h1>
        <p className="text-muted leading-relaxed mb-8">
          L'équipe a été notifiée. Vous pouvez réessayer, ou contacter le support si le problème persiste.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center h-11 px-5 rounded-xl bg-ink text-white font-semibold text-sm hover:bg-brand-700 transition-colors"
          >
            Réessayer
          </button>
          <a
            href="mailto:support@immopilot.example"
            className="inline-flex items-center justify-center h-11 px-5 rounded-xl bg-white border border-line text-ink font-semibold text-sm hover:border-ink/30 transition-colors"
          >
            Contacter le support
          </a>
        </div>
      </div>
    </main>
  );
}
