import { Link } from 'react-router-dom'
import React from 'react'
import styles from './HeroHeader.module.css'

const HeroHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <div className={styles.logoCircle} />
        <p className={styles.logoText}>finuncle</p>
      </div>

      <nav className={styles.nav}>
        <Link className={styles.link}>Home</Link>
        <Link className={styles.link}>About Us</Link>
        <Link className={styles.link}>Products</Link>
      </nav>

      <button className={styles.button}>
        <Link to='/signup' className={styles.buttonLink}>
          Get Started
        </Link>
      </button>
    </header>
  )
}

export default HeroHeader
