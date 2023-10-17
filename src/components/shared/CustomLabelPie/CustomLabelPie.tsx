import React from 'react'
import { useUserPreferences } from '@/hooks/use-user-preferences'

type Props = {
  active?: boolean
  // @TODO: Find out correct types
  payload?: any
}

export const CustomLabelPie = ({ active, payload }: Props) => {
  const { preferences } = useUserPreferences()

  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className='custom-tooltip'>
        <p
          style={{ background: 'white' }}
          className='border rounded'
        >{`${data.name}: ${preferences?.currencyUnit}${data.value}`}</p>
      </div>
    )
  }

  return null
}
