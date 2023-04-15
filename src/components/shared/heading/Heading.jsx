import React from "react";
import styles from "./Heading.module.css";
const Heading = ({ text, color }) => {
  return (
    <div className={styles.heading} style={{ color }}>
      {text}
    </div>
  );
};

export default Heading;
