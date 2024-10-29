import React, { createContext, useContext, useReducer } from 'react'

type ModalState = 'Real Estate' | 'Metal' | 'Equity' | 'Bank Account' | 'Mutual Fund'
type Action = { type: 'SET_MODAL'; payload: ModalState }

const ModalStateContext = createContext<ModalState | undefined>(undefined)
const ModalDispatchContext = createContext<React.Dispatch<Action> | undefined>(undefined)

const modalReducer = (state: ModalState, action: Action): ModalState => {
  switch (action.type) {
    case 'SET_MODAL':
      return action.payload
    default:
      return state
  }
}

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(modalReducer, 'Real Estate')

  return (
    <ModalStateContext.Provider value={state}>
      <ModalDispatchContext.Provider value={dispatch}>{children}</ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  )
}

export const useModalState = () => {
  const context = useContext(ModalStateContext)
  if (context === undefined) {
    throw new Error('useModalState must be used within a ModalProvider')
  }
  return context
}

export const useModalDispatch = () => {
  const context = useContext(ModalDispatchContext)
  if (context === undefined) {
    throw new Error('useModalDispatch must be used within a ModalProvider')
  }
  return context
}
