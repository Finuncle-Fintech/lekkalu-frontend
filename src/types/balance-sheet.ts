export type PhysicalAsset = {
  id: number
  name: string
  purchase_value: string
  sell_value: string
  purchase_date: string
  sell_date: string
  depreciation_percent: string
  depreciation_frequency: number
  depreciation_percent_per_year: string
  market_value: string
  user: number
  type: number
  tags: []
}

export type Metal = {
  id: number
  name: string
  purchase_value: string
  sell_value: string
  purchase_date: string
  sell_date: string
  market_value: string
  user: number
  type: string
}
export type Liability = {
  id: number
  balance: string
  closure_charges: string
  disbursement_date: string
  emi: string
  emi_day: string
  interest_rate: string
  name: string
  principal: string
  tenure: number
  user: number
}

export type LoanTransaction = {
  id: number
  amount: number
  loan: number
  time: string
  type: number
  user: number
  user_remark: string
}
