export const INCOME_TYPES = {
  SALARY: "SALARY",
  PERK: "PERKS",
  INTEREST_INCOME: "INTEREST INCOME",
} as const;

export type IncomeTypeKeys = keyof typeof INCOME_TYPES;
export type IncomeTypeValues = (typeof INCOME_TYPES)[IncomeTypeKeys];

export const EXPENSE_TYPES = {
  LOAN: "LOAN",
  PERSONAL_EXPENSE: "PERSONAL EXPENSE",
  INVESTMENT: "INVESTMENT",
} as const;

export type ExpenseTypeKeys = keyof typeof EXPENSE_TYPES;
export type ExpenseTypeValues = (typeof EXPENSE_TYPES)[ExpenseTypeKeys];
