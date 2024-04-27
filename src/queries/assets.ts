import { AddPhysicalAssetTypeCashSchema } from '@/schema/balance-sheet'
import { CashAssets } from '@/types/balance-sheet'
import { v2ApiClient } from '@/utils/client'

// Cash Assets
export async function addCashAsset(dto: AddPhysicalAssetTypeCashSchema) {
  const { data } = await v2ApiClient.post<CashAssets>('/cash', dto)
  return data
}
export async function editCashAsset(id: number, dto: Partial<AddPhysicalAssetTypeCashSchema>) {
  const { data } = await v2ApiClient.put(`cash/${id}`, dto)
  return data
}

export async function fetchCashAsset() {
  const { data } = await v2ApiClient.get<AddPhysicalAssetTypeCashSchema[]>('/cash')
  return data
}

export async function deleteCashAsset(id: number) {
  const { data } = await v2ApiClient.delete<{ message: string }>(`/cash/${id}`)
  return data
}
