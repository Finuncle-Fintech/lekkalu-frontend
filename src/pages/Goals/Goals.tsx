import React from 'react'
import colors from 'tailwindcss/colors'
import { Link } from 'react-router-dom'
import { PlusIcon } from 'lucide-react'
import dayjs from 'dayjs'
import Page from '@/components/Page/Page'
import GoalsTable from './components/GoalsTable'
import ProgressChart from '@/components/ProgressChart/ProgressChart'
import { buttonVariants } from '@/components/ui/button'
import Goal from './components/Goal'

export default function Goals() {
  return (
    <Page className='space-y-4'>
      <div className='flex justify-end'>
        <Link to='/goals/new' className={buttonVariants({ variant: 'default' })}>
          <PlusIcon className='w-4 h-4 mr-2' />
          <span>subtract Goal</span>
        </Link>
      </div>

      <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
        <ProgressChart title='On Track' color={colors.green['500']} value={40} />
        <ProgressChart title='Off Track' color={colors.red['500']} value={20} />
        <ProgressChart title='Completed' color={colors.indigo['500']} value={10} />
      </div>

      <div className='text-2xl font-bold truncate block py-4'>Your ongoing financial goals</div>

      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        <Goal
          goalTitle='Testing Goal 1'
          category='Assets'
          progressPercentage={10}
          createdAt={dayjs().toISOString()}
          color={colors.violet['500']}
        />
        <Goal
          goalTitle='Testing Goal 1'
          category='Liabilities'
          progressPercentage={15}
          createdAt={dayjs().subtract(1, 'minute').toISOString()}
          color={colors.yellow['500']}
        />
        <Goal
          goalTitle='Testing Goal 1'
          category='Income Statement'
          progressPercentage={70}
          createdAt={dayjs().subtract(10, 'minute').toISOString()}
          color={colors.blue['500']}
        />
        <Goal
          goalTitle='Testing Goal 1'
          category='Balance Sheet'
          progressPercentage={90}
          createdAt={dayjs().subtract(1, 'month').toISOString()}
          color={colors.green['500']}
        />
        <Goal
          goalTitle='Testing Goal 1'
          category='Assets'
          progressPercentage={30}
          createdAt={dayjs().subtract(1, 'year').toISOString()}
          color={colors.indigo['500']}
        />
        <Goal
          goalTitle='Testing Goal 1'
          category='Liabilities'
          progressPercentage={50}
          createdAt={dayjs().subtract(4, 'months').toISOString()}
          color={colors.red['500']}
        />
        <Goal
          goalTitle='Testing Goal 1'
          category='Assets'
          progressPercentage={40}
          createdAt={dayjs().subtract(40, 'minute').toISOString()}
          color={colors.emerald['500']}
        />
      </div>

      <GoalsTable />
    </Page>
  )
}
