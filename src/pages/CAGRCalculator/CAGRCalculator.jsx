import axios from "axios";
import CalculatorCAGR from "components/CAGRCalculator/CalculatorCAGR";
import SummaryCAGR from "components/CAGRCalculator/SummaryCAGR";
import { handleShare, isObjectEmpty } from "components/EMI_Components/utils";
import { useState } from "react";

export default function CAGRCalculator() {
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [summary, setSummary] = useState({
    barChartData: [],
    pieChartData: [],
    absoluteCAGR: undefined,
    percentageCAGR: undefined,
    absoluteReturns: undefined,
    durationInvestment: undefined,
    finalValNum: undefined,
    initialValNum: undefined,
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_API}expenses/`, summary, {
        auth: {
          username: process.env.REACT_APP_USER,
          password: process.env.REACT_APP_PASSWORD,
        },
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred during API call.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (data) => {
    setIsCopied(true);
    handleShare(data);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <section className="container">
      <div className="d-flex align-items-center justify-content-between">
        {!isObjectEmpty(summary) ? (
          <>
            <button className="save" onClick={handleSave} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </button>
            <button className="save" onClick={() => handleCopy(summary)}>
              {isCopied ? "Copied!" : "Share"}
            </button>
          </>
        ) : null}
      </div>

      <div className="md-p-5 d-flex flex-column flex-md-row gap-4 align-items-center justify-content-center">
        <div className="d-flex flex-column">
          <div className="d-flex flex-column text-center">
            <h2 className="fs-2">CAGR Calculator</h2>
            <p>Calculate your Compound Annual Growth Rate</p>
          </div>
          <CalculatorCAGR setSummary={setSummary} />
        </div>

        {summary.barChartData.length > 0 ? (
          <SummaryCAGR summary={summary} />
        ) : null}
      </div>
    </section>
  );
}
