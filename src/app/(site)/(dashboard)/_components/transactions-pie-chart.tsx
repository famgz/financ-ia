"use client";

import { Pie, PieChart } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TransactionType } from "@prisma/client";
import { TransactionPercentagePerType } from "@/data/get-dashboard-data/types";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import PercentageItem from "@/app/(site)/(dashboard)/_components/percentage-item";

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: "Investido",
    color: "#fff",
  },
  [TransactionType.DEPOSIT]: {
    label: "Receita",
    color: "hsl(var(--primary))",
  },
  [TransactionType.EXPENSE]: {
    label: "Despesa",
    color: "hsl(var(--destructive))",
  },
} satisfies ChartConfig;

interface Props {
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
  typesPercentages: TransactionPercentagePerType;
}

export function TransactionsPieChart({
  depositsTotal,
  expensesTotal,
  investmentsTotal,
  typesPercentages,
}: Props) {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: depositsTotal,
      fill: "hsl(var(--primary))",
    },
    {
      type: TransactionType.EXPENSE,
      amount: expensesTotal,
      fill: "hsl(var(--destructive))",
    },
    {
      type: TransactionType.INVESTMENT,
      amount: investmentsTotal,
      fill: "hsl(var(--foreground))",
    },
  ];

  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 p-6">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>

        <div className="space-y-2">
          <PercentageItem
            title="Receita"
            value={typesPercentages.DEPOSIT}
            icon={<TrendingUpIcon size={16} className="text-primary" />}
          />
          <PercentageItem
            title="Despesas"
            value={typesPercentages.EXPENSE}
            icon={<TrendingDownIcon size={16} className="text-destructive" />}
          />
          <PercentageItem
            title="Investimentos"
            value={typesPercentages.INVESTMENT}
            icon={<PiggyBankIcon size={16} className="text-foreground" />}
          />
        </div>
      </CardContent>
    </Card>
  );
}
