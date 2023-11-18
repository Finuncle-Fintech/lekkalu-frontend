import React from 'react'
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import colors from 'tailwindcss/colors'
import { random } from 'lodash'
import { useUserPreferences } from '@/hooks/use-user-preferences'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

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
    <Card className='h-96 p-4 shadow-sm'>
      <CardHeader>
        <CardTitle>Balance</CardTitle>
        <CardDescription>Last 12 months</CardDescription>
      </CardHeader>

      <CardContent className='w-full h-full'>
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
      </CardContent>
    </Card>
  )
}
