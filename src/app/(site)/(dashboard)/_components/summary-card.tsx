import { Card, CardContent, CardHeader } from "@/components/ui/card";
import UpsertTransactionButton from "@/components/upsert-transaction-button";
import { cn, toReal } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
  title: string;
  icon: ReactNode;
  amountInCents: number;
  size?: "sm" | "lg";
}

export default function SummaryCard({
  title,
  icon,
  amountInCents,
  size = "sm",
}: Props) {
  return (
    <Card className={cn(size === "sm" ? "" : "bg-muted/40")}>
      <CardHeader>
        <div className="flex flex-row items-center gap-4">
          {icon}
          <p
            className={cn(
              size === "sm" ? "text-muted-foreground" : "text-foreground/70",
            )}
          >
            {title}
          </p>
        </div>
      </CardHeader>
      <CardContent className="flex justify-between">
        <p className={cn("font-bold", size === "sm" ? "text-2xl" : "text-4xl")}>
          {toReal(amountInCents)}
        </p>

        {size === "lg" && <UpsertTransactionButton />}
      </CardContent>
    </Card>
  );
}
