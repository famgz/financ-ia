import { REGULAR_USER_MONTHLY_MAX_TRANSACTIONS } from "@/constants/subscription";
import { getCurrentMonthTransactionsAmount } from "@/data/get-current-month-transactions";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function canUserAddTransaction() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const user = await (await clerkClient()).users.getUser(userId);
  if (user.publicMetadata.subscriptionPlan === "premium") {
    return true;
  }
  const curentMonthTransactionsAmount =
    await getCurrentMonthTransactionsAmount();
  return curentMonthTransactionsAmount < REGULAR_USER_MONTHLY_MAX_TRANSACTIONS;
}
