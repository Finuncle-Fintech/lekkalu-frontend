import { PropsWithChildren } from 'react'

type Props = {
  truthy: boolean
}

export default function When({ truthy, children }: PropsWithChildren<Props>) {
  return truthy ? children : null
}
