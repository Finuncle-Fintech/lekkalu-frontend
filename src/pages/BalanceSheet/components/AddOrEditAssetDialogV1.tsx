import React, { cloneElement, useEffect, useReducer, useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog-v1'
import RealEstateModal from '@/pages/BalanceSheet/components/RealEstateModal'
import { PhysicalAsset } from '@/types/balance-sheet'

type Props = {
  trigger: React.ReactElement
  asset?: PhysicalAsset
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
export default function AddOrEditAssetDialogV1({ trigger, asset }: Props) {
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
        return (
          <RealEstateModal
            asset={asset}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            dispatch={dispatch}
          />
        )
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
      <DialogContent>{renderModalContent()}</DialogContent>
    </Dialog>
  )
}

// todo: this dialog on mobile devices
// todo: add more modals
// todo: design dropdown for asset type
