"use client";

import TransactionTypeBadge from "@/app/(site)/transactions/_components/transaction-type-badge";
import { Button } from "@/components/ui/button";
import UpsertTransactionDialog from "@/components/upsert-transaction-dialog";
import {
  transactionCategoryMap,
  transactionPaymentMethodMap,
} from "@/constants/transaction";
import { formatDate, toReal } from "@/lib/utils";
import { Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { SquarePenIcon, TrashIcon } from "lucide-react";

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original: transaction } }) => (
      <TransactionTypeBadge transactionType={transaction.type} />
    ),
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row: { original: transaction } }) =>
      transactionCategoryMap[transaction.category],
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de Pagamento",
    cell: ({ row: { original: transaction } }) =>
      transactionPaymentMethodMap[transaction.paymentMethod],
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row: { original: transaction } }) => formatDate(transaction.date),
  },
  {
    accessorKey: "amountInCents",
    header: "Valor",
    cell: ({ row: { original: transaction } }) =>
      toReal(transaction.amountInCents),
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: transaction } }) => (
      <div className="flex items-center gap-1 text-muted-foreground">
        <UpsertTransactionDialog transaction={transaction}>
          <Button variant={"ghost"} size={"icon"}>
            <SquarePenIcon />
          </Button>
        </UpsertTransactionDialog>

        <Button variant={"ghost"} size={"icon"}>
          <TrashIcon />
        </Button>
      </div>
    ),
  },
];
