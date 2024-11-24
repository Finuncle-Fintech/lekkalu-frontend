import { Scenario } from '@/types/scenarios'

export type Goal = {
  id: number
  name: string
  target_value: number
  current_value: number
  reachableByDays: number
  goal_proportionality: string
  track_kpi: string
  createdAt: string
  updated_at: string
  target_contribution_source: number[]
  target_date: string
  met: boolean
  custom_kpi: number
  scenarios: Scenario[]
}
export type CustomKPI = {
  id: number
  name: string
  description: string
  latex: string
}

export type Timeline = {
  kpi_value: number
  time: string
}

export type GoalProportionalityType = {
  id: number
  label: string
  value: string
}

export type KpiType = {
  id: number
  label: string
  value: string
}
