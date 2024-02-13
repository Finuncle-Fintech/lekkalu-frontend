import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { fetchGoalProportionalityTypes, fetchKPITypes } from '@/queries/goals'
import { fetchIncomeExpenses } from '@/queries/income-statement'
import { BALANCE_SHEET, GOALS } from '@/utils/query-keys'
import { toast } from '@/components/ui/use-toast'

const useGetSelectOptionsForGoal = () => {
  const navigate = useNavigate()
  const { data: incomeExpenses } = useQuery([BALANCE_SHEET.INCOME_EXPENSES], fetchIncomeExpenses, {
    onSuccess: (data) => {
      if (!data.length) {
        toast({ title: 'Please add income expense before adding goals.' })
        navigate('/income-statement')
      }
    },
  })
  const { data: goalPropotionality } = useQuery([GOALS.GOAL_PROPORATIONALITY_TYPES], fetchGoalProportionalityTypes)
  const { data: getTargetKpi } = useQuery([GOALS.KPI_TYPES], fetchKPITypes)
  return {
    incomeExpenses,
    goalPropotionality,
    getTargetKpi,
  }
}

export default useGetSelectOptionsForGoal
