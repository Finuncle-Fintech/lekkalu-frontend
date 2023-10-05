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
        "@media (max-width: 800px)": {
          display: "none",
        },
        width: '100%',
        height: '100%',
      }}
    >
      <AssetTable assetDatas={props.assetDatas} />
    </Box>
  );
}
