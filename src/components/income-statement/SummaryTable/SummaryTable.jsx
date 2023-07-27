import React, { useState, useEffect} from 'react';
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";  
import styles from './SummaryTable.module.css';
import AddIcon from '@mui/icons-material/Add';

import Swal from 'sweetalert2'



const SummaryTable = ({header, headerColor}) => {

  const [total, setTotal] = useState(0);

  function createData(name, plus) {
    return { name, plus };
  }

  const rows = [
    createData("Item 1", 159),
    createData("Item 2", -237),
    createData("Item 3", 262),
    createData("Item 4", -50),
    createData("Item 5", 500),
    createData("Total", total),
  ];

  const [initalState, setInitialState] = useState(rows)

  const setTotalValue = () => {
    const totalValue = Object.values(rows).reduce((r, { plus }) => r + plus, 0);
    setTotal(totalValue);
  };

  useEffect(() => {
    setTotalValue();
  }, []);

  const updateState = (name, plus) => {    
    setInitialState(...initalState, `createData(${name}, ${plus})`)
    console.log(initalState)    
  }

  const addNewRecord = () => {        
    Swal.fire({
      title: 'New Record',
      html:
        '<label>Record Name:</label><input id="swal-input1" class="swal2-input">' +
        '<label>Record Value:</label><input id="swal-input2" type="number" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
       
        return [    
          updateState(document.getElementById('swal-input1').value, document.getElementById('swal-input2').value)                    
        ]
      }
    })    
  }


  return (
    <div className={styles.tableWrapper}>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} className={styles.table} aria-label="simple table">
              <TableHead  className={styles.tableRow}>
                <TableRow >
                  <TableCell sx={{ bgcolor: `${headerColor}` }}>{header}</TableCell>
                  <TableCell sx={{ bgcolor: `${headerColor}` }} align="right"><button className={styles.AddNewRecordButton} onClick={addNewRecord}><AddIcon /></button></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    className={styles.dataRow}
                  >
                    <TableCell
                      className={styles.tableDataCell}
                      component="th"
                      scope="row"
                    >
                      {row.name}
                    </TableCell>
                    {Number(row.plus) > 0? <TableCell sx={{color: 'green'}} align="right">{row.plus}</TableCell> : <TableCell sx={{color: 'red'}} align="right">{row.plus}</TableCell>}
                  </TableRow>
                ))}
              
              </TableBody>
            </Table>
          </TableContainer>
    </div>
  )
}

export default SummaryTable