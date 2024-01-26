import { Accounts, AddAccountSchema } from '@/types/lending'
import { apiClient } from '@/utils/client'

export async function addLendingAccount(dto: AddAccountSchema) {
  const { data } = await apiClient.post<{ data: AddAccountSchema }>('v2/lending_accounts', dto)
  return data
}

export async function updateLendingAccount(id: number, dto: AddAccountSchema) {
  const { data } = await apiClient.put<{ data: AddAccountSchema }>(`v2/lending_accounts/${id}`, dto)
  return data
}

export async function deleteLendingAccount(id: number) {
  const { data } = await apiClient.delete(`v2/lending_accounts/${id}`)
  return data
}

export async function fetchLendingTransaction() {
  const { data } = await apiClient.get<Array<Accounts>>('v2/lending_transactions')
  return data
}

export async function fetchLendingAccounts() {
  const { data } = await apiClient.get<Array<Accounts>>('v2/lending_accounts')
  return data
}
