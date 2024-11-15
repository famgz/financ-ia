import ExpensesPerCategory from "@/app/(site)/(dashboard)/_components/expenses-per-category";
import SummaryCards from "@/app/(site)/(dashboard)/_components/summary-cards";
import TimeSelect from "@/app/(site)/(dashboard)/_components/time-select";
import { TransactionsPieChart } from "@/app/(site)/(dashboard)/_components/transactions-pie-chart";
import { getDashBoardData } from "@/data/get-dashboard-data";
import { auth } from "@clerk/nextjs/server";
import { isMatch } from "date-fns";
import { redirect } from "next/navigation";

interface Props {
  searchParams: { month: string };
}

export default async function Home({ searchParams: { month } }: Props) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const isMonthValid = month && isMatch(month, "MM");

  if (!isMonthValid) {
    const currentMonth = new Date().getMonth() + 1;
    redirect(`/?month=${String(currentMonth).padStart(2, "0")}`);
  }

  const dashboardData = await getDashBoardData(month);

  return (
    <div className="p-6">
      <div className="flex flex-col sm:grid sm:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <TimeSelect />
          </div>

          <SummaryCards month={month} {...dashboardData} />

          <div className="grid grid-cols-3 grid-rows-1 gap-6">
            <TransactionsPieChart {...dashboardData} />

            <ExpensesPerCategory
              expensesPerCategory={dashboardData.totalExpensePerCategory}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
