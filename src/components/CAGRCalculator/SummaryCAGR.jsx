import { useUserPreferences } from "hooks/useUserPreferences";
import PieCAGR from "./PieCAGR";
import BarChartCAGR from "./BarChartCAGR";

export default function SummaryCAGR({ summary }) {
  const { preferences } = useUserPreferences();

  return (
    <article className="border rounded p-2 d-flex justify-content-center align-items-center flex-column w-100">
      <h2>Summary</h2>
      <PieCAGR data={summary.pieChartData} />
      <BarChartCAGR data={summary.barChartData} />

      <div className="my-2">
        You absolute returns: {preferences.currencyUnit}{" "}
        {summary.absoluteReturns}
      </div>
      <div className="my-2">
        You absolute CAGR: {preferences.currencyUnit} {summary.absoluteCAGR}
      </div>
      <div className="my-2">
        You CAGR percentage: {summary.percentageCAGR} %
      </div>
    </article>
  );
}
