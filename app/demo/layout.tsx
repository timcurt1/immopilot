import type { Metadata } from "next";
import { FlaskConical } from "lucide-react";
import { DemoSidebar } from "@/components/demo/DemoSidebar";
import { DemoMobileNav } from "@/components/demo/DemoMobileNav";

export const metadata: Metadata = {
  title: { default: "Démo interactive", template: "%s — Démo ImmoPilot" },
  robots: { index: false, follow: false },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface">
      <div className="h-11 bg-ink text-white flex items-center justify-center gap-2 px-4 text-center text-xs font-medium sticky top-0 z-40">
        <FlaskConical size={13} className="shrink-0" />
        Mode démonstration — les personnes, biens et informations présentés sont fictifs.
      </div>
      <DemoMobileNav />
      <div className="flex">
        <DemoSidebar />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
