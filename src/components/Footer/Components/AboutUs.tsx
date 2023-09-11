import React from "react";
import styles from "./styles/AboutUs.module.css";
import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <div className={styles.container}>
      <h3>
        <Link to="#">About us</Link>
      </h3>
      <h5>
        <Link to="#">Investor relations</Link>
      </h5>
      <h5>
        <Link to="#">Suscribe to email</Link>
      </h5>
      <h5>
        <Link to="#">Contact Us</Link>
      </h5>
    </div>
  );
}
