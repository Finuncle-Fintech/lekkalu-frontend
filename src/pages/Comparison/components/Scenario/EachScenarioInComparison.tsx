/* eslint-disable react/self-closing-comp */
import React from 'react'
import { Link } from 'react-router-dom'
import ScenarioOption from './EachScenarioOptions'

type ScenarioType = {
  name: string
  username: string
  id: number
  comparisonId: number
  handleRemoveScenario: (id: number) => void
  isAuthenticated: boolean
}

const Scenario = ({ name, id, handleRemoveScenario, isAuthenticated }: ScenarioType) => {
  const IS_AUTHENTICATED_USER = isAuthenticated
  return (
    <div className='relative border shadow hover:shadow-md min-h-[130px] min-w-[230px] bg-white'>
      {IS_AUTHENTICATED_USER ? (
        <div className='absolute right-2 ml-auto top-2'>
          <ScenarioOption id={id} handleRemoveScenario={handleRemoveScenario} />
        </div>
      ) : (
        <></>
      )}
      <Link
        to={IS_AUTHENTICATED_USER ? `/scenarios/${id}` : `/feature/scenarios/${id}`}
        className='flex h-full justify-center items-center pt-5'
      >
        <div className='text-center'>
          <p>{name}</p>
        </div>
      </Link>
    </div>
  )
}

export default Scenario
