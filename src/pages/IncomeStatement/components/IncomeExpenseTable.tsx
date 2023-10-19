import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import TableToolbar from './TableToolbar'

type Props = {
  isIncomeTable?: boolean
}

export default function IncomeExpenseTable({ isIncomeTable = true }: Props) {
  return (
    <DataGrid
      rows={[]}
      columns={[]}
      checkboxSelection
      hideFooter
      editMode='row'
      slots={{ toolbar: TableToolbar, noRowsOverlay: NoRowsOverlay }}
      slotProps={{ noRowsOverlay: { isIncomeTable } }}
    />
  )
}

function NoRowsOverlay({ isIncomeTable }: { isIncomeTable: boolean }) {
  return (
    <div className='text-muted text-center my-2'>
      {isIncomeTable ? 'No Incomes in Records!' : 'No Expenses in Records!'}
    </div>
  )
}

/** Slot props overrides */
declare module '@mui/x-data-grid' {
  interface NoRowsOverlayPropsOverrides {
    isIncomeTable: boolean
  }
}
