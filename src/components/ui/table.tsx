import * as React from 'react'

import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/utils/utils'
import { AmbigiousObject, SortableColumnType, SortIconProps } from '@/pages/Lending/types/LendingTypes'

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className='relative w-full overflow-auto'>
      <table ref={ref} className={cn('w-full caption-bottom text-sm', className)} {...props} />
    </div>
  ),
)
Table.displayName = 'Table'

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />,
)
TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
  ),
)
TableBody.displayName = 'TableBody'

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot ref={ref} className={cn('bg-primary font-medium text-primary-foreground', className)} {...props} />
  ),
)
TableFooter.displayName = 'TableFooter'

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn('border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted', className)}
      {...props}
    />
  ),
)
TableRow.displayName = 'TableRow'

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
        className,
      )}
      {...props}
    />
  ),
)
TableHead.displayName = 'TableHead'

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)} {...props} />
  ),
)
TableCell.displayName = 'TableCell'

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn('mt-4 text-sm text-muted-foreground', className)} {...props} />
  ),
)
TableCaption.displayName = 'TableCaption'

const Sort = <T extends AmbigiousObject>({ id, sortBy }: SortIconProps<T>) => {
  const isUp = id === sortBy.columnName && sortBy.orderBy === 'asc'
  const isDown = id === sortBy.columnName && sortBy.orderBy === 'desc'
  return (
    <div className='flex flex-col gap-0'>
      <ChevronUp size={15} className={isUp ? 'text-primary' : 'text-slate-400'} />
      <ChevronDown size={15} className={isDown ? 'text-primary' : 'text-slate-300'} />
    </div>
  )
}

const SortableTableHead = <T extends AmbigiousObject>(props: SortableColumnType<T>) => {
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
          if (props.id !== value.columnName) {
            return {
              orderBy: 'asc',
              columnName: props.id,
            }
          }
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

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption, SortableTableHead }
