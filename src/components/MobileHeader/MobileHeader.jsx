import React, { useState } from "react";
import { IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import Logo from "components/Header/HeaderComponents/Logo";
import icon from '../../assets/Humb.svg';

const styles = {
    header: {
        maxWidth: '90rem',
        width: '95vw',
        margin: 'auto',
        marginTop: '2.815rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    responsiveIconButton: {
        margin: "auto 20px auto auto",
        width: "2rem",
        height: "1rem",
    },
    menuDrawer: {
        backgroundColor: "primary.main",
    },
    menuList: {
        backgroundColor: "primary.main",
        color: "white",
        width: "300px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "20px",
    },
    menuItem: {
        color: "white",
        cursor: "pointer",
    },
};

const MobileHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header style={styles.header}>
            <Logo/>
            <IconButton
                onClick={toggleMenu}
                sx={styles.responsiveIconButton}
                data-testid="buttonDropwDown"
            >
                <img src={icon} alt="icon" />
            </IconButton>
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
                        alignItems: "flex-start",
                    },
                }}
                data-testid="menuDropDown"
            >
                <List sx={styles.menuList}>
                    <ListItem>
                        <Logo />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Home" sx={styles.menuItem} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="About Us" sx={styles.menuItem} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Products" sx={styles.menuItem} />
                    </ListItem>
                </List>
            </Drawer>
        </header>
    );
};

export default MobileHeader;