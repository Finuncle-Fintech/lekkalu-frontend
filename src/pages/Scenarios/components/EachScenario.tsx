import React from 'react'
import dayjs from 'dayjs'
import { Lock, UnlockIcon } from 'lucide-react'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Link } from 'react-router-dom'
import { Scenario } from '@/types/scenarios'
import EachScenarioOptions from './EachScenarioOptions'

dayjs.extend(relativeTime)

const EachScenario = ({ id, name, access }: Scenario) => {
  return (
    <div key={id} className='relative border rounded flex flex-col space-y-5 shadow hover:shadow-md'>
      <div className='flex justify-between items-center mx-3 mt-3'>
        <div className={`p-2 text-primary rounded-full bg-${access === 'Private' ? 'red' : 'blue'}-200`}>
          {access === 'Private' ? <Lock size={16} /> : <UnlockIcon size={16} />}
        </div>
        <EachScenarioOptions id={id} />
      </div>
      <Link to={`/scenarios/${id}`} className='text-center flex flex-col h-full p-5'>
        <h2 className='mb-5'>{name}</h2>
      </Link>
    </div>
  )
}

export default EachScenario
