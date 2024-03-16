import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import dayjs from 'dayjs'
import Page from '@/components/Page/Page'
import PageTitle from './components/PageTitle'
import Scenario from './components/Scenario/EachScenarioInComparison'
import { scenarios, comparisons, ComparisonsType } from '@/constants/comparisons'
import AddNewScenarioButton from './components/Scenario/AddNewScenarioButton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/utils/utils'

const ComparisonDetail = () => {
  const comparisonId = useParams().id

  const [selectedScenarios, setSelectedScenarios] = useState<Array<number>>([])

  const handleScenarioSelect = (id: number) => {
    const _selectedScenarios = [...selectedScenarios]
    if (_selectedScenarios.includes(id)) {
      _selectedScenarios.splice(_selectedScenarios.indexOf(id), 1)
    } else {
      _selectedScenarios.push(id)
    }
    setSelectedScenarios(_selectedScenarios)
  }

  const comparisonObject = comparisons.find((each) => each.uid === Number(comparisonId)) as ComparisonsType
  const scenariosForThisComparison = scenarios.filter((each) => comparisonObject?.scenarios.includes(each?.id))
  const remaningScenarios = scenarios.filter((each) => !comparisonObject?.scenarios.includes(each?.id))

  const handleAddScenariosToComparison = () => {
    const index = comparisons.findIndex((each) => each?.uid === Number(comparisonId))
    comparisons[index] = {
      ...comparisonObject,
      scenarios: [...comparisonObject.scenarios, ...selectedScenarios],
    }

    setSelectedScenarios([])
  }

  const isSecenarioAlreadySelected = (id: number) => {
    return selectedScenarios.includes(id)
  }

  return (
    <Page className='space-y-8'>
      <PageTitle
        backUrl='/comparisons'
        backUrlTitle='Back to comparisons'
        title={comparisonObject?.name || ''}
        key={comparisonId}
      />
      <h2 className='font-bold'>
        {scenariosForThisComparison?.length
          ? 'List of Scenarios in this comparison.'
          : 'No Scenario in this comparison'}
      </h2>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-10'>
        {scenariosForThisComparison?.map(({ id, name, userName }) => (
          <Scenario key={id} id={id} name={name} username={userName} comparisonId={Number(comparisonId)} />
        ))}
        <AddNewScenarioButton
          handleAddScenariosToComparison={handleAddScenariosToComparison}
          scenarios={remaningScenarios}
          isSelected={isSecenarioAlreadySelected}
          comparisonName={comparisonObject?.name}
          handleScenarioSelect={handleScenarioSelect}
        />
      </div>

      <div>
        <Card className={cn('h-[600px] sm:h-96 pb-20 sm:pb-0 shadow-sm')}>
          <CardHeader className='flex flex-start flex-col sm:flex-row'>
            <CardTitle>Graph</CardTitle>
          </CardHeader>
          <CardContent className='w-full h-full'>
            <ResponsiveContainer width='100%' height='75%'>
              <LineChart
                data={[
                  { time: '2022-01-11', scenario1: 16, scenario2: 22, value: 44 },
                  { time: '2022-02-11', scenario1: 29, scenario2: 22, value: 44 },
                  { time: '2022-03-11', scenario1: 8, scenario2: 22, value: 44 },
                  { time: '2022-04-11', scenario1: 39, scenario2: 22, value: 44 },
                ]}
                width={730}
                height={250}
                margin={{ top: 5, right: 0, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray='3 1' />
                <XAxis dataKey='time' tickFormatter={(date) => dayjs(date).format('MMM YYYY')} />
                <YAxis dataKey={'value'} />
                <Tooltip labelFormatter={(date) => dayjs(date).format('DD MMM YYYY')} />
                <Line type='monotone' dataKey={'scenario1'} name='Scenario 1' strokeWidth={1} dot={false} />
                <Line
                  type='monotone'
                  dataKey={'scenario2'}
                  name='Scenario 2'
                  stroke='red'
                  strokeWidth={1}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </Page>
  )
}

export default ComparisonDetail
