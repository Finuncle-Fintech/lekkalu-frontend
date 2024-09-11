/* eslint-disable react/self-closing-comp */
import React from 'react'
import { Link } from 'react-router-dom'
import ScenarioOption from './EachScenarioOptions'
import { UserRole } from '@/hooks/useRole'
interface ScenarioTypeForOthers {
  name: string
  id: number
  role: Exclude<UserRole, 'owner'>
}

interface ScenarioTypeForOwner {
  name: string
  id: number
  role: 'owner'
  handleRemoveScenario: (id: number) => void
}

type ScenarioType = ScenarioTypeForOthers | ScenarioTypeForOwner

const Scenario = (props: ScenarioType) => {
  const { role, name, id } = props
  const IS_AUTHENTICATED_USER = role !== 'guest'
  return (
    <div className='relative border shadow hover:shadow-md min-h-[130px] min-w-[230px] bg-white'>
      {role === 'owner' ? (
        <div className='absolute right-2 ml-auto top-2'>
          <ScenarioOption id={id} handleRemoveScenario={props.handleRemoveScenario} />
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
