import { Accounts } from '@/types/lending'

export type OrderByType = 'asc' | 'desc' | 'none'

export type SortIconProps = {
  id: keyof Accounts
  sortBy: LendingTableSort
}

export type LendingTableSort = {
  columnName: keyof Accounts | undefined
  orderBy: OrderByType
}

type UnSortableTableHeadType = {
  isSortable?: false
  children: React.ReactNode
}

type SortableTableHeadType = {
  isSortable: true
  id: keyof Accounts
  children: React.ReactNode
  sortBy: LendingTableSort
  setSortBy: React.Dispatch<React.SetStateAction<LendingTableSort>>
}

export type SortableColumnType = UnSortableTableHeadType | SortableTableHeadType
