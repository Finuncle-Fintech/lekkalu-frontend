export type Goal = {
  id: number
  name: string
  target_value: number
  current_value: number
  reachable_by_days: number
  goal_proportionality: string
  track_kpi: 'LiabilityPercent'
  created_at: string
  updated_at: string
  target_contribution_source: number
}
