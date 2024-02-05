import React, { useMemo } from 'react'
import { LoaderIcon, PencilIcon } from 'lucide-react'
import dayjs from 'dayjs'
import { useQuery } from '@tanstack/react-query'
import { TableCell, TableRow } from '@/components/ui/table'
import AddOrEditTransaction from './AddOrEditTransaction'
import { Button } from '@/components/ui/button'
import DeleteLendingTransaction from './DeleteLendingTransaction'
import { LENDING } from '@/utils/query-keys'
import { fetchLendingTransaction } from '@/queries/lending'
import When from '@/components/When/When'

export default function TransactionListTable({ acc }: { acc: { name: string; id: number } }) {
  const { data: transactions, isLoading } = useQuery([LENDING.TRANSACTIONS], fetchLendingTransaction)
  const transactionList = useMemo(() => {
    if (!transactions) return []
    return transactions.filter((t) => t.lending_account === acc.id)
  }, [transactions, acc.id])
  return (
    <>
      <When truthy={isLoading}>
        <div className='absolute inset-0 flex items-center justify-center bg-background/80'>
          <LoaderIcon className='animate-spin w-4 h-4' />
        </div>
      </When>
      {transactionList
        ? transactionList.map((trans) => (
            <TableRow className='bg-gray-200/50 hover:bg-gray-100/50' key={trans.id}>
              <TableCell>{trans.note || 'No Note'}</TableCell>
              <TableCell>{trans.payment_method || 'No Method'}</TableCell>
              <TableCell>{trans.amount || 'N/A'}</TableCell>
              <TableCell>{trans.reference_no || 'No Ref.no'}</TableCell>
              <TableCell>{dayjs(trans.time).format('ddd MMM DD, YYYY')}</TableCell>
              <TableCell className='space-x-2 cursor-pointer'>
                <AddOrEditTransaction
                  transaction={trans}
                  trigger={
                    <Button variant='outline' size='sm'>
                      <PencilIcon className='w-4 h-4' />
                    </Button>
                  }
                />
                <DeleteLendingTransaction id={trans?.id as number} />
              </TableCell>
            </TableRow>
          ))
        : null}
    </>
  )
}
