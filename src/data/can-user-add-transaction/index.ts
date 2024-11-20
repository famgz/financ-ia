import { getUserIdElseThrow } from "@/actions/auth";
import { REGULAR_USER_MONTHLY_MAX_TRANSACTIONS } from "@/constants/subscription";
import { getCurrentMonthTransactionsAmount } from "@/data/get-current-month-transactions";
import { clerkClient } from "@clerk/nextjs/server";

export async function canUserAddTransaction() {
  const userId = await getUserIdElseThrow();
  const user = await (await clerkClient()).users.getUser(userId);
  if (user.publicMetadata.subscriptionPlan === "premium") {
    return true;
  }
  const curentMonthTransactionsAmount =
    await getCurrentMonthTransactionsAmount();
  return curentMonthTransactionsAmount < REGULAR_USER_MONTHLY_MAX_TRANSACTIONS;
}
