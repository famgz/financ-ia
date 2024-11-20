import AcquirePlanButton from "@/app/(site)/subscription/_components/acquire-plan-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  PREMIUM_SUBSCRIPTION_MONTHLY_PRICE_IN_CENTS,
  REGULAR_USER_MONTHLY_MAX_TRANSACTIONS,
} from "@/constants/subscription";
import { getCurrentMonthTransactionsAmount } from "@/data/get-current-month-transactions";
import { toReal } from "@/lib/utils";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { CheckIcon, XIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function SubscriptionPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const user = await (await clerkClient()).users.getUser(userId);
  const currentMonthTransactionsAmount =
    await getCurrentMonthTransactionsAmount();
  const hasPremiumPlan = user.publicMetadata.subscriptionPlan === "premium";

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Assinatura</h1>

      <div className="flex gap-6">
        {/* basic plan card */}
        <Card className="w-[450px]">
          <CardHeader className="border-b py-8">
            <h2 className="text-center text-2xl font-semibold">Plano Básico</h2>
            <div className="flex-center gap-3">
              <span className="text-4xl">R$</span>
              <span className="text-6xl font-semibold">0</span>
              <span className="text-2xl text-muted-foreground">/ mês</span>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 py-8">
            <div className="flex items-center gap-2">
              <CheckIcon className="text-primary" />
              <p>
                Apenas {REGULAR_USER_MONTHLY_MAX_TRANSACTIONS} transações por
                mês ({currentMonthTransactionsAmount}/
                {REGULAR_USER_MONTHLY_MAX_TRANSACTIONS})
              </p>
            </div>
            <div className="flex items-center gap-2">
              <XIcon className="text-foreground" />
              <p>Relatórios de IA</p>
            </div>
          </CardContent>
        </Card>

        {/* premium plan card */}
        <Card className="w-[450px]">
          <CardHeader className="relative border-b py-8">
            {hasPremiumPlan && (
              <Badge className="absolute left-6 top-6 bg-primary/10 text-base text-primary">
                Ativo
              </Badge>
            )}
            <h2 className="text-center text-2xl font-semibold">
              Plano Premium
            </h2>
            <div className="flex-center gap-3">
              <span className="text-4xl">R$</span>
              <span className="text-6xl font-semibold">
                {toReal(PREMIUM_SUBSCRIPTION_MONTHLY_PRICE_IN_CENTS, "decimal")}
              </span>
              <span className="text-2xl text-muted-foreground">/ mês</span>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 py-8">
            <div className="flex items-center gap-2">
              <CheckIcon className="text-primary" />
              <p>Transações ilimitadas</p>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon className="text-primary" />
              <p>Relatórios de IA</p>
            </div>
            <div className="!mt-12">
              <AcquirePlanButton />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
