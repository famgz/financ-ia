"use server";

import { addTransactionSchema } from "@/actions/add-transaction/schema";
import { getUserIdElseThrow } from "@/actions/auth";
import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function addTransaction(
  data: Omit<Prisma.TransactionCreateInput, "userId">,
) {
  addTransactionSchema.parse(data);
  const userId = await getUserIdElseThrow();
  await db.transaction.create({
    data: { ...data, userId },
  });
  revalidatePath("/transactions");
}
