import z from 'zod'

export const addGoalSchema = z.object({
  name: z.string(),
  target_value: z.number().min(1).max(100),
  target_contribution_source: z.coerce.number(),
  track_kpi: z.string(),
  target_date: z.date().transform((value) => value.toISOString().substring(0, 10)),
  goal_proportionality: z.string(),
})

export const editGoalSchema = z.object({
  name: z.string(),
  target_value: z.number().min(1).max(100),
  target_contribution_source: z.coerce.number(),
  track_kpi: z.string(),
  target_date: z.string(),
  goal_proportionality: z.string(),
})

export type EditGoalSchema = z.infer<typeof editGoalSchema>
export type AddGoalSchema = z.infer<typeof addGoalSchema>
