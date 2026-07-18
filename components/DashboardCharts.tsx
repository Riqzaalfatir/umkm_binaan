"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const PIE_COLORS = ["#1d5f3e", "#b8752e", "#3a5a78", "#8b9285", "#cdd6c9"];

export function KategoriChart({
  data,
}: {
  data: { kategori: string; jumlah: number }[];
}) {
  if (data.length === 0) {
    return <EmptyChart />;
  }

  const total = data.reduce((sum, d) => sum + d.jumlah, 0);

  return (
    <div>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="jumlah"
            nameKey="kategori"
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={90}
            paddingAngle={2}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              fontSize: 12,
              borderRadius: 8,
              border: "1px solid #e2e7e0",
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-2 space-y-1.5">
        {data.map((d, i) => (
          <div
            key={d.kategori}
            className="flex items-center justify-between text-sm"
          >
            <span className="flex items-center gap-2 text-text">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}
              />
              {d.kategori}
            </span>
            <span className="font-mono text-text-muted">
              {d.jumlah} · {total > 0 ? Math.round((d.jumlah / total) * 100) : 0}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PendaftaranChart({
  data,
}: {
  data: { bulan: string; jumlah: number }[];
}) {
  if (data.length === 0) {
    return <EmptyChart />;
  }
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data} margin={{ top: 8, right: 12, left: -8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e7e0" vertical={false} />
        <XAxis
          dataKey="bulan"
          tick={{ fontSize: 11, fill: "#5c6559" }}
          axisLine={{ stroke: "#e2e7e0" }}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "#5c6559" }}
          axisLine={false}
          tickLine={false}
          allowDecimals={false}
        />
        <Tooltip
          contentStyle={{
            fontSize: 12,
            borderRadius: 8,
            border: "1px solid #e2e7e0",
          }}
        />
        <Line
          type="monotone"
          dataKey="jumlah"
          stroke="#1d5f3e"
          strokeWidth={2.5}
          dot={{ r: 4, fill: "#1d5f3e", strokeWidth: 0 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

function EmptyChart() {
  return (
    <div className="flex h-[260px] items-center justify-center text-sm text-text-faint">
      Belum ada data untuk ditampilkan.
    </div>
  );
}