import { AddIncomeStatementSchema } from '@/schema/income-statement'
import { IncomeStatement, IncomeTypes } from '@/types/income-statement'
import { v1ApiClient } from '@/utils/client'

export async function fetchIncomeSources() {
  const { data } = await v1ApiClient.get<Array<IncomeStatement & { isNew: boolean }>>('income_source/')
  return data
}

export async function fetchIncomeExpenses() {
  const { data } = await v1ApiClient.get<Array<IncomeStatement & { isNew: boolean }>>('income_expense/')
  return data
}

export async function createIncomeSource(dto: AddIncomeStatementSchema) {
  const { data } = await v1ApiClient.post('income_source/', dto)
  return data
}

export async function updateIncomeSource(id: number, dto: Partial<AddIncomeStatementSchema>) {
  const { data } = await v1ApiClient.put(`income_source/${id}`, dto)
  return data
}

export async function deleteIncomeSource(id: number) {
  const { data } = await v1ApiClient.delete(`income_source/${id}`)
  return data
}

export async function createIncomeExpense(dto: AddIncomeStatementSchema) {
  const { data } = await v1ApiClient.post('income_expense/', dto)
  return data
}

export async function updateIncomeExpense(id: number, dto: Partial<AddIncomeStatementSchema>) {
  const { data } = await v1ApiClient.put(`income_expense/${id}`, dto)
  return data
}

export async function deleteIncomeExpense(id: number) {
  const { data } = await v1ApiClient.delete(`income_expense/${id}`)
  return data
}

export async function fetchIncomeExpensesTypes() {
  const { data } = await v1ApiClient.get<Array<IncomeTypes>>('/income_expense_type')
  return data
}

export async function fetchIncomeSourceTypes() {
  const { data } = await v1ApiClient.get<Array<IncomeTypes>>('/income_source_type')
  return data
}
