import * as React from "react";
import { useQuery } from "react-query";
import { Context } from "provider/Provider";
import useAxiosPrivate from "hooks/useAxiosPrivate";

export const FetchBudgetAndExpenses = () => {
  const axiosPrivate = useAxiosPrivate();
  const { authToken } = React.useContext(Context);
  const {
    data: budgetData,
    isLoading: isBudgetLoading,
    isError: isBudgetError,
    refetch: refetchBudget,
  } = useQuery(["budget"], async () => {
    const response = await axiosPrivate.get(
      `${process.env.REACT_APP_BACKEND_API}budget/`,
      {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      }
    );
    return response.data;
  }, {
    select: (budgets) => {
        return budgets.reduce((acc, budget)=>{
        const {month} = budget
        const newMonth = month.split('-').slice(0, 2).join('-')
        // {[newMonth]: budget.limit}
        acc[newMonth] = parseFloat(budget.limit)
        return acc
    }, {})
    }
  });

  
  const budgets = budgetData;
  return useQuery(
    ["expenses"],
    async () => {
      const response = await axiosPrivate.get(
        `${process.env.REACT_APP_BACKEND_API}expenses/`,
        {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        }
      );
      return response.data;
    },
    {
      select: (expenses) => {
        const newExpense = expenses
        .map((expense) => {
          const { time } = expense;
          const date = new Date(time);
          const formated = `${date.getFullYear()}-${String(
            date.getMonth() + 1
          ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
          return {
            ...expense,
            time: formated,
            month: `${date.getFullYear()}-${String(
              date.getMonth() + 1
            ).padStart(2, "0")}`,
          };
        })
        .reduce((acc, expense) => {
          if (acc[expense.month]) {
            acc[expense.month] =
              parseFloat(acc[expense.month]) + parseFloat(expense.amount);
          } else {
            acc[expense.month] = parseFloat(expense.amount);
          }
          return acc;
        }, {})

        const result = [];

        for (const key in budgetData) {
          if (key in newExpense) {
            result.push({month: key, budget: budgetData[key], expense: newExpense[key]}); // Store the values from both objects as an array
          }
        }
      
        return result;
        // return {budgetLimit: budgetData, expenses: newExpense};
      },
      enabled: !!budgets,
    }
  );
};
