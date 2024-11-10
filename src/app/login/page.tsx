import LogoWithName from "@/components/icons/logo-with-name";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { LogInIcon } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="grid size-full grid-cols-2">
      <div className="mx-auto flex h-full max-w-[600px] flex-col justify-center p-8">
        <LogoWithName />
        <h1 className="mt-8 text-4xl font-bold">Bem-vindo</h1>
        <p className="mt-3 text-muted-foreground">
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para
          monitorar suas movimentações, e oferecer insights personalizados,
          facilitando o controle do seu orçamento.
        </p>
        <Button variant={"outline"} className="mt-8 gap-2">
          <LogInIcon className="" />
          Fazer login ou criar conta
        </Button>
      </div>

      <div className="relative size-full">
        <Image
          src={"/login-hero.jpg"}
          alt="Imagem Hero de Login"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
