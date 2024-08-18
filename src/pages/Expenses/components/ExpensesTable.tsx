import React, { useCallback, useEffect, useMemo } from 'react'
import { useQueries } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import { EditIcon, LoaderIcon, Search } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Form, FormDescription, FormField, FormItem } from '@/components/ui/form'
import { EXPENSES, TAGS } from '@/utils/query-keys'
import { fetchExpenses } from '@/queries/expense'
import { fetchTags } from '@/queries/tag'
import { Button } from '@/components/ui/button'
import DeleteExpense from './DeleteExpense'
import AddOrEditExpenseDialog from './AddOrEditExpenseDialog/AddOrEditExpenseDialog'
import { expenseFiltersSchema } from '@/schema/expense'
import { Input } from '@/components/ui/input'
import { Expense } from '@/types/expense'
import { totalExpensesMetadataType } from '../Expenses'
import { formatIndianMoneyNotation } from '@/utils/format-money'

type Props = {
  dateRangeEnabled: boolean
  filters: {
    from: string
    to: string
  }
  setTotalExpensesMetadata: (data: totalExpensesMetadataType) => void
}

export default function ExpensesTable({ dateRangeEnabled, filters, setTotalExpensesMetadata }: Props) {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 0

  const searchExpenseForm = useForm({
    defaultValues: { search: '' },
    resolver: zodResolver(expenseFiltersSchema),
  })
  const { search } = searchExpenseForm.watch()

  const [expenseQuery, tagsQuery] = useQueries({
    queries: [
      {
        queryKey: [EXPENSES.EXPENSES, page, dateRangeEnabled, search],
        queryFn: () =>
          fetchExpenses({
            page,
            search,
            from: filters.from,
            to: filters.to,
            date_range_enabled: dateRangeEnabled,
          }),
      },
      {
        queryKey: [TAGS.TAGS],
        queryFn: fetchTags,
      },
    ],
  })

  useEffect(() => {
    if (!dateRangeEnabled) {
      setTotalExpensesMetadata(expenseQuery.data?._metadata)
    }
  }, [dateRangeEnabled, expenseQuery.data, setTotalExpensesMetadata])

  const expenses = useMemo(() => {
    return expenseQuery.data?.records ?? []
  }, [expenseQuery.data])

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

  if (expenseQuery.isLoading) {
    return (
      <div className='w-full flex items-center justify-center gap-2 h-96'>
        <LoaderIcon className='w-5 h-5 animate-spin' />
        <div>Loading Expenses...</div>
      </div>
    )
  }
  return (
    <React.Fragment>
      <Form {...searchExpenseForm}>
        <form className='space-y-2'>
          <FormField
            control={searchExpenseForm.control}
            name='search'
            render={({ field }) => (
              <FormItem>
                <div className='flex items-center relative'>
                  <Search className='absolute left-3' size={20} color='#64748b' />
                  <Input
                    className='max-w-sm pl-10'
                    type='text'
                    placeholder='Search...'
                    {...field}
                    name='searchQuery'
                    autoComplete='off'
                  />
                </div>
                {search.length !== 0 && search.length <= 2 && (
                  <FormDescription className='text-xs text-muted-foreground'>
                    Serch term should be at least 2 characters long
                  </FormDescription>
                )}
              </FormItem>
            )}
          />
        </form>
      </Form>
      {expenseQuery.isFetching ? (
        <div className='w-full flex items-center justify-center gap-2 h-96'>
          <LoaderIcon className='w-5 h-5 animate-spin' />
          <div>Searching Expenses...</div>
        </div>
      ) : (
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
            {expenses.map((expense: Expense) => (
              <TableRow key={expense.id}>
                <TableCell>{formatIndianMoneyNotation(expense.amount)}</TableCell>
                <TableCell>{getTagNames(expense.tags)}</TableCell>
                <TableCell>{dayjs(expense.time).format('ddd MMM DD, YYYY')}</TableCell>
                <TableCell className='flex'>
                  <AddOrEditExpenseDialog
                    expense={expense}
                    trigger={
                      <Button size='sm' variant='ghost'>
                        <EditIcon className='w-4 h-4' />
                      </Button>
                    }
                  />
                  <DeleteExpense id={expense.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </React.Fragment>
  )
}
