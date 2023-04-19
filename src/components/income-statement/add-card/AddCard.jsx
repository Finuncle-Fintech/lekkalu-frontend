import React from "react";
import cardStyles from "./Add-card.module.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
const Add = ({ label }) => {
  return (
    <div className={cardStyles.container}>
      <div className={cardStyles.card}>
        {/* <div className={cardStyles.shine}></div> */}
        {/* <p className={cardStyles.label}>{label}</p> */}
        <AddCircleOutlineIcon sx={{ fontSize: "30px", color: "#fff" }} />
      </div>
      {/* <div className={cardStyles.shadow}></div> */}
    </div>
  );
};

export default Add;
