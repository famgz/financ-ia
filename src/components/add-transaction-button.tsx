"use client";

import { MoneyInput } from "@/components/money-input";
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
import { DatePicker } from "@/components/ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  transactionCategoryMap,
  transactionPaymentMethodMap,
  transactionTypeMap,
} from "@/constants/transaction";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { ArrowDownUpIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

const defaultMandatoryMessage = "Campo obrigatório";

const formSchema = z.object({
  name: z.string().trim().min(1, defaultMandatoryMessage),
  amountInCents: z.number().int().min(1, defaultMandatoryMessage),
  type: z.nativeEnum(TransactionType, {
    required_error: defaultMandatoryMessage,
  }),
  category: z.nativeEnum(TransactionCategory, {
    required_error: defaultMandatoryMessage,
  }),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod, {
    required_error: defaultMandatoryMessage,
  }),
  date: z.date({
    required_error: defaultMandatoryMessage,
  }),
});

type FormSchema = z.infer<typeof formSchema>;

export default function AddTransactionButton() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amountInCents: 0,
      type: undefined,
      category: undefined,
      paymentMethod: undefined,
      date: undefined,
    },
  });

  function onSubmit(data: FormSchema) {
    console.log(data);
  }

  return (
    <AlertDialog onOpenChange={() => form.reset()}>
      <AlertDialogTrigger asChild>
        <Button className="gap-2 rounded-full font-bold">
          <span>Adicionar transação</span>
          <ArrowDownUpIcon />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Adicionar transação</AlertDialogTitle>
          <AlertDialogDescription>
            Insira as informações abaixo
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite um nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amountInCents"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <MoneyInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Digite um valor"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Selecione um tipo"
                          className="placeholder-muted-foreground"
                        />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {Object.entries(transactionTypeMap).map(
                        ([value, label]) => (
                          <SelectItem value={value} key={value}>
                            {label}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {Object.entries(transactionCategoryMap).map(
                        ([value, label]) => (
                          <SelectItem value={value} key={value}>
                            {label}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Método de pagamento</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um método" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {Object.entries(transactionPaymentMethodMap).map(
                        ([value, label]) => (
                          <SelectItem value={value} key={value}>
                            {label}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <DatePicker value={field.value} onChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <Button type="submit">Adicionar</Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
