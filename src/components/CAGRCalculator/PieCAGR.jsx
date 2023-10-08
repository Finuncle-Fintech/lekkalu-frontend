import { Pie, PieChart, Tooltip, Cell, Legend } from "recharts";
import { CustomLabelPie } from "components/shared/CustomLabelPie/CustomLabelPie";
import "animate.css";

export default function PieCAGR({ data }) {
  return (
    <PieChart width={400} height={200}>
      <Pie dataKey="value" data={data} outerRadius={80} labelLine={false}>
        {data.map((entry, index) => (
          <Cell
            key={index}
            fill={entry.name.includes("Initial Value") ? "#1976D2" : "#FB8833"}
            forma
          />
        ))}
      </Pie>
      <Tooltip content={<CustomLabelPie />} />
      <Legend height={36} />
    </PieChart>
  );
}
