import react, { useState, useEffect, useContext, useMemo } from "react";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Swal from "sweetalert2";

const ITEM_HEIGHT = 48;


const EditToolbar = (props) => {
  const isMobile = window.innerWidth <= 768;
  const { setRows, setRowModesModel, selectionModel, incomeTable } =
    props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const addRowButton = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: "", type: "", value: "", isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer
      sx={{ backgroundColor: "#ffffff", marginBottom: "10px", borderRadius: 0, }}
      className="toolbar-container"
    >
      <div>
        <GridToolbarQuickFilter
          className="quick-filter"
          variant="outlined"
          size="small"
          sx={{ ml: 1, flex: 1 }}
        />
      </div>
      {isMobile ? (
        <>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>

          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
              },
            }}
          >
            <MenuItem onClick={handleClose}>
              <IconButton
                onClick={() => {
                  const selectedIDs = new Set(selectionModel);
                  setRows((r) => r.filter((x) => !selectedIDs.has(x.id)));
                }}
                className="table-button"
                sx={{
                  color: "#344054",
                  fontSize: "14px",
                  fontWeight: "500",
                  "&:hover": {
                    backgroundColor: "transparent"
                    },
                }}
              >
                <DeleteIcon
                  className="table-button-icon"
                  sx={{
                    color: "#344054",
                    width: 20,
                    height: 20,
                    marginRight: "4px",
                  }}
                />
                DELETE
              </IconButton>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <GridToolbarFilterButton
                className="menu-item-button table-button"
                sx={{
                    color: "#344054",
                    margin: "10px",
                    "&:hover": {
                        backgroundColor: "transparent"
                    },
                }}
              />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <GridToolbarExport
                sx={{
                    color: "#344054",
                    margin: "10px",
                    "&:hover": {
                        backgroundColor: "transparent"
                    },
                }}
                className="table-button table-export-icon"
              />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Button
                color="primary"
                sx={{
                    color: "#344054",
                    margin: "10px",
                    "&:hover": {
                        backgroundColor: "transparent"
                    },
                }}
                className="table-button"
                startIcon={
                  <AddIcon
                    className="table-button-icon"
                    sx={{ color: "#000000", width: 20, height: 20 }}
                  />
                }
                onClick={addRowButton}
              >
                {`${incomeTable ? 'Add Income' : 'Add Expense'}`}
              </Button>
            </MenuItem>
          </Menu>
        </>
      ) : (
        <div>
          <IconButton
            onClick={() => {
              const selectedIDs = new Set(selectionModel);
              // you can call an API to delete the selected IDs
              // and get the latest results after the deletion
              // then call setRows() to update the data locally here
              setRows((r) => r.filter((x) => !selectedIDs.has(x.id)));
            }}
            className="table-button"
            sx={{
              color: "#344054",
              fontSize: "14px",
              fontWeight: "500",
              "&:hover": { borderRadius: "12px" },
            }}
          >
            <DeleteIcon
              className="table-button-icon"
              sx={{
                color: "#344054",
                width: 20,
                height: 20,
                marginRight: "4px",
              }}
            />
            Delete
          </IconButton>
          <GridToolbarFilterButton
            className="table-button"
            sx={{ color: "#344054", margin: "10px" }}
          />
          <GridToolbarExport
            sx={{
              border: "1px solid #D0D5DD",
              color: "#FFFfff",
              borderRadius: "8px",
              color: "#344054",
              fontSize: "14px",
              fontWeight: 500,
              padding: "10px",
              margin: "10px",
              lineHeight: "20px",
              "span svg": {
                width: "20px",
                height: "20px",
              },
            }}
            className="table-button table-export-icon"
          />
          <Button
            color="primary"
            sx={{
              borderRadius: "8px",
              border: "1px solid #0070FF",
              background: "#0070FF",
              boxShadow: "0px 0.96159px 1.92319px 0pxrgba(16, 24, 40, 0.05)",
              color: "#FFFFFF",
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "20px",
              padding: "10px",
              marginLeft: "10px",
              "&:hover": { backgroundColor: "#0070FF" },
            }}
            className="table-button"
            startIcon={
              <AddIcon
                className="table-button-icon"
                sx={{ color: "#ffffff", width: 20, height: 20 }}
              />
            }
            onClick={addRowButton}
          >
            {`${incomeTable ? 'Add Income' : 'Add Expense'}`}
          </Button>
        </div>
      )}
    </GridToolbarContainer>
  );
}

