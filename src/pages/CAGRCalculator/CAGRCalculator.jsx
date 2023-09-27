import CalculatorCAGR from "components/CAGRCalculator/CalculatorCAGR";
import SummaryCAGR from "components/CAGRCalculator/SummaryCAGR";
import { useState } from "react";

export default function CAGRCalculator() {
  const [summary, setSummary] = useState([]);
  return (
    <section className="container md-p-5 d-flex flex-column flex-md-row gap-4">
      <div className="d-flex flex-column">
        <div className="d-flex flex-column text-center">
          <h2 className="fs-2">CAGR Calculator</h2>
          <p>Calculate your Compound Annual Growth Rate</p>
        </div>
        <CalculatorCAGR setSummary={setSummary} />
      </div>

      {summary.length !== 0 && <SummaryCAGR summary={summary} />}
    </section>
  );
}
