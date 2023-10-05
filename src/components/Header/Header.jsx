import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, CssBaseline, IconButton, Drawer, Tooltip } from "@mui/material";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "./HeaderComponents/Logo";
import BasicMenu from "./HeaderComponents/BasicMenu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Context } from "provider/Provider";
import { Person } from "@mui/icons-material";

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
    width: "51px",
    height: "51px",
    margin: "10px",
  },
  responsiveIconButton: {
    backgroundColor: "white",
    color: "black",
    marginRight: "15px",
    width: "49px",
    height: "49px",
    "@media (min-width: 900px)": {
      display: "none",
    },
  },
  menuDrawer: {
    backgroundColor: "primary.main",
  },
  listItemTextStyle: {
    fontWeight: "bold",
  },
};

const Header = () => {
  const { signOut, authToken, user } = useContext(Context);
  const [openCalculator, setOpenCalculator] = React.useState(false);
  const [openSettings, setOpenSettings] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const userSetting = {
    submenu: {
      1: {
        name: `${user?.username}`,
        icon: <Person />,
        path: "/settings",
      },
      2: {
        name: "Logout",
        icon: <LogoutIcon />,
        onClick: signOut,
      },
    },
    title: "User setting",
    img: "https://img.icons8.com/material-outlined/24/menu-2.png",
  };

  const calculatorOption = {
    submenu: {
      1: {
        name: "SIP",
        icon: null,
        path: "/SIPCalculator",
      },
      2: {
        name: "CAGR",
        icon: null,
        path: "/CAGRCalculator",
      },
      3: {
        name: "EMI",
        icon: null,
        path: "/loan_emi_calculator",
      },
    },
    title: "Calculator",
    img: "https://img.icons8.com/external-glyph-zulfa-mahendra/48/external-calculator-business-training-glyph-zulfa-mahendra.png",
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
          "@media (max-width: 900px)": {
            // Hide for screens smaller than 768px
            display: "none",
          },
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

          {authToken ? (
            <>
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
                    backgroundColor: isActive("/expenses")
                      ? "#0F4C91"
                      : "white",
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
              <Tooltip title="Income Statement">
                <IconButton
                  sx={{
                    ...styles.iconButton,
                    backgroundColor: isActive("/income-statement")
                      ? "#0F4C91"
                      : "white",
                    color: isActive("/income-statement") ? "white" : "black",
                  }}
                  component={Link}
                  to={"/income-statement"}
                >
                  <img
                    width="28"
                    height="28"
                    src="https://i.imgur.com/CSV4JtU.png"
                    alt="balance-scale-right"
                    style={{
                      filter: isActive("/income-statement")
                        ? "invert(1)"
                        : "none",
                    }}
                  />
                </IconButton>
              </Tooltip>
            </>
          ) : null}
          <BasicMenu Menu={calculatorOption} />

          {!authToken ? (
            <>
              <Tooltip title="Signin">
                <IconButton
                  sx={{
                    ...styles.iconButton,
                    backgroundColor: isActive("/signin") ? "#0F4C91" : "white",
                  }}
                  component={Link}
                  to="/signin"
                >
                  <img
                    width="30"
                    height="30"
                    src="https://img.icons8.com/ios/50/login-rounded-right--v1.png"
                    alt="signin"
                    style={{
                      filter: isActive("/signin") ? "invert(1)" : "none",
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="Signup">
                <IconButton
                  sx={{
                    ...styles.iconButton,
                    backgroundColor: isActive("/signup") ? "#0F4C91" : "white",
                  }}
                  component={Link}
                  to="/signup"
                >
                  <img
                    width="25"
                    height="25"
                    src="https://img.icons8.com/external-bearicons-detailed-outline-bearicons/64/external-signup-call-to-action-bearicons-detailed-outline-bearicons.png"
                    alt="signup"
                    style={{
                      filter: isActive("/signup") ? "invert(1)" : "none",
                    }}
                  />
                </IconButton>
              </Tooltip>
            </>
          ) : null}
        </Box>
      </Box>

      {authToken ? (
        <BasicMenu sx={styles.iconButton} Menu={userSetting} />
      ) : null}

      {/* Responsive menu button */}

      <Tooltip title="Menu">
        <IconButton
          onClick={toggleMenu}
          sx={styles.responsiveIconButton}
          data-testid="buttonDropwDown"
        >
          <MenuIcon />
        </IconButton>
      </Tooltip>

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
        data-testid="menuDropDown"
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
              <ListSubheader
                component="div"
                id="nested-list-subheader"
                sx={{ bgcolor: "primary.main", color: "#D9D9D9" }}
              >
                Navigation
              </ListSubheader>
            }
          >
            {authToken ? (
              <>
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
                    backgroundColor: isActive("/expenses")
                      ? "white"
                      : "#1976D2",
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
                  component={Link}
                  to="/income-statement"
                  sx={{
                    backgroundColor: isActive("/income-statement")
                      ? "white"
                      : "#1976D2",
                    color: isActive("/income-statement") ? "black" : "white",
                    margin: "10px 0",
                  }}
                >
                  <ListItemIcon>
                    <img
                      width="28"
                      height="28"
                      src="https://i.imgur.com/CSV4JtU.png"
                      alt="Income statement"
                      style={{
                        marginRight: "10px",
                        color: "white",
                        filter: isActive("/income-statement")
                          ? "none"
                          : "invert(1)",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Income statement" />
                </ListItemButton>
              </>
            ) : (
              <>
                <ListItemButton
                  component={Link}
                  to="/signin"
                  sx={{
                    backgroundColor: isActive("/signin") ? "white" : "#1976D2",
                    color: isActive("/signin") ? "black" : "white",
                    margin: "10px 0",
                  }}
                >
                  <ListItemIcon>
                    <img
                      width="30"
                      height="30"
                      src="https://img.icons8.com/ios/50/login-rounded-right--v1.png"
                      alt="signin"
                      style={{
                        marginRight: "10px",
                        filter: isActive("/signin") ? "none" : "invert(1)",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Signin" />
                </ListItemButton>
                <ListItemButton
                  component={Link}
                  to="/signup"
                  sx={{
                    backgroundColor: isActive("/signup") ? "white" : "#1976D2",
                    color: isActive("/signup") ? "black" : "white",
                    margin: "10px 0",
                  }}
                >
                  <ListItemIcon>
                    <img
                      width="30"
                      height="30"
                      src="https://img.icons8.com/external-bearicons-detailed-outline-bearicons/64/external-signup-call-to-action-bearicons-detailed-outline-bearicons.png"
                      alt="signup"
                      style={{
                        marginRight: "10px",
                        filter: isActive("/signup") ? "none" : "invert(1)",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Signup" />
                </ListItemButton>
              </>
            )}

            <ListItemButton
              onClick={() => {
                setOpenCalculator(!openCalculator);
              }}
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
                  src="https://img.icons8.com/external-glyph-zulfa-mahendra/48/external-calculator-business-training-glyph-zulfa-mahendra.png"
                  alt="menu-2"
                  style={{
                    marginRight: "10px",
                    filter: "invert(1)",
                  }}
                />
              </ListItemIcon>

              <ListItemText primary="Calculator" />
              {openCalculator ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openCalculator} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  component={Link}
                  to="/SIPCalculator"
                  sx={{
                    pl: 4,
                    backgroundColor: isActive("/SIPCalculator")
                      ? "white"
                      : "#1976D2",
                    color: isActive("/SIPCalculator") ? "black" : "white",
                  }}
                >
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary="SIP" />
                </ListItemButton>
                <ListItemButton
                  component={Link}
                  to="/CAGRCalculator"
                  sx={{
                    pl: 4,
                    backgroundColor: isActive("/CAGRCalculator")
                      ? "white"
                      : "#1976D2",
                    color: isActive("/CAGRCalculator") ? "black" : "white",
                  }}
                >
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary="CAGR" />
                </ListItemButton>
                <ListItemButton
                  component={Link}
                  to="/loan_emi_calculator"
                  sx={{
                    pl: 4,
                    backgroundColor: isActive("/loan_emi_calculator")
                      ? "white"
                      : "#1976D2",
                    color: isActive("/loan_emi_calculator") ? "black" : "white",
                  }}
                >
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary="EMI" />
                </ListItemButton>
              </List>
            </Collapse>

            {authToken ? (
              <>
                <ListItemButton
                  onClick={() => {
                    setOpenSettings(!openSettings);
                  }}
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
                  {openSettings ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openSettings} timeout="auto" unmountOnExit>
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
                        color: "white",
                      }}
                      onClick={() => signOut()}
                    >
                      <ListItemIcon>
                        <LogoutIcon sx={{ color: "white" }} />
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                    </ListItemButton>
                  </List>
                </Collapse>
              </>
            ) : null}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Header;
