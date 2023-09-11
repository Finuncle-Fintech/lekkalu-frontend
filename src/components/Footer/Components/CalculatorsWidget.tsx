import React from "react";
import styles from "./styles/CalculatorsWidget.module.css";
import { Link } from "react-router-dom";

export default function CalculatorWidget() {
  return (
    <div className={styles.container}>
      <h3>
        <Link to="#">Calculators & Widgets</Link>
      </h3>
      <h5>
        <Link to="#">EMI Calculator</Link>
      </h5>
      <h5>
        <Link to="#">
          Loan Calculator — Calculate EMI, Affordability, Tenure & Interest Rate
        </Link>
      </h5>
      <h5>
        <Link to="#">Mobile-friendly EMI Calculator Widget</Link>
      </h5>
    </div>
  );
}
