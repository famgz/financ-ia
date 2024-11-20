"use server";

import { getStripe } from "@/lib/stripe";
import { auth } from "@clerk/nextjs/server";

export default async function createStripeCheckout() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const stripe = await getStripe();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    success_url: "http://localhost:3000",
    cancel_url: "http://localhost:3000",
    subscription_data: {
      metadata: {
        clerk_user_id: userId,
      },
    },
    line_items: [
      {
        price: process.env.STRIPE_PREMIUM_PLAN_PRICE_ID,
        quantity: 1,
      },
    ],
  });
  return { sessionId: session.id };
}
