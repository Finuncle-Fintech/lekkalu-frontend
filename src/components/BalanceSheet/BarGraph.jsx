import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Box, CssBaseline, IconButton, Drawer, Tooltip } from "@mui/material";

export default function SimpleBackdrop(props) {
  const handleBoxClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.barGraphIsOpen}
        onClick={props.setBarGraphIsOpen} 
      >
        <Box
          sx={{
            width: "40vw",
            height: "60vh",
            backgroundColor: "white",
            borderRadius: "20px",
            display: "flex",
          }}
          onClick={handleBoxClick} 
        >
          <Box sx={{ width: "100%", height: "18%", display: 'flex', justifyContent: "space-between"}}>
            <Typography sx={{ fontSize: "1.5rem", color: "black", margin:"15px 10px 10px 30px" }}>
              Bar Graph
            </Typography>{" "}
            <IconButton onClick={props.setBarGraphIsOpen} sx={{margin:'15px'}}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </Backdrop>
    </div>
  );
}
