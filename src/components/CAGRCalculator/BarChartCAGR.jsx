import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function BarChartCAGR({ data }) {
  return (
    <ResponsiveContainer width={500} height={300} className="p-4 my-5">
      <BarChart
        data={data}
        margin={{
          right: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => value?.toFixed(2)} />
        <Legend />
        <Bar
          dataKey="value"
          fill="#97BBCD"
          className="border-1 border-black"
          style={{ border: "1px solid green" }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
