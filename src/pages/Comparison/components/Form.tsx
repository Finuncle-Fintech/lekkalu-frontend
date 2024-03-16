import React, { useEffect, useState } from 'react'
import { XCircle } from 'lucide-react'
import { Form } from '@/components/ui/form'
import InputFieldsRenderer, { InputField } from '@/components/InputFieldsRenderer/InputFieldsRenderer'
import AddNewScenarioButton from './Scenario/AddNewScenarioButton'
import { ScenarioType, scenarios } from '@/constants/comparisons'

const ComparisonForm = ({ form }: any) => {
  const [selectedScenarios, setSelectedScenarios] = useState<Array<ScenarioType>>([])
  const [addedSenarios, setAddedScenarios] = useState<Array<ScenarioType>>([])
  const [remaningScenarios, setRemainingScenarios] = useState<Array<ScenarioType>>([])

  useEffect(() => {
    const _remainingScenarios: Array<ScenarioType> = []
    scenarios.forEach((scenario) => {
      if (!addedSenarios.some((addedScenario) => addedScenario.id === scenario.id)) {
        _remainingScenarios.push(scenario)
      }
    })
    setRemainingScenarios(_remainingScenarios)
  }, [addedSenarios])
  const inputs = [
    {
      id: 'name',
      label: 'Name',
      type: 'text',
    },
    {
      id: 'access',
      label: 'Access',
      type: 'radio',
      options: [
        { id: 'public', label: 'Public' },
        { id: 'private', label: 'Private' },
      ],
    },
  ] as InputField[]

  const handleScenarioSelect = (id: number) => {
    const _selectedScenarios = [...selectedScenarios].map((each) => each?.id)
    if (_selectedScenarios.includes(id)) {
      _selectedScenarios.splice(_selectedScenarios.indexOf(id), 1)
    } else {
      _selectedScenarios.push(id)
    }
    const scenariosObject = scenarios.filter((each) => _selectedScenarios.includes(each.id))
    setSelectedScenarios(scenariosObject)
  }

  const handleAddScenariosToComparison = () => {
    setAddedScenarios(selectedScenarios)
    setSelectedScenarios([])
  }

  const isSecenarioAlreadySelected = (id: number) => {
    return selectedScenarios.map((each) => each?.id).includes(id)
  }

  const handleRemoveAddedScenario = (id: number) => {
    const _filteredScenarios = addedSenarios.filter((each) => each.id !== id)
    setAddedScenarios(_filteredScenarios)
  }

  return (
    <Form {...form}>
      <form onSubmit={() => {}}>
        <div className='flex flex-col gap-y-5'>
          <InputFieldsRenderer control={form.control} inputs={inputs} />
          <div>
            <p>Add some scenarios to this comparison.</p>
          </div>
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-10'>
            {addedSenarios?.map(({ name, id }) => {
              return (
                <div key={id} className='flex flex-col border rounded h-auto shadow-sm hover:shadow-md min-h-[150px]'>
                  <div className='flex justify-end mr-2 mt-2'>
                    <XCircle className='hover:cursor-pointer' onClick={() => handleRemoveAddedScenario(id)} />
                  </div>
                  <div className='mt-auto mb-5'>
                    <p className='text-center px-2'>{name}</p>
                  </div>
                </div>
              )
            })}
            <AddNewScenarioButton
              comparisonName='this comparison'
              scenarios={remaningScenarios}
              handleAddScenariosToComparison={handleAddScenariosToComparison}
              handleScenarioSelect={handleScenarioSelect}
              isSelected={isSecenarioAlreadySelected}
            />
          </div>
        </div>
      </form>
    </Form>
  )
}

export default ComparisonForm
