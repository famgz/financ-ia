"use client";

import { Button } from "@/components/ui/button";
import UpsertTransactionDialog from "@/components/upsert-transaction-dialog";
import { ArrowDownUpIcon } from "lucide-react";

export default function AddTransactionButton() {
  return (
    <UpsertTransactionDialog>
      <Button className="gap-2 rounded-full font-bold">
        <span>Adicionar transação</span>
        <ArrowDownUpIcon />
      </Button>
    </UpsertTransactionDialog>
  );
}
