import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import ExpenseAndBudget from './components/ExpenseAndBudget'
import NotFound from '../NotFound/NotFound'
import FinancialGoal from './components/FinancialGoal'
import IncomeAndExpense from './components/IncomeAndExpense'
import BalanceSheetDetails from './components/BalanceSheetDetails'
import Calculators from './components/Calculators'
export default function FeaturesDetails() {
  const { toolName } = useParams()

  let toolDetailComponent
  switch (toolName) {
    case 'expense-budget':
      toolDetailComponent = <ExpenseAndBudget />
      break
    case 'financial-goal':
      toolDetailComponent = <FinancialGoal />
      break
    case 'income-expense':
      toolDetailComponent = <IncomeAndExpense />
      break
    case 'balance-sheet':
      toolDetailComponent = <BalanceSheetDetails />
      break
    case 'calculators':
      toolDetailComponent = <Calculators />
      break
    default:
      toolDetailComponent = <NotFound />
      break
  }
  useEffect(() => {
    AOS.init()
  }, [])
  return toolDetailComponent
}
