import React from 'react'
import { cn } from '@/utils/utils'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function Page({ className, style, children }: React.PropsWithChildren<Props>) {
  return (
    <div className={cn('max-w-screen-xl mx-auto min-h-[80vh] p-4', className)} style={style}>
      {children}
    </div>
  )
}
