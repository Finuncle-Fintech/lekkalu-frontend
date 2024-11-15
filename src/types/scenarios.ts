import { Goal } from '@/types/goals'

export type Scenario = {
  id: number
  name: string
  imag_password: string
  imag_username: string
  access: string
  financialGoals: Goal[]
}
