"use client";

import { upsertTransaction } from "@/actions/add-transaction";
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
  Transaction,
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const defaultMandatoryMessage = "Campo obrigatório";

const formSchema = z.object({
  name: z.string().trim().min(1, defaultMandatoryMessage),
  amountInCents: z.number().int().positive().min(1, defaultMandatoryMessage),
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

interface Props {
  children: ReactNode;
  transaction?: Transaction;
}

export default function UpsertTransactionDialog({
  children,
  transaction,
}: Props) {
  const [open, setOpen] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: transaction?.name,
      amountInCents: transaction?.amountInCents,
      type: transaction?.type,
      category: transaction?.category,
      paymentMethod: transaction?.paymentMethod,
      date: transaction?.date,
    },
  });

  async function onSubmit(data: FormSchema) {
    try {
      setDisableSubmit(true);
      await upsertTransaction({ ...data, id: transaction?.id });
      setOpen(false);
    } catch (e) {
      console.error(e);
      setDisableSubmit(false);
    }
  }

  function handleOpenChange(open: boolean) {
    form.reset();
    setDisableSubmit(false);
    setOpen(open);
  }

  const isUpdate = !!transaction;
  const dialogActionLabel = isUpdate ? "Atualizar" : "Adicionar";

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogActionLabel} transação</AlertDialogTitle>
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
                      onBlur={field.onBlur}
                      disabled={field.disabled}
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
              <Button type="submit" disabled={disableSubmit}>
                {dialogActionLabel}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
