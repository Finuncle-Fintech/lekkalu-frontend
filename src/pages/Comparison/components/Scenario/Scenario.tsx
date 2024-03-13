import React from 'react'
import { User2 } from 'lucide-react'
import ScenarioOption from './Options'
import { comparisons } from '@/constants/comparisons'

type ScenarioType = {
  name: string
  username: string
  id: number
  comparisonId: number
}

const Scenario = ({ name, username, id, comparisonId }: ScenarioType) => {
  const handleRemoveScenario = (id: number) => {
    const index = comparisons.findIndex((each) => each.uid === comparisonId)
    const _scenarios = comparisons[index].scenarios.filter((each) => each !== id)
    comparisons[index] = {
      ...comparisons[index],
      scenarios: _scenarios,
    }
  }

  return (
    <div className='border p-5 rounded flex flex-col space-y-5 shadow hover:shadow-md'>
      <div className='ml-auto'>
        <ScenarioOption id={id} handleRemoveScenario={handleRemoveScenario} />
      </div>
      <div className='text-center'>
        <p>{name}</p>
      </div>
      <div className='flex mx-auto text-gray-500 text-xs h-full items-end'>
        <User2 size={15} className='block' />
        <p className='ml-2'>{username}</p>
      </div>
    </div>
  )
}

export default Scenario
