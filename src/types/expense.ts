export type Expense = {
  id: number
  amount: string
  user: number
  time: Date
  tags: number[]
}

export type WeeklyExpense = {
  year: number
  week: Date
  total_amount: number
}
// export type WeeklyExpense = {
//   time: string,
//   amount: number,
//   roll_avg: string
// }

export type MonthlyExpense = {
  year: number,
  month: number,
  spent: number,
  budget: number,
  balance: number,
  cum_sum: number
}