import z from 'zod'

export const addComparisonSchema = z.object({
  name: z.string(),
  access: z.enum(['Private', 'Public']).optional(),
  scenarios: z.array(z.number()).optional(),
})

export type AddComaprisonSchema = z.infer<typeof addComparisonSchema>
