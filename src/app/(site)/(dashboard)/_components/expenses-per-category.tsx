import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { transactionCategoryMap } from "@/constants/transaction";
import { TotalExpensePerCategory } from "@/data/get-dashboard-data/types";

interface Props {
  expensesPerCategory: TotalExpensePerCategory[];
}

export default function ExpensesPerCategory({ expensesPerCategory }: Props) {
  return (
    <ScrollArea className="col-span-2 h-full rounded-md border p-6">
      <CardHeader className="p-0">
        <CardTitle className="font-bold">Gastos por Categoria</CardTitle>
      </CardHeader>

      <CardContent className="mt-6 space-y-5 p-0">
        {expensesPerCategory.map((category) => (
          <div key={category.category} className="space-y-1">
            <div className="flex w-full justify-between text-sm font-bold">
              <span>{transactionCategoryMap[category.category]}</span>
              <span>{category.percentageOfTotal}%</span>
            </div>
            <Progress value={category.percentageOfTotal} />
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
}
