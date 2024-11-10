import LogoIcon from "@/components/icons/logo";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export default function LogoWithName({ className }: Props) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <LogoIcon />
      <span className="text-2xl font-bold">financ.ia</span>
    </div>
  );
}
