import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // Commented because the app renders twice with this:
  //<React.StrictMode>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <App />
  </LocalizationProvider>
  //</React.StrictMode>
);
