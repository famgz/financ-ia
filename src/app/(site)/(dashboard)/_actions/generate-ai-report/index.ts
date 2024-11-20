"use server";

import { hasUserPremiumPlan } from "@/actions/auth";
import {
  GenerateAIReportSchema,
  generateAIReportSchema,
} from "@/app/(site)/(dashboard)/_actions/generate-ai-report/schema";
import { db } from "@/lib/prisma";
import { formatShortDate, toReal } from "@/lib/utils";
import OpenAI from "openai";

export async function generateAIReport({ month }: GenerateAIReportSchema) {
  generateAIReportSchema.parse({ month });
  const hasPremiumPlan = await hasUserPremiumPlan();
  if (!hasPremiumPlan) {
    throw new Error("You need a premium plan to generate AI reports");
  }

  const openAI = new OpenAI({
    apiKey: process.env.OPENAI_AI_KEY,
  });
  const currentYear = new Date().getFullYear();
  const transactions = await db.transaction.findMany({
    where: {
      date: {
        gte: new Date(`${currentYear}-${month}-01`),
        lt: new Date(`${currentYear}-${month}-31`),
      },
    },
  });
  const content = `Gere um relatório com insigts sobre as minhas finanças, com dicas e orientações de como melhorar minha vida financeira. As transações estão divididas por ponto e vírgula. A estrutura de cada uma é {DATA}-{TIPO}-{VALOR}-{CATEGORIA}. São elas:
  ${transactions
    .map(
      (transaction) =>
        `${formatShortDate(transaction.date)}-${toReal(transaction.amountInCents)}-${transaction.type}-${transaction.category}`,
    )
    .join(";")}`;

  const completion = await openAI.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Você é um especialista em gestão e organização de finanças pessoais. Você ajuda as pessoas a organizarem melhor as suas finanças.",
      },
      {
        role: "user",
        content,
      },
    ],
  });

  return completion.choices[0].message.content;
}
