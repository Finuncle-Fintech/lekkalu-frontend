import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  CssBaseline,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Drawer,
  Hidden,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "./HeaderComponents/Logo";
import BasicMenu from "./HeaderComponents/BasicMenu";
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
    backgroundColor: "white",
    color: "black",
    width: "49px",
    height: "51px",
    margin: "10px",
  },
  responsiveIconButton: {
    backgroundColor: "white",
    color: "black",
    marginRight: "15px",
  },
  menuDrawer: {
    backgroundColor: "primary.main",
  },
};

const Header = () => {
  const { signOut, authToken } = useContext(Context);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

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
                src="https://img.icons8.com/sf-regular-filled/48/1A1A1A/home-page.png"
                alt="home-page"
              />
            </IconButton>
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
              />
            </IconButton>
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
              />
            </IconButton>
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
              />
            </IconButton>
          </Hidden>
        </Box>
      </Box>

      <Hidden mdDown>
        <BasicMenu />
      </Hidden>

      {/* Responsive menu button */}
      <Hidden mdUp>
        <IconButton onClick={toggleMenu} sx={styles.responsiveIconButton}>
          <MenuIcon />
        </IconButton>
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
          <Button
            variant="contained"
            sx={{
              backgroundColor: isActive("/") ? "#D9D9D9" : "primary.main",
              color: isActive("/") ? "black" : "white",
              fontWeight: 1000,
              margin: "10px",
            }}
            component={Link}
            to={"/"}
          >
            <img
              width="25"
              height="30"
              src="https://img.icons8.com/sf-regular-filled/48/1A1A1A/home-page.png"
              alt="home-page"
              style={{ marginRight: "10px" }}
            />
            Home
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: isActive("/balance") ? "#D9D9D9" : "#1976D2",
              color: isActive("/balance") ? "black" : "white",
              fontWeight: 1000,
              margin: "10px",
            }}
            component={Link}
            to={"/balance"}
          >
            <img
              width="28"
              height="28"
              src="https://img.icons8.com/windows/32/1A1A1A/balance-scale-right.png"
              alt="balance-scale-right"
              style={{ marginRight: "10px" }}
            />
            Balance
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: isActive("/goal") ? "#D9D9D9" : "#1976D2",
              color: isActive("/goal") ? "black" : "white",
              fontWeight: 1000,
              margin: "10px",
            }}
          >
            <img
              width="28"
              height="28"
              src="https://img.icons8.com/material-outlined/24/goal.png"
              alt="goal"
              style={{ marginRight: "10px", color: "white" }}
            />
            Goal
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: isActive("/expenses") ? "#D9D9D9" : "#1976D2",
              color: isActive("/expenses") ? "black" : "white",
              fontWeight: 1000,
              margin: "10px",
            }}
            component={Link}
            to={"/expenses"}
          >
            <img
              width="28"
              height="28"
              src="https://img.icons8.com/ios-filled/50/1A1A1A/request-money.png"
              alt="request-money"
              style={{ marginRight: "10px" }}
            />
            Expense
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Header;
