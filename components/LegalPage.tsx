import type { ReactNode } from "react";
import { Header } from "@/components/marketing/Header";
import { Footer } from "@/components/marketing/Footer";
import { PageHero } from "@/components/marketing/PageHero";
import { Section } from "@/components/marketing/Section";
import { CookieNotice } from "@/components/marketing/CookieNotice";
import { Reveal } from "@/components/marketing/Reveal";

export function LegalPage({ title, path, children }: { title: string; path?: string; children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main-content" className="flex-1">
        <PageHero eyebrow="Légal" path={path} title={title} />
        <Section className="!pt-0 !pb-24">
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <div className="text-[15px] text-ink-soft leading-relaxed [&>p]:mb-5 [&_b]:text-ink [&_b]:font-semibold">
                {children}
              </div>
            </Reveal>
          </div>
        </Section>
      </main>
      <Footer />
      <CookieNotice />
    </div>
  );
}
