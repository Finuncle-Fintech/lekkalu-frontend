import z from 'zod'

export const addScenarioSchemas = z.object({
  name: z.string(),
  access: z.enum(['Private', 'Public']).optional(),
})

export type AddScenarioSchemas = z.infer<typeof addScenarioSchemas>
