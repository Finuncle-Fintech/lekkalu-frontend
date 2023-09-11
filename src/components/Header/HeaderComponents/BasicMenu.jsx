import {useState} from 'react';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import { MenuItem } from '@mui/material';

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
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Box>
    );
  }

  export default BasicMenu;