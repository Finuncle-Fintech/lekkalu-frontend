import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import { MenuItem, Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";

const styles = {
  iconButton: {
    backgroundColor: "white",
    color: "black",
    margin: "10px",
    width: "51px",
    height: "51px",
  },
};

function BasicMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const location = useLocation();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isActive = (pathname) => {
    return location.pathname === pathname;
  };

  return (
    <Box
      sx={{
        width: "34vw",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        "@media (max-width: 900px)": {
          display: "none", // Hide for screens smaller than 768px
        },
      }}
    >
      <Tooltip title={props.Menu.title}>
        <IconButton
          onClick={handleClick}
          style={{
            margin: props.Menu.title === "User setting" ? "0 2vw 0 0 " : "10px",
            width: "51px",
            height: "51px",
            backgroundColor: "white",
          }}
        >
          <img
            src={props.Menu.img}
            alt="menu-2"
            width={props.Menu.title === "User setting" ? 21 : 28}
            height={props.Menu.title === "User setting" ? 21 : 28}
          />
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: props.Menu.title === "User setting" ? "right" : "center",
        }}
      >
        {Object.keys(props.Menu.submenu).map((key, index) => {
          const submenu = props.Menu.submenu[key];
          const onClickHandler = submenu.onClick || handleClose;
          return (
            <MenuItem
              sx={{
                width: "10vw",
                backgroundColor: isActive(submenu.path) ? "#0F4C91" : "white",
                color: isActive(submenu.path) ? "white" : "black",
                "&:hover": {
                  backgroundColor: isActive(submenu.path) ? "#0F4C91" : "primary.main", // Change the hover background color
                  color: isActive(submenu.path) ? "white" : "white", // Change the hover text color
                },
              }}
              key={index}
              component={Link}
              to={submenu.path}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: "1rem",
                  fontWeight: 500,
                  letterSpacing: "0.5px",
                  width: "80%",
                }}
              >
                {submenu.name}
              </Typography>
              {submenu.icon}
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
}

export default BasicMenu;
