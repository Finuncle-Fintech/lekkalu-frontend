import { useUserPreferences } from '@/hooks/useUserPreferences'

export const CustomLabelPie = ({ active, payload }) => {
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
