import React, { useContext, useState } from "react";
import {Box,CssBaseline,IconButton,List,ListItem,ListItemText,Drawer,Hidden,} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "./HeaderComponents/Logo";
import BasicMenu from "./HeaderComponents/BasicMenu";
import { Context } from "provider/Provider";

const styles = {
  appBar: {
    width: "100%",
    minHeight: "25vh",
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
  },
  responsiveIconButton: {
    backgroundColor: "white",
    color: "black",
    marginRight: "15px",
  },
  menuDrawer: {
    marginTop: "15vh",
  },
};

const Header = () => {
  const { signOut, authToken } = useContext(Context);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Box sx={styles.appBar}>
      <CssBaseline />
      <Logo />
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
          <Hidden smDown>
            <IconButton sx={styles.iconButton}>
              <img
                width="25"
                height="30"
                src="https://img.icons8.com/sf-regular-filled/48/1A1A1A/home-page.png"
                alt="home-page"
              />
            </IconButton>
            <IconButton sx={styles.iconButton}>
              <img
                width="28"
                height="28"
                src="https://img.icons8.com/windows/32/1A1A1A/balance-scale-right.png"
                alt="balance-scale-right"
              />
            </IconButton>
            <IconButton sx={styles.iconButton}>
              <img
                width="28"
                height="28"
                src="https://img.icons8.com/material-outlined/24/goal.png"
                alt="goal"
              />
            </IconButton>
            <IconButton sx={styles.iconButton}>
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

      <Hidden smDown>
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
        sx={styles.menuDrawer}
      >
        <List>
          <ListItem button onClick={toggleMenu}>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button onClick={toggleMenu}>
            <ListItemText primary="My account" />
          </ListItem>
          <ListItem button onClick={toggleMenu}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Header;
