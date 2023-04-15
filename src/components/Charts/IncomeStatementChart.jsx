import Colors from "constants/colors";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Surface,
  Symbols,
} from "recharts";

export const IncomeStatementChart = (props) => {
  let totalValue = props.totalVal;
  let pieData;
  if (props.type == "income") {
    pieData = props.data.income;
  } else if (props.type == "expenses") {
    pieData = props.data.expenses;
  } else if (props.type == "income-overview") {
    pieData = props.incomeOverviewData;
  } else if (props.type == "expense-overview") {
    pieData = props.expenseOverviewData;
  }
  // const pieData = [
  //    {
  //       name: 'Thar',
  //       value: 1093719,
  //    },
  //    {
  //       name: 'Home Security',
  //       value: 55000,
  //    },
  //    {
  //       name: 'PF',
  //       value: 1000454,
  //    },
  //    {
  //       name: 'Pension',
  //       value: 45000,
  //    },
  //    {
  //       name: 'ELSS',
  //       value: 233000,
  //    },
  //    {
  //       name: 'Equity',
  //       value: 15000,
  //    },
  //    {
  //       name: 'Cash',
  //       value: 106000,
  //    },
  //    {
  //       name: 'Gold',
  //       value: 286664,
  //    },
  //    {
  //       name: 'Liquid Funds',
  //       value: 10000,
  //    },
  //    {
  //       name: 'Lent',
  //       value: 1105013,
  //    },
  // ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    if (percent * 100 > 3)
      return (
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {`${(percent * 100).toFixed(1)}%`}
        </text>
      );
    return null;
  };

  const numDifferentiation = (val) => {
    if (val >= 10000000) val = (val / 10000000).toFixed(2) + " Cr";
    else if (val >= 100000) val = (val / 100000).toFixed(2) + " Lac";
    else if (val >= 1000) val = (val / 1000).toFixed(2) + " K";
    return val;
  };

  const CustomTooltip = ({ active, payload, percent }) => {
    if (active) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#ffff",
            padding: "5px",
            border: "0.5px solid #cccc",
            borderRadius: 5 + "px",
          }}
        >
          <label>
            {`${payload[0].name} : ` +
              ((`${payload[0].value}` * 100) / totalValue).toFixed(2) +
              "%"}
            <br />
            {`\u20B9 ${numDifferentiation(payload[0].value)} `}
          </label>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      {pieData && pieData.length !== 0 ? (
        <ResponsiveContainer width={"100%"} aspect={3}>
          <PieChart>
            <defs>
              {pieData.map((entry, index) => (
                <linearGradient
                  id={`myGradient${index}`}
                  key={`myGradient${index}`}
                >
                  <stop
                    offset="0%"
                    stopColor={Colors.PIE[index % Colors.PIE.length].start}
                  />
                  <stop
                    offset="100%"
                    stopColor={Colors.PIE[index % Colors.PIE.length].end}
                  />
                </linearGradient>
              ))}
            </defs>
            <Pie
              data={pieData}
              color="#000000"
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="100%"
              fill="#8884d8"
              label={renderCustomizedLabel}
              labelLine={false}
            >
              {/* {pieData.map((entry, index) => (
                  <Cell
                     key={`cell-${index}`}
                     fill={COLORS[index % COLORS.length]}
                  />
               ))} */}

              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`url(#myGradient${index})`} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              layout="vertical"
              verticalAlign="top"
              align="right"
              payload={pieData.map((item, index) => ({
                id: item.name,
                type: "square",
                value:
                  item.name +
                  ` : ` +
                  ((item.value * 100) / totalValue).toFixed(2) +
                  `%`,
                color: `url(#myGradient${index})`,
              }))}
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <h4>No data for {props.type} chart</h4>
      )}
    </>
  );
};
