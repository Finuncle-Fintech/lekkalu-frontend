import React from "react";
import { Box, Typography } from "@mui/material";
import Table from "./LiabilitiesTable";


export default function Liabilities() {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "40px",
        padding: "3%",
        "@media (max-width: 1000px)": {
          display: "none",
        },
      }}
    >
      <Table />
    </Box>
  );
}
