"use client"

import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from "recharts"

interface ChartData {
  time: string
  value: number
  sensor1?: number
  sensor2?: number
  sensor3?: number
}

interface SensorChartProps {
  data: ChartData[]
  color: string
  showMultipleSensors?: boolean
  unit?: string
  chartType?: "temperature" | "humidity"
}

export default function SensorChart({
  data,
  color,
  showMultipleSensors = false,
  unit = "",
  chartType = "temperature",
}: SensorChartProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-xl">
          <p className="font-semibold text-gray-800 mb-2">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between space-x-4 mb-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                <span className="text-sm text-gray-600">{entry.name}:</span>
              </div>
              <span className="font-medium" style={{ color: entry.color }}>
                {entry.value.toFixed(1)}
                {unit}
              </span>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  const gradientId = `gradient-${chartType}`

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.6} />
          <XAxis
            dataKey="time"
            stroke="#6B7280"
            fontSize={11}
            tick={{ fill: "#6B7280" }}
            axisLine={{ stroke: "#D1D5DB" }}
          />
          <YAxis
            stroke="#6B7280"
            fontSize={11}
            tick={{ fill: "#6B7280" }}
            axisLine={{ stroke: "#D1D5DB" }}
            domain={["dataMin - 2", "dataMax + 2"]}
          />
          <Tooltip content={<CustomTooltip />} />
          {showMultipleSensors && <Legend wrapperStyle={{ paddingTop: "10px" }} iconType="circle" />}

          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={3}
            fill={`url(#${gradientId})`}
            dot={{ fill: color, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: color, strokeWidth: 2, fill: "#fff" }}
            name="Média Geral"
          />

          {showMultipleSensors && (
            <>
              <Line
                type="monotone"
                dataKey="sensor1"
                stroke={chartType === "temperature" ? "#F97316" : "#3B82F6"}
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: chartType === "temperature" ? "#F97316" : "#3B82F6", strokeWidth: 1, r: 3 }}
                name="Setor Norte"
              />
              <Line
                type="monotone"
                dataKey="sensor2"
                stroke={chartType === "temperature" ? "#DC2626" : "#1D4ED8"}
                strokeWidth={2}
                strokeDasharray="3 3"
                dot={{ fill: chartType === "temperature" ? "#DC2626" : "#1D4ED8", strokeWidth: 1, r: 3 }}
                name="Setor Centro"
              />
              <Line
                type="monotone"
                dataKey="sensor3"
                stroke={chartType === "temperature" ? "#B45309" : "#0F766E"}
                strokeWidth={2}
                strokeDasharray="7 3"
                dot={{ fill: chartType === "temperature" ? "#B45309" : "#0F766E", strokeWidth: 1, r: 3 }}
                name="Setor Sul"
              />
            </>
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
