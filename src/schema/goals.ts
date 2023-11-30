import z from 'zod'

export const addGoalSchema = z.object({
  name: z.string(),
  target_value: z.number().min(1).max(100),
  target_contribution_source: z.coerce.number(),
  track_kpi: z.enum(['LiabilityPercent']),
})
export type AddGoalSchema = z.infer<typeof addGoalSchema>
