import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/marketing/Logo";
import { AmbientBackground } from "@/components/marketing/AmbientBackground";
import { ApplyForm } from "@/components/ApplyForm";
import { getPublicProperty } from "@/lib/data";

export const metadata: Metadata = { title: "Candidater", robots: { index: false, follow: false } };

export default async function ApplyPage({ params }: { params: { propertyId: string } }) {
  const property = await getPublicProperty(params.propertyId);

  if (!property) {
    return (
      <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-paper px-4">
        <AmbientBackground />
        <div className="relative max-w-md text-center">
          <Link href="/" className="inline-flex mb-8">
            <Logo />
          </Link>
          <h1 className="font-display font-bold text-2xl text-ink">Ce bien n&rsquo;est plus disponible.</h1>
          <p className="mt-3 text-muted">Le lien de candidature n&rsquo;est plus valide, ou le logement a déjà été loué.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-paper px-4 py-12">
      <AmbientBackground parallax />
      <div className="relative w-full max-w-4xl rounded-3xl border border-line bg-white shadow-[0_40px_100px_rgba(15,23,42,0.12)] overflow-hidden grid md:grid-cols-[1fr_420px]">
        <div className="p-10 flex flex-col justify-center">
          <Link href="/" className="inline-flex mb-8">
            <Logo />
          </Link>
          <span className="inline-flex w-max items-center rounded-full border border-brand-100 bg-brand-50 px-3.5 py-1.5 text-xs font-semibold text-brand-700 mb-5">
            Candidature locative
          </span>
          <h1 className="font-display font-extrabold text-3xl text-ink tracking-tight leading-tight">
            {property.title}
            <br />
            <span className="bg-gradient-to-r from-brand-600 to-violet-500 bg-clip-text text-transparent">
              {property.rent} € CC
            </span>
          </h1>
          <p className="mt-4 text-muted leading-relaxed">
            {property.address ? `${property.address}, ` : ""}
            {property.city}. Complète ce formulaire pour transmettre ton dossier à l&rsquo;agence.
          </p>
        </div>
        <div className="bg-surface p-8 md:p-10 flex flex-col justify-center border-t md:border-t-0 md:border-l border-line">
          <ApplyForm propertyId={property.id} />
        </div>
      </div>
    </main>
  );
}
