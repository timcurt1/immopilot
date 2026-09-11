import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { TeamInviteForm } from "@/components/TeamInviteForm";
import { BillingSection } from "@/components/BillingSection";
import { MessageTemplatesAdmin } from "@/components/MessageTemplatesAdmin";
import { getAgencyBilling, getAgencyTeam, getMessageTemplates } from "@/lib/data";
import { getCurrentProfile } from "@/lib/supabaseServer";

export const metadata: Metadata = { title: "Paramètres", robots: { index: false, follow: false } };

export default async function SettingsPage() {
  const [team, billing, templates, profile] = await Promise.all([
    getAgencyTeam(),
    getAgencyBilling(),
    getMessageTemplates(),
    getCurrentProfile(),
  ]);
  const canManageTemplates = profile?.role === "admin" || profile?.role === "manager";

  return (
    <AppShell title="Réglages" subtitle="Préparation agence, sécurité et RGPD.">
      <div className="grid gap-6">
        <section className="rounded-2xl border border-line bg-white p-6 max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">Équipe</span>
          <h2 className="mt-2 font-display font-bold text-2xl text-ink tracking-tight">Ton agence</h2>
          <p className="mt-2 text-sm text-muted leading-relaxed">
            Invite tes collègues à rejoindre l&rsquo;agence. Ils reçoivent un email pour créer leur accès.
          </p>
          <div className="mt-5">
            <TeamInviteForm team={team} currentRole={profile?.role} currentProfileId={profile?.id} />
          </div>
        </section>

        <section className="rounded-2xl border border-line bg-white p-6">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">Administration</span>
          <h2 className="mt-2 font-display font-bold text-2xl text-ink tracking-tight">Modèles de messages</h2>
          <p className="mt-2 text-sm text-muted leading-relaxed">
            Personnalise les messages proposés par l&rsquo;IA à tes candidats.
          </p>
          {canManageTemplates ? (
            <div className="mt-5">
              <MessageTemplatesAdmin templates={templates} />
            </div>
          ) : (
            <p className="mt-5 text-sm text-muted">Réservé aux admins et managers.</p>
          )}
          <div className="mt-5 rounded-xl bg-surface border border-line p-4">
            <p className="text-sm font-semibold text-ink">À venir</p>
            <p className="mt-1 text-sm text-muted">
              Les règles de priorité automatique et les intégrations externes ne sont pas encore fonctionnelles :
              elles arrivent dans une prochaine itération.
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="rounded-2xl bg-ink text-white p-8">
            <span className="text-xs font-semibold uppercase tracking-wide text-white/60">Sécurité &amp; RGPD</span>
            <h2 className="mt-3 font-display font-bold text-2xl tracking-tight leading-tight">
              Prêt pour
              <br />
              <span className="bg-gradient-to-r from-brand-300 to-violet-300 bg-clip-text text-transparent">
                un pilote agence.
              </span>
            </h2>
            <p className="mt-3 text-sm text-white/70 leading-relaxed">
              Cette base prévoit les rôles, l&rsquo;accès par agence, les documents privés, les traces d&rsquo;activité et la
              séparation agent / candidat.
            </p>
            <div className="mt-5 grid gap-2.5">
              {[
                { title: "Rôles", body: "Admin, manager, agent, candidat." },
                { title: "Données", body: "Supabase Postgres + Row Level Security." },
                { title: "Documents", body: "Bucket privé rental-documents." },
                { title: "Pilote", body: "Possible avec données anonymisées." },
              ].map((n) => (
                <div key={n.title} className="rounded-xl bg-white/10 p-3.5">
                  <p className="text-sm font-semibold">{n.title}</p>
                  <p className="mt-0.5 text-xs text-white/70">{n.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-line bg-white p-8">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">RGPD</span>
            <h2 className="mt-3 font-display font-bold text-2xl text-ink tracking-tight">Droits des candidats</h2>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              Tout candidat peut demander l&rsquo;accès, la rectification ou la suppression de ses données. Tant qu&rsquo;un
              flux automatisé n&rsquo;est pas branché, ces demandes sont traitées manuellement par l&rsquo;agence.
            </p>
            <div className="mt-5 rounded-xl bg-surface border border-line p-4">
              <p className="text-sm font-semibold text-ink">Demande d&rsquo;export ou de suppression</p>
              <p className="mt-1 text-sm text-muted">Un candidat ou un agent peut envoyer une demande directement à l&rsquo;agence.</p>
              <a
                href="mailto:rgpd@agence.fr?subject=Demande%20RGPD%20(export%20ou%20suppression)"
                className="mt-3 w-full inline-flex items-center justify-center gap-2 h-10 rounded-lg bg-ink text-white text-sm font-semibold hover:bg-brand-700 transition-colors"
              >
                <Mail size={15} /> Envoyer une demande RGPD
              </a>
            </div>
            <div className="mt-3 rounded-xl bg-surface border border-line p-4">
              <p className="text-sm font-semibold text-ink">À faire avant une vraie mise en production</p>
              <p className="mt-1 text-sm text-muted">
                Export automatisé des données, purge après le délai légal de conservation, journal des accès aux documents.
              </p>
            </div>
          </section>
        </div>

        {billing ? (
          <BillingSection currentPlan={billing.plan} subscriptionStatus={billing.subscriptionStatus} />
        ) : (
          <section className="rounded-2xl border border-line bg-white p-6">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">Abonnement</span>
            <h2 className="mt-2 font-display font-bold text-2xl text-ink tracking-tight">Facturation</h2>
            <p className="mt-2 text-sm text-muted">
              La facturation par abonnement (Stripe) devient disponible une fois Supabase configuré pour cette agence.
            </p>
          </section>
        )}

        <section className="rounded-2xl border border-line bg-white p-6">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">Déploiement</span>
          <h2 className="mt-2 font-display font-bold text-2xl text-ink tracking-tight">Vercel + Supabase</h2>
          <p className="mt-2 text-sm text-muted">
            Pour une vraie agence, il faut déployer sur Vercel, créer un projet Supabase, exécuter le schéma SQL et
            configurer les clés.
          </p>
          <pre className="mt-4 rounded-xl bg-surface border border-line p-4 text-sm text-ink-soft whitespace-pre-wrap font-mono">
            npm install{"\n"}cp .env.example .env.local{"\n"}npm run dev
          </pre>
        </section>
      </div>
    </AppShell>
  );
}
