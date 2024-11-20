"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { isValidMonth } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const MONTH_OPTIONS = [
  { value: "01", label: "Janeiro" },
  { value: "02", label: "Fevereiro" },
  { value: "03", label: "Março" },
  { value: "04", label: "Abril" },
  { value: "05", label: "Maio" },
  { value: "06", label: "Junho" },
  { value: "07", label: "Julho" },
  { value: "08", label: "Agosto" },
  { value: "09", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
];

export default function TimeSelect() {
  const searchParams = useSearchParams();
  let month = searchParams.get("month");
  const validMonth = isValidMonth(month);
  if (!validMonth) month = "";

  const { replace } = useRouter();

  function handleMonthChange(month: string) {
    replace(`/?month=${month}`);
  }

  return (
    <Select
      onValueChange={(value) => handleMonthChange(value)}
      defaultValue={month || ""}
    >
      <SelectTrigger className="w-[180px] rounded-full">
        <SelectValue placeholder="Selecione um mês" />
      </SelectTrigger>
      <SelectContent>
        {MONTH_OPTIONS.map(({ value, label }) => (
          <SelectItem value={value} key={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
