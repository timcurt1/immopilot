import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Section } from "@/components/marketing/Section";
import { Badge } from "@/components/marketing/Badge";
import { Reveal } from "@/components/marketing/Reveal";
import { Button } from "@/components/marketing/Button";
import { ReadingProgressBar } from "@/components/marketing/ReadingProgressBar";
import { ARTICLES, getArticle } from "@/lib/articles";
import { GRADIENT_TONE, toneAt } from "@/components/marketing/tones";

const BASE_URL = "https://immopilot.fr";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticle(params.slug);
  if (!article) return {};
  return { title: article.title, description: article.description };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const related = ARTICLES.filter((a) => a.slug !== article.slug && a.category === article.category)
    .concat(ARTICLES.filter((a) => a.slug !== article.slug && a.category !== article.category))
    .slice(0, 3);
  const articleIndex = ARTICLES.findIndex((a) => a.slug === article.slug);

  return (
    <>
      <ReadingProgressBar />
      <Section className="!pt-16">
        <Reveal>
          <div className="max-w-2xl mx-auto">
            <Link href="/ressources" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink transition-colors mb-8">
              <ArrowLeft size={15} /> Retour aux ressources
            </Link>
            <Badge tone="brand">{article.category}</Badge>
            <h1 className="mt-5 font-display font-extrabold text-3xl md:text-4xl text-ink tracking-tight leading-tight">
              {article.title}
            </h1>
            <div className="mt-5 flex items-center gap-4 text-xs text-muted">
              <span>{article.author}</span>
              <span>·</span>
              <span>{formatDate(article.date)}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock size={12} /> {article.readTime}
              </span>
            </div>

            <div className={`mt-10 h-48 rounded-2xl bg-gradient-to-br ${GRADIENT_TONE[toneAt(articleIndex)]}`} aria-hidden="true" />

            <div className="mt-10 grid gap-5">
              {article.body.map((p, i) => (
                <p key={i} className="text-[15px] text-ink-soft leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-14 rounded-2xl border border-line bg-surface p-8 text-center">
              <p className="font-display font-bold text-lg text-ink mb-2">Voir ImmoPilot en pratique</p>
              <p className="text-sm text-muted mb-5">Découvrez comment ces principes s'appliquent concrètement dans votre agence.</p>
              <Button href="/demande-demo">Demander une démonstration</Button>
            </div>

            {related.length > 0 && (
              <div className="mt-16">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-4">À lire aussi</p>
                <div className="grid gap-3">
                  {related.map((a) => (
                    <Link
                      key={a.slug}
                      href={`/ressources/${a.slug}`}
                      className="group flex items-center justify-between gap-4 rounded-xl border border-line bg-white px-5 py-4 hover:border-brand-200 transition-colors"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-ink truncate">{a.title}</p>
                        <p className="text-xs text-muted mt-0.5">{a.category}</p>
                      </div>
                      <ArrowRight size={15} className="text-muted shrink-0 group-hover:text-brand-600 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </Section>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.description,
            datePublished: article.date,
            author: { "@type": "Organization", name: article.author },
            publisher: { "@type": "Organization", name: "ImmoPilot" },
            mainEntityOfPage: `${BASE_URL}/ressources/${article.slug}`,
          }),
        }}
      />
    </>
  );
}
