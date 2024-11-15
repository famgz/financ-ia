import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TRANSACTION_CATEGORY_LABELS } from "@/constants/transaction";
import { TotalExpensePerCategory } from "@/data/get-dashboard-data/types";

interface Props {
  expensesPerCategory: TotalExpensePerCategory[];
}

export default function ExpensesPerCategory({ expensesPerCategory }: Props) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="border-b">
        <CardTitle className="font-bold">Gastos por Categoria</CardTitle>
      </CardHeader>
      <ScrollArea className="col-span-2 h-[200px] flex-auto rounded-md p-6">
        <CardContent className="space-y-5 p-0">
          {expensesPerCategory.map((category) => (
            <div key={category.category} className="space-y-1">
              <div className="flex w-full justify-between text-sm font-bold">
                <span>{TRANSACTION_CATEGORY_LABELS[category.category]}</span>
                <span>{category.percentageOfTotal}%</span>
              </div>
              <Progress value={category.percentageOfTotal} />
            </div>
          ))}
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
