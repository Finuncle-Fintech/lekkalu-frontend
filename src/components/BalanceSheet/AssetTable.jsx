import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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
import { Context } from "provider/Provider";
import { useContext } from "react";
import Menu from "./Menu";
import AddIcon from "@mui/icons-material/Add";
import AssetForm from "./AssetForm";
import Loading from "./Loading";

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
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "ID",
    hidden: true,
  },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "value",
    numeric: true,
    disablePadding: false,
    label: "Current Value",
  },
  {
    id: "rol",
    numeric: true,
    disablePadding: false,
    label: "Rol",
  },
  {
    id: "rolabs",
    numeric: true,
    disablePadding: false,
    label: "Rol Abs",
  },
  {
    id: "setting",
    numeric: false,
    disablePadding: false,
    label: "Setting",
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
        {headCells.map((headCell) =>
          // Conditionally render the header cell based on hidden property
          headCell.hidden ? null : (
            <TableCell
              key={headCell.id}
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
                  sx={{
                    fontSize: "15px",
                    fontWeight: "700",
                    textAlign: "left",
                  }}
                >
                  {headCell.label}
                </Typography>
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          )
        )}
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
  const { numSelected, selectedAssetIds, handleSelectAfterDelete } = props;
  const { deleteAssetRequest } = useContext(Context);

  const handleAssetDelete = async () => {
    if (selectedAssetIds.length > 0) {
      try {
        props.setLoading(true);
        await deleteAssetRequest(selectedAssetIds);
      } catch (error) {
        console.error(
          `Error deleting asset with ID ${selectedAssetIds}:`,
          error
        );
      } finally {
        props.setLoading(false);
      }

      handleSelectAfterDelete();
    }
  };

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
          Assets
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={handleAssetDelete}>
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

export default function EnhancedTable(props) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [showForm, setForm] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleRequestForm = () => {
    setForm(!showForm);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = props.assetDatas.map((row) => row.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleSelectAfterDelete = () => {
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else if (selectedIndex >= 0) {
      newSelected = selected.filter((item) => item !== id);
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

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0
      ? Math.max(
          0,
          (1 + page) * rowsPerPage - Object.keys(props.assetDatas).length
        )
      : 0;

  const visibleRows = React.useMemo(() => {
    if (props.assetDatas && Object.keys(props.assetDatas).length > 0) {
      const sortedData = stableSort(
        Object.values(props.assetDatas),
        getComparator(order, orderBy)
      );

      return sortedData.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );
    } else {
      return [];
    }
  }, [props.assetDatas, order, orderBy, page, rowsPerPage]);

  return (
    <>
      {isLoading && <Loading open={isLoading} />}
      {showForm && (
        <AssetForm
          handleRequestForm={handleRequestForm}
          showForm={showForm}
          setForm={setForm}
          title="Add"
        />
      )}
      {props.assetDatas && Object.keys(props.assetDatas).length > 0 ? (
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <EnhancedTableToolbar
              numSelected={selected.length}
              selectedAssetIds={selected}
              handleSelectAfterDelete={handleSelectAfterDelete}
              setLoading={setIsLoading}
            />

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box
                sx={{
                  width: "15%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button variant="contained" onClick={handleRequestForm}>
                  <AddIcon />
                  <Typography
                    sx={{
                      fontSize: "13px",
                      fontWeight: "700",
                      color: "white",
                      margin: "0 10px 0 10px",
                    }}
                  >
                    Add
                  </Typography>
                </Button>{" "}
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
                  Page {page + 1} of{" "}
                  {Math.ceil(
                    Object.keys(props.assetDatas).length / rowsPerPage
                  )}
                </Typography>

                <TablePagination
                  rowsPerPageOptions={[]}
                  component="div"
                  count={Object.keys(props.assetDatas).length}
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
                  rowCount={Object.keys(props.assetDatas).length}
                />

                <TableBody>
                  {visibleRows.map((row, index) => {
                    const isItemSelected = isSelected(
                      props.assetDatas[index].id
                    );
                    const labelId = `enhanced-table-checkbox-${index}`;
                    let idValue = row.id;

                    return (
                      <TableRow
                        hover
                        onClick={(event) =>
                          handleClick(event, props.assetDatas[index].id)
                        }
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                        sx={{
                          cursor: "pointer",
                          margin: "20px",
                          borderTop: " 1px solid #e0e0e0",
                          borderLeft: "none",
                          borderRight: "none",
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

                        {Object.keys(row).map((key) =>
                          key === "id" ? null : (
                            <TableCell
                              key={key}
                              align="center"
                              sx={{
                                borderLeft: "none",
                                borderRight: "none",
                                textAlign: "left",
                              }}
                            >
                              {row[key]}
                            </TableCell>
                          )
                        )}
                        <TableCell
                          key="rol"
                          align="center"
                          sx={{
                            borderLeft: "none",
                            borderRight: "none",
                            textAlign: "left",
                          }}
                        >
                          0
                        </TableCell>
                        <TableCell
                          key="rolabs"
                          align="center"
                          sx={{
                            borderLeft: "none",
                            borderRight: "none",
                            textAlign: "left",
                          }}
                        >
                          0
                        </TableCell>
                        <TableCell
                          key="setting"
                          align="center"
                          sx={{
                            borderLeft: "none",
                            borderRight: "none",
                            textAlign: "left",
                          }}
                        >
                          <Menu id={idValue} />
                        </TableCell>
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
        </Box>
      ) : (
        <div>No Data</div>
      )}
    </>
  );
}
