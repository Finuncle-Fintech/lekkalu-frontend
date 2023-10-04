import { Delete } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { Context } from "provider/Provider";
import { useContext, useState } from "react";
import { MuiTable } from "./styled";
import EditBudgetModal from "./EditBudgetModal";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export default function ViewAllBudgetModal() {
  const [open, setOpen] = useState(false);
  const { budget, deleteBudget } = useContext(Context);

  return (
    <>
      <Button
        variant="outlined"
        className="flex-grow-1"
        onClick={() => {
          setOpen(true);
        }}
      >
        View All
      </Button>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>Budgets</DialogTitle>
        <DialogContent>
          <MuiTable>
            <TableBody>
              {budget.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {dayjs(item.month, "YYYY-MM-DD").format("MMMM")}
                  </TableCell>
                  <TableCell>{item.limit}</TableCell>
                  <TableCell>
                    <EditBudgetModal budget={item} />
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => {
                        deleteBudget(item.id);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </MuiTable>
        </DialogContent>
      </Dialog>
    </>
  );
}
