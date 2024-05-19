import React, { cloneElement } from 'react'
import { Link, LinkProps, useLocation } from 'react-router-dom'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/utils/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

type Props = LinkProps & {
  icon?: React.ReactElement<{ className?: string }>
  label: string
  isParent?: boolean
  isExpanded?: boolean
  toggleExpand?: () => void
  isOpen?: boolean
}

export default function NavLink({ to, icon, label, isExpanded, isParent, toggleExpand, isOpen }: Props) {
  const location = useLocation()
  const isActive = location.pathname.startsWith(to as string)

  return (
    <div
      className={cn(
        buttonVariants({ variant: isActive ? 'default' : 'ghost' }),
        `flex w-full justify-start gap-2 ${isActive ? 'hover:bg-primary' : ''}`,
      )}
    >
      <Link
        to={to}
        title={label}
        className={cn(buttonVariants({ variant: isActive ? 'default' : 'ghost' }), 'w-full justify-start gap-2 p-0')}
      >
        {icon ? (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>{cloneElement(icon, { className: 'h-4' })}</TooltipTrigger>
              <TooltipContent side='right' className={cn('hidden', !isOpen && 'md:block')}>
                <p>{label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : null}
        <span className={cn('truncate', !isOpen && 'md:hidden')}>{label}</span>
      </Link>
      {isParent ? (
        isExpanded ? (
          <ChevronDown onClick={toggleExpand} className='self-center hover:cursor-pointer' />
        ) : (
          <ChevronUp onClick={toggleExpand} className='self-center hover:cursor-pointer' />
        )
      ) : (
        <></>
      )}
    </div>
  )
}
