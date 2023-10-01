import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import styles from './GuestHeader.module.css';
import { IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import Logo from "components/Header/HeaderComponents/Logo";
import icon from '../../assets/Humb.svg';

const mobileStyles = {
    responsiveIconButton: {
        margin: "auto 20px auto auto",
        width: "2rem",
        height: "1rem",
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

const GuestHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 992);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <header className={styles.header}>
            <Logo />

            <nav className={styles.nav}>
                <Link className={styles.link}>Home</Link>
                <Link className={styles.link}>About Us</Link>
                <Link className={styles.link}>Products</Link>
            </nav>

            <button className={styles.button}><Link to="/signup" className={styles.buttonLink}>Get Started</Link></button>
            {isMobile &&
                <div>
                    <IconButton
                        onClick={toggleMenu}
                        sx={mobileStyles.responsiveIconButton}
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
                        <List sx={mobileStyles.menuList}>
                            <ListItem>
                                <Logo />
                            </ListItem>
                            <ListItem>
                                <Link className={styles.link} to='/signin' >signin</Link>
                            </ListItem>
                            <ListItem>
                                <Link className={styles.link} to='/signup' >signup</Link>
                            </ListItem>
                            <ListItem>
                                <Link className={styles.link}>Home</Link>
                            </ListItem>
                            <ListItem>
                                <Link className={styles.link}>About Us</Link>
                            </ListItem>
                            <ListItem>
                                <Link className={styles.link}>Products</Link>
                            </ListItem>
                        </List>
                    </Drawer>
                </div>}
        </header>
    )
}

export default GuestHeader;