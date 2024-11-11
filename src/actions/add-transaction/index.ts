"use server";

import { addTransactionSchema } from "@/actions/add-transaction/schema";
import { getUserIdElseThrow } from "@/actions/auth";
import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface Params extends Omit<Prisma.TransactionCreateInput, "id" | "userId"> {
  id?: string;
  userId?: string;
}

export async function upsertTransaction(data: Params) {
  addTransactionSchema.parse(data);
  const userId = await getUserIdElseThrow();
  await db.transaction.upsert({
    where: { id: data.id },
    update: { ...data },
    create: { ...data, userId },
  });
  revalidatePath("/transactions");
}
