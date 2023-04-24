import { IncomeStatementChart } from "components/Charts/IncomeStatementChart";
import Heading from "components/shared/heading/Heading";
import React from "react";

const Income = ({ incomeStatement, totalIncome }) => {
  return (
    <div>
      <Heading text={"Income Summary"} color="#1976d2" />
      <IncomeStatementChart
        type="income"
        data={incomeStatement}
        totalVal={totalIncome}
      />
    </div>
  );
};

export default Income;
