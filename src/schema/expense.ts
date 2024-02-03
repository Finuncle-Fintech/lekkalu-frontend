import dayjs from 'dayjs'
import z from 'zod'

export const tagSchema = z.object({
  id: z.number().optional(),
  label: z.string(),
  value: z.string(),
})

export const addExpenseSchema = z.object({
  amount: z.coerce.number(),
  tags: z.array(tagSchema).refine((tags) => tags.length > 0, {
    message: 'At least one tag is required',
    path: ['tags'],
  }),
  time: z.date(),
})
export type AddExpenseSchema = z.infer<typeof addExpenseSchema>

export const expenseFiltersSchema = z
  .object({
    from: z.date(),
    to: z.date(),
  })
  .refine((data) => dayjs(data.to).isAfter(data.from), {
    message: 'To date should be after from date',
    path: ['to'],
  })
export type ExpenseFiltersSchema = z.infer<typeof expenseFiltersSchema>
