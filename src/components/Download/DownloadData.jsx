import React, { useContext, useEffect, useState } from 'react'
import * as ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import { FiDownloadCloud } from 'react-icons/fi'
import { Context } from '@/provider/Provider'
import './index.css'

const DownloadData = () => {
  const { assets, liabilities, fetchData } = useContext(Context)
  const assetsData = assets.finalAssets
  const assetsValue = assets.totalVal
  const liabilitiesData = liabilities.finalLiabilities
  const liabilitiesValue = liabilities.totalVal
  const { fetchIncomeStatement, fetchAllExpenses, incomeStatement, tags, fetchTags } = useContext(Context)
  const [allexpensess, setAllexpensess] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchAndLogExpenses = async () => {
    setLoading(true)
    try {
      const resp = await fetchAllExpenses()

      setAllexpensess(resp)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAndLogExpenses()
    fetchIncomeStatement()
    fetchData()
    fetchTags()
  }, [])

  const incomeData = incomeStatement.income
  const expenseData = incomeStatement.expenses
  const totalIncome = incomeStatement.income.reduce((total, item) => total + item.value, 0)
  const totalExpense = incomeStatement.expenses.reduce((total, item) => total + item.value, 0)

  const getTagNames = (tagValues) => {
    const tagNames =
      tagValues &&
      tagValues
        .map((tagValue) => {
          const foundTag = tags.find((tag) => tag.id === tagValue)
          return foundTag ? foundTag.name : null
        })
        .filter((tagName) => tagName !== null)
        .join(', ')

    return tagNames
  }

  const handleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook()
    const incomeWorksheet = workbook.addWorksheet('Income')
    const expenseWorksheet = workbook.addWorksheet('Expense')
    const assetsWorksheet = workbook.addWorksheet('Assetes')
    const liabilitiesWorksheet = workbook.addWorksheet('Liabilities')
    const expenselistWorksheet = workbook.addWorksheet('Expense List')

    // Expense List
    expenselistWorksheet.addRow(['Tags', 'Amount', 'Date'])
    allexpensess?.forEach((item) => {
      expenselistWorksheet.addRow([getTagNames(item.tags), item.amount, item.time])
    })
    // Income Statement
    incomeWorksheet.addRow(['Income Name', 'Type of Income', 'Value'])
    incomeData?.forEach((item) => {
      incomeWorksheet.addRow([item.name, item.type, item.value])
    })
    incomeWorksheet.addRow(['Total Income', '', `${totalIncome?.toFixed(2)} Lac₹`])

    // Expense Statement
    expenseWorksheet.addRow(['Expense Name', 'Type of Expense', 'Value'])
    expenseData?.forEach((item) => {
      expenseWorksheet.addRow([item.name, item.type, item.value])
    })
    expenseWorksheet.addRow(['Total Expense', '', `${totalExpense?.toFixed(2)} Lac₹`])

    // Balance Sheet
    assetsWorksheet.addRow(['Asset Name', 'Value'])
    assetsData?.forEach((item) => {
      assetsWorksheet.addRow([item.name, item.value])
    })
    assetsWorksheet.addRow(['Total Value', `${assetsValue?.toFixed(2)} Lac₹`])

    liabilitiesWorksheet.addRow(['Liabilities Name', 'Value'])
    liabilitiesData?.forEach((item) => {
      liabilitiesWorksheet.addRow([item.name, item.value])
    })
    liabilitiesWorksheet.addRow(['Total Liabilities', `${liabilitiesValue?.toFixed(2)} Lac₹`])

    // Generate the Excel file as a blob
    const blob = await workbook.xlsx.writeBuffer()

    // Save the Blob as a file
    saveAs(new Blob([blob]), 'financial_data.xlsx')
  }

  return (
    <div>
      {loading ? (
        <button className='download-button' style={{ borderRadius: '10px', height: '45px' }}>
          <p style={{ fontSize: '15px' }}>Loading...</p>
        </button>
      ) : (
        <button className='download-button' onClick={handleExportToExcel}>
          <FiDownloadCloud />
        </button>
      )}
    </div>
  )
}

export default DownloadData
