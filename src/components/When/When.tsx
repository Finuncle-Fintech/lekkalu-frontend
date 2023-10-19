import { PropsWithChildren } from 'react'

type Props = {
  truthy: boolean
  fallback?: React.ReactNode
}

export default function When({ truthy, children, fallback = null }: PropsWithChildren<Props>) {
  console.log(truthy)
  return truthy ? children : fallback
}
