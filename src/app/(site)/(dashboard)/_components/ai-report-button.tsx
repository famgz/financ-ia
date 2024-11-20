"use client";

import { generateAIReport } from "@/app/(site)/(dashboard)/_actions/generate-ai-report";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { DUMMY_REPORT } from "@/constants/report";
import { BotIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Markdown from "react-markdown";

interface Props {
  month: string;
  userHasPremiumPlan: boolean;
}

export default function AIReportButton({ month, userHasPremiumPlan }: Props) {
  const [report, setReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  async function handleGenerateReportClick() {
    try {
      setLoading(true);
      const AIReport = await generateAIReport({ month });
      setReport(AIReport);
    } catch (err) {
      console.error(err);
      setReport(DUMMY_REPORT);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"} className="rounded-full">
          Relatório IA
          <BotIcon />
        </Button>
      </AlertDialogTrigger>

      {userHasPremiumPlan ? (
        <>
          {" "}
          <AlertDialogContent className="max-w-[600px]">
            <AlertDialogHeader>
              <AlertDialogTitle>Relatório IA</AlertDialogTitle>
              <AlertDialogDescription>
                Use inteligência artificial para gerar um relatório com insights
                sobre suas finanças.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <ScrollArea className="prose max-h-[450px] text-muted-foreground prose-h1:text-foreground prose-h3:text-foreground prose-h4:text-foreground prose-strong:text-foreground">
              <Markdown>{report}</Markdown>
            </ScrollArea>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button variant={"ghost"}>Cancelar</Button>
              </AlertDialogCancel>
              <Button
                onClick={handleGenerateReportClick}
                disabled={loading}
                className="gap-2"
              >
                {loading && <Loader2Icon className="animate-spin" />}
                Gerar Relatório
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </>
      ) : (
        <>
          <AlertDialogContent className="max-w-[600px]">
            <AlertDialogHeader>
              <AlertDialogTitle>Relatório IA</AlertDialogTitle>
              <AlertDialogDescription>
                Você precisa de um plano premium para gerar relatórios com IA.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-10">
              <AlertDialogCancel asChild>
                <Button variant={"ghost"}>Cancelar</Button>
              </AlertDialogCancel>
              <Button onClick={handleGenerateReportClick} className="gap-2">
                <Link href={"/subscription"}>Assinar plano premium</Link>
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </>
      )}
    </AlertDialog>
  );
}
