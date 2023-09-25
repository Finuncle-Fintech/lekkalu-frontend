import CalculatorSIP from "components/CalculatorSIP/CalculatorSIP";
import { useState } from "react";
import Summary from "components/CalculatorSIP/Summary";

export default function SIPCalculator() {
  const [summary, setSummary] = useState([]);
  return (
    <section className="container md-p-5 d-flex flex-column flex-md-row gap-4">
      <div className="d-flex flex-column">
        <div className="d-flex flex-column text-center">
          <h2 className="fs-2">SIP Calculator</h2>
          <p>Calculate returns on your SIP investments.</p>
        </div>
        <CalculatorSIP setSummary={setSummary} />
      </div>

      <Summary summary={summary} />
    </section>
  );
}
