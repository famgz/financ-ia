import { ReactNode } from "react";

interface Props {
  title: string;
  value: number;
  icon: ReactNode;
}

export default function PercentageItem({ title, value, icon }: Props) {
  return (
    <div className="flex text-sm">
      <div className="flex flex-1 gap-2">
        {icon}
        <span className="text-muted-foreground">{title}</span>
      </div>
      <span className="font-semibold">{value}%</span>
    </div>
  );
}
