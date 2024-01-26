import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Eye, LoaderIcon, PencilIcon } from 'lucide-react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import When from '@/components/When/When'
import { Accounts } from '@/types/lending'
import { LENDING } from '@/utils/query-keys'
import { Button } from '@/components/ui/button'
import AddOrEditLending from './AddOrEditLending'
import DeleteLendingAccount from './DeleteLendingAccount'
// import { Button } from '@/components/ui/button'
// import { AddIncomeStatementSchema } from '@/schema/income-statement'

type Props = {
  queryFn: () => Promise<Accounts[]>
  //   createMutationFn: (dto: AddIncomeStatementSchema) => Promise<void>
  //   updateMutationFn: (id: number, dto: AddIncomeStatementSchema) => Promise<void>
  //   deleteMutationFn: (id: number) => Promise<void>
}

export default function LedingTransactionTable({
  queryFn,
  //   createMutationFn,
  //   updateMutationFn,
  //   deleteMutationFn,
}: Props) {
  const { data, isFetching } = useQuery([LENDING.ACCOUNTS], queryFn)
  return (
    <div className='space-y-4'>
      {/* <div className='flex items-center justify-end'>
        <AddOrEditIncomeExpense
          trigger={<Button>Add {capitalize(type)}</Button>}
          type={type}
          createMutationFn={createMutationFn}
          updateMutationFn={updateMutationFn}
        />
      </div> */}
      <Table className='border rounded'>
        <TableCaption className='text-center'>A list of Lending Accounts</TableCaption>
        <TableHeader className='bg-gray-100/50'>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Balance</TableHead>
            <TableHead>Remarks</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='relative'>
          <When truthy={isFetching}>
            <div className='absolute inset-0 flex items-center justify-center bg-background/80'>
              <LoaderIcon className='animate-spin w-4 h-4' />
            </div>
          </When>

          {data?.map((account) => (
            <TableRow key={account.id}>
              <TableCell>{account.name}</TableCell>
              <TableCell>{account.partner_email}</TableCell>
              <TableCell>{account.balance || 'N/A'}</TableCell>
              <TableCell>{account.user_remark || 'N/A'}</TableCell>
              <TableCell className='space-x-2'>
                <Button size='sm' variant='outline'>
                  <Eye className='w-4 h-5' />
                </Button>
                <AddOrEditLending
                  accounts={account}
                  trigger={
                    <Button variant='outline' size='sm'>
                      <PencilIcon className='w-4 h-4' />
                    </Button>
                  }
                />
                <DeleteLendingAccount id={account.id} />
                {/* <AddOrEditIncomeExpense
                  trigger={
                    <Button size='sm' variant='outline'>
                      <PencilIcon className='w-4 h-5' />
                    </Button>
                  }
                  type={type}
                  createMutationFn={createMutationFn}
                  updateMutationFn={updateMutationFn}
                  incomeStatement={incomeStatement}
                />

                <DeleteIncomeStatement id={incomeStatement.id} type={type} deleteMutationFn={deleteMutationFn} /> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
