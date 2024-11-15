import { transactionColumns } from "@/app/(site)/transactions/_columns";
import UpsertTransactionButton from "@/components/upsert-transaction-button";
import { DataTable } from "@/components/ui/data-table";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function TransactionsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const transactions = await db.transaction.findMany({ where: { userId } });

  return (
    <div className="flex h-full flex-col gap-6 p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <UpsertTransactionButton />
      </div>

      <ScrollArea className="h-[200px] flex-auto">
        <DataTable columns={transactionColumns} data={transactions} />
      </ScrollArea>
    </div>
  );
}
