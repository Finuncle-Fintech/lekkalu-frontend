import React from 'react'
import { Link } from 'react-router-dom'
import { BellIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import Notification from './Notification'
import { notificationMock } from '@/utils/notification'

export default function HeadSidebar() {
    return (
        <div className='w-full flex items-center justify-around'>
            <Link className='text-center text-2xl font-bold text-primary block' to='/dashboard'>
                finuncle
            </Link>

            <Popover>
                <PopoverTrigger>
                    <BellIcon className='w-4 h-4 text-[#0F4B85]' />
                </PopoverTrigger>
                <PopoverContent className='w-80 bg-white shadow-lg border rounded z-50'>
                    {
                        notificationMock.length > 0
                            ? (
                                notificationMock.map((element, index) => {
                                    return <Notification key={index} label={element.message} icon={element.type} />
                                })
                            ) : (
                                <span>No hauy nada</span>
                            )
                    }
                </PopoverContent>
            </Popover>

        </div>
    )
}
