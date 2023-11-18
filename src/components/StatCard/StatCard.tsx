import React, { cloneElement } from 'react'
import { lighten } from 'polished'
import { cn } from '@/utils/utils'

type StatCardProps = {
  className?: string
  style?: React.CSSProperties
  icon: React.ReactElement<{ className?: string; style?: React.CSSProperties }>
  title: string
  value: string | number
  color: string
  extraValue?: string
}

export default function StatCard({ className, style, icon, title, color, value, extraValue }: StatCardProps) {
  const lightenColor = lighten(0.5, color)
  const darkerColor = lighten(0.4, color)

  return (
    <div className={cn('rounded-2xl space-y-4 p-6', className)} style={{ ...style, backgroundColor: lightenColor }}>
      <div className='flex items-center justify-between'>
        <div className='flex items-center justify-center p-4 rounded-full' style={{ backgroundColor: darkerColor }}>
          {cloneElement(icon, { className: 'w-8 h-8', style: { color } })}
        </div>

        <h2 className='text-xl font-medium' style={{ color }}>
          {extraValue}
        </h2>
      </div>

      <div className='space-y-2'>
        <h1 className='text-2xl font-bold'>{value}</h1>
        <p className='text-lg text-muted-foreground'>{title}</p>
      </div>
    </div>
  )
}
