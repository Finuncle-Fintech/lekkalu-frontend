import z from 'zod'

export const addExpenseSchema = z.object({
  amount: z.string().regex(/^(0|[1-9]\d*)(\.\d{0,2})?$/, 'Enter a valid amount!'),
  tags: z.coerce.number(),
  time: z.date(),
})
export type AddExpenseSchema = z.infer<typeof addExpenseSchema>
