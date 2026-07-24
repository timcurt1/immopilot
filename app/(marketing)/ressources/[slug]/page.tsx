import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { Section } from "@/components/marketing/Section";
import { Badge } from "@/components/marketing/Badge";
import { Reveal } from "@/components/marketing/Reveal";
import { Button } from "@/components/marketing/Button";
import { ARTICLES, getArticle } from "@/lib/articles";

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

  return (
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

          <div className="mt-10 h-48 rounded-2xl bg-gradient-to-br from-brand-600 to-violet-500" aria-hidden="true" />

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
        </div>
      </Reveal>
    </Section>
  );
}
