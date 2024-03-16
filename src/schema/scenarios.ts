import z from 'zod'

export const addScenarioSchemas = z.object({
  name: z.string(),
  assets: z.string(),
  liabilities: z.string(),
  income: z.string(),
})

export type AddScenarioSchemas = z.infer<typeof addScenarioSchemas>
