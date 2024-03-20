import React, { cloneElement } from 'react'
import { Link, LinkProps, useLocation } from 'react-router-dom'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/utils/utils'

type Props = LinkProps & {
  icon?: React.ReactElement<{ className?: string }>
  label: string
  isParent?: boolean
  isExpanded?: boolean
  toggleExpand?: () => void
}

export default function NavLink({ to, icon, label, isExpanded, isParent, toggleExpand }: Props) {
  const location = useLocation()
  const isActive = location.pathname.startsWith(to as string)

  return (
    <Link
      to={to}
      title={label}
      className={cn(buttonVariants({ variant: isActive ? 'default' : 'ghost' }), 'w-full justify-start gap-2')}
    >
      {icon ? cloneElement(icon, { className: 'w-4 h-4' }) : null}
      <span className='truncate'>{label}</span>
      {isParent ? (
        isExpanded ? (
          <ChevronDown className='ml-auto' onClick={toggleExpand} />
        ) : (
          <ChevronUp className='ml-auto' onClick={toggleExpand} />
        )
      ) : (
        <></>
      )}
    </Link>
  )
}
