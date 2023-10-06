import React from "react";
import { Box, Typography } from "@mui/material";
import LiabilitiesTable from "./LiabilitiesTable";

export default function Liabilities(props) {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "40px",
        padding: "3%",
      }}
    >
      <LiabilitiesTable liabilityDatas={props.liabilityDatas} />
    </Box>
  );
}
