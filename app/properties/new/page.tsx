import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { NewPropertyForm } from "@/components/NewPropertyForm";

export const metadata: Metadata = { title: "Ajouter un bien", robots: { index: false, follow: false } };

export default function NewPropertyPage() {
  return (
    <AppShell title="Ajouter un bien" subtitle="Renseigne les informations principales du logement.">
      <Link href="/properties" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink transition-colors mb-5">
        <ArrowLeft size={15} /> Retour aux biens
      </Link>
      <NewPropertyForm />
    </AppShell>
  );
}
