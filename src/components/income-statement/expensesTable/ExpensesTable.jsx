import React, { useState, useEffect, useContext } from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "./ExpensesTable.module.css";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";
import useAxiosPrivate from 'hooks/useAxiosPrivate';



const ExpensesTable = ({ header, headerColor }) => {
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  




  async function getData() {
    try {       
      const apiURL = `${process.env.REACT_APP_BACKEND_URL}/api/income_expense`;
      const response = await axiosPrivate.get(apiURL)
      setData(response.data);
      
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData()
  }, []);

  useEffect(() => {
    sumTotalValue()
  }, [data])

  const sumTotalValue = () => {
    setTotal(data.reduce((a, r) => a + Number(r.amount), 0));   
  };

  

  const [initalState, setInitialState] = useState([]);

  const updateState = (name, plus) => {
    setInitialState(...initalState, `createData(${name}, ${plus})`);
    console.log(initalState);
  };

  const addNewRecord = () => {
    Swal.fire({
      title: "New Record",
      html:
        '<label>Record Name:</label><input id="swal-input1" class="swal2-input">' +
        '<label>Record Value:</label><input id="swal-input2" type="number" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          updateState(
            document.getElementById("swal-input1").value,
            document.getElementById("swal-input2").value
          ),
        ];
      },
    });
  };

  return (
    <div className={styles.tableWrapper}>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 300 }}
          className={styles.table}
          aria-label="simple table"
        >
          <TableHead className={styles.tableRow}>
            <TableRow>
              <TableCell sx={{ bgcolor: `${headerColor}` }}>{header}</TableCell>
              <TableCell sx={{ bgcolor: `${headerColor}` }} align="right">
               
                <button
                  className={styles.AddNewRecordButton}
                  onClick={addNewRecord}
                >
                  <AddIcon />
                </button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .sort((a, b) => b.id - a.id)              
              .map((row, key) => (
                <TableRow key={key} className={styles.dataRow}>
                  <TableCell
                    className={styles.tableDataCell}
                    component="th"
                    scope="row"
                    key={key}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                </TableRow>
              ))}
            <TableRow className={`${styles.dataRow} ${styles.totalAmountRow}`}>
              <TableCell
                className={styles.tableDataCell}
                component="th"
                scope="row"
              >
                Total amount
              </TableCell>
              <TableCell align="right">{total}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ExpensesTable;
