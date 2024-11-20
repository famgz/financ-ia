"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UpsertTransactionDialog from "@/components/upsert-transaction-dialog";
import { ArrowDownUpIcon } from "lucide-react";

interface Props {
  userCanAddTransaction: boolean;
}

export default function UpsertTransactionButton({
  userCanAddTransaction,
}: Props) {
  return (
    <div className="relative">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <UpsertTransactionDialog>
                <Button
                  className="gap-2 rounded-full font-bold"
                  disabled={!userCanAddTransaction}
                >
                  <span>Adicionar transação</span>
                  <ArrowDownUpIcon />
                </Button>
              </UpsertTransactionDialog>
            </div>
          </TooltipTrigger>

          {!userCanAddTransaction && (
            <TooltipContent>
              <p>Você atingiu o limite de transações para este mês.</p>
              <p>Atualize seu plano para adicionar mais.</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
