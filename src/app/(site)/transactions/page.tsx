import { transactionColumns } from "@/app/(site)/transactions/_columns";
import AddTransactionButton from "@/components/add-transaction-button";
import { DataTable } from "@/components/ui/data-table";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function TransactionsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const transactions = await db.transaction.findMany({});

  return (
    <div className="space-y-6 p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <AddTransactionButton />
      </div>

      <DataTable columns={transactionColumns} data={transactions} />
    </div>
  );
}
