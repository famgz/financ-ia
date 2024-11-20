"use client";

import createStripeCheckout from "@/app/(site)/subscription/_actions/create-stripe-checkout";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";

export default function AcquirePlanButton() {
  const { user } = useUser();

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

  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan === "premium";

  return hasPremiumPlan ? (
    <Button
      className="w-full rounded-full text-xl font-bold"
      variant={"link"}
      asChild
    >
      <Link
        href={`${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL as string}?prefilled_email=${user.emailAddresses[0].emailAddress}`}
      >
        Gerenciar Plano
      </Link>
    </Button>
  ) : (
    <Button
      className="w-full rounded-full text-xl font-bold"
      onClick={handleAcquirePlanClick}
    >
      Adquirir Plano
    </Button>
  );
}
