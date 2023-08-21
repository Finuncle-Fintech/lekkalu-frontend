import React, { useContext, useEffect } from "react";
import IncomeStatementSummary from "components/income-statement/summary/IncomeStatementSummary";
import GenericTabs from "components/shared/tabs/Tabs";
// import { incomeStatement } from "constants/income-statement-test-dataset";
import SummarizeIcon from "@mui/icons-material/Summarize";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import Income from "components/income-statement/income/Income";
import { Expenses } from "components/income-statement/expenses/Expenses";
import { BeatLoader } from "react-spinners";
import Colors from "constants/colors";

const tabsList = [
  { label: "Summary", icon: <SummarizeIcon /> },
  { label: "Income", icon: <MonetizationOnIcon /> },
  { label: "Expenses", icon: <MoneyOffIcon /> },
];

const IncomeStatement = ({ Context }) => {
  const { fetchIncomeStatement, incomeStatement } = useContext(Context);
  const [currentab, setCurrentTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  useEffect(() => {
    fetchIncomeStatement();
  }, []);
  useEffect(() => {
    console.log({ incomeStatement });
  }, [JSON.stringify(incomeStatement)]);

  

  const loadCurrentTab = () => {
    switch (currentab) {
      default:
        return null;
      case 0: {
        return (
          <IncomeStatementSummary
            incomeStatement={incomeStatement}
            totalIncome={totalIncome}
            totalExpense={totalExpense}
            difference={difference}
          />
        );
      }
      case 1: {
        return (
          <Income incomeStatement={incomeStatement} totalIncome={totalIncome} />
        );
      }
      case 2: {
        return (
          <Expenses
            incomeStatement={incomeStatement}
            totalExpense={totalExpense}
          />
        );
      }
    }
  };

  

  const totalIncome = incomeStatement.income.reduce(
    (total, item) => total + item.value,
    0
  );

  const totalExpense = incomeStatement.expenses.reduce(
    (total, item) => total + item.value,
    0
  );
 

  const difference = totalIncome - totalExpense;


  return <div>{loadCurrentTab()}</div>;
};

export default IncomeStatement;
