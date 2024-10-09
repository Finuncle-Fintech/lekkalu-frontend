/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import { getCorrectType } from '@/utils/utils'
import { AmbigiousObject, LendingTableSort } from '@/components/ui/table'

const useLendingTableSort = <T extends AmbigiousObject>({ data }: { data: T[] }) => {
  const [sortBy, setSortBy] = useState<LendingTableSort<T>>({ columnName: undefined, orderBy: 'none' })
  const [sortedData, setSortedData] = useState<T[]>(data)

  useEffect(() => {
    handleSort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy.columnName, sortBy.orderBy, data])

  function dataSetter(data: T[]) {
    if (sortBy.orderBy === 'desc') {
      setSortedData(data.reverse())
      return
    }
    setSortedData(data)
  }

  function handleSort() {
    const { orderBy, columnName } = sortBy
    if (orderBy === 'none' || !columnName) {
      setSortedData(data)
      return
    }
    const columnType = typeof getCorrectType(sortedData[0]?.[columnName])
    if (!columnType) {
      setSortedData(data)
      return
    }
    let _result
    if (columnType === 'number') {
      _result = [...data].sort((a, b) => {
        return ((a[columnName] as number) - b[columnName]) as number
      })
    } else if (columnType === 'string') {
      _result = [...data].sort((a, b) => {
        return (a[columnName] as string).localeCompare(b[columnName] as string)
      })
    } else if (columnType === 'object') {
      _result = [...data].sort((a, b) => {
        return new Date(a[columnName] as string).getTime() - new Date(b[columnName] as string).getTime()
      })
    }

    dataSetter(_result || data)
  }

  return {
    handleSort,
    sortedData,
    setSortedData,
    sortBy,
    setSortBy,
  }
}

export default useLendingTableSort
