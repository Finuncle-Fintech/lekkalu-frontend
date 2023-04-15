import React from "react";
import { IncomeStatementChart } from "components/Charts/IncomeStatementChart";
import styles from "./IncomeStatementSummary.module.css";
import StatsCard from "../stats-card/StatsCard";
import SourceCard from "../sources-card/SourceCard";

import Heading from "components/shared/heading/Heading";
import Add from "../add-card/AddCard";
const IncomeStatementSummary = ({
  incomeStatement,
  totalIncome,
  totalExpense,
  difference,
}) => {
  let incomeOverviewData = [];
  const typesOfIncome = [
    ...new Set(
      incomeStatement.income
        .filter((each) => each.type)
        .map((each) => each.type)
    ),
  ];
  console.log({ typesOfIncome });
  typesOfIncome.map((eachType) => {
    let sumOfType = incomeStatement.income
      .filter((each) => each.type === eachType)
      .reduce((sum, each) => sum + each.value, 0);
    incomeOverviewData.push({ name: eachType, value: sumOfType });
  });

  let expenseOverviewData = [];
  const typesOfExpense = [
    ...new Set(
      incomeStatement.expenses
        .filter((each) => each.type)
        .map((each) => each.type)
    ),
  ];
  console.log({ typesOfExpense });
  typesOfExpense.map((eachType) => {
    let sumOfType = incomeStatement.expenses
      .filter((each) => each.type === eachType)
      .reduce((sum, each) => sum + each.value, 0);
    expenseOverviewData.push({ name: eachType, value: sumOfType });
  });

  return (
    <div className={styles.container}>
      <Heading text={"Overview"} color="#1976d2" />
      <div className={styles.statsContainer}>
        <StatsCard label="Total Income" value={`${totalIncome} INR`} />
        <StatsCard label="Total Expense" value={`${totalExpense} INR`} />
        <StatsCard
          label={difference < 0 ? "Deficit" : "Surplus"}
          value={`${((difference / totalIncome) * 100).toFixed(2)} %`}
          bg={difference < 0 && "red"}
        />
      </div>
      <div>
        <Heading text={"Income Sources"} color="#1976d2" />
        <div className={styles.statsContainer}>
          <Add label="Add Source" />
          {incomeOverviewData.map((each) => {
            return <SourceCard label={each.name} value={`${each.value} INR`} />;
          })}
        </div>
        <div className={styles.chartWrapper}>
          <IncomeStatementChart
            type="income-overview"
            data={incomeStatement}
            totalVal={totalIncome}
            incomeOverviewData={incomeOverviewData}
          />
        </div>
      </div>
      <div>
        <Heading text={"Expense Sources"} color="#1976d2" />
        <div className={styles.statsContainer}>
          <Add label="Add Source" />
          {expenseOverviewData.map((each) => {
            return <SourceCard label={each.name} value={`${each.value} INR`} />;
          })}
        </div>
        <div className={styles.chartWrapper}>
          <IncomeStatementChart
            type="expense-overview"
            data={incomeStatement}
            totalVal={totalExpense}
            expenseOverviewData={expenseOverviewData}
          />
        </div>
      </div>
    </div>
  );
};

export default IncomeStatementSummary;
