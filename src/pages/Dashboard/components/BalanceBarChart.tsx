import React from 'react'
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import colors from 'tailwindcss/colors'
import { useUserPreferences } from '@/hooks/use-user-preferences'

const DUMMY_DATA = [
  {
    name: 'Jan',
    balance: Math.floor(Math.random() * 1000),
  },
  {
    name: 'Feb',
    balance: Math.floor(Math.random() * 1000),
  },
  {
    name: 'Mar',
    balance: Math.floor(Math.random() * 1000),
  },
  {
    name: 'Apr',
    balance: Math.floor(Math.random() * 1000),
  },
  {
    name: 'May',
    balance: Math.floor(Math.random() * 1000),
  },
  {
    name: 'June',
    balance: Math.floor(Math.random() * 1000),
  },
  {
    name: 'July',
    balance: Math.floor(Math.random() * 1000),
  },
  {
    name: 'Aug',
    balance: Math.floor(Math.random() * 1000),
  },
  {
    name: 'Sep',
    balance: Math.floor(Math.random() * 1000),
  },
  {
    name: 'Oct',
    balance: Math.floor(Math.random() * 1000),
  },
  {
    name: 'Nov',
    balance: Math.floor(Math.random() * 1000),
  },
  {
    name: 'Dec',
    balance: Math.floor(Math.random() * 1000),
  },
]

export default function BalanceBarChart() {
  const { preferences } = useUserPreferences()

  return (
    <div className='h-72 p-4'>
      <h1 className='text-lg font-bold'>Balance</h1>
      <p className='text-muted-foreground mb-4'>Last 12 months</p>

      <ResponsiveContainer width='100%' height='75%'>
        <BarChart data={DUMMY_DATA}>
          <Bar dataKey='balance' fill={colors.indigo['500']} background>
            {DUMMY_DATA.map((_, index) => (
              <Cell key={`cell-${index}`} radius={10} />
            ))}
          </Bar>
          <XAxis dataKey='name' tickLine={false} axisLine={false} />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickFormatter={(tick) => {
              return `${preferences.currencyUnit} ${tick}`
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
