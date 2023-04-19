import React from "react";
import cardStyles from "./Source-card.module.css";
const SourceCard = ({ label, value, bg }) => {
  return (
    <div className={cardStyles.container}>
      <div className={cardStyles.card} style={{ background: bg }}>
        {/* <div className={cardStyles.shine}></div> */}
        <div className={cardStyles.label}>
          {label}
          {" : "}
        </div>
        <div className={cardStyles.value}>{value}</div>
      </div>
      {/* <div className={cardStyles.shadow}></div> */}
    </div>
  );
};

export default SourceCard;
