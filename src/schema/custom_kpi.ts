import z from 'zod'

export const addCustomKPISchema = z.object({
  name: z.string(),
  description: z.string(),
  latex: z.string(),
})

export type AddCustomKPISchema = z.infer<typeof addCustomKPISchema>
