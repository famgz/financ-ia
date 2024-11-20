"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

export async function getUserIdElseThrow() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  return userId;
}

export async function hasUserPremiumPlan() {
  const userId = await getUserIdElseThrow();
  const user = await (await clerkClient()).users.getUser(userId);
  return user.publicMetadata.subscriptionPlan === "premium";
}
