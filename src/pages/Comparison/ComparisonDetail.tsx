/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
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
import { useAuth } from '@/hooks/use-auth'
import { formatIndianMoneyNotation } from '@/utils/format-money'
import { useScrollToSection } from '@/hooks/use-scroll-to-section'
import { toast } from '@/components/ui/use-toast'

type DisplayGraphState = 'idle' | 'pending' | 'success' | 'error'

const ComparisonDetail = () => {
  const comparisonId = useParams().id
  const IS_FOR_FEATURE_PAGE = useLocation().pathname.includes('feature')
  const { getAPIClientForImaginaryUser } = useImaginaryAuth()
  const { userData } = useAuth()
  const IS_AUTHENTICATED_USER = Boolean(userData?.username)
  const { scrollToView } = useScrollToSection()

  const [selectedScenarios, setSelectedScenarios] = useState<Array<number>>([])
  const [timelineData, setTimelineData] = useState<any>()
  const [calculatedTimelineDate, setCalculatedTimelineData] = useState<any>()
  const [displayGraph, setDisplayGraph] = useState<DisplayGraphState>('idle')

  const handleScenarioSelect = (id: number) => {
    const _selectedScenarios = [...selectedScenarios]
    if (_selectedScenarios.includes(id)) {
      _selectedScenarios.splice(_selectedScenarios.indexOf(id), 1)
    } else {
      _selectedScenarios.push(id)
    }
    setSelectedScenarios(_selectedScenarios)
  }

  const {
    data: comparison,
    isError,
    isLoading: isFetchingComparison,
  } = useQuery({
    queryKey: [`${COMPARISON.COMPARISON}-${comparisonId}`],
    queryFn: () => fetchComparisonsById(Number(comparisonId), IS_FOR_FEATURE_PAGE),
  })

  const { data: scenarios } = useQuery({
    queryKey: [SCENARIOS.SCENARIOS],
    queryFn: fetchScenarios,
    enabled: Boolean(comparison?.id) && IS_AUTHENTICATED_USER,
  })

  const { mutate: scenarioMutationInComparison } = useMutation({
    mutationFn: (dto: Partial<Comparison>) => editComparisons(Number(comparisonId), dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${COMPARISON.COMPARISON}-${comparisonId}`] })
      setSelectedScenarios([])
      timelineData && toast({ title: 'Please simulate to view new changes.' })
    },
  })

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
    mutateAsync: login,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: async ({ password, username, scenarioName }: any) => {
      return await timelineDataAPICall({ password, username, scenarioName })
    },
    onSuccess: (data) => {
      setTimelineData((prevData: any) => {
        return { ...prevData, ...data }
      })
    },
  })

  const handleSimulate = async () => {
    setTimelineData({})
    setDisplayGraph('pending')
    scrollToView('comparison-simulation-chart', { behavior: 'smooth', block: 'start', inline: 'nearest' })
    const _scenarios: ScenarioType[] = IS_AUTHENTICATED_USER
      ? scenariosForThisComparison || []
      : comparison?.scenarios_objects || []
    const ALL_APIS = _scenarios?.map(({ name, imag_password, imag_username }) =>
      login({ password: imag_password, username: imag_username, scenarioName: name }),
    )
    try {
      await Promise.all(ALL_APIS)
      setDisplayGraph('success')
    } catch (e) {
      toast({ title: 'Something went wrong, please try again' })
      setDisplayGraph('error')
    }
  }

  const handleAddScenariosToComparison = () => {
    const _scenarios = comparison?.scenarios as Array<number>
    if (_scenarios?.length) {
      const _selectedScenarios = [..._scenarios, ...selectedScenarios]
      scenarioMutationInComparison({ scenarios: _selectedScenarios })
    } else {
      const _selectedScenarios = [...selectedScenarios]
      scenarioMutationInComparison({ scenarios: _selectedScenarios })
    }
  }

  const isSecenarioAlreadySelected = (id: number) => {
    return selectedScenarios.includes(id)
  }

  const handleRemoveScenarioFromComparison = (id: number) => {
    const remainingScenarios = comparison?.scenarios.filter((each) => each !== id)
    scenarioMutationInComparison({ scenarios: remainingScenarios })
  }

  useEffect(() => {
    if (!isPending && isSuccess) {
      const result = mergeArraysByDate(timelineData)
      setCalculatedTimelineData(result)
    }
  }, [isSuccess, isPending, timelineData])

  if (isFetchingComparison) {
    return (
      <Page>
        <div>Loading...</div>
      </Page>
    )
  }

  if (isError) {
    return (
      <Page>
        <h3>This comparison is set to private</h3>
      </Page>
    )
  }

  return (
    <Page className='space-y-8 mb-7'>
      <div className='relative flex justify-between'>
        {IS_AUTHENTICATED_USER ? (
          <PageTitle
            backUrl={IS_AUTHENTICATED_USER ? '/comparisons' : '/feature/comparisons'}
            backUrlTitle='Back to comparisons'
            title={comparison?.name || ''}
            key={comparisonId}
          />
        ) : (
          <div>
            <h1 className='text-2xl font-bold'>{comparison?.name}</h1>
          </div>
        )}
      </div>
      <h2 className='font-bold'>
        {comparison?.scenarios_objects?.length ? (
          'List of Scenarios in this comparison.'
        ) : (
          <div>
            <p>No Scenario in this comparison</p>
          </div>
        )}
      </h2>
      <div className='grid sm:grid-cols-2 xl:grid-cols-4 gap-4 gap-y-10'>
        {scenariosForThisComparison?.map(({ id, name, imag_username }) => (
          <Scenario
            key={id}
            id={id}
            name={name}
            username={imag_username}
            comparisonId={Number(comparisonId)}
            handleRemoveScenario={handleRemoveScenarioFromComparison}
            isAuthenticated={IS_AUTHENTICATED_USER}
          />
        ))}
        {!IS_AUTHENTICATED_USER && !scenariosForThisComparison ? (
          comparison?.scenarios_objects?.map(({ id, name, imag_username }) => (
            <Scenario
              key={id}
              id={id}
              name={name}
              username={imag_username}
              comparisonId={Number(comparisonId)}
              handleRemoveScenario={() => {}}
              isAuthenticated={IS_AUTHENTICATED_USER}
            />
          ))
        ) : (
          <></>
        )}
        {IS_AUTHENTICATED_USER ? (
          <AddNewScenarioButton
            handleAddScenariosToComparison={handleAddScenariosToComparison}
            scenarios={remaningScenarios || []}
            isSelected={isSecenarioAlreadySelected}
            comparisonName={comparison?.name || ''}
            handleScenarioSelect={handleScenarioSelect}
            noOfSelectedScenario={selectedScenarios.length}
          />
        ) : (
          <></>
        )}
      </div>

      <div className='flex justify-end'>
        <Button
          variant={'default'}
          onClick={handleSimulate}
          className='z-10'
          loading={displayGraph === 'pending'}
          disabled={displayGraph === 'pending' || !comparison?.scenarios?.length}
        >
          Simulate
        </Button>
        {comparison?.scenarios.length ? <div className={displayGraph !== 'pending' ? 'ripple' : ''} /> : <></>}
      </div>

      {timelineData ? (
        <div id='comparison-simulation-chart' className='scroll-mt-40'>
          <Card className={cn('h-[600px] sm:h-96 pb-20 sm:pb-0 shadow-sm')}>
            <CardHeader className='flex flex-start flex-col sm:flex-row'>
              <CardTitle>Graph</CardTitle>
            </CardHeader>
            {
              <CardContent className='w-full h-full'>
                {displayGraph === 'idle' && <></>}
                {displayGraph === 'pending' && <p>Loading...</p>}
                {displayGraph === 'success' && (
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
                      <YAxis
                        tickFormatter={(value) => formatIndianMoneyNotation(value)}
                        padding={{ top: 20, bottom: 20 }}
                      />
                      <Tooltip labelFormatter={(date) => dayjs(date).format('DD MMM YYYY')} />
                      {isSuccess ? (
                        Object.keys(timelineData).map((each, index) => (
                          <Line
                            key={each}
                            type='monotone'
                            dataKey={each}
                            name={each}
                            stroke={generateRandomColor(index)}
                            strokeWidth={2}
                            dot={false}
                          />
                        ))
                      ) : (
                        <></>
                      )}
                    </LineChart>
                  </ResponsiveContainer>
                )}
                {displayGraph === 'error' && (
                  <div>
                    <p className='text-red-400'>Something went wrong.</p>
                  </div>
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
