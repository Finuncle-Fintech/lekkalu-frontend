export type OrderByType = 'asc' | 'desc' | 'none'

export type AmbigiousObject = { [key: string]: any }

export type SortIconProps<T extends AmbigiousObject> = {
  id: keyof T
  sortBy: LendingTableSort<T>
}

export type LendingTableSort<T extends AmbigiousObject> = {
  columnName: keyof T | undefined
  orderBy: OrderByType
}

type UnSortableTableHeadType = {
  isSortable?: false
  children: React.ReactNode
}

type SortableTableHeadType<T extends AmbigiousObject> = {
  isSortable: true
  id: keyof T
  children: React.ReactNode
  sortBy: LendingTableSort<T>
  setSortBy: React.Dispatch<React.SetStateAction<LendingTableSort<T>>>
}

export type SortableColumnType<T extends AmbigiousObject> = UnSortableTableHeadType | SortableTableHeadType<T>
