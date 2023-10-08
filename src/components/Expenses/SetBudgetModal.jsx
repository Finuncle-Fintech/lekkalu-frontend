import { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Context } from "provider/Provider";
import { DatePicker } from "@mui/x-date-pickers";
import Swal from "sweetalert2";
import dayjs from "dayjs";

export default function SetBudgetModal() {
  const [open, setOpen] = useState(false);
  const { createBudget } = useContext(Context);
  const [limit, setLimit] = useState("");
  const [month, setMonth] = useState(dayjs());

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!limit || !month) {
      Swal.fire({
        icon: "error",
        title: "Please enter all fields",
        timer: 2300,
        timerProgressBar: true,
      });
    }

    try {
      const data = {
        limit,
        month: month.format("YYYY-MM-DD"),
      };

      const response = await createBudget(data);
      if (response.status === 201) {
        setOpen(false);
        setLimit("");
        setMonth("");

        Swal.fire({
          icon: "success",
          title: "Successfully set the budget",
          timer: 2300,
          timerProgressBar: true,
        });
      }
    } catch (error) {}
  };

  return (
    <>
      <Button
        variant="contained"
        className="flex-grow-1"
        onClick={() => {
          setOpen(true);
        }}
      >
        Set Budget
      </Button>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>Set Budget</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} className="p-4">
            <TextField
              className="mb-4"
              label="Limit"
              value={limit}
              onChange={(e) => {
                setLimit(e.target.value);
              }}
              required
              fullWidth
            />
            <DatePicker
              onChange={(newValue) => {
                setMonth(newValue);
              }}
              value={month}
              views={["month"]}
              label="Month"
              className="w-100 mb-4"
            />

            <div className="d-flex align-items-center gap-2 w-100">
              <Button type="submit" variant="contained" className="flex-grow">
                Set
              </Button>
              <Button
                className="flex-grow"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
