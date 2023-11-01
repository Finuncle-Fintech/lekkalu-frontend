import { AddLiabilitySchema, AddPhysicalAssetSchema } from '@/schema/balance-sheet'
import { Liability, PhysicalAsset } from '@/types/balance-sheet'
import { v1ApiClient } from '@/utils/client'

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

/** Liabilities */
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

/** Loan Transactions */
export async function fetchLoanTransactions() {
  const { data } = await v1ApiClient.get('loan_transactions/')
  return data
}

export async function fetchTransactionsForLoan(loanId: number) {
  const { data } = await v1ApiClient.get(`loan_transactions/?loan=${loanId}`)
  return data
}
