import React from 'react'

type Props = {
  id: number
  name?: string
  description?: string
}
export default function CustomKPICard({ name, description }: Props) {
  return (
    <div>
      <p>{name}</p>
      <p>{description}</p>
    </div>
  )
}
