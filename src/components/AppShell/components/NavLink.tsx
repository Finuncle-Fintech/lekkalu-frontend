import React, { cloneElement } from 'react'
import { Link, LinkProps, useLocation } from 'react-router-dom'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/utils/utils'

type Props = LinkProps & {
  icon?: React.ReactElement<{ className?: string }>
  label: string
  twClass?: string
}

export default function NavLink({ to, icon, label, twClass }: Props) {
  const location = useLocation()
  const isActive = location.pathname.startsWith(to as string)

  return (
    <Link
      to={to}
      className={cn(buttonVariants({ variant: (isActive ? 'default' : 'ghost') }), 'w-full justify-start gap-2', twClass)}
    >
      {icon ? cloneElement(icon, { className: 'w-4 h-4' }) : null}
      <span className='truncate'>{label}</span>
    </Link>
  )
}
