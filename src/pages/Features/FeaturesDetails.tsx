import React from 'react'
import { useParams } from 'react-router-dom'
import ExpenseAndBudget from './components/ExpenseAndBudget'
import NotFound from '../NotFound/NotFound'
export default function FeaturesDetails() {
  const { toolName } = useParams()

  let toolDetailComponent
  switch (toolName) {
    case 'expense-budget':
      toolDetailComponent = <ExpenseAndBudget />
      break
    default:
      toolDetailComponent = <NotFound />
      break
  }
  return toolDetailComponent
}
