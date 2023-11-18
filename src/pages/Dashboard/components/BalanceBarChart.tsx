import React from 'react'
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import colors from 'tailwindcss/colors'
import { random } from 'lodash'
import { useUserPreferences } from '@/hooks/use-user-preferences'

const DUMMY_DATA = [
  {
    name: 'Jan',
    balance: random(500, 2000),
  },
  {
    name: 'Feb',
    balance: random(500, 2000),
  },
  {
    name: 'Mar',
    balance: random(500, 2000),
  },
  {
    name: 'Apr',
    balance: random(500, 2000),
  },
  {
    name: 'May',
    balance: random(500, 2000),
  },
  {
    name: 'June',
    balance: random(500, 2000),
  },
  {
    name: 'July',
    balance: random(500, 2000),
  },
  {
    name: 'Aug',
    balance: random(500, 2000),
  },
  {
    name: 'Sep',
    balance: random(500, 2000),
  },
  {
    name: 'Oct',
    balance: random(500, 2000),
  },
  {
    name: 'Nov',
    balance: random(500, 2000),
  },
  {
    name: 'Dec',
    balance: random(500, 2000),
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
