export type Accounts = {
  id: number
  name: string
  partner_email: string
  principal: number | string | null
  user_remark: string | null
  started: Date
  balance: number
  user: number
}

export type Transaction = {
  id: number
  amount: string
  payment_method: string | null
  time: Date
  reference_no: string | undefined
  remark: string | null
  user_remark: string | undefined
  note: string | undefined
  user: number
  lending_account: number
}

export type AddAccountSchema = {
  id?: number
  name: string
  partner_email: string
  principal: number | string | null
  user_remark?: string | null
  started: Date
}
export type AddTransactionSchema = {
  id?: number
  lending_account: string | number
  time: Date
  amount: number | string | null
  note?: string
  payment_method?: string
  reference_no?: string
}
