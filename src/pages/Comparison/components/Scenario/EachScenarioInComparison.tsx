import React from 'react'
import ScenarioOption from './EachScenarioOptions'

type ScenarioType = {
  name: string
  username: string
  id: number
  comparisonId: number
  handleRemoveScenario: (id: number) => void
  hideOptionsButton?: boolean
}

const Scenario = ({ name, id, handleRemoveScenario, hideOptionsButton }: ScenarioType) => {
  return (
    <div className='border p-5 rounded flex flex-col space-y-5 shadow hover:shadow-md'>
      <div className='ml-auto'>
        {!hideOptionsButton ? <ScenarioOption id={id} handleRemoveScenario={handleRemoveScenario} /> : <></>}
      </div>
      <div className='text-center'>
        <p>{name}</p>
      </div>
    </div>
  )
}

export default Scenario
