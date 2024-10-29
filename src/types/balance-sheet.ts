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
  type: number
  tags: []
}

export type BankAccount = {
  id: number
  acc_id: string
  name: string
  balance: number
  interest_rate: number
}
export type Equity = {
  id: number
  name: string
  purchase_value: string
  sell_value: string
  purchase_date: string
  sell_date: string
  market_value: string
}
export type Metal = {
  id: number
  name: string
  purchase_value: string
  sell_value: string
  purchase_date: string
  sell_date: string
  market_value: string
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
}

export type LoanTransaction = {
  id: number
  amount: number
  loan: number
  time: string
  type: number
  user_remark: string
}
