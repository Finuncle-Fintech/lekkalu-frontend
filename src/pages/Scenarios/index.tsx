import React from 'react'
import { Link } from 'react-router-dom'
import { PlusIcon } from 'lucide-react'
import { range } from 'lodash'
import Page from '@/components/Page/Page'
import { buttonVariants } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { scenarios } from '@/constants/comparisons'
import EachScenario from './components/EachScenario'

const ScenarioPage = () => {
  const IS_LOADING = false
  return (
    <Page className='space-y-5'>
      <div className='flex justify-end'>
        <Link to='/scenarios/new' className={buttonVariants({ variant: 'default' })}>
          <PlusIcon className='w-4 h-4 mr-2' />
          <span>Add Scenarios</span>
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
            {scenarios?.map(({ id, userName, name, password, created_at }) => {
              return (
                <EachScenario
                  id={id}
                  name={name}
                  userName={userName}
                  key={id}
                  password={password}
                  created_at={created_at}
                />
              )
            })}
          </div>
        )}
      </div>
    </Page>
  )
}

export default ScenarioPage
