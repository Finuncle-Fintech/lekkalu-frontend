import React, { cloneElement, useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog-v1'
import RealEstateModal from '@/pages/BalanceSheet/components/RealEstateModal'
import { BankAccount, PhysicalAsset } from '@/types/balance-sheet'
import MetalModal from '@/pages/BalanceSheet/components/MetalModal'
import EquityModal from '@/pages/BalanceSheet/components/EquityModal'
import BankAccountModal from '@/pages/BalanceSheet/components/BankAccountModal'
import { useModalState } from '@/pages/BalanceSheet/components/ModalContext'

type Props = {
  trigger: React.ReactElement
  asset?: PhysicalAsset | BankAccount
}
export default function AddOrEditAssetDialogV1({ trigger, asset }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [theme] = useState('light')
  const activeModal = useModalState()

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
            asset={asset as PhysicalAsset}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
          />
        )
      case 'Metal':
        return (
          <MetalModal asset={asset as PhysicalAsset} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
        )
      case 'Equity':
        return (
          <EquityModal asset={asset as PhysicalAsset} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
        )
      case 'Bank Account':
        return (
          <BankAccountModal
            asset={asset as BankAccount}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
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
