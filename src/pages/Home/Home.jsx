import React, { useContext, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'

import { Context } from '@/provider/Provider'
import { WeeklyChart } from '../../components/Charts/WeeklyChart'
import { SpentBalanceChart } from '../../components/Charts/SpentBalanceChart'
import { CumSumChart } from '../../components/Charts/CumSumChart'
import { fetchWeeklyExpenses, fetchMonthlyExpenses } from '@/queries/expense'
import { EXPENSES } from '@/utils/query-keys'
import DownloadAllData from '../../components/Download/DownloadAllData'
import AssetsdepreciationChart from '../../components/Charts/AssetsDepreciationsChart'

const Home = () => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const { depreciation } = useContext(Context)

  const { data: weekly_expenses, isLoading: isLoadingWeeklyExpense } = useQuery(
    [EXPENSES.WEEKLY_EXPENSES],
    fetchWeeklyExpenses,
  )
  const { data: monthly_expenses, isLoading: isLoadingMonthlyExpense } = useQuery(
    [EXPENSES.MONTHLY_EXPENSES],
    fetchMonthlyExpenses,
  )

  const final_weekly_expense = useMemo(() => {
    let finalDataWeekly = []
    if (isLoadingWeeklyExpense) {
      return finalDataWeekly
    } else {
      let totlamount = 0
      weekly_expenses.forEach((da, index) => {
        totlamount += weekly_expenses[index]?.total_amount
        if (finalDataWeekly.length >= 4) {
          finalDataWeekly = [
            ...finalDataWeekly,
            {
              time: da.week.toString() + '_' + da.year.toString(),
              amount: da?.total_amount,
              roll_avg: parseFloat((totlamount / 5).toFixed(2)),
            },
          ]
          totlamount = totlamount - weekly_expenses[index - 4].total_amount
        } else {
          finalDataWeekly = [
            ...finalDataWeekly,
            {
              time: da.week.toString() + ' ' + da.year.toString(),
              amount: da?.total_amount,
            },
          ]
        }
      })
      return finalDataWeekly
    }
  }, [isLoadingWeeklyExpense])

  const final_monthly_expense = useMemo(() => {
    let finalMonthlyExp = []
    if (isLoadingWeeklyExpense) {
      return finalMonthlyExp
    } else {
      monthly_expenses.forEach((da) => {
        finalMonthlyExp = [
          ...finalMonthlyExp,
          {
            name: monthNames[da.month - 1],
            Spent: da.spent,
            Balance: da.balance,
            CumSum: da.cum_sum,
          },
        ]
      })
      return finalMonthlyExp
    }
  }, [isLoadingMonthlyExpense])

  return (
    <div
      className='mt-3'
      style={{
        marginTop: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <WeeklyChart final_weekly_expense={final_weekly_expense} />
      <SpentBalanceChart final_monthly_expense={final_monthly_expense} />
      <CumSumChart final_monthly_expense={final_monthly_expense} />
      <AssetsdepreciationChart data={depreciation} />
      <DownloadAllData />
    </div>
  )
}

export default Home
