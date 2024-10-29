import { Accounts, AddLendingAccountSchema, AddTransactionSchema } from '@/types/lending'
import { apiClient } from '@/utils/client'

// Lending Accounts
export async function fetchLendingAccounts() {
  const { data } = await apiClient.get<Array<Accounts>>('v2/lending_accounts')
  return data
}

export async function addLendingAccount(dto: AddLendingAccountSchema) {
  const { data } = await apiClient.post<{ data: AddLendingAccountSchema }>('v2/lending_accounts', dto)
  return data
}

export async function updateLendingAccount(id: number, dto: AddLendingAccountSchema) {
  const { data } = await apiClient.put<{ data: AddLendingAccountSchema }>(`v2/lending_accounts/${id}`, dto)
  return data
}

export async function deleteLendingAccount(id: number) {
  const { data } = await apiClient.delete(`v2/lending_accounts/${id}`)
  return data
}

// Lending Transactions
export async function fetchLendingTransaction() {
  const { data } = await apiClient.get<Array<AddTransactionSchema>>('v2/lending_transactions')
  return data
}

export async function fetchLendingTransactionById(id: number) {
  const { data } = await apiClient.get<Array<Accounts>[]>(`v2/lending_transactions/${id}/`)
  return data
}

export async function addLendingTransaction(dto: AddTransactionSchema) {
  const { data } = await apiClient.post<{ data: AddTransactionSchema }>('v2/lending_transactions', dto)
  return data
}

export async function updateLendingTransaction(id: number, dto: AddTransactionSchema) {
  const { data } = await apiClient.put<{ data: AddTransactionSchema }>(`v2/lending_transactions/${id}`, dto)
  return data
}

export async function deleteLendingTransaction(id: number) {
  const { data } = await apiClient.delete(`v2/lending_transactions/${id}`)
  return data
}
