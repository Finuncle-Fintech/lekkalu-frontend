import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IndianRupee, Percent } from 'lucide-react'
import React from 'react'
import AssetModal, { FieldProp } from '@/pages/BalanceSheet/components/AssetModal'
import { addBankAccountSchema, AddBankAccountSchema } from '@/schema/balance-sheet'
import { BankAccount } from '@/types/balance-sheet'
import { addBankAccount } from '@/queries/balance-sheet'

type AssetModalProps = {
  isDialogOpen: boolean
  setIsDialogOpen: (value: boolean) => void
  asset?: BankAccount
}

const BankAccountModal: React.FC<AssetModalProps> = ({ isDialogOpen, setIsDialogOpen, asset }: AssetModalProps) => {
  const assetForm = useForm<AddBankAccountSchema>({
    resolver: zodResolver(addBankAccountSchema),
    defaultValues: asset
      ? {
          name: asset.name,
          balance: asset.balance, // Convert to number
          interest_rate: asset.interest_rate,
          id: asset.acc_id,
        }
      : {},
  })
  const fields: Array<Array<FieldProp>> = [
    [
      {
        name: 'balance',
        label: 'Opening Balance',
        placeholder: '10,000',
        type: 'number',
        error: assetForm.formState.errors.balance,
        icon: <IndianRupee className='mr-2 h-4 w-4' />,
      },
      {
        name: 'id',
        label: 'Account ID',
        placeholder: '0123456789',
        type: 'text',
        error: assetForm.formState.errors.id,
      },
    ],
    [
      {
        name: 'interest_rate',
        label: 'Interest Rate',
        placeholder: '4',
        type: 'number',
        error: assetForm.formState.errors.interest_rate,
        icon: <Percent />,
      },
    ],
  ]

  return (
    <AssetModal
      isDialogOpen={isDialogOpen}
      setIsDialogOpen={setIsDialogOpen}
      description='Add your Bank Account Details. And specify expected returns to gauge your
      total financial performance over past and future'
      fields={fields}
      assetForm={assetForm}
      addMutation={addBankAccount}
    />
  )
}

export default BankAccountModal
