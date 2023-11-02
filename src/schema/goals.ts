import z from 'zod'

// export const addGoalSchema = z.object({
//   goal: z
//     .string({ required_error: 'Goal is required!' })
//     .min(3, 'Please enter at least 3 characters!')
//     .max(255, 'Please enter at least 255 characters!'),
//   target_metric: z.coerce.number({ required_error: 'Target Metric is required!' }),
//   current_metric: z.coerce.number({ required_error: 'Current Metric is required!' }),
//   reachability_in_months: z.coerce.number({ required_error: 'Reachability in Months is required!' }),
//   reachability_in_years: z.coerce.number({ required_error: 'Reachability in Years is required!' }),
//   started: z.date({ required_error: 'Started Date is required!' }),
//   finished: z.date({ required_error: 'Finished Date is required!' }),
//   planned_start: z.date({ required_error: 'Planned Start is required!' }),
//   planned_finish: z.date({ required_error: 'Planned Start is required!' }),
//   balance: z.coerce.number({ required_error: 'Balance is required!' }),
//   prefered_value_of_balance: z.enum(['H', 'L'], { required_error: 'Preferred value of balance is required!' }),
//   comments: z.string({ required_error: 'Comment is required!' }),
//   user: z.number(),
// })
// export type AddGoalSchema = Omit<
//   z.infer<typeof addGoalSchema>,
//   'started' | 'finished' | 'planned_finish' | 'planned_start'
// > & {
//   started: string
//   finished: string
//   plannedFinish: string
//   planned_start: string
//   asset?: number
//   liability?: number
// }

export const addGoalSchema = z.object({
  goal: z
    .string({ required_error: 'Goal is required!' })
    .min(3, 'Please enter at least 3 characters!')
    .max(255, 'Please enter at least 255 characters!'),
  degree: z.string({ required_error: 'Please select the degree!' }),
  actualValue: z.coerce.number({ required_error: 'Please enter the value!' }),
  unit: z.string({ required_error: 'Please select the unit!' }),
  user: z.number(),
  category: z.string({ required_error: 'Please select the category!' }),
  calculationField: z.string({ required_error: 'Please select the calculation field!' }),
})
export type AddGoalSchema = z.infer<typeof addGoalSchema>
