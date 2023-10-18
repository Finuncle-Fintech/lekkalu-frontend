import { setPhysicalAssetsSchema } from '@/schema/physical_assets'
import { PhysicalAsset } from '@/types/physical_assets'
import { apiClient } from '@/utils/client'

export async function fetchPhysicalAssets() {
  const { data } = await apiClient.get<PhysicalAsset[]>('physical_assets/')
  return data
}

export async function fetchPhysicalAssetsById(id: number) {
  const { data } = await apiClient.get<PhysicalAsset[]>(`physical_assets/${id}`)
  return data
}

export async function deletePhysicalAssets(id: number) {
  const { data } = await apiClient.delete<{ message: string }>(`/physical_assets/${id}`)
  return data
}

export async function setPhysicalAssets(dto: setPhysicalAssetsSchema) {
  const { data } = await apiClient.post<PhysicalAsset[]>('/physical_assets/', dto)
  return data
}
