/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useMutation, useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import Page from '@/components/Page/Page'
import PageTitle from './components/PageTitle'
import Scenario from './components/Scenario/EachScenarioInComparison'
import AddNewScenarioButton from './components/Scenario/AddNewScenarioButton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/utils/utils'
import { COMPARISON, SCENARIOS } from '@/utils/query-keys'
import { editComparisons, fetchComparisonsById } from '@/queries/comparisons'
import { fetchScenarios } from '@/queries/scenarios'
import { type Scenario as ScenarioType } from '@/types/scenarios'
import { Comparison } from '@/types/comparison'
import { queryClient, tokenClient } from '@/utils/client'
import { Button } from '@/components/ui/button'
import { Goal, Timeline } from '@/types/goals'
import { useImaginaryAuth } from '../Scenarios/context/use-imaginaryAuth'
import { generateRandomColor, mergeArraysByDate } from './utils/dateTime'

const ComparisonDetail = () => {
  const comparisonId = useParams().id
  const { getAPIClientForImaginaryUser } = useImaginaryAuth()

  const [selectedScenarios, setSelectedScenarios] = useState<Array<number>>([])
  const [timelineData, setTimelineData] = useState<any>()
  const [calculatedTimelineDate, setCalculatedTimelineData] = useState<any>()

  const handleScenarioSelect = (id: number) => {
    const _selectedScenarios = [...selectedScenarios]
    if (_selectedScenarios.includes(id)) {
      _selectedScenarios.splice(_selectedScenarios.indexOf(id), 1)
    } else {
      _selectedScenarios.push(id)
    }
    setSelectedScenarios(_selectedScenarios)
  }

  const { data: comparison } = useQuery([`${COMPARISON.COMPARISON}-${comparisonId}`], () =>
    fetchComparisonsById(Number(comparisonId)),
  )

  const { data: scenarios } = useQuery([SCENARIOS.SCENARIOS], fetchScenarios, {
    enabled: Boolean(comparison?.id),
  })

  const { mutate: scenarioMutationInComparison } = useMutation(
    (dto: Partial<Comparison>) => editComparisons(Number(comparisonId), dto),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`${COMPARISON.COMPARISON}-${comparisonId}`])
        setSelectedScenarios([])
      },
    },
  )

  const scenariosForThisComparison = scenarios?.filter((each: ScenarioType) => comparison?.scenarios.includes(each?.id))
  const remaningScenarios = scenarios?.filter((each) => !comparison?.scenarios.includes(each?.id))

  const timelineDataAPICall = async (dto: { username: string; password: string; scenarioName: string }) => {
    const loginResponse = await tokenClient.post<{ access: string; refresh: string }>('/', dto)
    const apiClient = getAPIClientForImaginaryUser(loginResponse.data.access, 'v2')
    const goalData = await apiClient.get<Goal[]>('financial_goal/')
    const timelineData = await apiClient.get<Timeline[]>(`financial_goal/timeline/${goalData?.data[0]?.id}`)
    return { [dto.scenarioName]: timelineData.data }
  }

  const {
    mutate: login,
    isSuccess,
    isLoading,
  } = useMutation(
    async ({ password, username, scenarioName }: any) => {
      const results = await timelineDataAPICall({ password, username, scenarioName })
      return results
    },
    {
      onSuccess: (data) => {
        setTimelineData((prevData: any) => {
          return { ...prevData, ...data }
        })
      },
    },
  )

  const handleSimulate = () => {
    setTimelineData({})
    scenariosForThisComparison?.forEach((each) => {
      login({ password: each?.imag_password, username: each?.imag_username, scenarioName: each?.name })
    })
  }

  const handleAddScenariosToComparison = () => {
    const _scenarios = comparison?.scenarios as Array<number>
    const _selectedScenarios = [..._scenarios, ...selectedScenarios]
    scenarioMutationInComparison({ scenarios: _selectedScenarios })
  }

  const isSecenarioAlreadySelected = (id: number) => {
    return selectedScenarios.includes(id)
  }

  const handleRemoveScenarioFromComparison = (id: number) => {
    const remainingScenarios = comparison?.scenarios.filter((each) => each !== id)
    scenarioMutationInComparison({ scenarios: remainingScenarios })
  }

  useEffect(() => {
    if (!isLoading && isSuccess) {
      const result = mergeArraysByDate(timelineData)
      setCalculatedTimelineData(result)
    }
  }, [isSuccess, isLoading])

  return (
    <Page className='space-y-8'>
      <div className='flex justify-between'>
        <PageTitle
          backUrl='/comparisons'
          backUrlTitle='Back to comparisons'
          title={comparison?.name || ''}
          key={comparisonId}
        />
        <div>
          <Button
            variant={'default'}
            onClick={handleSimulate}
            loading={isLoading}
            disabled={!scenariosForThisComparison?.length}
          >
            Simulate
          </Button>
        </div>
      </div>
      <h2 className='font-bold'>
        {scenariosForThisComparison?.length
          ? 'List of Scenarios in this comparison.'
          : 'No Scenario in this comparison'}
      </h2>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-10'>
        {scenariosForThisComparison?.map(({ id, name, imag_username }) => (
          <Scenario
            key={id}
            id={id}
            name={name}
            username={imag_username}
            comparisonId={Number(comparisonId)}
            handleRemoveScenario={handleRemoveScenarioFromComparison}
          />
        ))}
        <AddNewScenarioButton
          handleAddScenariosToComparison={handleAddScenariosToComparison}
          scenarios={remaningScenarios || []}
          isSelected={isSecenarioAlreadySelected}
          comparisonName={comparison?.name || ''}
          handleScenarioSelect={handleScenarioSelect}
        />
      </div>

      {timelineData ? (
        <div>
          <Card className={cn('h-[600px] sm:h-96 pb-20 sm:pb-0 shadow-sm')}>
            <CardHeader className='flex flex-start flex-col sm:flex-row'>
              <CardTitle>Graph</CardTitle>
            </CardHeader>
            {
              <CardContent className='w-full h-full'>
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  <ResponsiveContainer width='100%' height='75%'>
                    <LineChart
                      data={calculatedTimelineDate}
                      width={730}
                      height={250}
                      margin={{ top: 5, right: 0, left: 10, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray='3 1' />
                      <XAxis
                        dataKey='time'
                        tickFormatter={(date) => dayjs(date).format('MMM YYYY')}
                        allowDataOverflow
                      />
                      <YAxis />
                      <Tooltip labelFormatter={(date) => dayjs(date).format('DD MMM YYYY')} />

                      {isSuccess ? (
                        Object.keys(timelineData).map((each, index) => (
                          <Line
                            key={each}
                            type='monotone'
                            dataKey={each}
                            name={each}
                            stroke={generateRandomColor(index)}
                            strokeWidth={1}
                            dot={false}
                          />
                        ))
                      ) : (
                        <></>
                      )}
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            }
          </Card>
        </div>
      ) : (
        <></>
      )}
    </Page>
  )
}

export default ComparisonDetail
