import React, { useState, useEffect, useContext } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ModalContainer } from "../Expenses/styled";
import { formatDate, preventPropagationOnEnter } from "../Expenses/utils";
import dayjs from "dayjs";
import Swal from "sweetalert2";

const GoalFormModal = ({
  onAddGoal,
  onUpdateGoal,
  goalToEdit,
  editIndex,
  onCancelEdit,
  Context,
}) => {
  const [open, setOpen] = useState(false);
  const [goal, setGoal] = useState('');
  const [subGoal, setSubGoal] = useState('');
  const [targetMetric, setTargetMetric] = useState('');
  const [currentMetric, setCurrentMetric] = useState('');
  const [reachablitiyInMonths, setReachablitiyInMonths] = useState('');
  const [reachabilityInYears, setReachabilityInYears] = useState('');
  const [started, setStarted] = useState(dayjs());
  const [finished, setFinished] = useState(dayjs());
  const [plannedStart, setPlannedStart] = useState(dayjs());
  const [plannedFinish, setPlannedFinish] = useState(dayjs());
  const [comments, setComments] = useState('');
  const [preferredQuantity, setPreferredQuantity] = React.useState('higher');

 

  useEffect(() => {
    if (goalToEdit) {
      setGoal(goalToEdit.goal);
      setSubGoal(goalToEdit.subGoal);
      setTargetMetric(goalToEdit.targetMetric);
      setCurrentMetric(goalToEdit.currentMetric);
      setReachablitiyInMonths(goalToEdit.reachablitiyInMonths);
      setReachabilityInYears(goalToEdit.reachabilityInYears);
      setStarted(goalToEdit.started);
      setFinished(goalToEdit.finished);
      setPlannedStart(goalToEdit.plannedStart);
      setPlannedFinish(goalToEdit.plannedFinish);
      setComments(goalToEdit.comments);
      setPreferredQuantity(goalToEdit.preferredQuantity);
      setOpen(true);
    }
  }, [goalToEdit]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (editIndex !== null) {
      onCancelEdit();
    }
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const balance = currentMetric.includes('%') && targetMetric.includes('%') ? Number(targetMetric?.split('%')[0]) - Number(currentMetric?.split('%')[0]) + "%" : targetMetric - currentMetric;
    const newGoal = {
      goal,
      subGoal,
      targetMetric,
      currentMetric,
      balance: balance,
      reachablitiyInMonths,
      reachabilityInYears,
      user: 1,
      started: formatDate(new Date(started)),
      finished: formatDate(new Date(finished)),
      plannedStart: formatDate(new Date(plannedStart)),
      plannedFinish,
      comments,
      preferredQuantity
    };

    if (editIndex !== null) {
      onUpdateGoal(editIndex, { ...goalToEdit, ...newGoal });
    } else {
      onAddGoal({ ...newGoal });
    }

    Swal.fire({
      icon: 'success',
      title: `${editIndex !== null ? "The goal was updated correctly" : "The goal was added correctly"}`,
      timer: 2300,
      timerProgressBar: true
    })
    setGoal("");
    setSubGoal("");
    setTargetMetric("");
    setCurrentMetric("");
    setReachablitiyInMonths("");
    setReachabilityInYears("");
    setStarted("");
    setFinished("");
    setPlannedStart("");
    setPlannedFinish("");
    setComments("");
    handleClose();
  };

  const isAmountValid = (value) => {
    const regex = /^(0|[1-9]\d*)(\.\d{0,2})?$/;
    return regex.test(value);
  }

  const isPercentageValid = (value)=>{
    const regex = /^100(\.0{0,2})? *%?$|^\d{1,2}(\.\d{1,2})? *%?$/;
    return regex.test(value);
  }

  const isReachabilityValid = (value)=>{
    const regex = /^(0|[1-9]\d*)?$/;
    return regex.test(value);
  }
  const handleAmountChange = (event, setAmount) => {
    const newValue = event.target.value;
    if ( isPercentageValid(newValue) || isAmountValid(newValue) || newValue === "") {
      setAmount(newValue);
    } else {
      return;
    }
  };

  const handleChange = (event, newPreferredQuantity) => {
    setPreferredQuantity(newPreferredQuantity);
  };

  const handleReachabilityChange = (event, setReachability) => {
    const newValue = event.target.value;
    if (isReachabilityValid(newValue) ||  newValue === "") {
      setReachability(newValue);
    } else {
      return;
    }
  }

  const handleDateChange = async (date,setDate) => {
    setDate(date);
  };

  const handleFinishedDateChange = async (date,setDate,startDate) => {
    if(date.$d.getTime() < startDate.$d.getTime()){
      alert("Finish date cannot be before start date")
    }else{
      setDate(date)
    }
  };
  


  const handleGoalChange = (event) => {
    const newValue = event.target.value;
    setGoal(newValue);

  };
  const handleSubGoalChange = (event) => {
    const newValue = event.target.value;
    setSubGoal(newValue);
  };

  return (
    <>
      <ModalContainer>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
          data-testid="add-goal"
        >
          Add Goal
        </Button>
        <Dialog open={open} onClose={() => {
          handleClose()
        }}
        >


          <DialogTitle>{editIndex !== null ? "Edit Goal" : "Add Goal"}</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <Typography variant="p">Provide the Goal:</Typography>
              <TextField
                value={goal}
                onChange={handleGoalChange}
                onKeyPress={preventPropagationOnEnter}
                required
                fullWidth
                data-testid="goal"
              />
              <Typography variant="p">Provide the Sub Goal:</Typography>
              <TextField
                value={subGoal}
                onChange={handleSubGoalChange}
                onKeyPress={preventPropagationOnEnter}
                required
                fullWidth
                data-testid="sub-goal"
              />
              <Typography variant="p">Provide the Target Metric:</Typography>
              <TextField
                value={targetMetric}
                onChange={(event) => handleAmountChange(event, setTargetMetric)}
                onKeyPress={preventPropagationOnEnter}
                required
                fullWidth
                data-testid="target-metric"
              />
              <Typography variant="p">Provide the Current Metric:</Typography>
              <TextField
                value={currentMetric}
                onChange={(event) => handleAmountChange(event, setCurrentMetric)}
                onKeyPress={preventPropagationOnEnter}
                required
                fullWidth
                data-testid="current-metric"
              />
              <Typography variant="p">Provide the Reachability in Months:</Typography>
              <TextField
                value={reachablitiyInMonths}
                onChange={(event) => handleReachabilityChange(event, setReachablitiyInMonths)}
                onKeyPress={preventPropagationOnEnter}
                required
                fullWidth
                data-testid="reachablitiy-in-months"
              />
              <Typography variant="p">Provide the Reachability in Years:</Typography>
              <TextField
                value={reachabilityInYears}
                onChange={(event) => handleReachabilityChange(event, setReachabilityInYears)}
                onKeyPress={preventPropagationOnEnter}
                required
                fullWidth
                data-testid="reachability-in-years"
              />
              <Typography variant="p">Choose the Started Date:</Typography>
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DatePicker
                    data-testid='start-date'
                    defaultValue={dayjs(started)}
                    onChange={(date) => handleDateChange(date, setStarted)}
                  />
                </LocalizationProvider>
              </div>
              <Typography variant="p">Choose the Finished Date:</Typography>
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DatePicker
                    data-testid='finished-date'
                    defaultValue={dayjs(finished)}
                    onChange={(date) => handleFinishedDateChange(date,setFinished,started)}
                  />
                </LocalizationProvider>
              </div>
              <Typography variant="p">Choose the Planned Start Date:</Typography>
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DatePicker
                    data-testid='planned-start-date'
                    defaultValue={dayjs(plannedStart)}
                    onChange={(date) => handleDateChange(date, setPlannedStart)}
                  />
                </LocalizationProvider>
              </div>
              <Typography variant="p">Choose the Planned Finish Date:</Typography>
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DatePicker
                    data-testid='planned-finish-date'
                    defaultValue={dayjs(plannedFinish)}
                    onChange={(date) => handleFinishedDateChange(date, setPlannedFinish,plannedStart)}
                  />
                </LocalizationProvider>
              </div>
              <Typography variant="p">Provide the Comments for the Goal:</Typography>
              <TextField
                value={comments}
                onChange={(event) => setComments(event.target.value)}
                onKeyPress={preventPropagationOnEnter}
                required
                fullWidth
                data-testid="comments"
              />
              <Typography variant="p">Choose preffered value of Balance:</Typography>
              <div>
                <ToggleButtonGroup
                  color="primary"
                  value={preferredQuantity}
                  exclusive
                  onChange={handleChange}
                  aria-label="Platform"
                  data-testid='preferred-quantity'
                >
                  <ToggleButton value="higher">Higher</ToggleButton>
                  <ToggleButton value="lower">Lower</ToggleButton>
                </ToggleButtonGroup>
              </div>
              <DialogActions  >
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" color="primary" data-testid="submit-goal">
                  {editIndex !== null ? "Update" : "Add"}
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </ModalContainer>

    </>
  );
};

export default GoalFormModal;
