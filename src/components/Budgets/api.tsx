import { useQuery } from '@tanstack/react-query'
import { BUDGET_QUERY_KEYS, EXPENSES } from '@/utils/query-keys'
import { fetchBudgets } from '@/queries/budget'
import { fetchMonthlyExpenses } from '@/queries/expense'

export const FetchBudgetAndExpenses = () => {
  const { data: budgetData } = useQuery([BUDGET_QUERY_KEYS.BUDGETS], fetchBudgets, {
    select: (budgets) => {
      return budgets.map((budget) => {
        const { month, ...rest } = budget
        const [year, newMonth] = month.split('-')
        return { ...rest, month: parseInt(newMonth), year: parseInt(year) }
      })
    },
  })

  const budgets = budgetData
  return useQuery([EXPENSES.MONTHLY_EXPENSES], fetchMonthlyExpenses, {
    select: (expenses) => {
      const combinedData = budgets!
        .map((budget) => {
          const matchingExpense = expenses.find(
            (expense) => expense.year === budget.year && expense.month === budget.month,
          )

          if (matchingExpense) {
            return {
              budgetId: budget.id,
              year: budget.year,
              month: budget.month,
              // limit: parseFloat(budget.limit),
              spent: matchingExpense.spent,
              budget: matchingExpense.budget,
              balance: matchingExpense.balance,
            }
          }
          return null // If no match is found, you can choose to handle it accordingly
        })
        .filter((data) => data !== null)
        .sort((a, b) => {
          if (a!.year === b!.year) {
            return b!.month - a!.month // Sort by month in descending order
          }
          return b!.year - a!.year // Sort by year in descending order
        })

      if (combinedData.length > 0) {
        const chunks = Array.from({ length: Math.ceil(combinedData.length / 4) }, (_, i) =>
          combinedData.slice(i * 4, i * 4 + 4),
        )
        return { budgets: chunks, totalBudgets: combinedData.length }
      } else {
        return { budgets: [[]], totalBudgets: 0 }
      }
    },
    enabled: !!budgets,
  })
}
