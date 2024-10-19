import React, { cloneElement, useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog-v1'
import AssetModal from '@/pages/BalanceSheet/components/AssetModal'

type Props = {
  trigger: React.ReactElement
}

export default function AddOrEditAssetDialogV1({ trigger }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [theme] = useState('light')

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
        <AssetModal isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
      </DialogContent>
    </Dialog>
  )
}

// todo: this dialog on mobile devices
