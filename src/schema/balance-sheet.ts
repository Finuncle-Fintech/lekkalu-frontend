import { z } from 'zod'

export const addPhysicalAssetSchema = z.object({
  name: z.string().min(1, 'Asset name is required!'),
  purchase_value: z.number().min(1, 'Purchase value is required!'),
  purchase_date: z.date(),
  sell_value: z.number().optional(),
  sell_date: z.date().optional(),
  depreciation_percent: z.number().min(1, 'Depreciation % is required!'),
  depreciation_frequency: z.number(),
  init_dep: z.number({ required_error: 'Initial depreciation is required!' }),
  market_value: z.number({ required_error: 'Market value is required!' }),
  user: z.number(),
  type: z.number(),
  tags: z.array(z.string()),
})

export type AddPhysicalAssetSchema = Omit<z.infer<typeof addPhysicalAssetSchema>, 'purchase_date'> & {
  purchase_date: string
}
