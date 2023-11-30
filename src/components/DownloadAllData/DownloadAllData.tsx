import React, { useCallback } from 'react'
import * as XLSX from 'xlsx'
import { useQueries } from '@tanstack/react-query'
import { DownloadIcon } from 'lucide-react'
import { BALANCE_SHEET, EXPENSES, GOALS, INCOME_STATEMENT, TAGS } from '@/utils/query-keys'
import { fetchIncomeExpenses, fetchIncomeSources } from '@/queries/income-statement'
import { Button, ButtonProps } from '../ui/button'
import { useUserPreferences } from '@/hooks/use-user-preferences'
import { fetchLiabilities, fetchPhysicalAssets } from '@/queries/balance-sheet'
import { fetchGoals } from '@/queries/goals'
import { fetchTags } from '@/queries/tag'
import { fetchExpenses } from '@/queries/expense'

type Props = Omit<ButtonProps, 'loading' | 'onClick'>

// @TODO: Implement fetchIncomeStatement
const DownloadAllData = (props: Props) => {
  const { preferences } = useUserPreferences()

  const [incomeSourceQ, incomeExpenseQ, assetsQ, liabilitiesQ, goalsQ, expensesQ, tagsQ] = useQueries({
    queries: [
      {
        queryKey: [INCOME_STATEMENT.SOURCES],
        queryFn: fetchIncomeSources,
      },
      {
        queryKey: [INCOME_STATEMENT.IS_EXPENSES],
        queryFn: fetchIncomeExpenses,
      },
      {
        queryKey: [BALANCE_SHEET.ASSETS],
        queryFn: fetchPhysicalAssets,
      },
      {
        queryKey: [BALANCE_SHEET.LIABILITIES],
        queryFn: fetchLiabilities,
      },
      {
        queryKey: [GOALS.GOALS],
        queryFn: () => fetchGoals(),
      },
      {
        queryKey: [EXPENSES.EXPENSES],
        queryFn: () => fetchExpenses(),
      },
      {
        queryKey: [TAGS.TAGS],
        queryFn: fetchTags,
      },
    ],
  })

  const getTagNames = React.useCallback(
    (tagIds: number[]) => {
      if (!tagsQ.data) {
        return ''
      }

      const foundTags = tagsQ.data.filter((tag) => tagIds.includes(tag.id))
      return foundTags.map((tag) => tag.name).join(', ')
    },
    [tagsQ.data],
  )

  const handleExportToExcel = useCallback(async () => {
    const totalIncomeSources = incomeSourceQ?.data?.reduce((acc, curr) => (acc += Number(curr.amount)), 0) ?? 0
    const totalIncomeExpenses = incomeExpenseQ.data?.reduce((acc, curr) => (acc += Number(curr.amount)), 0) ?? 0
    const totalPhysicalAssets = assetsQ?.data?.reduce((acc, curr) => (acc += parseFloat(curr.market_value)), 0) ?? 0
    const totalLiability = liabilitiesQ?.data?.reduce((acc, curr) => (acc += parseFloat(curr.balance)), 0) ?? 0

    const wb = XLSX.utils.book_new()
    /** Daily Expense List */
    const dailyExpenseWorksheet = XLSX.utils.json_to_sheet(
      expensesQ.data?.records?.map((expense) => ({ ...expense, tags: getTagNames(expense.tags) })) ?? [],
    )
    XLSX.utils.book_append_sheet(wb, dailyExpenseWorksheet, 'Daily Expense')

    /** Income Statement */
    const incomeWorksheet = XLSX.utils.json_to_sheet(incomeSourceQ?.data ?? [])
    XLSX.utils.sheet_add_aoa(
      incomeWorksheet,
      [['Total Income', `${totalIncomeSources.toFixed(2)} ${preferences.currencyUnit}`]],
      { origin: -1 },
    )
    XLSX.utils.book_append_sheet(wb, incomeWorksheet, 'Income')

    /** Expense Statement */
    const expenseWorksheet = XLSX.utils.json_to_sheet(incomeSourceQ?.data ?? [])
    XLSX.utils.sheet_add_aoa(
      expenseWorksheet,
      [['Total Expense', `${totalIncomeExpenses.toFixed(2)} ${preferences.currencyUnit}`]],
      { origin: -1 },
    )
    XLSX.utils.book_append_sheet(wb, expenseWorksheet, 'Expense')

    /** Assets */
    const assetsWorksheet = XLSX.utils.json_to_sheet(assetsQ?.data ?? [])
    XLSX.utils.sheet_add_aoa(
      assetsWorksheet,
      [['Total Value', `${totalPhysicalAssets.toFixed(2)} ${preferences.currencyUnit}`]],
      { origin: -1 },
    )
    XLSX.utils.book_append_sheet(wb, assetsWorksheet, 'Assets')

    /** Liabilities */
    const liabilitiesWorksheet = XLSX.utils.json_to_sheet(liabilitiesQ?.data ?? [])
    XLSX.utils.sheet_add_aoa(
      liabilitiesWorksheet,
      [['Total Liabilities', `${totalLiability.toFixed(2)} ${preferences.currencyUnit}`]],
      { origin: -1 },
    )
    XLSX.utils.book_append_sheet(wb, liabilitiesWorksheet, 'Liabilities')

    /** Goals */
    const goalsWorksheet = XLSX.utils.json_to_sheet(goalsQ?.data ?? [])
    XLSX.utils.book_append_sheet(wb, goalsWorksheet, 'Goals')

    /** Saving the file */
    XLSX.writeFile(wb, 'financial_data.xlsx', { compression: true })
  }, [
    assetsQ?.data,
    expensesQ.data,
    getTagNames,
    goalsQ?.data,
    incomeExpenseQ.data,
    incomeSourceQ?.data,
    liabilitiesQ?.data,
    preferences.currencyUnit,
  ])

  const isLoading = [
    incomeSourceQ.isLoading,
    incomeExpenseQ.isLoading,
    assetsQ.isLoading,
    liabilitiesQ.isLoading,
    goalsQ.isLoading,
    expensesQ.isLoading,
    tagsQ.isLoading,
  ].some(Boolean)

  return (
    <Button loading={isLoading} onClick={handleExportToExcel} {...props}>
      <DownloadIcon className='w-4 h-4 mr-2' />
      <span>Download</span>
    </Button>
  )
}

export default DownloadAllData
