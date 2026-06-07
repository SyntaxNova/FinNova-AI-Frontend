import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function MonthlyTrendChart({ data }) {

  return (

    <div className="w-full h-[350px]">

      <ResponsiveContainer>

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Bar
            dataKey="income"
            fill="#00C49F"
          />

          <Bar
            dataKey="expense"
            fill="#FF8042"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );
}

export default MonthlyTrendChart;