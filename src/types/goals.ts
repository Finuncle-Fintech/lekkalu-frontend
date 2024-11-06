export type Goal = {
  id: number
  name: string
  targetValue: number
  currentValue: number
  reachableByDays: number
  goalProportionality: string
  trackKpi: string
  createdAt: string
  updatedAt: string
  targetContributionSource: number
  targetDate: string
  met: boolean
  customKpi: number
}

export type GoalsResponseType = {
  financialGoals: Goal[]
}

export type GoalResponseType = {
  financialGoals: Goal
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

export type GoalStatus = {
  total: number
  onTrack: number
  offTrack: number
  completed: number
}
