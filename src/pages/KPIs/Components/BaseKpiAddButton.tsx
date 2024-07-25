import React from 'react'

type Props = {
  name: string
  onButtonClick: () => void
}
export default function BaseKpiAddButton({ name, onButtonClick }: Props) {
  return (
    <button onClick={onButtonClick} className="btn w-full my-1">{name}</button>
  )
}
