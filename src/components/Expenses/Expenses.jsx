/* eslint-disable */
import React, { useState, useContext } from 'react'
import dayjs from 'dayjs'
import Button from '@mui/material/Button'
import * as XLSX from 'xlsx'
import Swal from 'sweetalert2'
import { Context } from '@/provider/Provider'
import { ModalContainer } from './styled'
import { formatDate, getTagNumbers, checkTagsAndLoad } from './utils'

const Expenses = () => {
  const { tags, createTag, fetchExpenses, filterExpensesByDate, fetchTags } = useContext(Context)
  const [page] = useState(0)
  const [, setLoadExcelStatus] = useState(false)
  const [, setNewData] = useState([])
  const [fromDate, setFromDate] = useState(null)
  const [toDate, setToDate] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const rowsPerPage = 10

  const handleFileUpload = (files) => {
    const file = files[0]
    const reader = new FileReader()
    reader.onload = async (event) => {
      const data = event.target.result
      const workbook = XLSX.read(data, { type: 'binary' })

      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]

      const parsedData = XLSX.utils.sheet_to_json(sheet)

      if (parsedData.length > 0) {
        setNewData([{ excelLength: parsedData.length }])

        const loadExcel = () => {
          setLoadExcelStatus(true)

          const promise = parsedData.map(async (entry) => {
            const dateFormatted = formatDate(new Date(entry.date))

            const tagsOfExpenses = entry.tags.split(',').map((expense) => ({ name: expense.trim() }))
            const { amount } = entry
            delete entry.amount
            delete entry.date

            const newTagsExpenses = []

            await Promise.resolve(checkTagsAndLoad(newTagsExpenses, tags, tagsOfExpenses, createTag))

            const tagsIds = getTagNumbers(newTagsExpenses, tags)

            const createStatus = await createExpenseRequest({
              ...entry,
              amount: amount.toFixed(2).toString(),
              tags: tagsIds,
              time: dateFormatted,
              user: 1,
            })

            setNewData((prevData) => [...prevData, createStatus])
          })

          return Promise.all(promise)
        }
        await loadExcel()
      }
      setLoadExcelStatus(false)
      Swal.fire({
        icon: 'success',
        title: 'The expense was added correctly.',
        timer: 2300,
        timerProgressBar: true,
      })
    }

    reader.readAsBinaryString(file)
  }

  const clearFilters = async () => {
    setIsLoading(true)
    setFromDate(null)
    setToDate(null)
    await fetchExpenses(page, rowsPerPage)
    setIsLoading(false)
  }

  const handleFilterSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    if (fromDate === null && toDate === null) {
      await fetchExpenses(page, rowsPerPage)
    } else {
      const from = new Date(fromDate).toLocaleDateString('en-US')
      const to = new Date(toDate).toLocaleDateString('en-US')

      const filterFromDate = dayjs(from).format('YYYY-MM-DD')
      const filterToDate = dayjs(to).format('YYYY-MM-DD')

      await filterExpensesByDate(page, rowsPerPage, filterFromDate, filterToDate)
    }
    setIsLoading(false)
  }

  return (
    <ModalContainer>
      <Button
        type='button'
        variant='contained'
        sx={{ py: 2, px: 4, ml: 1 }}
        disabled={isLoading}
        onClick={clearFilters}
        className='bg-danger'
      >
        Clear
      </Button>
    </ModalContainer>
  )
}

export default Expenses
