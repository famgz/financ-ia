"use client";

import createStripeCheckout from "@/app/(site)/subscription/_actions/create-stripe-checkout";
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";

export default function AcquirePlanButton() {
  async function handleAcquirePlanClick() {
    const { sessionId } = await createStripeCheckout();
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error("Stripe publishable key not found");
    }
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    );
    if (!stripe) {
      throw new Error("Stripe not found");
    }
    await stripe.redirectToCheckout({ sessionId });
  }

  return (
    <Button
      className="w-full rounded-full text-xl font-bold"
      onClick={handleAcquirePlanClick}
    >
      Adquirir Plano
    </Button>
  );
}
