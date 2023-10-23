import React, { useCallback, useMemo, useState } from 'react'
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowEditStopParams,
  MuiEvent,
  MuiBaseEvent,
} from '@mui/x-data-grid'
import { useMutation, useQuery } from '@tanstack/react-query'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import { capitalize, omit } from 'lodash'
import TableToolbar from './TableToolbar'
import { CreateIncomeStatementDto, IncomeStatement } from '@/types/income-statement'
import { INCOME_STATEMENT } from '@/utils/query-keys'
import { useToast } from '@/components/ui/use-toast'

type TableType = 'EXPENSE' | 'INCOME'

type Props = {
  type: TableType
  queryFn: () => Promise<IncomeStatement[]>
  createMutationFn: (dto: CreateIncomeStatementDto) => Promise<void>
  updateMutationFn: (id: number, dto: CreateIncomeStatementDto) => Promise<void>
  deleteMutationFn: (id: number) => Promise<void>
}

export default function IncomeExpenseTable({
  queryFn,
  type,
  createMutationFn,
  updateMutationFn,
  deleteMutationFn,
}: Props) {
  const { data, isLoading, refetch } = useQuery(
    [type === 'INCOME' ? INCOME_STATEMENT.SOURCES : INCOME_STATEMENT.IS_EXPENSES],
    queryFn,
  )
  const [rowModesModel, setRowModesModel] = useState<GridRowModel>({})
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])
  const { toast } = useToast()

  const createMutation = useMutation(createMutationFn, {
    onSuccess: () => {
      refetch()
      toast({ title: `${type} created successfully!` })
    },
  })

  const updateMutation = useMutation(
    (dto: CreateIncomeStatementDto & { id: number }) => updateMutationFn(dto.id, omit(dto, 'id')),
    {
      onSuccess: () => {
        refetch()
        toast({ title: `${capitalize(type)} updated successfully!` })
      },
    },
  )

  const deleteMutation = useMutation(deleteMutationFn, {
    onSuccess: () => {
      refetch()
      toast({ title: `${capitalize(type)} deleted successfully!` })
    },
  })

  const handleEdit = useCallback(
    (id: GridRowId) => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
    },
    [rowModesModel],
  )

  const handleSave = useCallback(
    (id: GridRowId) => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
    },
    [rowModesModel],
  )

  const handleCancel = useCallback(
    (id: GridRowId) => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      })
    },
    [rowModesModel],
  )

  const handleDelete = useCallback(
    (id: GridRowId) => {
      deleteMutation.mutate(id as number)
    },
    [deleteMutation],
  )

  const handleRowModesModelChange = (newRowModesModel: GridRowModel) => {
    setRowModesModel(newRowModesModel)
  }

  const handleRowEditStop = (params: GridRowEditStopParams<any>, event: MuiEvent<MuiBaseEvent>) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true
    }
  }

  const COLUMNS: GridColDef<IncomeStatement & { isNew: boolean }>[] = useMemo(() => {
    return [
      {
        field: 'name',
        headerName: 'Name',
        width: 180,
        editable: true,
      },
      {
        field: 'type',
        headerName: 'Type',
        width: 180,
        align: 'left',
        headerAlign: 'left',
        editable: true,
      },
      {
        field: 'amount',
        headerName: 'Amount',
        width: 180,
        editable: true,
      },
      {
        field: 'actions',
        type: 'actions',
        width: 100,
        cellClassName: 'actions',
        getActions: ({ id }) => {
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

          if (isInEditMode) {
            return [
              <GridActionsCellItem
                key={`${id}_save`}
                icon={<SaveIcon />}
                label='Save'
                sx={{
                  color: 'primary.main',
                }}
                onClick={() => handleSave(id)}
              />,
              <GridActionsCellItem
                key={`${id}_cancel`}
                icon={<CancelIcon />}
                label='Cancel'
                className='textPrimary'
                onClick={() => handleCancel(id)}
                color='inherit'
              />,
            ]
          }

          return [
            <GridActionsCellItem
              key={`${id}_edit`}
              icon={<EditIcon />}
              label='Edit'
              className='textPrimary'
              onClick={() => handleEdit(id)}
              color='inherit'
              showInMenu
            />,
            <GridActionsCellItem
              key={`${id}_delete`}
              icon={<DeleteIcon />}
              label='Delete'
              onClick={() => handleDelete(id)}
              color='inherit'
              showInMenu
            />,
          ]
        },
      },
    ]
  }, [handleCancel, handleDelete, handleEdit, handleSave, rowModesModel])

  const handleProcessRowUpdate = (
    newRow: IncomeStatement & { isNew: boolean },
  ): IncomeStatement & { isNew: boolean } => {
    /** Handling the case of creation */
    if (newRow.isNew === true) {
      createMutation.mutate(omit(newRow, 'isNew'))
    } else {
      /** Handling the case of updation */
      updateMutation.mutate({ ...omit(newRow, 'isNew'), id: newRow.id as number })
    }

    return newRow
  }

  return (
    <DataGrid
      loading={[isLoading, createMutation.isLoading, updateMutation.isLoading, deleteMutation.isLoading].some(Boolean)}
      rows={data ?? []}
      columns={COLUMNS}
      getRowId={(row) => row.id}
      rowModesModel={rowModesModel}
      checkboxSelection
      hideFooter
      editMode='row'
      onRowModesModelChange={handleRowModesModelChange}
      onRowEditStop={handleRowEditStop}
      rowSelectionModel={selectedRows ?? null}
      onRowSelectionModelChange={(ids) => {
        setSelectedRows(ids)
      }}
      processRowUpdate={handleProcessRowUpdate}
      slots={{ toolbar: TableToolbar, noRowsOverlay: NoRowsOverlay }}
      slotProps={{
        noRowsOverlay: { type },
        toolbar: { setRowModesModel, type, selectedRows },
      }}
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
    type: TableType
  }
}
