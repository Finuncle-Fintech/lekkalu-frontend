import React, { useMemo } from 'react'
import { useQueries } from '@tanstack/react-query'
import { Cell, Legend, Pie, PieChart, PieLabelRenderProps, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts'
import { cn } from '@/utils/utils'
import { LENDING } from '@/utils/query-keys'
import { fetchLendingAccounts, fetchLendingTransaction } from '@/queries/lending'
import { PIE_CHART_COLORS, RADIAN } from '@/utils/constants'
import { useUserPreferences } from '@/hooks/use-user-preferences'
import { formatIndianMoneyNotation } from '@/utils/format-money'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function LentAndBorrowedChart({ className, style }: Props) {
  const [accounts, transactions] = useQueries({
    queries: [
      {
        queryKey: [LENDING.ACCOUNTS],
        queryFn: fetchLendingAccounts,
      },
      {
        queryKey: [LENDING.TRANSACTIONS],
        queryFn: fetchLendingTransaction,
      },
    ],
  })
  const { preferences } = useUserPreferences()

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: PieLabelRenderProps) => {
    const radius = (Number(innerRadius) ?? 0) + (Number(outerRadius ?? 0) - Number(innerRadius ?? 0)) * 0.7

    const x = Number(cx ?? 0) + radius * Math.cos(-midAngle * RADIAN)
    const y = Number(cy ?? 0) + radius * Math.sin(-midAngle * RADIAN)

    if (!percent) {
      return null
    }

    if (percent * 100 > 3) {
      return (
        <text x={x} y={y} fill='white' textAnchor='middle' dominantBaseline='central'>
          {`${(percent * 100).toFixed(1)}%`}
        </text>
      )
    }

    return null
  }

  const CustomTooltip = ({ active, payload }: TooltipProps<number, number | string>) => {
    const { preferences } = useUserPreferences()
    const activePayload = payload?.[0]

    if (active && activePayload) {
      return (
        <div className='bg-white p-2 rounded-md border'>
          <label>
            {`${activePayload.name} : ` + activePayload?.payload.percentage + '%'}
            <br />
            {`${preferences.currencyUnit} ${numDifferentiation(activePayload.value ?? 0)} `}
          </label>
        </div>
      )
    }

    return null
  }

  // Inside your component
  const chartData = useMemo(() => {
    if (!accounts.data) {
      return { lentData: [], borrowedData: [] }
    }

    // Prepare data for the charts
    const lentData = accounts.data
      .filter((account) => parseFloat(String(account?.balance)) > 0)
      .map((ele) => {
        const item = {
          ...ele,
          value: Math.abs(parseFloat(String(ele?.balance))),
        }
        // Assert the type to include the 'percentage' property
        return item as typeof item & { percentage: string }
      })
      .slice()
      .sort((a, b) => b.value - a.value)
    const borrowedData = accounts.data
      .filter((account) => parseFloat(String(account?.balance)) < 0)
      .map((ele) => {
        const item = {
          ...ele,
          value: Math.abs(parseFloat(String(ele?.balance))),
        }
        // Assert the type to include the 'percentage' property
        return item as typeof item & { percentage: string }
      })
      .slice()
      .sort((a, b) => b.value - a.value)

    // Calculate total lent and borrowed amounts
    const totalLent = lentData.reduce((acc, curr) => acc + curr.value, 0) || 0
    const totalBorrowed = borrowedData.reduce((acc, curr) => acc + curr.value, 0) || 0

    // Calculate percentages for lent and borrowed data
    if (totalLent > 0) {
      lentData.forEach((item) => {
        item.percentage = ((item.value / totalLent) * 100).toFixed(1)
      })
    }

    if (totalBorrowed > 0) {
      borrowedData.forEach((item) => {
        item.percentage = ((item.value / totalBorrowed) * 100).toFixed(1)
      })
    }

    const lentTopThree = lentData.slice(0, 3)
    const borrowTopThree = borrowedData.slice(0, 3)

    const lentOthers = lentData.slice(3)
    const borrowedOthers = borrowedData.slice(3)
    // Calculate total lent and borrowed amounts
    const lentOthersSum = lentOthers.reduce((acc, curr) => acc + curr.value, 0)
    const borrowedOthersSum = borrowedOthers.reduce((acc, curr) => acc + curr.value, 0)

    // Add an "Others" item with percentage
    const lentDataProcessed = [
      ...lentTopThree,
      {
        name: 'Others',
        value: lentOthersSum,
        percentage: ((lentOthersSum / totalLent) * 100).toFixed(1),
      },
    ]
    const borrowedDataProcessed = [
      ...borrowTopThree,
      {
        name: 'Others',
        value: borrowedOthersSum,
        percentage: ((borrowedOthersSum / totalBorrowed) * 100).toFixed(1),
      },
    ]

    return {
      lentData: lentData.length > 3 ? lentDataProcessed : lentData,
      borrowedData: borrowedData.length > 3 ? borrowedDataProcessed : borrowedData,
    }
  }, [accounts.data])

  const { lentData, borrowedData } = chartData
  if (accounts.isLoading || transactions.isLoading) {
    return (
      <div className='grid md:grid-cols-2 gap-4'>
        <div className='h-96 w-full bg-gray-200 animate-pulse' />
        <div className='h-96 w-full bg-gray-200 animate-pulse' />
        <div />
      </div>
    )
  }

  return (
    <div className={cn('flex items-center justify-center flex-col md:flex-row gap-4 w-full', className)} style={style}>
      <div className='w-full flex items-center justify-center flex-col'>
        {lentData?.length > 0 && <div className='text-center'>Lent</div>}
        {lentData?.length > 0 ? (
          <ResponsiveContainer width='100%' height={350}>
            <PieChart>
              <defs>
                {lentData?.map((_, index) => (
                  <linearGradient id={`myGradient${index}`} key={`myGradient${index}`}>
                    <stop offset='0%' stopColor={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length].start} />
                    <stop offset='100%' stopColor={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length].end} />
                  </linearGradient>
                ))}
              </defs>
              <Pie
                data={lentData}
                dataKey='value'
                nameKey='name'
                cx='50%'
                cy='50%'
                outerRadius={120}
                label={renderCustomizedLabel}
                labelLine={false}
              >
                {lentData?.map((_, index) => <Cell key={`cell-${index}`} fill={`url(#myGradient${index})`} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                layout='horizontal'
                verticalAlign='bottom'
                payload={lentData?.map((item, index) => {
                  return {
                    id: item.name,
                    type: 'circle',
                    value: `${item.name} ${item.percentage} %`,
                    color: `url(#myGradient${index})`,
                  }
                })}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div>No Lent Data Available</div>
        )}
        <div>
          Total Lent: {formatIndianMoneyNotation(lentData?.reduce((acc, curr) => acc + curr.value, 0) || 0)}{' '}
          {preferences.currencyUnit}
        </div>
      </div>
      <div className='w-full flex items-center justify-center flex-col'>
        {borrowedData?.length > 0 && <div className='text-center'>Borrowed</div>}
        {borrowedData?.length > 0 ? (
          <ResponsiveContainer width='100%' height={350}>
            <PieChart>
              <defs>
                {borrowedData?.map((_, index) => (
                  <linearGradient id={`myGradient${index}`} key={`myGradient${index}`}>
                    <stop offset='0%' stopColor={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length].start} />
                    <stop offset='100%' stopColor={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length].end} />
                  </linearGradient>
                ))}
              </defs>
              <Pie
                data={borrowedData}
                dataKey='value'
                nameKey='name'
                cx='50%'
                cy='50%'
                outerRadius={120}
                label={renderCustomizedLabel}
                labelLine={false}
              >
                {borrowedData?.map((_, index) => <Cell key={`cell-${index}`} fill={`url(#myGradient${index})`} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                layout='horizontal'
                verticalAlign='bottom'
                payload={borrowedData?.map((item, index) => {
                  return {
                    id: item.name,
                    type: 'circle',
                    value: `${item.name} ${item.percentage} %`,
                    color: `url(#myGradient${index})`,
                  }
                })}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div>No Borrowed Data Available</div>
        )}
        <div>
          Total Borrowed: {formatIndianMoneyNotation(borrowedData?.reduce((acc, curr) => acc + curr.value, 0) || 0)}{' '}
          {preferences.currencyUnit}
        </div>
      </div>
    </div>
  )
}

function numDifferentiation(value: number) {
  let valueToReturn: string

  if (value >= 10000000) {
    valueToReturn = (value / 10000000).toFixed(2) + ' Cr'
  } else if (value >= 100000) {
    valueToReturn = (value / 100000).toFixed(2) + ' Lac'
  } else if (value >= 1000) {
    valueToReturn = (value / 1000).toFixed(2) + ' K'
  } else {
    valueToReturn = value.toFixed(2)
  }

  return valueToReturn
}
