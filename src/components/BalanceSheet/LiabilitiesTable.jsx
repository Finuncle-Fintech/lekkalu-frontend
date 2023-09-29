import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import IosShareIcon from "@mui/icons-material/IosShare";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import DatePicker from "./DatePicker";

function createData(Name, Outstanding, OS, EMI, Interest, PPM, Finish) {
  return {
    Name,
    Outstanding,
    OS,
    EMI,
    Interest,
    PPM,
    Finish,
  };
}

const rows = [
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Donut", 452, 25.0, 51, 4.9),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Honeycomb", 408, 3.2, 87, 6.5),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Jelly Bean", 375, 0.0, 94, 0.0),
  createData("KitKat", 518, 26.0, 65, 7.0),
  createData("Lollipop", 392, 0.2, 98, 0.0),
  createData("Marshmallow", 318, 0, 81, 2.0),
  createData("Nougat", 360, 19.0, 9, 37.0),
  createData("Oreo", 437, 18.0, 63, 4.0),
  createData("Cudpcake", 305, 3.7, 67, 4.3),
  createData("Dsonut", 452, 25.0, 51, 4.9),
  createData("Ecflair", 262, 16.0, 24, 6.0),
  createData("Froszen yoghurt", 159, 6.0, 24, 4.0),
  createData("Gindgerbread", 356, 16.0, 49, 3.9),
  createData("Honfeycomb", 408, 3.2, 87, 6.5),
  createData("Icef cream sandwich", 237, 9.0, 37, 4.3),
  createData("Jellfy Bean", 375, 0.0, 94, 0.0),
  createData("KfitKat", 518, 26.0, 65, 7.0),
  createData("Lollfipop", 392, 0.2, 98, 0.0),
  createData("Marshfmallow", 318, 0, 81, 2.0),
  createData("Nougaft", 360, 19.0, 9, 37.0),
  createData("Orefo", 437, 18.0, 63, 4.0),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
const headCells = [
  {
    id: "Name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "Outstanding",
    numeric: true,
    disablePadding: false,
    label: "Outstanding",
  },
  {
    id: "OS",
    numeric: true,
    disablePadding: false,
    label: "O/S%",
  },
  {
    id: "RolAbs",
    numeric: true,
    disablePadding: false,
    label: "Rol Abs",
  },
  {
    id: "EMI",
    numeric: true,
    disablePadding: false,
    label: "EMI",
  },
  {
    id: "Interest",
    numeric: true,
    disablePadding: false,
    label: "Interest",
  },
  {
    id: "PPM",
    numeric: true,
    disablePadding: false,
    label: "PPM",
  },
  {
    id: "Finish",
    numeric: false,
    disablePadding: false,
    label: "Finish",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell
          padding="checkbox"
          sx={{
            borderTop: " 1px solid #e0e0e0",
            borderLeft: "none",
            borderRight: "none",
            backgroundColor: "white",
          }}
        >
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            sx={{ marginRight: "2vw" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            // align={headCell.numeric ? "right" : "left"}
            // padding={headCell.disablePadding ? "none" : "normal"}

            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              backgroundColor: "white",
              textAlign: "left",
              borderTop: " 1px solid #e0e0e0",
              borderLeft: "none",
              borderRight: "none",
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography
                variant="subtitle1"
                sx={{ fontSize: "15px", fontWeight: "700", textAlign: "left" }}
              >
                {headCell.label}
              </Typography>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        padding: "35px 0 35px 0",
        borderBottom: " 1px solid #e0e0e0",
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{
            flex: "1 1 100%",
            fontSize: "24px",
            fontWeight: "700",
            marginLeft: "5%",
          }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Liabilities
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <Tooltip title="Share">
            <IconButton>
              <IosShareIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Print">
            <IconButton>
              <LocalPrintshopIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("Name");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((row) => row.Name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);

    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, name];
    } else if (selectedIndex >= 0) {
      newSelected = selected.filter((item) => item !== name);
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  //rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />

        {/*  */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            {" "}
            <DatePicker />
          </Box>
          <Box sx={{ display: "flex", marginRight: "2vw" }}>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center", // Horizontally center the text
                height: "100%", // Vertically center the text
                marginBottom: "0",
                paddingBottom: "0",
              }}
            >
              Page {page + 1} of {Math.ceil(rows.length / rowsPerPage)}
            </Typography>

            <TablePagination
              rowsPerPageOptions={[]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelDisplayedRows={({ from, to, count }) => <></>}
              labelRowsPerPage=""
              sx={{
                border: "none",
              }}
            />
          </Box>
        </Box>

        <TableContainer>
          <Table
          //sx={{ minWidth: 750, border: "none"  }}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />

            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.Name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.Name)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.Name}
                    selected={isItemSelected}
                    sx={{
                      cursor: "pointer",
                      margin: "20px",
                      borderTop: " 1px solid #e0e0e0",
                      borderLeft: "none",
                      borderRight: "none",

                      //   "&:hover": {
                      //     backgroundColor: "lightblue", // Change row background color on hover
                      //   },
                    }}
                  >
                    <TableCell
                      padding="checkbox"
                      sx={{
                        borderTop: "1px solid #e0e0e0",
                        borderLeft: "none",
                        borderRight: "none",
                      }}
                    >
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    {Object.keys(row).map((key) => (
                      <TableCell
                        key={key}
                        align="center"
                        sx={{
                          borderTop: " 1px solid #e0e0e0",
                          borderLeft: "none",
                          borderRight: "none",
                          textAlign: "left",
                        }}
                      >
                        {row[key]}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
  );
}
