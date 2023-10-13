/* eslint-disable */
import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useAsyncDebounce } from 'react-table'
import {
  Column,
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
  UseTableInstanceProps,
} from 'react-table'
import { Checkbox, Button } from '@mui/material'
import UpSvgLightIcon from '../../assets/icons/UpSvgLightIcon'
import DownSvgLightIcon from '../../assets/icons/DownSvgLightIcon'

// import MonoDateRangePicker from '../DateRangePicker/MonoDateRangePicker'
// import MonoSelect from '../Select/MonoSelect'
// import { PaginationOption } from 'shared/dist/utils/Constant'
// import { DateRangeFilter } from './DateRangeFilter'
// import { DropdownFilter } from './DropdownFilter'
import styles from './Monotable.module.css'
import GlobalFilter from './GlobalFilter'

const getFilterValueByKey = (key, filter) => {
  const item = filter.find((it) => it?.id === key)
  return item && item.value
}

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef(null)
  const resolvedRef = ref || defaultRef

  useEffect(() => {
    if (resolvedRef && resolvedRef.current) {
      resolvedRef.current.indeterminate = indeterminate
    }
  }, [resolvedRef, indeterminate])

  return (
    <>
      <Checkbox ref={resolvedRef} {...rest} />
    </>
  )
})
IndeterminateCheckbox.displayName = 'IndeterminateCheckbox'

const getRowId = (row, relativeIndex, parent) => {
  // In row object you have access to data.
  // Yon choose parameter. In this example I used uniqueId
  return parent ? [parent.id, row.id].join('.') : row.id
}

