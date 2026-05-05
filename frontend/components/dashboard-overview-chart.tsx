'use client';

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type DashboardOverviewChartProps = {
  data: Array<{
    key: string;
    label: string;
    value: number;
    color: string;
  }>;
};

export function DashboardOverviewChart({ data }: DashboardOverviewChartProps) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5EAF1" />
          <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748B', fontSize: 12 }} allowDecimals={false} />
          <Tooltip
            cursor={{ fill: 'rgba(15, 23, 42, 0.04)' }}
            formatter={(value) => [String(value ?? 0), 'Registros']}
            contentStyle={{ borderRadius: 14, border: '1px solid #E2E8F0', boxShadow: '0 12px 32px rgba(15,23,42,.08)' }}
          />
          <Bar dataKey="value" radius={[10, 10, 4, 4]}>
            {data.map((entry) => (
              <Cell key={entry.key} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
