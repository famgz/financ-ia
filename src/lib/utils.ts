import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toReal(cents: number) {
  const realAmount = cents / 100;
  return realAmount.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
