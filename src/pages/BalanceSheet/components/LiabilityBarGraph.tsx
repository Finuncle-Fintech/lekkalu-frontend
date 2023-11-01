import React, { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import colors from 'tailwindcss/colors'
import { BALANCE_SHEET } from '@/utils/query-keys'
import { fetchLiabilities } from '@/queries/balance-sheet'

export default function LiabilityBarGraph() {
  const { data, isLoading } = useQuery([BALANCE_SHEET.LIABILITIES], fetchLiabilities)

  const liabilitiesData = useMemo(() => {
    if (!data) {
      return []
    }

    return data.map((liability) => ({
      ...liability,
      balance: parseFloat(liability.balance),
    }))
  }, [data])

  if (isLoading) {
    return <div className='w-full h-96 bg-gray-200 animate-pulse' />
  }

  return (
    <ResponsiveContainer width='100%' className='!h-96'>
      <BarChart
        width={500}
        height={300}
        data={liabilitiesData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='balance' fill={colors.blue['500']} />
      </BarChart>
    </ResponsiveContainer>
  )
}
