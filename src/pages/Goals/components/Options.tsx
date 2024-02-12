import React from 'react'
import { MoreVertical } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import DeleteGoal from './DeleteGoal'

type GoalOptionsType = {
  id: number
}

const GoalOptions = ({ id }: GoalOptionsType) => {
  return (
    <div className='flex w-full justify-end gap-x-2'>
      <Popover>
        <PopoverTrigger>
          <div className='border p-3 rounded hover:bg-accent ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'>
            <MoreVertical size={16} />
          </div>
        </PopoverTrigger>
        <PopoverContent className='w-[200px]'>
          <div className='flex flex-col'>
            <Button variant={'ghost'} size={'sm'}>
              Edit
            </Button>
            <DeleteGoal id={id} />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default GoalOptions
