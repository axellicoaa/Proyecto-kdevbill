"use client"

import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts"

export default function SubscriptionsBarChart({ data }: { data: Record<string, number> }) {
  // Convertimos el map {Plan:Count} → lista para Recharts
  const chartData = Object.entries(data).map(([plan, count]) => ({
    plan,
    count,
  }))

  return (
    <div className="w-full bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
      <h3 className="text-xl font-bold text-neutral-900 mb-6 tracking-tight">Suscripciones por Plan</h3>

      <ResponsiveContainer width="100%" height={256}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
          <XAxis
            dataKey="plan"
            tick={{ fill: "#737373", fontSize: 12, fontWeight: 500 }}
            axisLine={{ stroke: "#e5e5e5" }}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fill: "#737373", fontSize: 12, fontWeight: 500 }}
            axisLine={{ stroke: "#e5e5e5" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e5e5",
              borderRadius: "12px",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              padding: "12px",
            }}
            labelStyle={{ color: "#171717", fontWeight: 600, marginBottom: "4px" }}
            itemStyle={{ color: "#525252", fontSize: "14px" }}
          />
          <Bar dataKey="count" fill="#404040" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
