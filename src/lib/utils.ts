import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toReal(cents: number | string): string {
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

export function stringToInt(str: string) {
  return Number(str.replace(/\D/g, ""));
}
