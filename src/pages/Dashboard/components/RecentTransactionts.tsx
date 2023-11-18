import { random } from 'lodash'
import React from 'react'
import dayjs from 'dayjs'
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react'
import { cn } from '@/utils/utils'

const DUMMY_TRANSACTIONS: TransactionProps[] = [
  {
    type: 'CREDIT',
    title: 'Amazon',
    amount: random(1000, 5000),
    date: '2023/10/20',
  },
  {
    type: 'DEBIT',
    title: 'Bill',
    amount: random(1000, 5000),
    date: '2023/12/20',
  },
  {
    type: 'CREDIT',
    title: 'Income',
    amount: random(1000, 5000),
    date: '2023/10/24',
  },
  {
    type: 'DEBIT',
    title: 'Netflix',
    amount: random(1000, 5000),
    date: '2023/10/10',
  },
  {
    type: 'CREDIT',
    title: 'Refund',
    amount: random(1000, 5000),
    date: '2023/10/23',
  },
]

export default function RecentTransactions({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={cn('p-4', className)} style={style}>
      <h1 className='text-lg font-bold'>Recent Transactions</h1>
      <div className='divide-y'>
        {DUMMY_TRANSACTIONS.map((transaction, idx) => (
          <Transaction key={idx} {...transaction} />
        ))}
      </div>
    </div>
  )
}

type TransactionProps = {
  className?: string
  style?: React.CSSProperties
  type: 'DEBIT' | 'CREDIT'
  title: string
  date: string
  amount: number
}
function Transaction({ type, title, date, amount }: TransactionProps) {
  return (
    <div className='flex items-center justify-between gap-4 py-2'>
      <div>
        <h3 className='text-lg font-medium'>{title}</h3>
        <p className='text-sm text-muted-foreground'>Completed on : {dayjs(date).format('DD-MM-YYYY')}</p>
      </div>

      <div className='flex items-center gap-2'>
        {type === 'CREDIT' ? (
          <ArrowUpIcon className='text-emerald-500 w-4 h-4 animate-bounce' />
        ) : (
          <ArrowDownIcon className='text-red-500 w-4 h-4' />
        )}
        <p className='font-medium'>${amount}</p>
      </div>
    </div>
  )
}
