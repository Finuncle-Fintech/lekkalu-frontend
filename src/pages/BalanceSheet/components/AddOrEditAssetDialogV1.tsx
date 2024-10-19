import React, { cloneElement, useEffect, useReducer, useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog-v1'
import RealEstateModal from '@/pages/BalanceSheet/components/RealEstateModal'
import MetalModal from '@/pages/BalanceSheet/components/MetalModal'

type Props = {
  trigger: React.ReactElement
}
type ModalState = 'Real Estate' | 'Metal' | 'Equity' | 'Bank Account' | 'Mutual Fund'

type Action = { type: 'SET_MODAL'; payload: ModalState }

const modalReducer = (state: ModalState, action: Action): ModalState => {
  switch (action.type) {
    case 'SET_MODAL':
      return action.payload
    default:
      return state
  }
}
export default function AddOrEditAssetDialogV1({ trigger }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [theme] = useState('light')
  const [activeModal, dispatch] = useReducer(modalReducer, 'Real Estate')

  // This function will be executed when the form is successfully submitted
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.add('light')
      root.classList.remove('dark')
    } else {
      root.classList.add('dark')
      root.classList.remove('light')
    }
  }, [theme])

  const renderModalContent = () => {
    switch (activeModal) {
      case 'Real Estate':
        return <RealEstateModal isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
      case 'Metal':
        return <MetalModal isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
      // Add cases for other modals
      default:
        return null
    }
  }
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        asChild
        onClick={() => {
          setIsDialogOpen(true)
        }}
      >
        {cloneElement(trigger)}
      </DialogTrigger>
      <DialogContent>
        <select
          value={activeModal}
          onChange={(e) => dispatch({ type: 'SET_MODAL', payload: e.target.value as ModalState })}
        >
          <option value='Real Estate'>Real Estate</option>
          <option value='Metal'>Metal</option>
          <option value='Equity'>Equity</option>
          <option value='Bank Account'>Bank Account</option>
          <option value='Mutual Fund'>Mutual Fund</option>
        </select>
        {renderModalContent()}
      </DialogContent>
    </Dialog>
  )
}

// todo: this dialog on mobile devices
