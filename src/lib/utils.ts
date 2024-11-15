import { TransactionType } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toReal(cents: number | string | undefined | null): string {
  cents = Number(cents);
  if (!cents || isNaN(cents)) return "";
  const realAmount = cents / 100;
  return realAmount.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatShortDate(date: Date): string {
  return date.toLocaleDateString("pt-BR", {
    // day: "2-digit",
    // month: "short",
    // year: "numeric",
    dateStyle: "short",
  });
}

export function stringToInt(str: string) {
  return Number(String(str).replace(/\D/g, ""));
}

export function getAmountColor(transactionType: TransactionType) {
  switch (transactionType) {
    case "DEPOSIT":
      return "text-primary";
    case "EXPENSE":
      return "text-destructive";
    case "INVESTMENT":
      return "text-foreground";
    default:
      return "text-foreground";
  }
}

export function getAmountPrefix(transactionType: TransactionType) {
  return transactionType === "DEPOSIT" ? "+" : "-";
}
