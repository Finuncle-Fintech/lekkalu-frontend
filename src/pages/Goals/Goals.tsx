import React from 'react'
import colors from 'tailwindcss/colors'
import Page from '@/components/Page/Page'
import GoalsTable from './components/GoalsTable'
import ProgressChart from '@/components/ProgressChart/ProgressChart'

export default function Goals() {
  return (
    <Page className='space-y-4'>
      <div className='text-2xl font-bold'>Your financial goals</div>

      <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
        <ProgressChart title='On Track' color={colors.green['500']} value={40} />
        <ProgressChart title='Off Track' color={colors.red['500']} value={20} />
        <ProgressChart title='Completed' color={colors.indigo['500']} value={10} />
      </div>

      <GoalsTable />
    </Page>
  )
}
