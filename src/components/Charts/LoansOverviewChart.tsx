import React, { useState } from 'react'
import { cn } from '@/utils/utils'
import { DURATIONS, Durations } from '@/utils/loans-overview'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function LoansOverviewChart({ className, style }: Props) {
  const [selectedDuration, setSelectedDuration] = useState<Durations>('NEXT_THREE_MONTHS')
  // const months = DURATIONS.find((duration) => duration.id === selectedDuration)?.months

  // const { data, isLoading } = useQuery([BALANCE_SHEET.LIABILITIES], fetchLiabilities)
  // const { data: loansOverview } = useQuery([BALANCE_SHEET.LOANS_OVERVIEW, data, months], () =>
  //   getLoanOverviewData(data ?? [], months ?? []),
  // )

  // if (isLoading) {
  //   return <div className='w-full h-96 animate-pulse bg-gray-200 rounded-md' />
  // }

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

      {/* TODO: in future if needed then add apex chart here */}
    </div>
  )
}
