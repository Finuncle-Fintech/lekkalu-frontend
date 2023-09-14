import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  CssBaseline,
  IconButton,
  Drawer,
  Hidden,
  Button,
  Tooltip,
} from "@mui/material";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "./HeaderComponents/Logo";
import BasicMenu from "./HeaderComponents/BasicMenu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Context } from "provider/Provider";

const styles = {
  appBar: {
    maxWidth: "100vw",
    minHeight: "15vh",
    color: "white",
    backgroundColor: "primary.main",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconButton: {
    width: "49px",
    height: "51px",
    margin: "10px",
  
  },
  responsiveIconButton: {
    backgroundColor: "white",
    color: "black",
    marginRight: "15px",
    width: "49px",
    height: "49px",
  },
  menuDrawer: {
    backgroundColor: "primary.main",
  },
  listItemTextStyle: {
    fontWeight: "bold",
  },
};

const Header = () => {
  const { signOut, authToken } = useContext(Context);
  const [open, setOpen] = React.useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleClick = () => {
    setOpen(!open);
  };
  const isActive = (pathname) => {
    return location.pathname === pathname;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Box sx={styles.appBar}>
      <CssBaseline />
      <Box
        sx={{
          width: "34vw",
          height: "30%",
          display: "flex",
          justifyContent: "left",
          alignItems: "inherit",
          paddingLeft: "5vw",
        }}
      >
        <Logo />
      </Box>
      <Box
        sx={{
          width: "32vw",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "21vw",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* List of pages depicted by icons */}
          <Hidden mdDown>
            <Tooltip title="Home">
              <IconButton
                sx={{
                  ...styles.iconButton,
                  backgroundColor: isActive("/") ? "#0F4C91" : "white",
                }}
                component={Link}
                to={"/"}
              >
                <img
                  width="25"
                  height="30"
                  src="https://img.icons8.com/sf-regular-filled/48/000000/home-page.png"
                  alt="home-page"
                  style={{ filter: isActive("/") ? "invert(1)" : "none" }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Balance">
              <IconButton
                sx={{
                  ...styles.iconButton,
                  backgroundColor: isActive("/balance") ? "#0F4C91" : "white",
                  color: isActive("/balance") ? "white" : "black",
                }}
                component={Link}
                to={"/balance"}
              >
                <img
                  width="28"
                  height="28"
                  src="https://img.icons8.com/windows/32/1A1A1A/balance-scale-right.png"
                  alt="balance-scale-right"
                  style={{
                    filter: isActive("/balance") ? "invert(1)" : "none",
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Goals">
              <IconButton
                sx={{
                  ...styles.iconButton,
                  backgroundColor: isActive("/goal") ? "#0F4C91" : "white",
                  color: isActive("/goal") ? "white" : "black",
                }}
              >
                <img
                  width="28"
                  height="28"
                  src="https://img.icons8.com/material-outlined/24/goal.png"
                  alt="goal"
                  style={{ filter: isActive("/goal") ? "invert(1)" : "none" }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Expenses">
              <IconButton
                sx={{
                  ...styles.iconButton,
                  backgroundColor: isActive("/expenses") ? "#0F4C91" : "white",
                  color: isActive("/expenses") ? "white" : "black",
                }}
                component={Link}
                to={"/expenses"}
              >
                <img
                  width="28"
                  height="28"
                  src="https://img.icons8.com/ios-filled/50/1A1A1A/request-money.png"
                  alt="request-money"
                  style={{
                    filter: isActive("/expenses") ? "invert(1)" : "none",
                  }}
                />
              </IconButton>
            </Tooltip>
          </Hidden>
        </Box>
      </Box>

      <Hidden mdDown>
        <BasicMenu />
      </Hidden>

      {/* Responsive menu button */}
      <Hidden mdUp>
        <Tooltip title="Menu">
          <IconButton onClick={toggleMenu} sx={styles.responsiveIconButton}>
            <MenuIcon />
          </IconButton>
        </Tooltip>
      </Hidden>
      {/* Responsive menu */}
      <Drawer
        anchor="left"
        open={isMenuOpen}
        onClose={toggleMenu}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "primary.main",
            width: "300px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          },
        }}
      >
        <Box margin="20%">
          <Logo />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "primary.main" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader" sx={{ bgcolor: 'primary.main', color: '#D9D9D9' }}>
                Navigation
              </ListSubheader>
            }
          >
            <ListItemButton
              component={Link}
              to="/"
              sx={{
                backgroundColor: isActive("/") ? "white" : "#1976D2",
                color: isActive("/") ? "black" : "white",
               
                margin: "10px 0",
              }}
            >
              <ListItemIcon>
                <img
                  width="25"
                  height="30"
                  src="https://img.icons8.com/sf-regular-filled/48/000000/home-page.png"
                  alt="home-page"
                  style={{
                    marginRight: "10px",
                    filter: isActive("/") ? "none" : "invert(1)",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton
              component={Link}
              to="/balance"
              sx={{
                backgroundColor: isActive("/balance") ? "white" : "#1976D2",
                color: isActive("/balance") ? "black" : "white",
                margin: "10px 0",
              }}
            >
              <ListItemIcon>
                <img
                  width="28"
                  height="28"
                  src="https://img.icons8.com/windows/32/1A1A1A/balance-scale-right.png"
                  alt="balance-scale-right"
                  style={{
                    marginRight: "10px",
                    filter: isActive("/balance") ? "none" : "invert(1)",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Balance" />
            </ListItemButton>
            <ListItemButton
              // component={Link}
              // to="/goal"
              sx={{
                backgroundColor: isActive("/goal") ? "white" : "#1976D2",
                color: isActive("/goal") ? "black" : "white",
                margin: "10px 0",
              }}
            >
              <ListItemIcon>
                <img
                  width="28"
                  height="28"
                  src="https://img.icons8.com/material-outlined/24/goal.png"
                  alt="goal"
                  style={{
                    marginRight: "10px",
                    color: "white",
                    filter: isActive("/goal") ? "none" : "invert(1)",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Goal" />
            </ListItemButton>
            <ListItemButton
              component={Link}
              to="/expenses"
              sx={{
                backgroundColor: isActive("/expenses") ? "white" : "#1976D2",
                color: isActive("/expenses") ? "black" : "white",
                margin: "10px 0",
              }}
            >
              <ListItemIcon>
                <img
                  width="28"
                  height="28"
                  src="https://img.icons8.com/ios-filled/50/1A1A1A/request-money.png"
                  alt="request-money"
                  style={{
                    marginRight: "10px",
                    filter: isActive("/expenses") ? "none" : "invert(1)",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="Expense" />
            </ListItemButton>
            <ListItemButton
              onClick={handleClick}
              sx={{
                backgroundColor: "#1976D2",
                color: "white",
                margin: "10px 0",
              }}
            >
              <ListItemIcon>
                <img
                  width="21"
                  height="20"
                  src="https://img.icons8.com/material-outlined/24/menu-2.png"
                  alt="menu-2"
                  style={{
                    marginRight: "10px",
                    filter: "invert(1)",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary="User settings" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{
                    pl: 4,
                    backgroundColor: "#1976D2",
                    color: "white",
              
                  }}
                >
                  <ListItemIcon>
                    <AccountCircleIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>
                <ListItemButton
                  sx={{
                    pl: 4,
                    backgroundColor: "#1976D2",
                    color:  "white",
                  }}
                >
                  <ListItemIcon>
                    <LogoutIcon  sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Header;
