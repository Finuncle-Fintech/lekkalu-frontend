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

export const addLiabilitySchema = z.object({
  name: z.string({ required_error: 'Name is required!' }),
  balance: z.number({ required_error: 'Balance is required!' }),
  principal: z.number({ required_error: 'Principal is required!' }),
  disbursement_date: z.date({ required_error: 'Disbursement Date is required!' }),
  emi_day: z.number({ required_error: 'Emi day is required!' }).min(1).max(30),
  emi: z.number().optional(),
  tenure: z.number({ required_error: 'Tenure is required!' }),
  interest_rate: z.number({ required_error: 'Interest Rage is required!' }),
  closure_charges: z.number({ required_error: 'Closure Charges is required!' }),
})
export type AddLiabilitySchema = Omit<z.infer<typeof addLiabilitySchema>, 'disbursement_date'> & {
  disbursement_date: string
}
