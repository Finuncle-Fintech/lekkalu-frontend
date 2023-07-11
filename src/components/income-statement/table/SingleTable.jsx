import React, { useState, useEffect} from 'react';
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";  
import styles from './SingleTable.module.css';
import AddIcon from '@mui/icons-material/Add';



const SingleTable = ({header, headerColor}) => {

  const [total, setTotal] = useState(0);

  function createData(name, plus) {
    return { name, plus };
  }

  const rows = [
    createData("Item 1", 159),
    createData("Item 2", 237),
    createData("Item 3", 262),
    createData("Item 4", 305),
    createData("Item 5", 500),
    createData("Total", total),
  ];

  const setTotalValue = () => {
    const totalValue = Object.values(rows).reduce((r, { plus }) => r + plus, 0);
    setTotal(totalValue);
  };

  useEffect(() => {
    setTotalValue();
  }, []);

  const addNewRecord = () => {
    alert(`add new record to table ${header}`)
  }

  return (
    <div>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} className={styles.table} aria-label="simple table">
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
                    <TableCell align="right">{row.plus}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
    </div>
  )
}

export default SingleTable