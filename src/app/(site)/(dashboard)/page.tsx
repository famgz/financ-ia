import { hasUserPremiumPlan } from "@/actions/auth";
import AIReportButton from "@/app/(site)/(dashboard)/_components/ai-report-button";
import ExpensesPerCategory from "@/app/(site)/(dashboard)/_components/expenses-per-category";
import LastTransactions from "@/app/(site)/(dashboard)/_components/last-transactions";
import SummaryCards from "@/app/(site)/(dashboard)/_components/summary-cards";
import TimeSelect from "@/app/(site)/(dashboard)/_components/time-select";
import { TransactionsPieChart } from "@/app/(site)/(dashboard)/_components/transactions-pie-chart";
import { getDashBoardData } from "@/data/get-dashboard-data";
import { isValidMonth } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface Props {
  searchParams: { month: string };
}

export default async function Home({ searchParams: { month } }: Props) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const validMonth = isValidMonth(month);

  if (!validMonth) {
    const currentMonth = new Date().getMonth() + 1;
    redirect(`/?month=${String(currentMonth).padStart(2, "0")}`);
  }

  const dashboardData = await getDashBoardData(month);
  const userHasPremiumPlan = await hasUserPremiumPlan();

  return (
    <div className="flex h-full flex-col gap-6 p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-3">
          <AIReportButton
            month={month}
            userHasPremiumPlan={userHasPremiumPlan}
          />
          <TimeSelect />
        </div>
      </div>

      <div className="flex flex-col gap-6 sm:grid sm:grid-cols-[2fr,1fr]">
        <div className="flex flex-col gap-6">
          <SummaryCards month={month} {...dashboardData} />
          <div className="grid h-full grid-cols-3 grid-rows-1 gap-6">
            <TransactionsPieChart {...dashboardData} />
            <div className="col-span-2">
              <ExpensesPerCategory
                expensesPerCategory={dashboardData.totalExpensePerCategory}
              />
            </div>
          </div>
        </div>
        <LastTransactions lastTransactions={dashboardData.lastTransactions} />
      </div>
    </div>
  );
}
