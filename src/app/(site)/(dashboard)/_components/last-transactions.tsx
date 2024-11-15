import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  TRANSACTION_CATEGORY_LABELS,
  TRANSACTION_PAYMENT_METHOD_ICONS,
} from "@/constants/transaction";
import {
  cn,
  formatShortDate,
  getAmountColor,
  getAmountPrefix,
  toReal,
} from "@/lib/utils";
import { Transaction } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface Props {
  lastTransactions: Transaction[];
}

export default function LastTransactions({ lastTransactions }: Props) {
  return (
    <ScrollArea className="rounded-md border">
      <CardHeader className="flex-row items-center justify-between border-b">
        <CardTitle className="font-bold">Últimas transações</CardTitle>
        <Button variant={"outline"} className="rounded-full font-bold" asChild>
          <Link href={"/transactions"}>Ver mais</Link>
        </Button>
      </CardHeader>

      <CardContent className="mt-6 space-y-6 text-sm">
        {lastTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between gap-3"
          >
            <div className="flex gap-4">
              {/* icon */}
              <div className="flex-center size-12 gap-2 rounded-lg bg-muted">
                <Image
                  src={
                    TRANSACTION_PAYMENT_METHOD_ICONS[transaction.paymentMethod]
                  }
                  alt={transaction.paymentMethod}
                  height={20}
                  width={20}
                />
              </div>

              {/* category and date */}
              <div className="flex flex-col gap-1">
                <p>{TRANSACTION_CATEGORY_LABELS[transaction.category]}</p>
                <p className="text-muted-foreground">
                  {formatShortDate(transaction.date)}
                </p>
              </div>
            </div>

            {/* amount */}
            <div className={cn("font-bold", getAmountColor(transaction.type))}>
              {getAmountPrefix(transaction.type)}
              {toReal(transaction.amountInCents)}
            </div>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
}
