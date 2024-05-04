import {
  AddPhysicalAssetSchema,
  AddCashType,
  CashAssets,
  Liability,
  LoanTransaction,
  MutualFunds,
  PhysicalAsset,
  MutualFundSchema,
  AddLiabilitySchema,
  SecurityTransactionSchema,
} from '@/types/balance-sheet'
import { v1ApiClient, v2ApiClient } from '@/utils/client'

export async function fetchPhysicalAssets() {
  const { data } = await v1ApiClient.get<PhysicalAsset[]>('physical_assets/')
  return data
}

export async function fetchPhysicalAssetsById(id: number) {
  const { data } = await v1ApiClient.get<PhysicalAsset[]>(`physical_assets/${id}/`)
  return data
}

export async function deletePhysicalAsset(id: number) {
  const { data } = await v1ApiClient.delete<{ message: string }>(`/physical_assets/${id}`)
  return data
}

export async function addPhysicalAsset(dto: AddPhysicalAssetSchema) {
  const { data } = await v1ApiClient.post<PhysicalAsset[]>('/physical_assets/', dto)
  return data
}

export async function editPhysicalAsset(id: number, dto: Partial<AddPhysicalAssetSchema>) {
  const { data } = await v1ApiClient.put(`physical_assets/${id}`, dto)
  return data
}

// ** Liabilities
export async function fetchLiabilities() {
  const { data } = await v1ApiClient.get<Liability[]>('loans/')
  return data
}

export async function addLiability(dto: AddLiabilitySchema) {
  const { data } = await v1ApiClient.post('loans/', dto)
  return data
}

export async function editLiability(id: number, dto: Partial<AddLiabilitySchema>) {
  const { data } = await v1ApiClient.put(`loans/${id}`, dto)
  return data
}

export async function deleteLiability(id: number) {
  const { data } = await v1ApiClient.delete(`loans/${id}`)
  return data
}

// ** Loan Transactions
export async function fetchLoanTransactions() {
  const { data } = await v1ApiClient.get<LoanTransaction[]>('loan_transactions/')
  return data
}

export async function fetchTransactionsForLoan(loan_id: number) {
  const { data } = await v1ApiClient.get<LoanTransaction[]>('loan_transactions', { params: { loan_id } })
  return data
}

// ** Mutual Fund
export async function fetchMutualFunds() {
  const { data } = await v1ApiClient.get<MutualFunds[]>('mutual_funds/')
  return data
}

export async function addMutualFund(dto: MutualFundSchema) {
  const { data } = await v1ApiClient.post<MutualFunds>('/mutual_funds', dto)
  return data
}

export async function editMutualFund(id: number, dto: Partial<MutualFunds>) {
  const { data } = await v1ApiClient.put(`mutual_funds/${id}`, dto)
  return data
}

export async function deleteMutualFund(id: number) {
  const { data } = await v1ApiClient.delete<{ message: string }>(`/mutual_funds/${id}`)
  return data
}

// ** Security Transactions
export async function fetchSecurityTransaction() {
  const { data } = await v1ApiClient.get<SecurityTransactionSchema[]>('securities_transaction/')
  return data
}
export async function addSecurityTransaction(dto: SecurityTransactionSchema) {
  const { data } = await v1ApiClient.post<MutualFunds>('securities_transaction/', dto)
  return data
}
export async function editSecurityTransaction(id: number, dto: SecurityTransactionSchema) {
  const { data } = await v1ApiClient.put(`securities_transaction/${id}`, dto)
  return data
}

export async function deleteSecurityTransaction(id: number) {
  const { data } = await v1ApiClient.delete<{ message: string }>(`/securities_transaction/${id}`)
  return data
}

// ** Cash Assets
export async function addCashAsset(dto: AddCashType) {
  const { data } = await v2ApiClient.post<CashAssets>('/cash', dto)
  return data
}
export async function editCashAsset(id: number, dto: Partial<AddCashType>) {
  const { data } = await v2ApiClient.put(`cash/${id}`, dto)
  return data
}

export async function fetchCashAsset() {
  const { data } = await v2ApiClient.get<AddCashType[]>('/cash')
  return data
}

export async function deleteCashAsset(id: number) {
  const { data } = await v2ApiClient.delete<{ message: string }>(`/cash/${id}`)
  return data
}
