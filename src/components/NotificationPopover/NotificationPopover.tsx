import React, { cloneElement } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AlertCircleIcon, BellIcon, CheckCircleIcon, InfoIcon, XOctagonIcon } from 'lucide-react'
import dayjs from 'dayjs'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { fetchNotifications } from '@/queries/notification'
import { NOTIFICATION } from '@/utils/query-keys'

const TYPE_ICON_MAP: Record<string, React.ReactElement> = {
  ERROR: <XOctagonIcon className='text-red-500 w-6 h-6' />,
  INFO: <InfoIcon className='text-blue-500 w-6 h-6' />,
  SUCCESS: <CheckCircleIcon className='text-emerald-500 w-6 h-6' />,
  WARNING: <AlertCircleIcon className='text-yellow-500 w-6 h-6' />,
}

export default function NotificationsPopover() {
  const { data, isLoading } = useQuery([NOTIFICATION.NOTIFICATION], fetchNotifications)
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='ghost'>
          <BellIcon className='w-4 h-4' />
        </Button>
      </PopoverTrigger>

      <PopoverContent className='max-w-full' asChild>
        <div className='divide-y'>
          {!isLoading && data && data.map((notification) => {
            const icon = TYPE_ICON_MAP.INFO

            return (
              <div key={notification.id} className='rounded-md flex items-center gap-4 py-4'>
                <div className='flex items-center justify-center p-2 rounded-xl'>{cloneElement(icon)}</div>

                <div className='space-y-1'>
                  <p className='font-medium'>{notification.message}</p>
                  <p className='text-xs text-muted-foreground'>{dayjs(notification.created_at).format('DD/MM/YYYY')}</p>
                </div>
              </div>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
