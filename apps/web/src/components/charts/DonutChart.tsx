import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface DataPoint {
  name: string;
  value: number;
}

interface DonutChartProps {
  data: DataPoint[];
  colors?: string[];
}

const DEFAULT_COLORS = ['#4a90d9', '#50c878', '#f39c12', '#e74c3c', '#9b59b6', '#1abc9c', '#e67e22', '#3498db'];

export function DonutChart({ data, colors = DEFAULT_COLORS }: DonutChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          dataKey="value"
          label={({ name }) => name}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={colors[i % colors.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
      </PieChart>
    </ResponsiveContainer>
  );
}
