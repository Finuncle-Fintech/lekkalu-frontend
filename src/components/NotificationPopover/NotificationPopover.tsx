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
  // const { data, isLoading } = useQuery([NOTIFICATION.NOTIFICATION], fetchNotifications)
  const { isLoading } = useQuery([NOTIFICATION.NOTIFICATION], fetchNotifications)

  const notifications = [
    { id: 1, message: 'message 1', created_at: '10/02/2023' },
    { id: 2, message: 'message 2', created_at: '11/02/2023' },
    { id: 3, message: 'message 3', created_at: '12/02/2023' },
    { id: 4, message: 'message 4', created_at: '13/02/2023' },
    { id: 5, message: 'message 5', created_at: '14/02/2023' }
  ]
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='ghost' className='relative'>
          <BellIcon className='w-4 h-4' />
          <div className=' absolute top-0 right-[5px] bg-[#8b0000] h-5 w-5 leading-5 text-[#fff] rounded-full'>{notifications.length}</div>
        </Button>
      </PopoverTrigger>

      <PopoverContent className='max-w-full' asChild>
        <div className='divide-y'>
          {/* {!isLoading && data && data.length === 0 && <div className='text-center'>No Latest Notifications</div>} */}

          {/* {!isLoading && data && data.map((notification) => {
            const icon = TYPE_ICON_MAP.INFO

            return (
              <div key={notification.id} className='rounded-md flex items-center gap-4 py-4'>
                <div className='flex items-center justify-center p-2 rounded-xl'>{cloneElement(icon)}</div>

                <div className='space-y-1'>
                  <p className='font-medium'>{notification.message}</p>
                  <p className='text-xs text-muted-foreground'>{dayjs(notification.created_at).format('DD/MM/YYYY')}</p>
                </div>
              </div>
            ) */}

          {!isLoading && notifications && notifications.length === 0 && <div className='text-center'>No Latest Notifications</div>}
          {!isLoading && notifications && (
            <div className={`overflow-y-auto ${notifications.length > 3 ? 'max-h-[230px]' : ''}`}>
              {notifications.slice(0, notifications.length).map((notification) => {
                const icon = TYPE_ICON_MAP.INFO
                const message = notification.message
                const maxLength = 18
                const shouldWrap = message.length > maxLength
                return (
                  <div key={notification.id} className="rounded-md flex items-center gap-4 py-4">
                    <div className="flex items-center justify-center p-2 rounded-xl">
                      {cloneElement(icon)}
                    </div>

                    <div className="space-y-1">
                      {shouldWrap ? (
                        <>
                          <p className="font-medium">{message.slice(0, maxLength)}</p>
                          <p className="font-medium">{message.slice(maxLength)}</p>
                        </>
                      ) : (
                        <p className="font-medium">{notification.message}</p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {dayjs(notification.created_at).format('DD/MM/YYYY')}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
