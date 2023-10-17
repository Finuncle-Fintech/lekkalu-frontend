/* eslint-disable */
import React, { useState, useEffect, useContext } from 'react'
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import ReactFileReader from 'react-file-reader'
import Swal from 'sweetalert2'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { ModalContainer } from './styled'
import {
  formatDate,
  getTagNumbers,
  preventPropagationOnEnter,
  checkExpensesDoesNotRepeat,
  checkTagsAndLoad,
} from './utils'
import TagInput from './TagInput'
import ButtonExcel from './components/ButtonExcel'
import ModalExcelClosed from './components/ModalExcelClosed'

const ExpenseFormModal = ({
  onAddExpense,
  onUpdateExpense,
  expenseToEdit,
  editIndex,
  onCancelEdit,
  handleFileUpload,
  loadExcelStatus,
  createExpenseExcelStatus,
  Context,
  authToken,
}) => {
  const [open, setOpen] = useState(false)

  const [amount, setAmount] = useState('')
  const [myTags, setMyTags] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date())

  const [errorTag, setErrorTag] = useState(false)
  const [defaultLoadStatus, setDefaultLoadStatus] = useState(false)

  const { tags, createTag } = useContext(Context)

  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    if (expenseToEdit) {
      const { amount, tags, time } = expenseToEdit
      setAmount(amount)
      setMyTags(tags)
      setSelectedDate(new Date(time))

      setOpen(true)
    }
  }, [expenseToEdit])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)

    if (editIndex !== null) {
      onCancelEdit()
    }
  }

  const handleSubmit = async (e) => {
    const newExpense = {
      amount,
      tags: tagIDs,
      userID: 1,
      time: formatDate(new Date(selectedDate)),
    }

    if (editIndex !== null) {
      onUpdateExpense(editIndex, { ...expenseToEdit, ...newExpense })
    } else {
      

      onAddExpense({ ...newExpense })
    }

    Swal.fire({
      icon: 'success',
      title: `${editIndex !== null ? 'The expense was updated correctly' : 'The expense was added correctly'}`,
      timer: 2300,
      timerProgressBar: true,
    })
    setAmount('')
    setMyTags('')
    setDefaultLoadStatus(false)
    handleClose()
  }

  return (
    <>
      {!open && loadExcelStatus ? <ModalExcelClosed createExpenseExcelStatus={createExpenseExcelStatus} /> : <></>}
      <ModalContainer>
        <Button variant='contained' color='primary' onClick={handleClickOpen} data-testid='add-expense'>
          Add Expense
        </Button>
        <Dialog
          open={open}
          onClose={() => {
            handleClose()
          }}
        >
          <DialogTitle>{editIndex !== null ? 'Edit Expense' : 'Add Expense'}</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <TagInput myTags={myTags} setTags={setMyTags} Context={Context} errorTag={errorTag} />
              <DialogActions>
                <ReactFileReader
                  fileTypes={['.xls', '.xlsx']}
                  handleFiles={handleFileUpload}
                  disabled={loadExcelStatus}
                >
                  <ButtonExcel loadExcelStatus={loadExcelStatus} />
                </ReactFileReader>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                  disabled={loadExcelStatus || defaultLoadStatus}
                  type='submit'
                  color='primary'
                  data-testid='submit-expense'
                >
                  {editIndex !== null ? 'Update' : 'Add'}
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </ModalContainer>
    </>
  )
}

export default ExpenseFormModal
