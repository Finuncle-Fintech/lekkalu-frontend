import React, { cloneElement, useEffect, useState } from 'react'
import { ChevronDown, House, IndianRupee, Percent } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog-v1'
import DatePickerV1 from '@/components/DatePicker/DatePickerV1'
import GenericFormField, { DetailField, Field, FieldContainer } from '@/components/ui/form-v1'
import logger from '@/logger'
import { AddPhysicalAssetSchemaV1, addPhysicalAssetSchemaV1 } from '@/schema/balance-sheet'
import { addPhysicalAssetV1 } from '@/queries/balance-sheet'
import { BALANCE_SHEET } from '@/utils/query-keys'
import { getErrorMessage } from '@/utils/utils'
import { toast } from '@/components/ui/use-toast'

type Props = {
  trigger: React.ReactElement
}
const SaveButton = () => (
  <div className='w-[59px] h-[21px] px-[5px] bg-[#154181] rounded-[5px] justify-center items-center gap-2.5 flex'>
    <button type='submit' className="text-white text-[13px] font-normal font-['Charter']">
      Save
    </button>
  </div>
)

interface CancelButtonProps {
  clickHandler: () => void
}

const CancelButton: React.FC<CancelButtonProps> = ({ clickHandler }) => (
  <div className='w-[59px] h-[21px] px-[5px] bg-[#154181]/20 rounded-[5px] justify-center items-center gap-2.5 flex'>
    <button className="text-black text-[13px] font-normal font-['Charter']" onClick={clickHandler}>
      Cancel
    </button>
  </div>
)

export default function AddOrEditAssetDialogV1({ trigger }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [theme] = useState('light')
  const qc = useQueryClient()

  const form = useForm<AddPhysicalAssetSchemaV1>({
    resolver: zodResolver(addPhysicalAssetSchemaV1),
  })
  const addPhysicalAssetMutation = useMutation({
    mutationFn: addPhysicalAssetV1,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [BALANCE_SHEET.ASSETS] })
      toast({ title: 'Asset created successfully!' })
      setIsDialogOpen(false)
    },
    onError: (err) => toast(getErrorMessage(err)),
  })

  // This function will be executed when the form is successfully submitted
  const handleAddOrEditPhysicalAsset = (data: AddPhysicalAssetSchemaV1) => {
    logger.info(data)
    addPhysicalAssetMutation.mutate(data)
  }
  const onCancel = () => {
    setIsDialogOpen(false)
  }
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
  useEffect(() => {
    form.clearErrors()
  }, [form, isDialogOpen])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

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
        <form onSubmit={form.handleSubmit(handleAddOrEditPhysicalAsset)}>
          <div className='h-auto p-[25px] bg-accent rounded-[10px] shadow justify-start items-start gap-[31px] inline-flex'>
            <div className='flex-col justify-center items-start gap-2.5 inline-flex'>
              <div className="text-right text-black text-2xl font-bold font-['Charter'] leading-[33.60px]">About</div>
              <div className="w-[270px] h-[150px] text-black text-[15px] font-normal font-['Charter'] leading-[21px]">
                Add any Real Estate properties that you own. Flat in an apartment, Commercial shop. And specify expected
                returns to gauge your total financial performance over past and future
              </div>
            </div>
            <div className='flex-col justify-start items-start gap-[31px] inline-flex'>
              <div
                onClick={() => {
                  // Your click handler logic here
                  console.log('Element clicked!')
                }}
                className='px-2.5 py-[5px] bg-[#c6ddff] rounded-[5px] justify-center items-center gap-2.5 inline-flex cursor-pointer'
              >
                <div className='w-[15px] h-[15px] relative'>
                  <House className='w-[15px] h-[15px]' />
                </div>
                <div className="text-black text-base font-normal font-['Charter'] leading-snug">Real Estate</div>
                <div className='w-[15px] h-[15px] p-[1.25px] justify-center items-center flex'>
                  <ChevronDown className='w-[15px] h-[15px]' />
                </div>
              </div>
              <Field error={form.formState.errors.name}>
                <GenericFormField
                  name={'name'}
                  register={form.register}
                  placeholder={'Asset Name'}
                  className="w-full bg-inherit self-stretch text-black/25 text-4xl font-normal font-['Charter'] leading-9
              focus:outline-none"
                />
              </Field>
              {/*Container of Essential Fields*/}
              <FieldContainer>
                {/*Bought Date Field*/}
                <DetailField label='Bought on' error={form.formState.errors.purchase_date}>
                  <div className='justify-start items-center gap-[5px]  inline-flex'>
                    <GenericFormField
                      type='text'
                      placeholder='Sun, 14 Jul'
                      register={form.register}
                      name='purchase_date'
                      className="bg-inherit text-black text-base font-normal font-['Charter'] leading-snug
                      whitespace-nowrap"
                      disabled={true}
                      textAlign='right'
                      value={selectedDate ? selectedDate.toISOString().split('T')[0] : undefined}
                    />
                    <DatePickerV1
                      value={selectedDate}
                      onChange={(date) => {
                        setSelectedDate(date)
                        if (date) {
                          form.setValue('purchase_date', date)
                        }
                      }}
                      className='mr-2 h-4 w-4'
                    />
                  </div>
                </DetailField>
                {/*Bought Price Field*/}
                <DetailField label='At Price' error={form.formState.errors.purchase_value} field_name='buy_price'>
                  <div className='justify-start items-center gap-[5px] inline-flex'>
                    <GenericFormField
                      type='number'
                      placeholder='40,00,000'
                      register={form.register}
                      valueAsNumber={true}
                      name='purchase_value'
                      className="bg-inherit text-black font-normal font-['Charter'] leading-snug focus:outline-none
                      text-right min-w-10 max-w-20"
                    />
                    <IndianRupee className='mr-2 h-4 w-4' />
                  </div>
                </DetailField>
              </FieldContainer>
              <FieldContainer>
                <DetailField
                  label='Expected Returns'
                  error={form.formState.errors.expected_returns}
                  field_name={'expected_returns'}
                >
                  <div className='justify-start items-center gap-[5px] inline-flex'>
                    <GenericFormField
                      type='number'
                      name='expected_returns'
                      register={form.register}
                      valueAsNumber={true}
                      placeholder='4'
                      className="bg-inherit text-black font-normal font-[' Charter'] leading-snug focus:outline-none
                      min-w-10 max-w-20"
                      textAlign='right'
                    />
                    <Percent className='mr-2 h-4 w-4' />
                  </div>
                </DetailField>
              </FieldContainer>
              <div className='self-stretch justify-between items-start inline-flex'>
                <CancelButton clickHandler={onCancel} />
                <SaveButton />
              </div>
            </div>
          </div>
          <input type='hidden' {...form.register('type')} value='1' />
        </form>
      </DialogContent>
    </Dialog>
  )
}

// todo: this dialog on mobile devices
