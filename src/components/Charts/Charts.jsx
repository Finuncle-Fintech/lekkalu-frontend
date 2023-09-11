import React, { useMemo } from "react";
import { useState, useEffect, useContext } from "react";
import { Context } from "provider/Provider";
import { WeeklyChart } from "./WeeklyChart";
import BeatLoader from "react-spinners/BeatLoader";
import Colors from "constants/colors";
import { SpentBalanceChart } from "./SpentBalanceChart";
import { CumSumChart } from "./CumSumChart";
import { AssetsLiabilitiesChart } from "./AssetsLiabilitiesChart";
import AssetsdepreciationChart from "./AssetsDepreciationsChart";
import { Line } from "@ant-design/charts";

const Test = () => {
  const {
    weeklyExpense,
    fetchData,
    monthlyExpenses,
    assets,
    liabilities,
    depreciation,
  } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const fetchAPI = async () => {
    await fetchData().then(() => {});
  };
  useEffect(() => {
    fetchAPI();
  }, []);

  const formattedData = useMemo(() => {
    return weeklyExpense
      .map((expense) => {
        const data = [
          {
            time: expense.time,
            name: "Weekly Spend",
            expense: expense.amount,
          },
        ];

        if (expense.roll_avg) {
          data.push({
            time: expense.time,
            name: "Roll Avg (5)",
            expense: expense.roll_avg,
          });
        }

        return data;
      })
      .flat();
  }, [weeklyExpense]);

  const config = {
    data: formattedData,
    xField: "time",
    yField: "expense",
    seriesField: "name",
    legend: {
      position: "top",
    },
    smooth: true,
    animation: {
      appear: {
        animation: "path-in",
        duration: 5000,
      },
    },
  };

  console.log(config);

  return (
    <div>
      {/* {isError ? <h3>Error</h3> : null} */}
      <div className="max-w-2xl mx-auto flex items-center justify-center mt-8 border rounded-md shadow-sm p-4">
        <Line className="w-full" {...config} />
      </div>

      {monthlyExpenses.length === 0 && weeklyExpense.length === 0 ? (
        <div
          className="section col-md-8 mx-auto pb-5 pt-5 mt-5"
          style={{
            backgroundColor: Colors.graphBG,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <BeatLoader stylecolor={Colors.loaderColor} />
        </div>
      ) : (
        <div
          className="nt-3"
          style={{
            marginTop: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <WeeklyChart data={weeklyExpense} />
          <SpentBalanceChart data={monthlyExpenses} />
          <CumSumChart data={monthlyExpenses} />
          <AssetsdepreciationChart data={depreciation} />
          <AssetsLiabilitiesChart data={assets} type={"assets"} />
          <AssetsLiabilitiesChart data={liabilities} type={"liabilities"} />
        </div>
      )}
    </div>
  );
};

export default Test;
