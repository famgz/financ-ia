import { isValidMonth } from "@/lib/utils";
import { z } from "zod";

export const generateAIReportSchema = z.object({
  month: z.string().refine((value) => isValidMonth(value)),
});

export type GenerateAIReportSchema = z.infer<typeof generateAIReportSchema>;
