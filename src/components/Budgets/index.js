import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import LinearProgressBar from "./ProgressBar";
import InputAdornment from "@mui/material/InputAdornment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {FetchBudgetAndExpenses} from './api'

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function BasicCard() {
  const {data: budgetData} = FetchBudgetAndExpenses()
  console.log(budgetData)
  const [timeRange, setTimeRange] = React.useState(30);
  return (
    <Card sx={{ minWidth: 500 }}>
      <CardContent>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "14px",
          }}
        >
          <h5
            style={{
              fontSize: 14,
              fontWeight: "900",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Budgets
          </h5>
          <FormControl>
            {/* <InputLabel id="demo-simple-select-label">Time</InputLabel> */}
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={timeRange}
              sx={{
                // width: "200px",
                fontSize: "14px",
                height: "36px",
              }}
              //   label="Age"
              onChange={(event) => {
                setTimeRange(event.target.value);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <CalendarMonthIcon style={{ fontSize: "20px" }} />
                </InputAdornment>
              }
            >
              <MenuItem value={10}>Last Week</MenuItem>
              <MenuItem value={20}>This Week</MenuItem>
              <MenuItem value={30}>This Month</MenuItem>
            </Select>
          </FormControl>
        </div>
        {budgetData && budgetData.map(({ budget, month, expense }) => {
          return (
            <LinearProgressBar
              stat1={["spend", expense]}
              stat2={["left", budget]}
              title={month}
            />
          );
        })}
        {/* <p
          style={{
            fontSize: 12,
            // fontWeight: "900",
            textTransform: "uppercase",
            margin: 0,
            color: "#777",
            textAlign: "center",
          }}
        >
          1 - 4 of 4 budgets
        </p> */}
      </CardContent>
    </Card>
  );
}
