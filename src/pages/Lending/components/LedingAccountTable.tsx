import React, { useCallback, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { ChevronDown, ChevronUp, EditIcon, LoaderIcon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Accounts } from '@/types/lending'
import { Button } from '@/components/ui/button'
import TransactionListTable from './TransactionListTable'
import AddOrEditLending from './AddOrEditLending/AddOrEditLending'
import DeleteLendingAccount from './DeleteLendingAccount'
import When from '@/components/When/When'
import { LENDING } from '@/utils/query-keys'
import { fetchLendingAccounts } from '@/queries/lending'
import { formatIndianMoneyNotation } from '@/utils/format-money'
import { Badge } from '@/components/ui/badge'

const ClickableTableRow = ({
  account,
  handleSetActiveTab,
  activeTab,
}: {
  account: Accounts
  handleSetActiveTab: (deps: number) => void
  activeTab: number[]
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleCollapsible = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      <TableRow
        onClick={() => {
          handleSetActiveTab(account.id)
          toggleCollapsible()
        }}
        className='cursor-pointer'
      >
        <TableCell>
          <div className='flex items-center gap-2'>
            {activeTab.includes(account.id) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            {account.name}
          </div>
        </TableCell>
        <TableCell>
          <div className='flex items-center gap-2 cursor-pointer'>
            <Badge className={`${account.balance < 0 ? 'bg-red-500' : 'bg-green-500'} h-3 w-3 p-0`} />
            {formatIndianMoneyNotation(account.balance) || 'N/A'}
          </div>
        </TableCell>
        <TableCell>{account.user_remark || 'N/A'}</TableCell>
        <TableCell className='min-w-[150px]'>{dayjs(account.started).format('ddd MMM DD, YYYY')}</TableCell>
        <TableCell className='space-x-2 min-w-[120px]'>
          <AddOrEditLending
            accounts={account as any}
            trigger={
              <Button size='sm' variant='ghost'>
                <EditIcon className='w-4 h-4' />
              </Button>
            }
          />
          <DeleteLendingAccount id={account.id} />
        </TableCell>
      </TableRow>
      <TransactionListTable isOpen={isOpen} acc={{ name: account.name, id: account.id }} />
    </>
  )
}
export default function LedingAccountTable() {
  const [activeTab, setActiveTab] = React.useState<number[]>([])
  const { data, isFetching } = useQuery({ queryKey: [LENDING.ACCOUNTS], queryFn: fetchLendingAccounts })

  const handleSetActiveTab = useCallback((deps: number) => {
    setActiveTab((prevActiveTab) => {
      if (prevActiveTab.includes(deps)) {
        return prevActiveTab.filter((v) => v !== deps)
      } else {
        return [...prevActiveTab, deps]
      }
    })
  }, [])
  const sortedAccounts = useMemo(() => {
    return data?.sort((a, b) => a.balance - b.balance).reverse() || []
  }, [data])

  return (
    <div className='space-y-4'>
      <Table>
        <TableCaption className='text-center'>
          {sortedAccounts?.length === 0 ? 'No Lending Accounts Found' : 'A list of Lending Accounts'}
        </TableCaption>
        <TableHeader className='bg-gray-100/50'>
          <TableRow>
            <TableHead className='font-medium'>Name</TableHead>
            <TableHead className='font-medium'>Balance</TableHead>
            <TableHead className='font-medium'>Remarks</TableHead>
            <TableHead className='font-medium'>Transaction Date</TableHead>
            <TableHead className='font-medium'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <When truthy={isFetching}>
            <div className='absolute inset-0 flex items-center justify-center bg-background/80'>
              <LoaderIcon className='animate-spin w-4 h-4' />
            </div>
          </When>
          {sortedAccounts
            ? sortedAccounts.map((account: Accounts) => (
                <ClickableTableRow
                  key={account.id}
                  handleSetActiveTab={handleSetActiveTab}
                  activeTab={activeTab}
                  account={account}
                />
              ))
            : null}
        </TableBody>
      </Table>
    </div>
  )
}
