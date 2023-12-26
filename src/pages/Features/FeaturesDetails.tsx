import React, { useMemo, Suspense, lazy, useEffect } from 'react'
import { LoaderIcon } from 'lucide-react'
import { useParams } from 'react-router-dom'
import NotFound from '../NotFound/NotFound'

const ExpenseAndBudget = lazy(() => import('./components/ExpenseAndBudget'))
const FinancialGoal = lazy(() => import('./components/FinancialGoal'))
const IncomeAndExpense = lazy(() => import('./components/IncomeAndExpense'))
const BalanceSheetDetails = lazy(() => import('./components/BalanceSheetDetails'))
const Calculators = lazy(() => import('./components/Calculators'))

const FeaturesDetails = () => {
  const { toolName } = useParams()

  const memoizedComponent = useMemo(() => {
    let ToolDetailComponent: any

    switch (toolName) {
      case 'expense-budget':
        ToolDetailComponent = ExpenseAndBudget
        break
      case 'financial-goal':
        ToolDetailComponent = FinancialGoal
        break
      case 'income-expense':
        ToolDetailComponent = IncomeAndExpense
        break
      case 'balance-sheet':
        ToolDetailComponent = BalanceSheetDetails
        break
      case 'calculators':
        ToolDetailComponent = Calculators
        break
      default:
        ToolDetailComponent = NotFound
        break
    }
    return <ToolDetailComponent />
  }, [toolName])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [toolName])

  return (
    <Suspense
      fallback={
        <div className='flex h-screen w-full items-center justify-center gap-2'>
          <LoaderIcon className='w-4 h-4 animate-spin' />
          <div>Loading please wait...</div>
        </div>
      }
    >
      {memoizedComponent}
    </Suspense>
  )
}

export default FeaturesDetails
