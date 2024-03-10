/* eslint-disable no-constant-condition */
import React from 'react'
import { Link } from 'react-router-dom'
import { PlusIcon } from 'lucide-react'
import { range } from 'lodash'
import Page from '@/components/Page/Page'
import { buttonVariants } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import Scenario from './components/Scenario'

export default function Scenarios() {
  const IS_LOADING = false
  return (
    <Page>
      <div className='flex justify-end'>
        <Link to='/scenarios/new' className={buttonVariants({ variant: 'default' })}>
          <PlusIcon className='w-4 h-4 mr-2' />
          <span>Add Scenario</span>
        </Link>
      </div>
      <div>
        {IS_LOADING ? (
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full'>
            {range(8).map((i) => (
              <Skeleton key={i} className='h-64 w-full' />
            ))}
          </div>
        ) : (
          <div>
            <Scenario />
          </div>
        )}
      </div>
    </Page>
  )
}
