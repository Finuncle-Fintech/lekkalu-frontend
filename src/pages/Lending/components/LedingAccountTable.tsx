/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
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
import { SortIconProps, SortableColumnType, LendingTableSort } from '../types/LendingTypes'
import useLendingTableSort from '../hooks/useLendingTableSort'

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

const Sort = ({ id, sortBy }: SortIconProps) => {
  const isUp = id === sortBy.columnName && sortBy.orderBy === 'asc'
  const isDown = id === sortBy.columnName && sortBy.orderBy === 'desc'
  return (
    <div className='flex flex-col gap-0'>
      <ChevronUp size={15} className={isUp ? 'text-red-500' : ''} />
      <ChevronDown size={15} className={isDown ? 'text-red-500' : ''} />
    </div>
  )
}

const SortableTableHead = (props: SortableColumnType) => {
  const { isSortable, children } = props
  function assignOrderBy(currentOrder: string) {
    switch (currentOrder) {
      case 'asc':
        return 'desc'
      case 'desc':
        return 'none'
      case 'none':
        return 'asc'
      default:
        return 'none'
    }
  }
  if (!isSortable) {
    return (
      <TableHead className={'font-medium'}>
        <div className='flex justify-between items-center'>{children}</div>
      </TableHead>
    )
  }
  return (
    <TableHead
      className={`font-medium ${isSortable ? 'hover:bg-slate-200 hover:cursor-pointer' : ''}`}
      onClick={() => {
        props.setSortBy((value) => {
          return {
            orderBy: assignOrderBy(value.orderBy),
            columnName: props.id,
          }
        })
      }}
    >
      <div className='flex justify-between items-center'>
        {children} {isSortable ? <Sort id={props.id} sortBy={props.sortBy} /> : <></>}
      </div>
    </TableHead>
  )
}

export default function LedingAccountTable() {
  const [activeTab, setActiveTab] = React.useState<number[]>([])
  // const [sortBy, setSortBy] = useState<LendingTableSort>({ columnName: 'balance', orderBy: 'none' })

  // const [accountData, setAccountData] = useState<Accounts[]>([])

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: [LENDING.ACCOUNTS],
    queryFn: fetchLendingAccounts,
  })

  const {
    handleSort,
    setSortBy,
    sortBy,
    sortedData: accountData,
    setSortedData: setAccountData,
  } = useLendingTableSort({ data })

  useEffect(() => {
    if (isSuccess) {
      setAccountData(data)
    }
  }, [data, isSuccess])

  const handleSetActiveTab = useCallback((deps: number) => {
    setActiveTab((prevActiveTab) => {
      if (prevActiveTab.includes(deps)) {
        return prevActiveTab.filter((v) => v !== deps)
      } else {
        return [...prevActiveTab, deps]
      }
    })
  }, [])
  // const sortedAccounts = useMemo(() => {
  //   return data?.sort((a, b) => a.balance - b.balance).reverse() || []
  // }, [data])

  useEffect(() => {
    const _data = handleSort(data ?? [], sortBy.columnName, sortBy.orderBy)
    setAccountData(_data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy])

  return (
    <div className='space-y-4 bg-slate-50 rounded-lg shadow'>
      <Table className='bg-white'>
        <TableCaption className='text-center'>
          {accountData?.length === 0 ? 'No Lending Accounts Found' : 'A list of Lending Accounts'}
        </TableCaption>
        <TableHeader className='bg-gray-100/50'>
          <TableRow>
            <SortableTableHead isSortable sortBy={sortBy} setSortBy={setSortBy} id='name'>
              Name
            </SortableTableHead>
            <SortableTableHead isSortable sortBy={sortBy} setSortBy={setSortBy} id='balance'>
              Balance
            </SortableTableHead>
            <SortableTableHead>Remarks</SortableTableHead>
            <SortableTableHead isSortable sortBy={sortBy} setSortBy={setSortBy} id='started'>
              Transaction Date
            </SortableTableHead>
            <SortableTableHead>Actions</SortableTableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <When truthy={isFetching}>
            <div className='absolute inset-0 flex items-center justify-center bg-background/80'>
              <LoaderIcon className='animate-spin w-4 h-4' />
            </div>
          </When>
          {accountData ? (
            accountData.map((account: Accounts) => (
              <ClickableTableRow
                key={account.id}
                handleSetActiveTab={handleSetActiveTab}
                activeTab={activeTab}
                account={account}
              />
            ))
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
