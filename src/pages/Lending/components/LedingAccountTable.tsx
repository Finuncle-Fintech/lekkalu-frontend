import React, { useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { ChevronDown, ChevronUp, LoaderIcon, PencilIcon } from 'lucide-react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Accounts } from '@/types/lending'
import { LENDING } from '@/utils/query-keys'
import { Button } from '@/components/ui/button'
import TransactionListTable from './TransactionListTable'
import AddOrEditLending from './AddOrEditLending'
import DeleteLendingAccount from './DeleteLendingAccount'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import When from '@/components/When/When'

type Props = {
  queryFn: () => Promise<Accounts[]>
}

export default function LedingAccountTable({ queryFn }: Props) {
  const [activeTab, setActiveTab] = React.useState<number[]>([])

  const { data, isFetching } = useQuery([LENDING.ACCOUNTS], queryFn)

  const handleSetActiveTab = useCallback((deps: number) => {
    setActiveTab((prevActiveTab) => {
      if (prevActiveTab.includes(deps)) {
        return prevActiveTab.filter((v) => v !== deps)
      } else {
        return [...prevActiveTab, deps]
      }
    })
  }, [])

  return (
    <div className='space-y-4'>
      <Table>
        <TableCaption className='text-center'>
          {data?.length === 0 ? 'No Lending Accounts Found' : 'A list of Lending Accounts'}
        </TableCaption>
        <TableHeader className='bg-gray-100/50'>
          <TableRow>
            <TableHead className='font-medium'>Name</TableHead>
            <TableHead className='font-medium'>Email</TableHead>
            <TableHead className='font-medium'>Balance</TableHead>
            <TableHead className='font-medium'>Remarks</TableHead>
            <TableHead className='font-medium'>Started</TableHead>
            <TableHead className='font-medium'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <When truthy={isFetching}>
            <div className='absolute inset-0 flex items-center justify-center bg-background/80'>
              <LoaderIcon className='animate-spin w-4 h-4' />
            </div>
          </When>
          {data
            ? data.map((account) => (
                <Collapsible key={account.id} asChild>
                  <>
                    <TableRow>
                      <TableCell className='cursor-pointer'>{account.name}</TableCell>
                      <TableCell className='cursor-pointer'>{account.partner_email}</TableCell>
                      <TableCell className='cursor-pointer'>
                        <div className='flex items-center gap-2 cursor-pointer'>
                          {account.balance || 'N/A'}

                          <CollapsibleTrigger onClick={() => handleSetActiveTab(account.id)} asChild>
                            {activeTab.includes(account.id) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </CollapsibleTrigger>
                        </div>
                      </TableCell>
                      <TableCell className='cursor-pointer'>{account.user_remark || 'N/A'}</TableCell>
                      <TableCell>{dayjs(account.started).format('ddd MMM DD, YYYY')}</TableCell>
                      <TableCell className='space-x-2 cursor-pointer'>
                        <AddOrEditLending
                          accounts={account as any}
                          trigger={
                            <Button variant='outline' size='sm'>
                              <PencilIcon className='w-4 h-4' />
                            </Button>
                          }
                        />
                        <DeleteLendingAccount id={account.id} />
                      </TableCell>
                    </TableRow>
                    <CollapsibleContent asChild>
                      <TransactionListTable acc={{ name: account.name, id: account.id }} />
                    </CollapsibleContent>
                  </>
                </Collapsible>
              ))
            : null}
        </TableBody>
      </Table>
    </div>
  )
}
