/* eslint-disable no-constant-condition */
import React from 'react'
import { Link } from 'react-router-dom'
import { PlusIcon } from 'lucide-react'
import { range } from 'lodash'
import Page from '@/components/Page/Page'
import { buttonVariants } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import Comparison from './components/EachComparison'
import { comparisons } from '@/constants/comparisons'

export default function Scenarios() {
  const IS_LOADING = false
  return (
    <Page className='space-y-4'>
      <div className='flex justify-end'>
        <Link to='/comparisons/new' className={buttonVariants({ variant: 'default' })}>
          <PlusIcon className='w-4 h-4 mr-2' />
          <span>Add Comparison</span>
        </Link>
      </div>
      <div>
        {IS_LOADING ? (
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full'>
            {range(4).map((i) => (
              <Skeleton key={i} className='h-64 w-full' />
            ))}
          </div>
        ) : (
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-10'>
            {comparisons?.map((each) => (
              <Comparison
                key={each?.name}
                id={each?.uid}
                name={each?.name}
                access={each?.access}
                created_at={each?.created_at}
                scenarios={each?.scenarios.length}
              />
            ))}
          </div>
        )}
      </div>
    </Page>
  )
}
