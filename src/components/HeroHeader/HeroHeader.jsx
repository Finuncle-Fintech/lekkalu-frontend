import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import styles from './HeroHeader.module.css';

const HeroHeader = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <div className={styles.logoCircle}></div>
                <p className={styles.logoText}>finuncle</p>
            </div>

            <nav className={styles.nav}>
                <Link className={styles.link}>Home</Link>
                <Link className={styles.link}>About Us</Link>
                <Link className={styles.link}>Products</Link>
            </nav>

            {windowWidth > 768 && (
                <button className={styles.button}>Get Started</button>
            )}
        </header>
    )
}

export default HeroHeader;