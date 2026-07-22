import "server-only";
import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY || "";

export const stripeConfigured = Boolean(secretKey);

export const stripe = stripeConfigured ? new Stripe(secretKey) : null;
