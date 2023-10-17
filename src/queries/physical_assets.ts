import { PhysicalAsset } from '@/types/physical_assets'
import { apiClient } from '@/utils/client'

export async function fetchPhysicalAssets() {
    const { data } = await apiClient.get<PhysicalAsset[]>('physical_assets/')
    return data
  }
