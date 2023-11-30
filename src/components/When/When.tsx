import { PropsWithChildren } from 'react'

type Props = {
  truthy: boolean
  fallback?: React.ReactNode
}

export default function When({ truthy, children, fallback = null }: PropsWithChildren<Props>) {
  return truthy ? children : fallback
}
