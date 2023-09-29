import React from "react";
import { Box } from "@mui/material";
import AssetTable from "./AssetTable";
export default function Asset(props) {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "40px",
        padding: "3%",
        marginBottom: "100px",
        "@media (max-width: 1000px)": {
          display: "none",
        },
      }}
    >
      <AssetTable assetDatas={props.assetDatas} />
    </Box>
  );
}
