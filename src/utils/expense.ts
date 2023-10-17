import dayjs from 'dayjs'
import { Expense } from '@/types/expense'

export function checkIsExpenseExists(allExpenses: Expense[], newExpense: Pick<Expense, 'amount' | 'tags' | 'time'>) {
  let isExists = false
  // If the amount of the new expense does not contain a decimals, this conditional adds .00 for compare it with others
  !(Number(newExpense.amount) % 1 !== 0) && (newExpense.amount = `${newExpense.amount}.00`)

  allExpenses.forEach((expense) => {
    if (expense.amount === newExpense.amount) {
      const existingTags = expense.tags.sort()
      const newTags = newExpense.tags.sort()
      const sameTags = existingTags.map((data, index) => {
        if (data === newTags[index]) return true
        return false
      })

      if (!sameTags.includes(false) && dayjs(expense.time).isSame(dayjs(newExpense.time))) {
        isExists = true
      }
    }
  })

  return isExists
}
