import SummaryCard from "@/app/(site)/_components/summary-card";
import { db } from "@/lib/prisma";
import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";

interface Props {
  month: string;
}

export default async function SummaryCards({ month }: Props) {
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

  return (
    <div className="space-y-6">
      <SummaryCard
        title="Saldo"
        icon={<WalletIcon size={16} />}
        amountInCents={balance}
        size="lg"
      />

      <div className="grid grid-cols-3">
        <SummaryCard
          title="Investido"
          icon={<PiggyBankIcon size={16} />}
          amountInCents={investmentsTotal}
        />
        <SummaryCard
          title="Receita"
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          amountInCents={depositsTotal}
        />
        <SummaryCard
          title="Despesas"
          icon={<TrendingDownIcon size={16} className="text-destructive" />}
          amountInCents={expensesTotal}
        />
      </div>
    </div>
  );
}
