import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CheckCircle2, Circle, PlusCircleIcon } from 'lucide-react'
import {
  DialogPortal,
  Dialog,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogOverlay,
} from '@/components/ui/dialog'
import Page from '@/components/Page/Page'
import PageTitle from './components/PageTitle'
import Scenario from './components/Scenario/EachScenarioInComparison'
import { scenarios, comparisons, ComparisonsType } from '@/constants/comparisons'
import { Button } from '@/components/ui/button'

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
        <Dialog>
          <DialogTrigger asChild>
            <button className='border Button violet border-dashed p-5 rounded flex flex-col space-y-5 justify-center items-center hover:cursor-pointer h-full'>
              <PlusCircleIcon size={50} className='text-gray-600' />
              <span className='text-sm text-center text-gray-600'>Add scenario </span>
            </button>
          </DialogTrigger>
          <DialogPortal>
            <DialogOverlay className='DialogOverlay' />
            <DialogContent className='DialogContent min-w-[80vw] min-h-[80vh]'>
              <DialogTitle className='DialogTitle'>Scenarios</DialogTitle>
              <DialogDescription className='DialogDescription'>
                <div className='flex justify-between'>
                  <p>{`Add Scenarios to ${comparisonObject?.name}`}</p>
                  <Link to='/scenario/new' className='hover:underline text-primary'>
                    Create a new scenario
                  </Link>
                </div>
              </DialogDescription>
              <div className='flex flex-col gap-5 h-[550px] overflow-y-auto px-5'>
                {remaningScenarios.length ? (
                  remaningScenarios?.map((each) => {
                    const selected = selectedScenarios.includes(each?.id)
                    return (
                      <div
                        key={each?.id}
                        className={`flex border rounded p-2 space-x-5 hover:cursor-pointer ${
                          selected ? 'bg-blue-500 text-white' : ''
                        }`}
                        onClick={() => handleScenarioSelect(each?.id)}
                      >
                        <div className='my-auto'>{selected ? <CheckCircle2 /> : <Circle />}</div>
                        <div>{each?.name}</div>
                      </div>
                    )
                  })
                ) : (
                  <div className='h-full flex flex-col justify-center items-center gap-5'>
                    <div>
                      <p>No Scenarios left to add</p>
                    </div>
                    <div>
                      <Link to='/scenario/new' className='hover:underline text-primary'>
                        Create a scenario
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                <DialogClose asChild>
                  <Button disabled={!remaningScenarios.length} onClick={handleAddScenariosToComparison}>
                    Add
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>
    </Page>
  )
}

export default ComparisonDetail
