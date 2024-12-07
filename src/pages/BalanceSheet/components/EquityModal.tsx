import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IndianRupee, Percent } from 'lucide-react'
import React from 'react'
import AssetModal, { FieldProp } from '@/pages/BalanceSheet/components/AssetModal'
import { AddEquitySchema, addPhysicalAssetSchemaV1 } from '@/schema/balance-sheet'
import { PhysicalAsset } from '@/types/balance-sheet'
import { addEquity } from '@/queries/balance-sheet'

type AssetModalProps = {
  isDialogOpen: boolean
  setIsDialogOpen: (value: boolean) => void
  asset?: PhysicalAsset
}

const EquityModal: React.FC<AssetModalProps> = ({ isDialogOpen, setIsDialogOpen, asset }: AssetModalProps) => {
  const assetForm = useForm<AddEquitySchema>({
    resolver: zodResolver(addPhysicalAssetSchemaV1),
    defaultValues: asset
      ? {
          name: asset.name,
          purchase_date: new Date(asset.purchase_date), // Convert to Date object
          purchase_value: parseFloat(asset.purchase_value), // Convert to number
          expected_returns: -asset.depreciation_percent_per_year,
          type: asset.type.toString(), // Convert to string
        }
      : {},
  })
  const fields: Array<Array<FieldProp>> = [
    [
      {
        name: 'purchase_date',
        label: 'Bought On',
        placeholder: 'Sun, 14 Jul',
        type: 'date',
        error: assetForm.formState.errors.purchase_date,
        icon: null,
      },
      {
        name: 'purchase_value',
        label: 'At Price',
        placeholder: '40,00,000',
        type: 'number',
        error: assetForm.formState.errors.purchase_date,
        icon: <IndianRupee className='mr-2 h-4 w-4' />,
      },
      {
        name: 'quantity',
        label: 'Quantity',
        placeholder: '100',
        type: 'number',
        error: assetForm.formState.errors.quantity,
        icon: null,
      },
    ],
    [
      {
        name: 'expected_returns',
        label: 'Expected Returns',
        placeholder: '4',
        type: 'number',
        error: assetForm.formState.errors.expected_returns,
        icon: <Percent />,
      },
    ],
  ]

  return (
    <AssetModal
      isDialogOpen={isDialogOpen}
      setIsDialogOpen={setIsDialogOpen}
      description='Add any Shares in Stock Market or ESPP/RSU Stocks that you own.
      And specify expected returns to gauge your total financial performance over past and future'
      fields={fields}
      assetForm={assetForm}
      addMutation={addEquity}
    />
  )
}

export default EquityModal
