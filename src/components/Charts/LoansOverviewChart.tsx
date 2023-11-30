import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import colors from 'tailwindcss/colors'
import { cn } from '@/utils/utils'
import { BALANCE_SHEET } from '@/utils/query-keys'
import { fetchLiabilities } from '@/queries/balance-sheet'
import { DURATIONS, Durations, getLoanOverviewData } from '@/utils/loans-overview'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function LoansOverviewChart({ className, style }: Props) {
  const [selectedDuration, setSelectedDuration] = useState<Durations>('NEXT_THREE_MONTHS')
  const months = DURATIONS.find((duration) => duration.id === selectedDuration)?.months

  const { data, isLoading } = useQuery([BALANCE_SHEET.LIABILITIES], fetchLiabilities)
  const { data: loansOverview } = useQuery([BALANCE_SHEET.LOANS_OVERVIEW, data, months], () =>
    getLoanOverviewData(data ?? [], months ?? []),
  )

  if (isLoading) {
    return <div className='w-full h-96 animate-pulse bg-gray-200 rounded-md' />
  }

  return (
    <div className={cn('w-full border rounded-md p-4', className)} style={style}>
      <div className='flex justify-between'>
        <div className='text-lg font-medium'>Loans Overview</div>
        <div>
          <Select
            value={selectedDuration}
            onValueChange={(value) => {
              setSelectedDuration(value as Durations)
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select Duration' />
            </SelectTrigger>

            <SelectContent>
              {DURATIONS.map((duration) => (
                <SelectItem key={duration.id} value={duration.id}>
                  {duration.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <ResponsiveContainer width='100%' className='!h-96'>
        <BarChart
          width={500}
          height={300}
          data={loansOverview}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='month' tickCount={months?.length} />
          <YAxis type='number' domain={[0, 100]} tickCount={100} />
          <Tooltip />
          <Legend />
          <Bar dataKey='outstandingPercentage' fill={colors.blue['500']} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
