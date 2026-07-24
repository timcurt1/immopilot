import type { Metadata } from "next";
import Link from "next/link";
import { FlaskConical, ArrowRight } from "lucide-react";
import { DemoSidebar } from "@/components/demo/DemoSidebar";
import { DemoMobileNav } from "@/components/demo/DemoMobileNav";

export const metadata: Metadata = {
  title: { default: "Démo interactive", template: "%s — Démo ImmoPilot" },
  robots: { index: false, follow: false },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface">
      <div className="h-11 bg-ink text-white flex items-center justify-center gap-3 px-4 text-center text-xs font-medium sticky top-0 z-40">
        <span className="flex items-center gap-2">
          <FlaskConical size={13} className="shrink-0" />
          <span className="hidden sm:inline">Mode démonstration — les personnes, biens et informations présentés sont fictifs.</span>
          <span className="sm:hidden">Mode démonstration — données fictives</span>
        </span>
        <Link href="/demande-demo" className="hidden md:inline-flex items-center gap-1 text-white/90 hover:text-white font-semibold underline underline-offset-2">
          Voir ceci avec vos vraies données <ArrowRight size={12} />
        </Link>
      </div>
      <DemoMobileNav />
      <div className="flex">
        <DemoSidebar />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
