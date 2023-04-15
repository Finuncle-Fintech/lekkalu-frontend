import { IncomeStatementChart } from "components/Charts/IncomeStatementChart";
import Heading from "components/shared/heading/Heading";
import React from "react";

export const Expenses = ({ incomeStatement, totalExpense }) => {
  return (
    <div>
      <Heading text={"Expense Summary"} color="#1976d2" />
      <IncomeStatementChart
        type="expenses"
        data={incomeStatement}
        totalVal={totalExpense}
      />
    </div>
  );
};
