import React from 'react'
import { User2 } from 'lucide-react'
import ScenarioOption from './EachScenarioOptions'
import { useAuth } from '@/hooks/use-auth'

type ScenarioType = {
  name: string
  username: string
  id: number
  comparisonId: number
  handleRemoveScenario: (id: number) => void
}

const Scenario = ({ name, username, id, handleRemoveScenario }: ScenarioType) => {
  const { userData } = useAuth()
  const IS_AUTHENTICATED_USER = Boolean(userData?.first_name)
  return (
    <div className='border p-5 rounded flex flex-col space-y-5 shadow hover:shadow-md'>
      <div className='ml-auto'>
        {IS_AUTHENTICATED_USER ? <ScenarioOption id={id} handleRemoveScenario={handleRemoveScenario} /> : <></>}
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