function MonoTable({
  columns,
  data,
  onChange = () => {},
  fetchData,
  filterOptions = {},
  defaultOptions = {},
  metaData = {},
  fullTextFilterName = 'search_text',
  pageCount: controlledPageCount,
  loading,
  hideFiltering = false,
  allowSelectRow = false,
  onRowSelect,
  rowSpanColumns = [],
  tableRef = useRef(null),
  filterOptionsButton = {},
  hideColumns,
  pagination,
  ...props
}) {
  const [globalFilterOptions, setGlobalFilterOptions] = useState(filterOptions)
  const hiddenColumns = columns.filter((column) => column.isHidden).map((item) => item.accessor)

  useEffect(() => {
    if (filterOptions && Object.keys(filterOptions).length > 0) {
      setGlobalFilterOptions(filterOptions)
    }
  }, [filterOptions])

  const selectionCell = []

  if (allowSelectRow) {
    selectionCell.push({
      id: 'selection',
      Header: ({ toggleRowSelected, isAllPageRowsSelected, page }) => {
        const modifiedOnChange = (event) => {
          page.forEach((row) => {
            // check each row if it is not disabled
            if (!row.original.disabled) {
              toggleRowSelected(row.id, event.currentTarget.checked)
            }
          })
        }

        // Count number of selectable and selected rows in the current page
        // to determine the state of select all checkbox
        let selectableRowsInCurrentPage = 0
        let selectedRowsInCurrentPage = 0
        page.forEach((row) => {
          if (row.isSelected) {
            selectedRowsInCurrentPage++
          }
          if (!row.original.disabled) {
            selectableRowsInCurrentPage++
          }
        })

        // If there are no selectable rows in the current page
        // select all checkbox will be disabled -> see page 2
        const disabled = selectableRowsInCurrentPage === 0
        const checked =
          (isAllPageRowsSelected || selectableRowsInCurrentPage === selectedRowsInCurrentPage) && !disabled

        return (
          <div className='items-center text-center'>
            <IndeterminateCheckbox
              onChange={modifiedOnChange}
              checked={checked}
              disabled={disabled}
              indeterminate={selectedRowsInCurrentPage > 0 && selectedRowsInCurrentPage === selectableRowsInCurrentPage}
            />
          </div>
        )
      },
      Cell: ({ row }) => (
        <div className='items-center text-center'>
          <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} disabled={row.original.disabled} />
        </div>
      ),
      width: 40,
      headerClass: 'justify-center items-center text-center',
    })
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    canPreviousPage,
    canNextPage,
    pageOptions,
    selectedFlatRows,
    gotoPage,
    nextPage,
    previousPage,
    setGlobalFilter,
    state,
    setFilter,
    setPageSize,
    toggleAllRowsSelected,
    toggleRowSelected,
    setHiddenColumns,
  } = useTable(
    {
      wrappedOnChange: useCallback(onChange, [onChange]),
      columns,
      data,
      disableMultiSort: true,
      manualPagination: true,
      manualFilters: true,
      manualGlobalFilter: true,
      manualSortBy: true,
      autoResetPage: false,
      pageCount: controlledPageCount,
      initialState: {
        pageIndex: 0,
        hiddenColumns,
        ...defaultOptions,
      },
      getRowId,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.useInstance.push((state) => {
        // Expose the table instance to the parent component
        if (tableRef) {
          tableRef.current = state
        }
      }),
        hooks.visibleColumns.push((columns) => [...selectionCell, ...columns])
    },
  )

  const generateSortingIndicator = (column) =>
    column.isSorted ? (
      <span className='flex px-1 pt-2'>
        {column.isSortedDesc ? (
          <span>
            <DownSvgLightIcon className='mb-1' />
          </span>
        ) : (
          <span>
            <UpSvgLightIcon className='mb-1' />
          </span>
        )}{' '}
      </span>
    ) : (
      ''
    )

  const { pageIndex, pageSize, filters, globalFilter, sortBy, selectedRowIds } = state

  const arrayPageIndex =
    pageIndex - 2 < 0 ? pageOptions.slice(0, pageIndex + 3) : pageOptions.slice(pageIndex - 2, pageIndex + 3)

  const searchFunction = () => {
    const oFilter = {
      limit: pageSize,
      from: pageSize * pageIndex,
      page: pageIndex + 1,
    }
    filters.map((tblFilter) => {
      oFilter[`filter[${tblFilter.id}]`] = tblFilter.value
    })

    if (globalFilter) {
      oFilter[`filter[${fullTextFilterName}]`] = globalFilter
    }

    if (sortBy.length) {
      oFilter.sort = `${sortBy[0].desc ? '-' : ''}${sortBy[0].id}`
    }
    if (fetchData) fetchData(oFilter)
  }
  const debouncedSearchFunction = useAsyncDebounce(searchFunction, 500) // Debounce the search function with a 500ms delay

  useEffect(() => {
    searchFunction()
  }, [fetchData, pageIndex, pageSize, filters, globalFilter, sortBy])

  // const pagination =()=>{
  //   const oFilter: { [key: string]: any } = {
  //     limit: pageSize,
  //     from: pageSize * pageIndex,
  //     page: pageIndex + 1
  //   }
  //   console.log('=====>',oFilter)
  //   if (fetchData) fetchData(oFilter)
  // }

  // useEffect(() => {
  //   pagination()
  // }, [pageSize])

  useEffect(() => {
    if (defaultOptions?.selectedRowIds) {
      for (const key in defaultOptions?.selectedRowIds) {
        toggleRowSelected(key, defaultOptions?.selectedRowIds[key])
      }
      // toggleRowSelected
    }
  }, [defaultOptions?.selectedRowIds])

  useEffect(() => {
    if (hideColumns) {
      setHiddenColumns(hideColumns)
    }
  }, [hideColumns])

  useEffect(() => {
    if (onRowSelect) {
      onRowSelect({ selectedFlatRows })
    }
  }, [selectedRowIds, selectedFlatRows])

  const calculateRowSpan = (cell, rowIndex, columnId) => {
    let rowSpan = 1

    // Custom logic to calculate row span
    if (rowIndex > 0 && cell.value === rows[rowIndex - 1].values[columnId]) {
      rowSpan = 0
    }

    for (let i = rowIndex + 1; i < rows.length; i++) {
      if (cell.value === rows[i].values[columnId]) {
        rowSpan++
      } else {
        break
      }
    }

    return rowSpan
  }

  return (
    <>
      {!hideFiltering && (
        <div className='mb-4 flex items-center justify-between'>
          <div
            className='flex items-center'
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '18px',
            }}
          >
            <div className='relative w-[350px]'>
              <GlobalFilter globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />
            </div>
            {Object.entries(globalFilterOptions).map((entry) => {
              const [key, value] = entry
              if (value.type === 'DateRange') {
                return (
                  <div className='mx-4 w-60'>
                    {/* <DateRangeFilter setFilter={setFilter} key={key} id={key} placeholder={value.placeholder} /> */}
                  </div>
                )
              } else {
                return (
                  <></>
                  //   <DropdownFilter
                  //     setFilter={setFilter}
                  //     key={key}
                  //     id={key}
                  //     placeholder={value.placeholder}
                  //     options={value.options}
                  //     value={getFilterValueByKey(key, filters)}
                  //   />
                )
              }
            })}
          </div>
          <div className='flex items-center'>
            {Object.entries(filterOptionsButton).map((entry) => {
              const [key, value] = entry
              return (
                <Button outline key={key} className='mr-2' size='xs' onClick={value.onClick}>
                  {value.icon}
                  {value.label}
                </Button>
              )
            })}
          </div>
        </div>
      )}

      <div className='assets-table'>
        <table className={styles.table} {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, i) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    className={`${styles.tableHeader} cursor-pointer`}
                    {...column.getHeaderProps({
                      ...column.getSortByToggleProps(),
                      style: {
                        minWidth: column.minWidth,
                        width: column.width,
                        cursor: 'pointer',
                      },
                    })}
                  >
                    <div className={'text14Semibold flex items-center text-neutral-900 '}>
                      {column.render('Header')}
                      {generateSortingIndicator(column)}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className={styles.tableCell} {...getTableBodyProps()}>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className='text-center'>
                  <Spinner aria-label='Center-aligned spinner example' /> Loading...
                </td>
              </tr>
            ) : (
              <>
                {data.length <= 0 ? (
                  <tr>
                    <td colSpan={columns.length} className='text-center'>
                      No Data
                    </td>
                  </tr>
                ) : (
                  <>
                    {rows.map((row, i) => {
                      prepareRow(row)
                      return (
                        <tr {...row.getRowProps()} key={`${i}_row`}>
                          {row.cells.map((cell, rowIndex) => {
                            // const rowSpan = calculateRowSpan(cell, rowIndex, cell.column.id);

                            let rowSpan = 1
                            if (rowSpanColumns?.includes(cell.column.id)) {
                              rowSpan = row?.original?.rowSpan || 0
                            }
                            if (rowSpan <= 0) {
                              return null
                            }
                            return (
                              <td
                                {...cell.getCellProps({ rowSpan })}
                                style={{
                                  minWidth: cell.column.minWidth,
                                  width: cell.column.width,
                                  maxWidth: cell.column.maxWidth,
                                }}
                              >
                                {cell?.render('Cell')}
                              </td>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </>
                )}
              </>
            )}
          </tbody>
        </table>

        {pageOptions.length ? (
          <div className='pagination mt-2 flex items-center justify-between sm:mt-5'>
            <div className='justify-betwwen flex items-center gap-2'>
              <span className='text14Regular'>
                Showing {pageIndex + 1} of <span>{pageOptions.length}</span> Results
              </span>
            </div>
            <div className='flex'>
              <Button
                color='light'
                size={'xs'}
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                className='border-px rounded-sm border border-neutral-200'
              >
                <RightSvg className='mr-1' color='text-neutral-500' /> Back
              </Button>
              <div className='flex'>
                {arrayPageIndex.map((i) => (
                  <Button
                    key={`${i}_page_index`}
                    color='light'
                    size={'xs'}
                    className={`${
                      pageIndex === i
                        ? 'cursor-not-allowed border-primary-600 hover:!bg-primary-100'
                        : 'border-neutral-200'
                    } border-px mx-1 rounded-sm border`}
                    onClick={() => gotoPage(i)}
                  >
                    <span className={`${pageIndex === i ? 'text-primary-600' : 'text-neutral-500'} text14Regular`}>
                      {i + 1}
                    </span>
                  </Button>
                ))}
              </div>
              <Button
                color='light'
                size={'xs'}
                onClick={() => nextPage()}
                disabled={!canNextPage}
                className='border-px rounded-sm border border-neutral-200'
              >
                Next <LeftSvg className='ml-2' color='text-neutral-500' />
              </Button>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export default MonoTable
