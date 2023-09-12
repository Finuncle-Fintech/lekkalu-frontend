import React from 'react';
import styles from './HeroContainer.module.css';
import heroImage from '../../assets/HeroImages/Hero.svg';

const HeroContainer = () => {
    return (
        <div className={styles.heroContainer}>
            <img className={styles.heroImage} src={heroImage} alt="hero" />
            <h1 className={styles.heroTitle}>
                <span>Managing investment</span>
                <br />
                the Smarter Way!
            </h1>
        </div>
    );
};

export default HeroContainer;