import React, { useMemo } from 'react'
import { LoaderIcon, EditIcon } from 'lucide-react'
import dayjs from 'dayjs'
import { useQuery } from '@tanstack/react-query'
import { TableCell, TableRow } from '@/components/ui/table'
import AddOrEditTransaction from './AddOrEditTransaction'
import { Button } from '@/components/ui/button'
import DeleteLendingTransaction from './DeleteLendingTransaction'
import { LENDING } from '@/utils/query-keys'
import { fetchLendingTransaction } from '@/queries/lending'
import When from '@/components/When/When'
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible'

export default function TransactionListTable({ acc, isOpen }: { acc: { name: string; id: number }; isOpen: boolean }) {
  const { data: transactions, isLoading } = useQuery([LENDING.TRANSACTIONS], fetchLendingTransaction)
  const transactionList = useMemo(() => {
    if (!transactions) return []
    return transactions.filter((t) => t.lending_account?.toString() === acc.id?.toString())
  }, [transactions, acc.id])

  return (
    <Collapsible open={isOpen} asChild>
      <CollapsibleContent asChild>
        <>
          <When truthy={isLoading}>
            <div className='absolute inset-0 flex items-center justify-center bg-background/80'>
              <LoaderIcon className='animate-spin w-4 h-4' />
            </div>
          </When>
          {transactionList
            ? transactionList.map((trans) => (
                <TableRow
                  className={
                    (trans?.amount as number) < 0 ? 'bg-red-200 hover:bg-red-300' : 'bg-green-200 hover:bg-green-300'
                  }
                  key={trans.id}
                >
                  <TableCell>{trans.payment_method || 'No Method'}</TableCell>
                  <TableCell>{Math.abs(trans.amount as number) || 'N/A'}</TableCell>
                  <TableCell>{trans.reference_no || 'No Ref.no'}</TableCell>
                  <TableCell>{dayjs(trans.time).format('ddd MMM DD, YYYY')}</TableCell>
                  <TableCell className='space-x-2 cursor-pointer min-w-[120px]'>
                    <AddOrEditTransaction
                      transaction={trans}
                      trigger={
                        <Button variant='ghost' size='sm'>
                          <EditIcon className='w-4 h-4' />
                        </Button>
                      }
                    />
                    <DeleteLendingTransaction id={trans?.id as number} />
                  </TableCell>
                </TableRow>
              ))
            : null}
        </>
      </CollapsibleContent>
    </Collapsible>
  )
}
