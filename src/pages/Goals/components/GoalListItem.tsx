import React from 'react'
import { Goal } from '@/types/goals'

interface GoalListItemProps {
  goal: Goal
  isChecked: boolean
  onCheckboxChange: () => void
}

export default function GoalListItem({ goal, isChecked, onCheckboxChange }: GoalListItemProps) {
  return (
    <div>
      <input type='checkbox' checked={isChecked} onChange={onCheckboxChange} />
      <span>{goal.name}</span>
    </div>
  )
}
