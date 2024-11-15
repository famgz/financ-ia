import { TransactionPercentagePerType } from "@/data/get-dashboard-data/types";
import { db } from "@/lib/prisma";
import { TransactionType } from "@prisma/client";

export async function getDashBoardData(month: string) {
  const where = {
    date: {
      gte: new Date(`2024-${month}-01`),
      lte: new Date(`2024-${month}-31`),
    },
  };

  const depositsTotal =
    (
      await db.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amountInCents: true },
      })
    )?._sum?.amountInCents || 0;

  const investmentsTotal =
    (
      await db.transaction.aggregate({
        where: { ...where, type: "INVESTMENT" },
        _sum: { amountInCents: true },
      })
    )?._sum?.amountInCents || 0;

  const expensesTotal =
    (
      await db.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amountInCents: true },
      })
    )?._sum?.amountInCents || 0;

  const balance = depositsTotal - investmentsTotal - expensesTotal;

  const transactionsTotal =
    (
      await db.transaction.aggregate({
        where,
        _sum: { amountInCents: true },
      })
    )?._sum?.amountInCents || 0;

  const typesPercentages: TransactionPercentagePerType = {
    [TransactionType.DEPOSIT]: Math.round(
      (depositsTotal / transactionsTotal) * 100,
    ),
    [TransactionType.EXPENSE]: Math.round(
      (expensesTotal / transactionsTotal) * 100,
    ),
    [TransactionType.INVESTMENT]: Math.round(
      (investmentsTotal / transactionsTotal) * 100,
    ),
  };

  return {
    balance,
    depositsTotal,
    investmentsTotal,
    expensesTotal,
    typesPercentages,
  };
}
