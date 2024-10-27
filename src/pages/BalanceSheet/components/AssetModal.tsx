import React, { useEffect, useState } from 'react'
import { FieldError, UseFormReturn } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { House } from 'lucide-react'
import GenericFormField, { CancelButton, DetailField, Field, FieldContainer, SaveButton } from '@/components/ui/form-v1'
import logger from '@/logger'
import { AddMetalSchema, AddPhysicalAssetSchemaV1 } from '@/schema/balance-sheet'
import { BALANCE_SHEET } from '@/utils/query-keys'
import { getErrorMessage } from '@/utils/utils'
import { toast } from '@/components/ui/use-toast'
import DatePickerV1 from '@/components/DatePicker/DatePickerV1'
import AssetTypeSelect from '@/pages/BalanceSheet/components/AssetTypeSelect'
import { useModalDispatch, useModalState } from '@/pages/BalanceSheet/components/ModalContext'

type FieldName = 'name' | 'purchase_value' | 'purchase_date' | 'expected_returns' | 'type'
export type FieldProp = {
  name: FieldName
  label: string
  placeholder: string
  type: string
  error: FieldError | undefined
  icon?: React.ReactNode
  choices?: string[]
}
type AssetModalProps = {
  isDialogOpen: boolean
  setIsDialogOpen: (value: boolean) => void
  description: string
  fields: Array<Array<FieldProp>>
  assetForm: UseFormReturn<AddPhysicalAssetSchemaV1>
  addMutation: (data: any) => any
}
export default function AssetModal({
  isDialogOpen,
  setIsDialogOpen,
  description,
  fields,
  assetForm,
  addMutation,
}: AssetModalProps) {
  const activeModal = useModalState()
  const dispatch = useModalDispatch()
  const fieldInputStyle =
    "bg-inherit text-black font-normal font-['Charter'] leading-snug focus:outline-none text-right min-w-10 max-w-30 max-h-40"
  const qc = useQueryClient()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const dateChangeHandler = (date: Date | undefined) => {
    setSelectedDate(date)
    if (date) {
      assetForm.setValue('purchase_date', date)
    }
  }
  const addPhysicalAssetMutation = useMutation({
    mutationFn: addMutation,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [BALANCE_SHEET.ASSETS] })
      toast({ title: 'Asset created successfully!' })
      setIsDialogOpen(false)
    },
    onError: (err) => toast(getErrorMessage(err)),
  })
  const handleAddOrEditAsset = (data: AddPhysicalAssetSchemaV1 | AddMetalSchema) => {
    logger.info(data)
    addPhysicalAssetMutation.mutate(data)
  }
  const onCancel = () => {
    setIsDialogOpen(false)
  }
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible)
  }

  useEffect(() => {
    assetForm.clearErrors()
  }, [assetForm, isDialogOpen])

  const hasTypeField = fields.some((fieldSet) => fieldSet.some((field) => field.name === 'type'))

  return (
    <form onSubmit={assetForm.handleSubmit(handleAddOrEditAsset)}>
      <div className='h-auto p-[25px] bg-accent rounded-[10px] shadow justify-start items-start gap-[31px] inline-flex'>
        <div className='flex-col justify-center items-start gap-2.5 inline-flex'>
          <div className="text-right text-black text-2xl font-bold font-['Charter'] leading-[33.60px]">About</div>
          <div className="w-[270px] h-[150px] text-black text-[15px] font-normal font-['Charter'] leading-[21px]">
            {description}
          </div>
        </div>
        <div className='flex-col justify-start items-start gap-[31px] inline-flex relative'>
          <AssetTypeSelect toggleOverlay={toggleOverlay} dispatch={dispatch} payload={activeModal}>
            <House />
          </AssetTypeSelect>
          {isOverlayVisible && (
            <div className='absolute bg-white shadow-md rounded-lg mt-[32px] left-0 flex flex-col'>
              <AssetTypeSelect toggleOverlay={toggleOverlay} asOption={true} dispatch={dispatch} payload='Real Estate'>
                <House />
              </AssetTypeSelect>
              <AssetTypeSelect toggleOverlay={toggleOverlay} asOption={true} dispatch={dispatch} payload='Metal'>
                <House />
              </AssetTypeSelect>
              <AssetTypeSelect toggleOverlay={toggleOverlay} asOption={true} dispatch={dispatch} payload='Equity'>
                <House />
              </AssetTypeSelect>
              <AssetTypeSelect toggleOverlay={toggleOverlay} asOption={true} dispatch={dispatch} payload='Bank Account'>
                <House />
              </AssetTypeSelect>
              <AssetTypeSelect toggleOverlay={toggleOverlay} asOption={true} dispatch={dispatch} payload='Mutual Fund'>
                <House />
              </AssetTypeSelect>
            </div>
          )}
          <Field error={assetForm.formState.errors.name}>
            <GenericFormField
              name={'name'}
              register={assetForm.register}
              placeholder={'Asset Name'}
              textAlign={'left'}
              className="w-full bg-inherit self-stretch text-black/25 text-4xl font-normal font-['Charter'] leading-9
              focus:outline-none"
            />
          </Field>
          {/*Container of Essential Fields*/}
          {fields.map((fieldSet, index) => (
            <FieldContainer key={index}>
              {fieldSet.map((field) => (
                <DetailField key={field.name} label={field.label} error={field.error}>
                  <div className='justify-start items-center gap-[5px] inline-flex'>
                    {field.type === 'date' ? (
                      <GenericFormField
                        type={'text'}
                        placeholder={field.placeholder}
                        register={assetForm.register}
                        name={field.name}
                        className={fieldInputStyle}
                        value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
                      />
                    ) : field.type === 'choice' ? (
                      <GenericFormField
                        type={field.type}
                        placeholder={field.placeholder}
                        register={assetForm.register}
                        name={field.name}
                        className={fieldInputStyle}
                        choices={field.choices}
                      />
                    ) : (
                      <GenericFormField
                        type={field.type}
                        placeholder={field.placeholder}
                        register={assetForm.register}
                        valueAsNumber={field.type === 'number'}
                        name={field.name}
                        className={fieldInputStyle}
                      />
                    )}
                    <div className='ml-2'>
                      {field.type === 'date' ? (
                        <DatePickerV1 value={selectedDate} onChange={dateChangeHandler} />
                      ) : field.icon ? (
                        <div className='mr-2 h-4 w-4'>
                          {React.cloneElement(field.icon as React.ReactElement, { width: 15, height: 15 })}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </DetailField>
              ))}
            </FieldContainer>
          ))}
          <div className='self-stretch justify-between items-start inline-flex'>
            <CancelButton clickHandler={onCancel} />
            <SaveButton />
          </div>
        </div>
      </div>
      {!hasTypeField && <input type='hidden' {...assetForm.register('type')} value='1' />}
    </form>
  )
}
