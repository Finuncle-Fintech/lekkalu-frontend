import React, { useEffect, useState } from 'react'
import { PlusIcon } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import CreateGoal from '../AddEditGoalPages/CreateGoal/CreateGoal'
import { TooltipForGoals } from './Tooltip'
import { getSearchParamFromLocationSearch } from '@/utils/utils'

const AddGoalDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const location = useLocation()

  useEffect(() => {
    const values: any = getSearchParamFromLocationSearch(location.search)
    if (Object.keys(values).length) {
      if (values.new_goal === 'true') {
        setIsDialogOpen(true)
      }
    }
  }, [location.search])

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        asChild
        onClick={() => {
          setIsDialogOpen(true)
        }}
      >
        <Button>
          <PlusIcon className='w-4 h-4 mr-2' />
          <span>Add Goal</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='min-w-auto'>
        <DialogHeader>
          <div className='flex gap-4'>
            <h1 className='self-center text-lg font-semibold leading-none tracking-tight'>Add Goal</h1>
            <div>
              <TooltipForGoals>
                <div className='w-[300px]'>
                  <ul>
                    <li className='p-2 text-gray-500'>
                      Creating a goal allows you to keep track of your income and expenses with visualized graphs.
                    </li>
                    <li className='px-2 underline text-blue-500'>
                      <Link to='http://kb.finuncle.com' target='_blank'>
                        View detail
                      </Link>
                    </li>
                  </ul>
                </div>
              </TooltipForGoals>
            </div>
          </div>
        </DialogHeader>
        <CreateGoal setIsDialogOpen={setIsDialogOpen} />
      </DialogContent>
    </Dialog>
  )
}

export { AddGoalDialog }
