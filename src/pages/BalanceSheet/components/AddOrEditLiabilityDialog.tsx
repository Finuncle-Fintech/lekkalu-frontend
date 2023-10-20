import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PlusIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useToast } from '@/components/ui/use-toast'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import InputFieldsRenderer from '@/components/InputFieldsRenderer/InputFieldsRenderer'
import { AddLiabilitySchema, addLiabilitySchema } from '@/schema/balance-sheet'
import { addLiability } from '@/queries/balance-sheet'
import { LIABILITY_INPUTS } from '@/utils/balance-sheet'
import { Liability } from '@/types/balance-sheet'
import { BALANCE_SHEET } from '@/utils/query-keys'
import { DATE_FORMAT } from '@/utils/constants'

type Props = {
  liability?: Liability
}

export default function AddOrEditLiabilityDialog({ liability }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()
  const qc = useQueryClient()
  const isEdit = Boolean(liability)

  const form = useForm<AddLiabilitySchema>({
    resolver: zodResolver(addLiabilitySchema),
  })

  const addLiabilityMutation = useMutation(addLiability, {
    onSuccess: () => {
      qc.invalidateQueries([BALANCE_SHEET.LIABILITIES])
      toast({ title: 'Liability created successfully!' })
    },
    onError: () => {
      toast({ title: 'Something went wrong!', variant: 'destructive' })
    },
  })

  const handleCreateOrEdit = (values: AddLiabilitySchema) => {
    addLiabilityMutation.mutate({ ...values, disbursement_date: dayjs(values.disbursement_date).format(DATE_FORMAT) })
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        asChild
        onClick={() => {
          setIsDialogOpen(true)
        }}
      >
        <Button>
          <PlusIcon className='mr-2 w-4 h-4' />
          <span>{isEdit ? 'Edit' : 'Add'} Liability</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[800px] overflow-auto'>
        <DialogHeader>
          <DialogTitle>Add Liability</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreateOrEdit)} className='grid md:grid-cols-2 gap-4'>
            <InputFieldsRenderer control={form.control} inputs={LIABILITY_INPUTS} />

            <DialogFooter className='gap-2 md:col-span-2'>
              <Button
                type='button'
                variant='outline'
                onClick={() => {
                  setIsDialogOpen(false)
                }}
              >
                Cancel
              </Button>
              <Button type='submit' loading={addLiabilityMutation.isLoading}>
                {isEdit ? 'Edit' : 'Add'} Liability
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
