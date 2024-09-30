import { useState } from 'react'
import { getCorrectType } from '@/utils/utils'
import { LendingTableSort, OrderByType } from '../types/LendingTypes'
import { Accounts } from '@/types/lending'

const useLendingTableSort = ({ data }: { data: Accounts[] }) => {
  const [sortBy, setSortBy] = useState<LendingTableSort>({ columnName: undefined, orderBy: 'none' })

  const [sortedData, setSortedData] = useState<Accounts[]>(data)

  function handleSort<T, K extends keyof T>(data: T[], columnName: K | undefined, orderBy: OrderByType) {
    if (orderBy === 'none' || !columnName) {
      return data
    }
    const columnType = typeof getCorrectType(data[0]?.[columnName])
    if (!columnType) return data
    if (columnType === 'number') {
      const _result = [...data].sort((a, b) => {
        const _a = a[columnName] as number
        const _b = b[columnName] as number
        return _a - _b
      })
      if (orderBy === 'asc') {
        return _result.reverse()
      }
      return _result
    } else if (columnType === 'string') {
      const _result = [...data].sort((a, b) => {
        const _a = a[columnName] as string
        const _b = b[columnName] as string
        return _a.localeCompare(_b)
      })
      if (orderBy === 'asc') {
        return _result
      } else {
        return _result.reverse()
      }
    } else if (columnType === 'object') {
      const _result = [...data].sort((a, b) => {
        const _a = new Date(a[columnName] as string)
        const _b = new Date(b[columnName] as string)
        return _a.getTime() - _b.getTime()
      })
      if (orderBy === 'asc') {
        return _result
      } else {
        return _result.reverse()
      }
    }

    return data
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
