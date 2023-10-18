import { z } from 'zod'

export const setPhysicalAssetsSchema = z.object({
  name: z.string().min(1, 'Name is required!'),
  purchase_value: z.string().min(1, 'Purchase value is required!'),
  sell_value: z.string(),
  purchase_date: z.string().min(1, 'Purchase date is required!'),
  sell_date: z.string(),
  depreciation_percent: z.string().min(1, 'Depreciation % is required!'),
  depreciation_frequency: z.number().min(1, 'Depreciation freq. is required!'),
  init_dep: z.string().min(1, 'initial depreciation is required!'),
  market_value: z.string(),
  user: z.number(),
  type: z.number(),
  tags: z.array(z.string()),
})
export type setPhysicalAssetsSchema = z.infer<typeof setPhysicalAssetsSchema>