import Link from "next/link";
import { Logo } from "@/components/marketing/Logo";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { Button } from "@/components/marketing/Button";

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-paper px-6">
      <AmbientBackground />
      <div className="relative text-center max-w-md">
        <Link href="/" className="inline-flex mb-8">
          <Logo />
        </Link>
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-600 mb-3">Erreur 404</p>
        <h1 className="font-display font-extrabold text-4xl text-ink tracking-tight mb-4">Cette page n'existe pas.</h1>
        <p className="text-muted leading-relaxed mb-8">
          Le lien est peut-être expiré, ou l'adresse a été mal copiée.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button href="/">Retour à l'accueil</Button>
          <Button href="/contact" variant="secondary">
            Nous contacter
          </Button>
        </div>
      </div>
    </main>
  );
}
