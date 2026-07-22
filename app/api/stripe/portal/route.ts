import { NextResponse, type NextRequest } from "next/server";
import { getCurrentProfile } from "@/lib/supabaseServer";
import { supabaseAdmin, supabaseAdminConfigured } from "@/lib/supabaseAdmin";
import { stripe, stripeConfigured } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  if (!stripeConfigured || !stripe) {
    return NextResponse.json({ error: "Stripe n’est pas configuré (STRIPE_SECRET_KEY manquante)." }, { status: 400 });
  }
  if (!supabaseAdminConfigured || !supabaseAdmin) {
    return NextResponse.json({ error: "SUPABASE_SERVICE_ROLE_KEY n’est pas configurée." }, { status: 400 });
  }

  const profile = await getCurrentProfile();
  if (!profile) return NextResponse.json({ error: "Non authentifié." }, { status: 401 });

  const { data: agency } = await supabaseAdmin.from("agencies").select("stripe_customer_id").eq("id", profile.agency_id).single();
  if (!agency?.stripe_customer_id) {
    return NextResponse.json({ error: "Aucun abonnement actif pour cette agence." }, { status: 400 });
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: agency.stripe_customer_id,
    return_url: `${request.nextUrl.origin}/settings`,
  });

  return NextResponse.json({ url: session.url });
}
