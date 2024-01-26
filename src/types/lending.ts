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

export type AddAccountSchema = {
  id?: number
  name: string
  partner_email: string
  principal: number | string | null
  user_remark?: string | null
  started: Date
}
