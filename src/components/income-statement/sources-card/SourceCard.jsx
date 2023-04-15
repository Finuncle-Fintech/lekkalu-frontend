import React from "react";
import cardStyles from "./Source-card.module.css";
const SourceCard = ({ label, value }) => {
  return (
    <div className={cardStyles.container}>
      <div className={cardStyles.card}>
        <div className={cardStyles.shine}></div>
        <p className={cardStyles.label}>{label}</p>
        <p className={cardStyles.value}>{value}</p>
      </div>
      <div className={cardStyles.shadow}></div>
    </div>
  );
};

export default SourceCard;
