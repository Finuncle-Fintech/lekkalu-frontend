import { z } from 'zod'
import { AssetsType } from '@/types/balance-sheet'

export const addPhysicalAssetSchema = z.object({
  name: z.string().min(1, 'Asset name is required!'),
  purchase_value: z.coerce.number().min(1, 'Purchase value is required!'),
  purchase_date: z.date(),
  sell_value: z.coerce.number().optional(),
  sell_date: z.date().optional(),
  depreciation_percent: z.coerce.number().min(1, 'Depreciation % is required!'),
  init_dep: z.coerce.number({ required_error: 'Initial depreciation is required!' }),
  market_value: z.coerce.number().optional(),
  type: z.coerce.number(),
  tags: z.array(z.string()),
  months: z.coerce.number(),
  years: z.coerce.number(),
  user: z.number(),
})
export const addPhysicalAssetTypeSchema = z.object({
  type: z.string(),
})

export type AddPhysicalAssetTypeSchema = {
  type: AssetsType
}

export type AddPhysicalAssetSchema = {
  name: string
  purchase_value: number
  purchase_date: string
  depreciation_percent_per_year: number
  type: number
  depreciation_frequency: number
}
// export type AddPhysicalAssetSchema = Omit<z.infer<typeof addPhysicalAssetSchema>, 'purchase_date' | 'sell_date'> & {
//   purchase_date: string
//   sell_date: string
//   depreciation_frequency: number
// }

export const addPhysicalAssetSchemaForScenario = z.object({
  name: z.string().min(1, 'Asset name is required!'),
  purchase_value: z.coerce.number().min(1, 'Purchase value is required!'),
  purchase_date: z.date(),
  sell_value: z.coerce.number().optional(),
  sell_date: z.date().optional(),
  depreciation_percent: z.coerce.number().min(1, 'Depreciation % is required!'),
  init_dep: z.coerce.number({ required_error: 'Initial depreciation is required!' }),
  market_value: z.coerce.number().optional(),
  type: z.coerce.number(),
  tags: z.array(z.string()),
  // months: z.coerce.number(),
  // years: z.coerce.number(),
  user: z.number(),
})

export type AddPhysicalAssetSchemaForScenario = Omit<
  z.infer<typeof addPhysicalAssetSchemaForScenario>,
  'purchase_date' | 'sell_date'
> & {
  purchase_date: string
  sell_date: string
}

export const addLiabilitySchema = z.object({
  name: z.string({ required_error: 'Name is required!' }),
  balance: z.coerce.number({ required_error: 'Balance is required!' }),
  principal: z.coerce.number({ required_error: 'Principal is required!' }),
  disbursement_date: z.date({ required_error: 'Disbursement Date is required!' }),
  emi_day: z.coerce.number({ required_error: 'Emi day is required!' }).min(1).max(30),
  emi: z.coerce.number().optional(),
  tenure: z.coerce.number({ required_error: 'Tenure is required!' }),
  interest_rate: z.coerce.number({ required_error: 'Interest Rage is required!' }),
  closure_charges: z.coerce.number({ required_error: 'Closure Charges is required!' }),
})
export type AddLiabilitySchema = Omit<z.infer<typeof addLiabilitySchema>, 'disbursement_date'> & {
  disbursement_date: string
}

// ** Assets Schemas & Types

// ** Cash
export const addPhysicalAssetTypeCashSchema = z.object({
  balance: z.number({ required_error: 'Amount is required!' }),
  name: z.string({ required_error: 'Name is required!' }),
})

export type AddPhysicalAssetTypeCashSchema = {
  name: string
  balance: number
  id?: number
}

// ** Account
export const addPhysicalAssetTypeAccountSchema = z.object({
  amount: z.number({ required_error: 'Amount is required!' }),
})

export type AddPhysicalAssetTypeAccountSchema = {
  account_name: string
  amount: number
  rate_return: number
}

// ** Mutual Fund
export const addPhysicalAssetTypeMutualFundSchema = z.object({
  invested_amount: z.number({ required_error: 'Invested amount is required!' }),
  expected_return: z.number({ required_error: 'Expected return is required!' }),
  purchase_date: z.date({ required_error: 'Date is required!' }),
})

export type AddPhysicalAssetTypeMutualFundSchema = {
  name: string
  invested_amount: number
  expected_return: number
  purchase_date: Date
}

// ** Gold
export const addPhysicalAssetTypeGoldSchema = z.object({
  weight: z.number({ required_error: 'Weight is required!' }),
})

export type AddPhysicalAssetTypeGoldSchema = {
  weight: number
}

// ** Real Estate
export const addPhysicalAssetTypeRealEstateSchema = z.object({
  area: z.number({ required_error: 'Area is required!' }),
})

export type AddPhysicalAssetTypeRealEstateSchema = {
  pincode: number
  area: number
  land_name: string
}

// ** Physical
export const addPhysicalAssetTypePhysicalSchema = z.object({
  name: z.string({ required_error: 'Name is required!' }),
  purchase_value: z.number({ required_error: 'Purchase value is required!' }),
  purchase_date: z.date({ required_error: 'Date is required!' }),
  percentage_value: z.number({ required_error: 'Percentage is required!' }),
  type: z.string({ required_error: 'Type is required!' }),
})

export type AddPhysicalAssetType = {
  name: string
  purchase_value: number
  purchase_date: Date
  percentage_value: number
  type: 'depreciation' | 'apprecitaion'
  months?: number
  years?: number
}

// export type AddPhysicalAssetTypePhysicalSchema = {
//   name: string
//   purchase_value: number
//   purchase_date: Date
//   percentage_value: number
//   type: 'depreciation' | 'apprecitaion'
//   months?: number
//   years?: number
// }
