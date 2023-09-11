import {
  EXPENSE_TYPES,
  ExpenseTypeValues,
  INCOME_TYPES,
  IncomeTypeValues,
} from "./types";

export const incomeStatement: Record<
  string,
  Array<{
    type: IncomeTypeValues | ExpenseTypeValues;
    value: number;
    name: string;
  }>
> = {
  income: [
    {
      type: INCOME_TYPES.SALARY,
      value: 186.5,
      name: "Sodexo",
    },
    {
      type: INCOME_TYPES.PERK,
      value: 0,
      name: "Equity NXP",
    },
    {
      type: INCOME_TYPES.INTEREST_INCOME,
      value: 14.5,
      name: "Raju 1.3L",
    },
  ],
  expenses: [
    {
      type: EXPENSE_TYPES.PERSONAL_EXPENSE,
      value: 186.5,
      name: "Rent",
    },
    {
      type: EXPENSE_TYPES.PERSONAL_EXPENSE,
      value: 0,
      name: "Cook & Maid",
    },
    {
      type: EXPENSE_TYPES.PERSONAL_EXPENSE,
      value: 14.5,
      name: "Food",
    },
    {
      type: EXPENSE_TYPES.PERSONAL_EXPENSE,
      value: 186.5,
      name: "Personal",
    },
    {
      type: EXPENSE_TYPES.PERSONAL_EXPENSE,
      value: 0,
      name: "Mom",
    },
    {
      type: EXPENSE_TYPES.PERSONAL_EXPENSE,
      value: 14.5,
      name: "Family Rent",
    },
    {
      type: EXPENSE_TYPES.LOAN,
      value: 14.5,
      name: "HDFC 10L",
    },
    {
      type: EXPENSE_TYPES.LOAN,
      value: 14.5,
      name: "SBI Loan Thar",
    },
    {
      type: EXPENSE_TYPES.LOAN,
      value: 14.5,
      name: "ELSS",
    },
    {
      type: EXPENSE_TYPES.INVESTMENT,
      value: 14.5,
      name: "Equity",
    },
    {
      type: EXPENSE_TYPES.INVESTMENT,
      value: 14.5,
      name: "Liquid Fund",
    },
    {
      type: EXPENSE_TYPES.INVESTMENT,
      value: 14.5,
      name: "SL CHITTI",
    },
  ],
};
