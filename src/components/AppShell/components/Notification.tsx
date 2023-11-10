import { BellRingIcon, BellDot, DollarSign } from 'lucide-react'
import React from 'react'
import { IconType } from '@/utils/notification'

const iconNotification: {
    warning: React.JSX.Element;
    default: React.JSX.Element;
    financial: React.JSX.Element;
} = {
    warning: <BellRingIcon className='w-5 h-5 text-red-500' />,
    default: <BellDot className='w-5 h-5 text-[#0F4B85]' />,
    financial: <DollarSign className='w-5 h-5 text-[#0F4B85]' />,
}

export default function Notification({ label, icon }: { label: string; icon: IconType }) {
    return (
        <div className='flex items-center gap-4 border-b p-3 cursor-pointer hover:bg-slate-100'>
            {iconNotification[icon]}
            <p className='text-sm'>{label}</p>
        </div>
    )
}
