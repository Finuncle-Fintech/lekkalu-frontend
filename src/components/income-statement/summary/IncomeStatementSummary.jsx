import React from "react";
import { IncomeStatementChart } from "components/Charts/IncomeStatementChart";
import styles from "./IncomeStatementSummary.module.css";

import SingleTable from "../table/SingleTable";
import Footer from "components/Footer/Footer";
const IncomeStatementSummary = ({
  incomeStatement,
  totalIncome,
  totalExpense,
  difference,
}) => {
  console.log({ totalIncome, totalExpense });
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
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
    <div>
      <div className={styles.container}>
        <div className={styles.sideLeft}></div>
        <div className={styles.sideRight}>
          <div className={styles.innerCol}>
            <SingleTable header="Assets" headerColor="#62D4E3" />
            <IncomeStatementChart
              type="income-overview"
              data={incomeStatement}
              totalVal={totalIncome}
              incomeOverviewData={incomeOverviewData}
              details={true}
            />
            <SingleTable header="Summary Statistics" headerColor="#E362BF" />
          </div>
          <div className={styles.innerCol}>
            <SingleTable header="Liabilities" headerColor="#E362BF" />
            <IncomeStatementChart
              type="expense-overview"
              data={incomeStatement}
              totalVal={totalExpense}
              expenseOverviewData={expenseOverviewData}
              details={true}
            />
            <SingleTable header="Summary Statistics" headerColor="#E362BF" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default IncomeStatementSummary;
