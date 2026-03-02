import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface DataPoint {
  name: string;
  income?: number;
  expenses?: number;
  subscriptions?: number;
}

interface AreaChartProps {
  data: DataPoint[];
}

export function AreaChart({ data }: AreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsAreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
        {data[0]?.income !== undefined && (
          <Area type="monotone" dataKey="income" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.5} />
        )}
        {data[0]?.expenses !== undefined && (
          <Area type="monotone" dataKey="expenses" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.5} />
        )}
        {data[0]?.subscriptions !== undefined && (
          <Area type="monotone" dataKey="subscriptions" stackId="1" stroke="#f97316" fill="#f97316" fillOpacity={0.5} />
        )}
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}
