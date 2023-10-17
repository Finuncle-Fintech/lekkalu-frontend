import React, { useCallback } from 'react'
import { useQueries } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { EditIcon, TrashIcon } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { EXPENSES, TAGS } from '@/utils/query-keys'
import { fetchExpenses } from '@/queries/expense'
import { fetchTags } from '@/queries/tag'
import { useUserPreferences } from '@/hooks/use-user-preferences'
import { Button } from '@/components/ui/button'

export default function ExpensesTable() {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 0

  const { preferences } = useUserPreferences()
  const [expenseQuery, tagsQuery] = useQueries({
    queries: [
      {
        queryKey: [EXPENSES.EXPENSES, page],
        queryFn: () => fetchExpenses({ page }),
      },
      {
        queryKey: [TAGS.TAGS],
        queryFn: fetchTags,
      },
    ],
  })

  const getTagNames = useCallback(
    (tagIds: number[]) => {
      if (!tagsQuery.data) {
        return null
      }

      const foundTags = tagsQuery.data.filter((tag) => tagIds.includes(tag.id))
      return foundTags.map((tag) => tag.name).join(', ')
    },
    [tagsQuery.data],
  )

  return (
    <Table className='border rounded'>
      <TableCaption className='text-center'>A list of all your expenses</TableCaption>
      <TableHeader className='bg-gray-100/50'>
        <TableRow>
          <TableHead>Amount</TableHead>
          <TableHead>Tags</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenseQuery.data?.map((expense) => (
          <TableRow key={expense.id}>
            <TableCell>
              {expense.amount} {preferences.currencyUnit}
            </TableCell>
            <TableCell>{getTagNames(expense.tags)}</TableCell>
            <TableCell>{dayjs(expense.time).format('ddd MMM DD, YYYY')}</TableCell>
            <TableCell className='flex'>
              <Button size='sm' variant='ghost'>
                <EditIcon className='w-4 h-4' />
              </Button>
              <Button size='sm' variant='ghost'>
                <TrashIcon className='w-4 h-4 text-red-500' />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
