import { Badge } from "@/components/ui/badge";
import { TRANSACTION_TYPE_LABELS } from "@/constants/transaction";
import { cn } from "@/lib/utils";
import { TransactionType } from "@prisma/client";
import { CircleIcon } from "lucide-react";

interface Props {
  transactionType: TransactionType;
}

export default function TransactionTypeBadge({ transactionType }: Props) {
  const label = TRANSACTION_TYPE_LABELS[transactionType];
  return (
    <Badge
      className={cn("gap-1 font-bold", {
        "bg-primary/10 text-primary":
          transactionType === TransactionType.DEPOSIT,
        "bg-destructive/10 text-destructive":
          transactionType === TransactionType.EXPENSE,
        "bg-white/10 text-foreground":
          transactionType === TransactionType.INVESTMENT,
      })}
    >
      <CircleIcon
        className={cn({
          "fill-primary": transactionType === TransactionType.DEPOSIT,
          "fill-destructive": transactionType === TransactionType.EXPENSE,
          "fill-foreground": transactionType === TransactionType.INVESTMENT,
        })}
        size={10}
      />
      <span>{label}</span>
    </Badge>
  );
}
