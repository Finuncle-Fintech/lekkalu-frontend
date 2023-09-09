import React, { useState, useContext, useEffect } from "react";
import {
  Typography,
  TablePagination,
  IconButton
} from "@mui/material";
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { SkipNext, SkipPrevious } from '@mui/icons-material';
import ExpenseFormModal from "./ExpensesModal";
import {ContainerExpenses,
        ContainerExpensesHeader,
        ContainerCardsComponents,
        ContainerExpensesData} from "./styled";
import ExpensesList from "./ExpenseList";
import { formatDate, getTagNumbers } from "./utils";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
import SingleCardExpenses from "./components/SingleCardExpenses";
import ExpensesCharts from "components/Charts/Charts";
import styles from './styles/Expenses.module.css'
import { checkTagsAndLoad } from "./utils";

const Expenses = ({ Context }) => {
  const {
    expenses,
    tags,
    createTag,
    fetchExpenses,
    filterExpensesByDate,
    deleteExpenseRequest,
    createExpenseRequest,
    changeExpenseRequest,
    fetchTags,
    budget,
    authToken
  } = useContext(Context);
  const getDate = new Date()
  const [editIndex, setEditIndex] = useState(null);
  const [page, setPage] = useState(0);
  const [loadExcelStatus, setLoadExcelStatus] = useState(false)
  const [newData, setNewData] = useState([])
  const [fromDate, setFromDate] = useState(null)
  const [toDate, setToDate] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const rowsPerPage = 10;


  useEffect(() => {
    if (!tags.length) fetchTags();
    fetchExpenses(page, rowsPerPage);
  }, [page]);

  const getTagObjects = (tagValues) => {
    return tagValues
      .map((tagValue) => tags.find((tag) => tag.id === tagValue))
      .filter((tag) => tag !== undefined);
  };

  const getTagNames = (tagValues) => {
    const tagNames = tagValues && tagValues
      .map((tagValue) => {
        const foundTag = tags.find((tag) => tag.id === tagValue);
        return foundTag ? foundTag.name : null;
      })
      .filter((tagName) => tagName !== null)
      .join(', #');
     
    return tagNames
  };

  const handleFileUpload = (files) => {

    const file = files[0];
    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: "binary" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const parsedData = XLSX.utils.sheet_to_json(sheet);


      if (parsedData.length > 0) {
        setNewData([{ excelLength: parsedData.length }])

        const loadExcel = () => {
          setLoadExcelStatus(true)

          const promise = parsedData.map(async entry => {
            const dateFormatted = formatDate(new Date(entry.date));
            
            const tagsOfExpenses = entry.tags.split(',').map((expense)=>({name:expense.trim()}))
            const {amount} = entry
            delete entry.amount
            delete entry.date

            const newTagsExpenses = []

            await Promise.resolve(checkTagsAndLoad(newTagsExpenses, tags, tagsOfExpenses, createTag ))

            const tagsIds = getTagNumbers(newTagsExpenses, tags)

            const createStatus = await createExpenseRequest({ ...entry, amount:amount.toFixed(2).toString() , tags: tagsIds, time: dateFormatted, user: 1 });
            
            setNewData((prevData)=>[...prevData, createStatus])
          });

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
    };

    reader.readAsBinaryString(file);
  };

  const deleteExpense = (id) => {
    deleteExpenseRequest(id);
  };

  const createExpense = (expense) => {
    createExpenseRequest({ ...expense });
  };

  const updateExpense = (index, expense) => {
    changeExpenseRequest(index, expense);
  };

  const returnExpenseToEdit = () => {
    return editIndex !== null ? { ...expenses[editIndex], tags: getTagObjects(expenses[editIndex].tags) } : null
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

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
      await fetchExpenses(page, rowsPerPage);
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
    <section className={styles.container}>
        <span style={{alignSelf:'start'}}>Home » Expenses</span>
        <div className={styles.modalContainer}>
        
          {/* Modal */}
        
            <div className={styles.containerCardsComponents}>
                {/* card */}
                <SingleCardExpenses data={budget} title={'Budget'} />

            </div>

            <ContainerExpensesData>

              <ExpensesCharts Context={Context} />

              <div className={styles.containerExpenses}>
                
                <div className={styles.containerExpensesHeader}>
                  <Typography style={{fontSize:'1.2rem'}}>Expenses</Typography>

                  <ExpenseFormModal
                    onAddExpense={createExpense}
                    onUpdateExpense={updateExpense}
                    expenseToEdit={returnExpenseToEdit()}
                    editIndex={editIndex}
                    onCancelEdit={() => setEditIndex(null)}
                    loadExcelStatus = {loadExcelStatus}
                    handleFileUpload={handleFileUpload}
                    createExpenseExcelStatus = {newData}
                    Context={Context}
                    authToken={authToken}
                  />
                </div>
                {/* Arrows fro change expense */}
                {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton
                    onClick={() => {
                      setPage((prevPage) => Math.max(prevPage - 3, 0));
                    }}
                  >
                    <SkipPrevious />
                  </IconButton>
                  <TablePagination
                    component="div"
                    count={70}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[]}
                    labelDisplayedRows={() => ''}
                  />
                  <IconButton
                    onClick={() => {
                      setPage((prevPage) => Math.min(prevPage + 3, 6));
                    }}
                  >
                    <SkipNext />
                  </IconButton>
                  {page * 10 + 1} - {page * 10 + 10} of 70
                </div> */}

                <ExpensesList
                  expenses={expenses}
                  getTagNames={getTagNames}
                  setEditIndex={setEditIndex}
                  deleteExpense={deleteExpense}
                />
                {/* Arrows for change the expenses view */}
                {/* {!!expenses.length &&
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                      onClick={() => {
                        setPage((prevPage) => Math.max(prevPage - 3, 0));
                      }}
                    >
                      <SkipPrevious />
                    </IconButton>
                    <TablePagination
                      component="div"
                      count={70}
                      page={page}
                      onPageChange={handleChangePage}
                      rowsPerPage={10}
                      rowsPerPageOptions={[]}
                      labelDisplayedRows={() => ''}
                    />
                    <IconButton
                      onClick={() => {
                        setPage((prevPage) => Math.min(prevPage + 3, 6));
                      }}
                    >
                      <SkipNext />
                    </IconButton>
                    {page * 10 + 1} - {page * 10 + 10} of 70
                  </div>
                } */}
              </div>
              
            </ContainerExpensesData>
          

        </div>
    </section>

  );
};

export default Expenses;

