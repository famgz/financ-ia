import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";

export const transactionTypeMap = {
  [TransactionType.DEPOSIT]: "Depósito",
  [TransactionType.EXPENSE]: "Despesa",
  [TransactionType.INVESTMENT]: "Investimento",
};

export const transactionCategoryMap = {
  [TransactionCategory.HOUSING]: "Habitação",
  [TransactionCategory.TRANSPORTATION]: "Transporte",
  [TransactionCategory.FOOD]: "Alimentação",
  [TransactionCategory.ENTERTAINMENT]: "Lazer",
  [TransactionCategory.HEALTH]: "Saúde",
  [TransactionCategory.UTILITY]: "Utilidades",
  [TransactionCategory.SALARY]: "Salário",
  [TransactionCategory.EDUCATION]: "Educação",
  [TransactionCategory.OTHER]: "Outros",
};

export const transactionPaymentMethodMap = {
  [TransactionPaymentMethod.CREDIT_CARD]: "Cartão de Crédito",
  [TransactionPaymentMethod.DEBIT_CARD]: "Cartão de Débito",
  [TransactionPaymentMethod.BANK_TRANSFER]: "Transferência Bancária",
  [TransactionPaymentMethod.BANK_SLIP]: "Boleto Bancário",
  [TransactionPaymentMethod.CASH]: "Dinheiro",
  [TransactionPaymentMethod.PIX]: "PIX",
  [TransactionPaymentMethod.OTHER]: "Outro",
};
