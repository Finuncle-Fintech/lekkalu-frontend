import React from 'react'
import { Link } from 'react-router-dom'
import { PlusIcon } from 'lucide-react'
import { range } from 'lodash'
import { useQuery } from '@tanstack/react-query'
import Page from '@/components/Page/Page'
import { buttonVariants } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import EachScenario from './components/EachScenario'
import { SCENARIOS } from '@/utils/query-keys'
import { fetchScenarios } from '@/queries/scenarios'
import DumbbellChart, { DumbbellChartProps } from '@/pages/Scenarios/components/DumbbellChart'

const ScenarioPage = () => {
  const { data: scenarios, isLoading } = useQuery({ queryKey: [SCENARIOS.SCENARIOS], queryFn: fetchScenarios })
  const goals_data: DumbbellChartProps = {
    Goals: [
      {
        name: 'Goal-1',
        Scenarios: [
          {
            name: 'Scenario-1',
            start_date: new Date('2023-01-01'),
            finish_date: new Date('2023-03-01'),
          },
          {
            name: 'Scenario-2',
            start_date: new Date('2023-02-01'),
            finish_date: new Date('2023-04-01'),
          },
          {
            name: 'Scnario-3',
            start_date: new Date('2023-03-01'),
            finish_date: new Date('2023-05-01'),
          },
        ],
      },
    ],
  }
  return (
    <Page className='space-y-5'>
      <div className='flex justify-end'>
        <Link to='/scenarios/new' className={buttonVariants({ variant: 'default' })}>
          <PlusIcon className='w-4 h-4 mr-2' />
          <span>Add Scenarios</span>
        </Link>
      </div>
      <div>
        {isLoading ? (
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full'>
            {range(4).map((i) => (
              <Skeleton key={i} className='h-40 w-full' />
            ))}
          </div>
        ) : (
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-10'>
            {scenarios?.map(({ id, name, imag_password, imag_username, access }) => {
              return (
                <EachScenario
                  id={id}
                  name={name}
                  key={id}
                  imag_username={imag_username}
                  imag_password={imag_password}
                  access={access}
                />
              )
            })}
            {!scenarios?.length && (
              <div>
                <p>You Have no Scenarios.</p>
                <Link to='/scenarios/new' className='block underline mt-2'>
                  Click here to add.
                </Link>{' '}
              </div>
            )}
          </div>
        )}
      </div>
      <DumbbellChart {...goals_data} />
    </Page>
  )
}

export default ScenarioPage

// todo: dumbbell chart is a demo piece data now. change it to api based data
