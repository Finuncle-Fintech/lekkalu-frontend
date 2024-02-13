import z from 'zod'

export const addGoalSchema = z.object({
  name: z.string(),
  target_value: z.number().min(1).max(100),
  target_contribution_source: z.coerce.number(),
  track_kpi: z.string(),
  target_date: z.string(),
  goal_proportionality: z.string(),
})

export type AddGoalSchema = z.infer<typeof addGoalSchema>
