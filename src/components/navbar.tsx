"use client";

import LogoWithName from "@/components/icons/logo-with-name";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between border-b px-8 py-4">
      <div className="flex items-center gap-10">
        <LogoWithName />
        <Link
          href={"/"}
          className={cn({
            "font-bold text-primary": pathname === "/",
          })}
        >
          Dashboard
        </Link>
        <Link
          href={"/transactions"}
          className={cn({
            "font-bold text-primary": pathname === "/transactions",
          })}
        >
          Transações
        </Link>
        <Link
          href={"/subscription"}
          className={cn({
            "font-bold text-primary": pathname === "/subscription",
          })}
        >
          Assinatura
        </Link>
      </div>

      <UserButton showName />
    </nav>
  );
}
