import { z } from 'zod'

export const setBudgetSchema = z.object({
  limit: z.coerce.number().min(1, 'Limit is required!'),
  month: z.string(),
})
export type SetBudgetSchema = z.infer<typeof setBudgetSchema>

export const updateBudgetSchema = setBudgetSchema.partial()
export type UpdateBudgetSchema = z.infer<typeof updateBudgetSchema>

export const setBudgetSchemaDTO = z.object({
  limit: z.coerce.number().min(1, 'Limit is required!'),
  month: z.date(),
})
export type SetBudgetSchemaDTO = z.infer<typeof setBudgetSchemaDTO>
