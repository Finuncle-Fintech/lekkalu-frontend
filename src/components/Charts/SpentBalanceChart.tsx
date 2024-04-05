import React, { useMemo } from 'react'
import Chart from 'react-apexcharts'
import colors from 'tailwindcss/colors'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useUserPreferences } from '@/hooks/use-user-preferences'
import { EXPENSES } from '@/utils/query-keys'
import { fetchMonthlyExpenses } from '@/queries/expense'
import { formatIndianMoneyNotation } from '@/utils/format-money'

export const SpentBalanceChart = () => {
  const { data, isLoading } = useQuery([EXPENSES.MONTHLY_EXPENSES], fetchMonthlyExpenses)

  const { preferences } = useUserPreferences()

  const monthlyData = useMemo(() => {
    if (!data) {
      return []
    }

    return data
      .map((monthlyExpense) => ({
        ...monthlyExpense,
        month: dayjs().month(monthlyExpense.month).format('MMMM'),
      }))
      .sort((a, b) => a.year + b.year)
  }, [data])

  if (isLoading) {
    return <div className='w-full animate-pulse bg-gray-300 h-96' />
  }
  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      height: 350,
      type: 'bar',
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      foreColor: '#000',
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: '60%',
      },
    },
    colors: [colors.orange[500]],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: monthlyData.map((item) => item.month.slice(0, 3)),
    },
    yaxis: {
      labels: {
        formatter: (value) => `${preferences.currencyUnit} ${formatIndianMoneyNotation(value, 1)}`,
      },
    },
  }
  const chartSeries: ApexAxisChartSeries | ApexNonAxisChartSeries = [
    {
      name: 'Spent',
      type: 'bar',
      data: monthlyData.map((item) => item.spent),
    },
  ]

  return (
    <div className='border p-4 w-full'>
      <h3 className='text-lg text-center'>Monthly Spend</h3>
      <Chart options={chartOptions} series={chartSeries} type='bar' height={320} />
    </div>
  )
}
