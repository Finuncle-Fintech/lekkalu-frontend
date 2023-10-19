export type IncomeStatement = {
  id: number | string
  name: string
  type: string
  amount: string
  isNew: boolean
}

export type CreateIncomeStatementDto = {
  name: string
  type: string
  amount: string
}
