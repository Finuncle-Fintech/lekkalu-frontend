import * as React from 'react'
import * as ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import { useQueries, useQuery } from '@tanstack/react-query'
import { BALANCE_SHEET, EXPENSES, GOALS, INCOME_STATEMENT, TAGS } from '@/utils/query-keys'
import { fetchIncomeExpenses, fetchIncomeSources } from '@/queries/income-statement'
import { Button } from '../ui/button'
import { useUserPreferences } from '@/hooks/use-user-preferences'
import { fetchLiabilities, fetchPhysicalAssets } from '@/queries/balance-sheet'
import { fetchGoals } from '@/queries/goals'
import { fetchTags } from '@/queries/tag'
import { fetchExpenses } from '@/queries/expense'

// @TODO: Implement fetchIncomeStatement
const DownloadAllData = () => {
  const { preferences } = useUserPreferences()

  const { data: incomeSources, isLoading: isLoadingIncomeSources } = useQuery(
    [INCOME_STATEMENT.SOURCES],
    fetchIncomeSources,
  )
  const { data: incomeExpenses, isLoading: isLoadingIncomeExpenses } = useQuery(
    [INCOME_STATEMENT.IS_EXPENSES],
    fetchIncomeExpenses,
  )

  const { data: physicalAssets, isLoading: isLoadingPhysicalAssets } = useQuery(
    [BALANCE_SHEET.ASSETS],
    fetchPhysicalAssets,
  )
  const { data: liabilities, isLoading: isLoadingLiabilities } = useQuery([BALANCE_SHEET.LIABILITIES], fetchLiabilities)
  const { data: goals, isLoading: isLoadingGoals } = useQuery([GOALS.GOALS], () =>
    fetchGoals({ page: 1, per_page: 100 }),
  )
  const [expenseQuery, tagsQuery] = useQueries({
    queries: [
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

  console.log('expenseQuery.data===.', expenseQuery.data, tagsQuery.data)
  const totalIncomeExpenses = incomeExpenses?.reduce((acc, curr) => (acc += Number(curr.amount)), 0)
  const totalIncomeSources = incomeSources?.reduce((acc, curr) => (acc += Number(curr.amount)), 0)
  const totalPhysicalAssets = physicalAssets?.reduce((acc, curr) => (acc += parseFloat(curr.market_value)), 0)
  const totalLiability = liabilities?.reduce((acc, curr) => (acc += parseFloat(curr.balance)), 0)

  const getTagNames = React.useCallback(
    (tagIds: number[]) => {
      if (!tagsQuery.data) {
        return null
      }

      const foundTags = tagsQuery.data.filter((tag) => tagIds.includes(tag.id))
      return foundTags.map((tag) => tag.name).join(', ')
    },
    [tagsQuery.data],
  )

  const handleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook()
    const dailyExpenseListWorksheet = workbook.addWorksheet('Daily Expense')
    const incomeWorksheet = workbook.addWorksheet('Income')
    const expenseWorksheet = workbook.addWorksheet('Expense')
    const assetsWorksheet = workbook.addWorksheet('Asset')
    const liabilitiesWorksheet = workbook.addWorksheet('Liabilities')
    const goalsWorksheet = workbook.addWorksheet('Goal')

    // Daily Expense List
    dailyExpenseListWorksheet.addRow(['Tags', 'Amount', 'Date'])
    expenseQuery.data?.forEach((item) => {
      dailyExpenseListWorksheet.addRow([getTagNames(item.tags), item.amount, item.time])
    })

    // Income Statement
    incomeWorksheet.addRow(['Income Name', 'Type of Income', 'Amount'])
    incomeSources?.forEach((item) => {
      incomeWorksheet.addRow([item.name, item.type, item.amount])
    })
    incomeWorksheet.addRow(['Total Income', '', `${totalIncomeSources?.toFixed(2)} ${preferences.currencyUnit}`])

    // Expense Statement
    expenseWorksheet.addRow(['Expense Name', 'Type of Expense', 'Amount'])
    incomeExpenses?.forEach((item) => {
      expenseWorksheet.addRow([item.name, item.type, item.amount])
    })
    expenseWorksheet.addRow(['Total Expense', '', `${totalIncomeExpenses?.toFixed(2)} ${preferences.currencyUnit}`])

    // Balance Sheet
    assetsWorksheet.addRow(['Asset Name', 'Market Value'])
    physicalAssets?.forEach((item) => {
      assetsWorksheet.addRow([item.name, item.market_value])
    })
    assetsWorksheet.addRow(['Total Value', `${totalPhysicalAssets?.toFixed(2)} ${preferences.currencyUnit}`])

    liabilitiesWorksheet.addRow(['Liabilities Name', 'Balance'])
    liabilities?.forEach((item) => {
      liabilitiesWorksheet.addRow([item.name, item.balance])
    })
    liabilitiesWorksheet.addRow(['Total Liabilities', `${totalLiability?.toFixed(2)} ${preferences.currencyUnit}`])

    // Goals
    goalsWorksheet.addRow(['Goal', 'Current Metric', 'Target Metric'])
    goals?.forEach((item) => {
      goalsWorksheet.addRow([item.goal, item.current_metric, item.target_metric])
    })

    // Generate the Excel file as a blob
    const blob = await workbook.xlsx.writeBuffer()

    // Save the Blob as a file
    saveAs(new Blob([blob]), 'financial_data.xlsx')
  }

  return (
    <div>
      {isLoadingIncomeSources &&
      isLoadingIncomeExpenses &&
      isLoadingPhysicalAssets &&
      isLoadingLiabilities &&
      isLoadingGoals &&
      expenseQuery.isLoading &&
      tagsQuery.isLoading ? (
        <button className='download-button' style={{ borderRadius: '10px', height: '45px' }}>
          <p style={{ fontSize: '15px' }}>Loading...</p>
        </button>
      ) : (
        <Button className='download-button' onClick={handleExportToExcel}>
          Download
        </Button>
      )}
    </div>
  )
}

export default DownloadAllData
