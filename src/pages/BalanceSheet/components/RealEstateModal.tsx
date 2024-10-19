import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IndianRupee, Percent } from 'lucide-react'
import AssetModal, { FieldProp } from '@/pages/BalanceSheet/components/AssetModal'
import { addPhysicalAssetSchemaV1, AddPhysicalAssetSchemaV1 } from '@/schema/balance-sheet'
import DatePickerV1 from '@/components/DatePicker/DatePickerV1'

type AssetModalProps = {
  isDialogOpen: boolean
  setIsDialogOpen: (value: boolean) => void
  dispatch: React.Dispatch<{
    type: 'SET_MODAL'
    payload: 'Real Estate' | 'Metal' | 'Equity' | 'Bank Account' | 'Mutual Fund'
  }>
}

export default function RealEstateModal({ isDialogOpen, setIsDialogOpen, dispatch }: AssetModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const assetForm = useForm<AddPhysicalAssetSchemaV1>({
    resolver: zodResolver(addPhysicalAssetSchemaV1),
  })
  const fields: Array<Array<FieldProp>> = [
    [
      {
        name: 'purchase_date',
        label: 'Bought On',
        placeholder: '40,00,000',
        type: 'number',
        error: assetForm.formState.errors.purchase_date,
        icon: (
          <DatePickerV1
            value={selectedDate}
            onChange={(date) => {
              setSelectedDate(date)
              if (date) {
                assetForm.setValue('purchase_date', date)
              }
            }}
            className='mr-2 h-4 w-4'
          />
        ),
      },
      {
        name: 'purchase_value',
        label: 'At Price',
        placeholder: 'Sun, 14 Jul',
        type: 'number',
        error: assetForm.formState.errors.purchase_date,
        icon: <IndianRupee className='mr-2 h-4 w-4' />,
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
      description='Add any Real Estate properties that you own. Flat in an apartment, Commercial shop.
      And specify expected returns to gauge your total financial performance over past and future '
      fields={fields}
      dispatch={dispatch}
      assetForm={assetForm}
    />
  )
}
