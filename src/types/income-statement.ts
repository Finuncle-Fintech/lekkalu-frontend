export type IncomeStatement = {
  id: number
  name: string
  type: string
  amount: string
  isNew: boolean
}

export type IncomeTypes = {
  id: number
  label: string
  value: string
}
