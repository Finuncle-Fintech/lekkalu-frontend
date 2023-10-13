import React, { useContext, useState } from 'react'

const UnitContext = React.createContext()
const UnitUpdateContext = React.createContext()

export function useUnit() {
  return useContext(UnitContext)
}

export function useUnitUpdate() {
  return useContext(UnitUpdateContext)
}
export function UnitProvider({ children }) {
  const [unit, setUnit] = useState('Months')

  const handleUnitChange = (val) => {
    setUnit(val)
  }
  return (
    <UnitContext.Provider value={unit}>
      <UnitUpdateContext.Provider value={handleUnitChange}>{children}</UnitUpdateContext.Provider>
    </UnitContext.Provider>
  )
}
