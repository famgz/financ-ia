import SummaryCard from "@/app/(site)/(dashboard)/_components/summary-card";
import { canUserAddTransaction } from "@/data/can-user-add-transaction";
import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";

interface Props {
  month: string;
  balance: number;
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
}

export default async function SummaryCards({
  balance,
  depositsTotal,
  expensesTotal,
  investmentsTotal,
}: Props) {
  const userCanAddTransaction = await canUserAddTransaction();

  return (
    <div className="space-y-6">
      <SummaryCard
        title="Saldo"
        icon={<WalletIcon size={16} />}
        amountInCents={balance}
        size="lg"
        userCanAddTransaction={userCanAddTransaction}
      />

      <div className="grid grid-cols-3 gap-6">
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
