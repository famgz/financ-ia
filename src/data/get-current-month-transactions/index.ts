import { getUserIdElseThrow } from "@/actions/auth";
import { db } from "@/lib/prisma";
import { endOfMonth, startOfMonth } from "date-fns";

export async function getCurrentMonthTransactionsAmount() {
  const userId = await getUserIdElseThrow();
  return await db.transaction.count({
    where: {
      userId,
      createdAt: {
        gte: startOfMonth(new Date()),
        lt: endOfMonth(new Date()),
      },
    },
  });
}
