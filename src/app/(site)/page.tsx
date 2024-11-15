import SummaryCards from "@/app/(site)/_components/summary-cards";
import TimeSelect from "@/app/(site)/_components/time-select";
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

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <TimeSelect />
      </div>

      <SummaryCards month={month} />
    </div>
  );
}
