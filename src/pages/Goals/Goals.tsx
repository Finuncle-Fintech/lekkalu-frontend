import React, { useEffect, useState } from 'react'
import colors from 'tailwindcss/colors'
import { Link } from 'react-router-dom'
import { PlusIcon } from 'lucide-react'
import dayjs from 'dayjs'
import { useQuery } from '@tanstack/react-query'
import { range } from 'lodash'
import { addDays } from 'date-fns'
import Page from '@/components/Page/Page'
import { buttonVariants } from '@/components/ui/button'
import Goal from './components/Goal'
import { GOALS } from '@/utils/query-keys'
import { fetchGoalsGql } from '@/queries/goals'
import { Skeleton } from '@/components/ui/skeleton'
import DumbbellChart, { DumbbellChartProps, GoalDumbbellChartProps } from '@/pages/Goals/DumbbellChart'
import GoalListItem from '@/pages/Goals/components/GoalListItem'

type CheckedItems = {
  [key: string]: boolean
}
const TODAY = new Date()

const INITIAL_GOALS_DATA: DumbbellChartProps = {
  Goals: [],
}

export default function Goals() {
  const { data: goals_data, isLoading, isFetching } = useQuery({ queryKey: [GOALS.GOALS], queryFn: fetchGoalsGql })
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({})
  const [goalsChartData, setGoalsChartData] = useState<DumbbellChartProps>(INITIAL_GOALS_DATA)

  const handleCheckboxChange = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }
  useEffect(() => {
    if (!isLoading) {
      // set all checked items to true
      const initialCheckedItems = goals_data?.reduce((acc, goal) => {
        acc[goal.id] = true
        return acc
      }, {} as CheckedItems)
      setCheckedItems(initialCheckedItems ?? {})
    }
  }, [goals_data, isLoading])

  useEffect(() => {
    if (!isLoading) {
      const selectedGoals = goals_data?.filter((goal) => checkedItems[goal.id])
      const goals: GoalDumbbellChartProps[] =
        selectedGoals?.map(({ name, scenarios, createdAt, reachableByDays }) => ({
          name,
          Scenarios: [
            ...(scenarios?.map((scenario) => ({
              name: scenario.name,
              start_date: new Date(scenario.financialGoals[0].createdAt),
              finish_date: addDays(TODAY, scenario.financialGoals[0].reachableByDays),
            })) || []),
            {
              name: 'Current Scenario',
              start_date: new Date(createdAt),
              finish_date: addDays(new Date(createdAt), reachableByDays),
            },
          ],
        })) || []
      setGoalsChartData({ Goals: goals })
    }
  }, [goals_data, isLoading, checkedItems, goalsChartData])

  if (isLoading) {
    return (
      <Page className='space-y-4'>
        <div className='flex justify-end'>
          <Skeleton className='h-10 w-28' />
        </div>

        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
          <Skeleton className='h-60 w-full' />
          <Skeleton className='h-60 w-full' />
          <Skeleton className='h-60 w-full' />
        </div>

        <Skeleton className='h-10 w-1/2' />
      </Page>
    )
  }

  return (
    <Page className='space-y-4'>
      <div className='flex justify-end'>
        <Link to='/goals/new' className={buttonVariants({ variant: 'default' })}>
          <PlusIcon className='w-4 h-4 mr-2' />
          <span>Add Goal</span>
        </Link>
      </div>

      <div className='text-2xl font-bold truncate block py-4'>Your ongoing financial goals</div>

      {isFetching ? (
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full'>
          {range(8).map((i) => (
            <Skeleton key={i} className='h-64 w-full' />
          ))}
        </div>
      ) : (
        <div>
          {goals_data?.length ? (
            <>
              <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-10'>
                {goals_data?.map((goal) => (
                  <Goal
                    key={goal.id}
                    id={goal.id}
                    goalTitle={goal.name}
                    category={goal.track_kpi}
                    createdAt={dayjs(goal.createdAt).toISOString()}
                    color={goal?.reachableByDays > 0 ? colors.violet['500'] : colors.red['500']}
                    reachable_by_days={goal?.reachableByDays}
                  />
                ))}
              </div>
              <div className=''>
                <h2 className='mt-8 mb-4 text-2xl font-bold truncate block py-4'>Analyze different Scenarios</h2>
                <DumbbellChart {...goalsChartData} />
                {goals_data?.map((goal) => (
                  <GoalListItem
                    key={goal.id}
                    goal={goal}
                    isChecked={checkedItems[goal.id] || false}
                    onCheckboxChange={() => handleCheckboxChange(goal.id.toString())}
                  />
                ))}
              </div>
            </>
          ) : (
            <div>
              <p>You Have no financial goals.</p>
              <Link to='/goals/new' className='block underline mt-2'>
                Click here to add.
              </Link>{' '}
            </div>
          )}
        </div>
      )}
    </Page>
  )
}
