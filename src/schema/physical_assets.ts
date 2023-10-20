import { z } from 'zod'
export const addPhysicalAssetSchema = z.object({
  name: z.string().min(1, 'Asset name is required!'),
  purchase_value: z.string().min(1, 'Purchase value is required!').refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: 'Expected number, received a string'
  }),
  sell_value: z.string().optional(), // .refine((val) => !Number.isNaN(parseInt(val, 10)), {
  //   message: 'Expected number, received a string'
  // }).optional(),
  purchase_date: z.coerce.date(),
  sell_date: z.date().optional(),
  depreciation_percent: z.string().min(1, 'Depreciation % is required!').refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: 'Expected number, received a string'
  }),
  depreciation_frequency: z.number(),
  init_dep: z.string().min(1, 'initial depreciation is required!').regex(/^(0|[1-9]\d*)(\.\d{0,2})?$/, 'Enter a valid depreciation!'), // .refine((val) => !Number.isNaN(parseInt(val, 10)), {
  //   message: 'Expected number, received a string'
  // }),
  market_value: z.number(),
  user: z.number(),
  type: z.number(),
  tags: z.array(z.string()),
})
export type AddPhysicalAssetSchema = z.infer<typeof addPhysicalAssetSchema>
