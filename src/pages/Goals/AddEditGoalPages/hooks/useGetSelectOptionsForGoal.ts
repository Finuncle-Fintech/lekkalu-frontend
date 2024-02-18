import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchGoalProportionalityTypes, fetchKPITypes } from '@/queries/goals'
import { fetchIncomeExpenses } from '@/queries/income-statement'
import { BALANCE_SHEET, GOALS } from '@/utils/query-keys'

const useGetSelectOptionsForGoal = () => {
  const [isFetchingOptions, setIsFetchingOptions] = useState(true)
  const { data: incomeExpenses, isFetched: hasFetchedIncomeExpenses } = useQuery(
    [BALANCE_SHEET.INCOME_EXPENSES],
    fetchIncomeExpenses,
  )
  const { data: goalProportionality, isFetched: hasFetchedGoalProportionality } = useQuery(
    [GOALS.GOAL_PROPORTIONALITY_TYPES],
    fetchGoalProportionalityTypes,
  )
  const { data: getTargetKpi, isFetched: hasFetchedTargetKpi } = useQuery([GOALS.KPI_TYPES], fetchKPITypes)

  useEffect(() => {
    if (hasFetchedIncomeExpenses && hasFetchedGoalProportionality && hasFetchedTargetKpi) {
      setIsFetchingOptions(false)
    } else {
      setIsFetchingOptions(true)
    }
  }, [hasFetchedGoalProportionality, hasFetchedIncomeExpenses, hasFetchedTargetKpi])

  return {
    incomeExpenses,
    goalProportionality,
    getTargetKpi,
    isFetchingOptions,
  }
}

export default useGetSelectOptionsForGoal
