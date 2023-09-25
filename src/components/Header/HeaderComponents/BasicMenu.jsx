import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import { MenuItem, Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";

function BasicMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const location = useLocation();
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (submenu) => {
    if (submenu.path) {
      navigate(submenu.path);
    } else {
      if (submenu.onClick) {
        submenu.onClick();
      }
    }
  };
  const isActive = (pathname) => {
    return location.pathname === pathname;
  };

  return (
    <Box
      sx={{
        width: props.Menu.title == "Calculator" ?" 0": "34vw",
        display: "flex",
        justifyContent: props.Menu.title === "Calculator" ? "flex-start": "flex-end",
        alignItems: "center",
        marginLeft: '10px',
        "@media (max-width: 900px)": {
          display: props.Menu.title === "User setting" ? "none" : "flex",
        },
      }}
    >
      {console.log(props.Menu.title)}
      <Tooltip title={props.Menu.title}>
        <IconButton
          onClick={handleClick}
          style={{
            margin: props.Menu.title === "User setting" ? "0 2vw 0 0 " : "Balance sheet" ? '0': '10px',
            width: props.Menu.title === "Balance sheet" ? "51px":"51px",
            height: props.Menu.title === "Balance sheet" ? "51px":"51px",
            backgroundColor: "white",
          }}
        >
          <img
            src={props.Menu.img}
            alt="menu-2"
            width={props.Menu.title === "User setting" ? 21 : "Balance sheet" ? 21: 28}
            height={props.Menu.title === "User setting" ? 21 : "Balance sheet" ? 21: 28}
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
          const onClickHandler = () => handleItemClick(submenu);
          return (
            <MenuItem
              sx={{
                width: "150px",
                backgroundColor: isActive(submenu.path) ? "#0F4C91" : "white",
                color: isActive(submenu.path) ? "white" : "black",
                "&:hover": {
                  backgroundColor: isActive(submenu.path)
                    ? "#0F4C91"
                    : "primary.main", // Change the hover background color
                  color: isActive(submenu.path) ? "white" : "white", // Change the hover text color
                },
              }}
              onClick={onClickHandler}
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
