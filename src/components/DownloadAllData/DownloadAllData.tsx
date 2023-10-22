import React, { useCallback } from 'react'
import * as ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
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
        queryFn: () => fetchGoals({ page: 1, per_page: 100 }),
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
        return null
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

    const workbook = new ExcelJS.Workbook()
    const dailyExpenseListWorksheet = workbook.addWorksheet('Daily Expense')
    const incomeWorksheet = workbook.addWorksheet('Income')
    const expenseWorksheet = workbook.addWorksheet('Expense')
    const assetsWorksheet = workbook.addWorksheet('Asset')
    const liabilitiesWorksheet = workbook.addWorksheet('Liabilities')
    const goalsWorksheet = workbook.addWorksheet('Goal')

    // Daily Expense List
    dailyExpenseListWorksheet.addRow(['Tags', 'Amount', 'Date'])
    expensesQ.data?.forEach((item) => {
      dailyExpenseListWorksheet.addRow([getTagNames(item.tags), item.amount, item.time])
    })

    // Income Statement
    incomeWorksheet.addRow(['Income Name', 'Type of Income', 'Amount'])
    incomeSourceQ?.data?.forEach((item) => {
      incomeWorksheet.addRow([item.name, item.type, item.amount])
    })
    incomeWorksheet.addRow(['Total Income', '', `${totalIncomeSources?.toFixed(2)} ${preferences.currencyUnit}`])

    // Expense Statement
    expenseWorksheet.addRow(['Expense Name', 'Type of Expense', 'Amount'])
    incomeExpenseQ?.data?.forEach((item) => {
      expenseWorksheet.addRow([item.name, item.type, item.amount])
    })
    expenseWorksheet.addRow(['Total Expense', '', `${totalIncomeExpenses?.toFixed(2)} ${preferences.currencyUnit}`])

    // Balance Sheet
    assetsWorksheet.addRow(['Asset Name', 'Market Value'])
    assetsQ?.data?.forEach((item) => {
      assetsWorksheet.addRow([item.name, item.market_value])
    })
    assetsWorksheet.addRow(['Total Value', `${totalPhysicalAssets?.toFixed(2)} ${preferences.currencyUnit}`])

    liabilitiesWorksheet.addRow(['Liabilities Name', 'Balance'])
    liabilitiesQ?.data?.forEach((item) => {
      liabilitiesWorksheet.addRow([item.name, item.balance])
    })
    liabilitiesWorksheet.addRow(['Total Liabilities', `${totalLiability?.toFixed(2)} ${preferences.currencyUnit}`])

    // Goals
    goalsWorksheet.addRow(['Goal', 'Current Metric', 'Target Metric'])
    goalsQ?.data?.forEach((item) => {
      goalsWorksheet.addRow([item.goal, item.current_metric, item.target_metric])
    })

    // Generate the Excel file as a blob
    const blob = await workbook.xlsx.writeBuffer()

    // Save the Blob as a file
    saveAs(new Blob([blob]), 'financial_data.xlsx')
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
