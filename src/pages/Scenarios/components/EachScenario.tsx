import React from 'react'
import dayjs from 'dayjs'
import { User2 } from 'lucide-react'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ScenarioType } from '@/constants/comparisons'
import EachScenarioOptions from './EachScenarioOptions'

dayjs.extend(relativeTime)

const EachScenario = ({ id, name, userName, created_at }: ScenarioType) => {
  return (
    <div key={id} className='border p-5 rounded flex flex-col space-y-5 shadow hover:shadow-md'>
      <div>
        <EachScenarioOptions id={id} />
      </div>
      <div className='text-center flex flex-col h-full'>
        <h2>{name}</h2>
        <p className='flex justify-center text-xs my-5 text-gray-500'>
          <User2 />
          <span className='self-end pl-2'>{userName}</span>
        </p>
        <p className='text-xs text-gray-500 mt-auto'>{dayjs(created_at).fromNow()}</p>
      </div>
    </div>
  )
}

export default EachScenario