const CustomNoRowsOverlay = (props) => {
  const { incomeTable } = props;
  return (
    <div>
      <Box sx={{ mt: 1, textAlign: 'center' }}>{incomeTable ? 'No Incomes in Records!' : 'No Expenses in Records!'}</Box>
    </div>
  );
}

const IncomeExpenseTable = ({ incomeStatement, addfield, updateField, deleteField, incomeTable }) => {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    if(incomeStatement) {
      setRows(incomeStatement);
    }
  }, [incomeStatement]);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this`,
      icon:  "warning",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "Red",
    }).then((res) => {
      if (res.isConfirmed) {
        deleteField(id);
        setRows(rows.filter((row) => row.id !== id));
        Swal.fire("Deleted", "Your income record deleted successfully.", "success");
      }
    });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow?.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    if(newRow.isNew === true) {
      delete newRow.id;
      Swal.fire({
        title: "Are you sure?",
        text: `You won't be able to revert this`,
        icon: "warning",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        confirmButtonColor: "Blue",
      }).then((res) => {
        if (res.isConfirmed) {
          addfield({...newRow, amount: newRow.value}).then((resp) => {
            if(resp.status === 201) {
              setRowModesModel(false);
              Swal.fire("Added", "Your income record added successfully.", "success");
            } else {
              Swal.fire({
                text: `Please enter valid value.`,
                icon: "error",
              });
            }
          });
        }
      });
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: `You won't be able to revert this`,
        icon: "warning",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        confirmButtonColor: "Blue",
      }).then((res) => {
        if (res.isConfirmed) {
          updateField(newRow.id, {...newRow, amount: newRow.value}).then((res) => {
            if(res.status === 200) {
              Swal.fire("Updated", "Your income record updated successfully.", "success");
            } else {
              Swal.fire({
                text: `Please enter valid value.`,
                icon: "error",
              });
            }
          });
        }
      });
    }
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const columns = useMemo(
    () => [
      { field: "name", headerName: "Name", width: 180, editable: true },
      {
        field: "type",
        headerName: "Type",
        width: 180,
        align: "left",
        headerAlign: "left",
        editable: true,
      },
      {
        field: "value",
        headerName: "Amount",
        width: 180,
        editable: true,
      },
      {
        field: "actions",
        type: "actions",
        width: 100,
        cellClassName: "actions",
        getActions: ({ id }) => {
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

          if (isInEditMode) {
            return [
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                sx={{
                  color: "primary.main",
                }}
                onClick={handleSaveClick(id)}
              />,
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="inherit"
              />,
            ];
          }

          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
              showInMenu
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
              color="inherit"
              showInMenu
            />,
          ];
        },
      },
    ],
    [handleDeleteClick, handleEditClick, handleSaveClick, handleCancelClick]
  );
  return (
    <>
      <Box
        sx={{
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <DataGrid
          rows={rows}
          sx={{ border: "unset" }}
          className="datagrid-container"
          columns={columns}
          getRowId={(row) => row.id}
          checkboxSelection
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          rowSelectionModel={selectedRows ?? null}
          onRowSelectionModelChange={(ids)=>{
            setSelectedRows(ids);
          }}
          rowSelectionModel={selectedRows}
          slots={{
            toolbar: EditToolbar,
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel, incomeTable },
            noRowsOverlay: { incomeTable }
          }}
          hideFooter
        />
      </Box>
    </>
  );
};

export default IncomeExpenseTable;
