"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="flex-center size-full flex-col gap-10">
      <h1 className="text-2xl">Ops, ocorreu um erro!</h1>
      <Button asChild size={"lg"} className="text-xl">
        <Link href={"/login"}>Voltar para o site</Link>
      </Button>
    </div>
  );
}
