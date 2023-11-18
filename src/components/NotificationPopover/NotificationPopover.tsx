import React, { cloneElement } from 'react'
import { AlertCircleIcon, BellIcon, CheckCircleIcon, InfoIcon, XOctagonIcon } from 'lucide-react'
import dayjs from 'dayjs'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'

type Notification = {
  id: string
  title: string
  type: 'WARNING' | 'SUCCESS' | 'ERROR' | 'INFO'
  date: string
}

const DUMMY_NOTIFICATIONS: Notification[] = [
  {
    id: 'asfasdf',
    title: 'You car EMI is incoming in 2 days.',
    type: 'WARNING',
    date: '2023/10/20',
  },
  {
    id: 'hsdfgsdf',
    title: 'You have received your income.',
    type: 'SUCCESS',
    date: '2023/10/10',
  },
  {
    id: 'werascv',
    title: 'You have made an expense of 4000rs.',
    type: 'ERROR',
    date: '2023/02/11',
  },
  {
    id: 'faseradfadf',
    title: 'You are about to reach your first goal.',
    type: 'INFO',
    date: '2023/11/25',
  },
]

const TYPE_ICON_MAP: Record<Notification['type'], React.ReactElement> = {
  ERROR: <XOctagonIcon className='text-red-500 w-6 h-6' />,
  INFO: <InfoIcon className='text-blue-500 w-6 h-6' />,
  SUCCESS: <CheckCircleIcon className='text-emerald-500 w-6 h-6' />,
  WARNING: <AlertCircleIcon className='text-yellow-500 w-6 h-6' />,
}

export default function NotificationsPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='ghost'>
          <BellIcon className='w-4 h-4' />
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-full' asChild>
        <div className='divide-y'>
          {DUMMY_NOTIFICATIONS.map((notification) => {
            const icon = TYPE_ICON_MAP[notification.type]

            return (
              <div key={notification.id} className='rounded-md flex items-center gap-4 py-4'>
                <div className='flex items-center justify-center p-2 rounded-xl'>{cloneElement(icon)}</div>

                <div className='space-y-1'>
                  <p className='font-medium'>{notification.title}</p>
                  <p className='text-xs text-muted-foreground'>{dayjs(notification.date).format('DD/MM/YYYY')}</p>
                </div>
              </div>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
