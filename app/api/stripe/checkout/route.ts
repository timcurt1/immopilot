import { NextResponse, type NextRequest } from "next/server";
import { getCurrentProfile } from "@/lib/supabaseServer";
import { supabaseAdmin, supabaseAdminConfigured } from "@/lib/supabaseAdmin";
import { stripe, stripeConfigured } from "@/lib/stripe";
import { PLANS, isPlanId } from "@/lib/plans";

export async function POST(request: NextRequest) {
  if (!stripeConfigured || !stripe) {
    return NextResponse.json({ error: "Stripe n’est pas configuré (STRIPE_SECRET_KEY manquante)." }, { status: 400 });
  }
  if (!supabaseAdminConfigured || !supabaseAdmin) {
    return NextResponse.json({ error: "SUPABASE_SERVICE_ROLE_KEY n’est pas configurée." }, { status: 400 });
  }

  const profile = await getCurrentProfile();
  if (!profile) return NextResponse.json({ error: "Non authentifié." }, { status: 401 });

  const { plan } = await request.json();
  if (typeof plan !== "string" || !isPlanId(plan)) {
    return NextResponse.json({ error: "Palier invalide." }, { status: 400 });
  }
  const priceId = PLANS[plan].priceId;
  if (!priceId) {
    return NextResponse.json({ error: `Aucun Price ID Stripe configuré pour le palier ${plan}.` }, { status: 400 });
  }

  const { data: agency } = await supabaseAdmin.from("agencies").select("id, stripe_customer_id").eq("id", profile.agency_id).single();
  if (!agency) return NextResponse.json({ error: "Agence introuvable." }, { status: 404 });

  let customerId = agency.stripe_customer_id as string | null;
  if (!customerId) {
    const customer = await stripe.customers.create({ email: profile.email, metadata: { agency_id: profile.agency_id } });
    customerId = customer.id;
    await supabaseAdmin.from("agencies").update({ stripe_customer_id: customerId }).eq("id", profile.agency_id);
  }

  const origin = request.nextUrl.origin;
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/settings?checkout=success`,
    cancel_url: `${origin}/settings?checkout=cancelled`,
    client_reference_id: profile.agency_id,
    metadata: { agency_id: profile.agency_id, plan },
  });

  return NextResponse.json({ url: session.url });
}
