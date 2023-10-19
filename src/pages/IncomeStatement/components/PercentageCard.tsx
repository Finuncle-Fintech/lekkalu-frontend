import { PercentIcon } from 'lucide-react'
import React from 'react'
import { cn } from '@/utils/utils'

type Props = {
  className?: string
  style?: React.CSSProperties
  value: number | string
  title: string
}

export default function PercentageCard({ className, style, value, title }: Props) {
  return (
    <div className={cn('flex items-center gap-4 border rounded p-4', className)} style={style}>
      <div className='rounded-full p-3 bg-blue-500/10'>
        <PercentIcon className='w-6 h-6 text-blue-500' />
      </div>
      <div>
        <div className='text-xl font-medium'>{value} %</div>
        <div className='text-muted text-lg'>{title}</div>
      </div>
    </div>
  )
}
