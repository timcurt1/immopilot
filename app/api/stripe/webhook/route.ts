import { NextResponse, type NextRequest } from "next/server";
import { supabaseAdmin, supabaseAdminConfigured } from "@/lib/supabaseAdmin";
import { stripe, stripeConfigured } from "@/lib/stripe";
import type Stripe from "stripe";

export async function POST(request: NextRequest) {
  if (!stripeConfigured || !stripe || !supabaseAdminConfigured || !supabaseAdmin) {
    return NextResponse.json({ error: "Stripe ou Supabase (service role) non configuré." }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";
  const signature = request.headers.get("stripe-signature");
  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature || "", webhookSecret);
  } catch (err) {
    return NextResponse.json({ error: `Signature invalide : ${(err as Error).message}` }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const agencyId = session.metadata?.agency_id;
      const plan = session.metadata?.plan;
      if (agencyId && plan) {
        await supabaseAdmin
          .from("agencies")
          .update({
            plan,
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: session.subscription as string,
            subscription_status: "active",
          })
          .eq("id", agencyId);
      }
      break;
    }
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const status = event.type === "customer.subscription.deleted" ? "canceled" : subscription.status;
      await supabaseAdmin.from("agencies").update({ subscription_status: status }).eq("stripe_customer_id", subscription.customer as string);
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
