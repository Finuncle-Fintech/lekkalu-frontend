import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import { MenuItem, Tooltip } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

function BasicMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        width: "34vw",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Tooltip title="User setting">
        <IconButton
          onClick={handleClick}
          style={{
            backgroundColor: "white",
            color: "black",
            marginRight: "2vw",
            width: "49px",
            height: "51px",
          }}
        >
          <img
            width="21"
            height="20"
            src="https://img.icons8.com/material-outlined/24/menu-2.png"
            alt="menu-2"
          />
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom', 
          horizontal: 'right', 
        }}
        transformOrigin={{
          vertical: 'top', 
          horizontal: 'right', 
        }}
      >
        <MenuItem onClick={handleClose}>
          Profile
          <AccountCircleIcon sx={{ marginLeft: "20px" }} />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          Logout
          <LogoutIcon sx={{ marginLeft: "20px" }} />
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default BasicMenu;
