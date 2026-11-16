import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { formatCompact } from "../../utils/format.js";

const AXIS = {
  stroke: "var(--border-strong)",
  tick: { fill: "var(--text-subtle)", fontSize: 11 },
  tickLine: false,
  axisLine: false,
};

const PALETTE = [
  "#5B5CE2",
  "#17A398",
  "#FFB547",
  "#C2567F",
  "#3C5A8A",
  "#7A4FE0",
  "#A854A0",
  "#2D7FA8",
];

function ChartTooltip({ active, payload, label, valueLabel }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip__label">
        {payload[0]?.payload?.fullName ?? label}
      </div>
      {payload.map((entry) => (
        <div key={entry.dataKey ?? entry.name}>
          {entry.name}: {formatCompact(entry.value)}
          {valueLabel ? ` ${valueLabel}` : ""}
        </div>
      ))}
    </div>
  );
}

/**
 * Chart wrapper so every admin chart shares axes, colours and tooltips.
 *
 * @param {"area"|"line"|"bar"|"hbar"|"pie"} type
 * @param {object[]} data
 * @param {{key: string, name: string, color?: string}[]} series
 * @param {string} xKey
 */
export default function AnalyticsChart({
  type = "area",
  data = [],
  series = [],
  xKey = "label",
  height = 280,
  stacked = false,
}) {
  const common = {
    data,
    margin: { top: 8, right: 8, bottom: 0, left: -18 },
  };

  return (
    <div className="chart-box" style={{ "--chart-h": `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        {type === "pie" ? (
          <PieChart>
            <Tooltip content={<ChartTooltip />} />
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              wrapperStyle={{ fontSize: 12, color: "var(--text-muted)" }}
            />
            <Pie
              data={data}
              dataKey={series[0]?.key ?? "value"}
              nameKey={xKey}
              innerRadius="52%"
              outerRadius="80%"
              paddingAngle={2}
              stroke="var(--surface)"
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry[xKey] ?? index}
                  fill={entry.color ?? PALETTE[index % PALETTE.length]}
                />
              ))}
            </Pie>
          </PieChart>
        ) : type === "bar" || type === "hbar" ? (
          <BarChart {...common} layout={type === "hbar" ? "vertical" : "horizontal"}>
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="var(--border)"
              vertical={type === "hbar"}
              horizontal={type !== "hbar"}
            />
            {type === "hbar" ? (
              <>
                <XAxis type="number" {...AXIS} tickFormatter={formatCompact} />
                <YAxis type="category" dataKey={xKey} width={120} {...AXIS} />
              </>
            ) : (
              <>
                <XAxis dataKey={xKey} {...AXIS} />
                <YAxis {...AXIS} tickFormatter={formatCompact} />
              </>
            )}
            <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--bg-sunken)" }} />
            {series.length > 1 && (
              <Legend
                iconType="circle"
                wrapperStyle={{ fontSize: 12, color: "var(--text-muted)" }}
              />
            )}
            {series.map((item, index) => (
              <Bar
                key={item.key}
                dataKey={item.key}
                name={item.name}
                fill={item.color ?? PALETTE[index % PALETTE.length]}
                radius={type === "hbar" ? [0, 6, 6, 0] : [6, 6, 0, 0]}
                stackId={stacked ? "a" : undefined}
                maxBarSize={type === "hbar" ? 18 : 42}
              />
            ))}
          </BarChart>
        ) : type === "line" ? (
          <LineChart {...common}>
            <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" vertical={false} />
            <XAxis dataKey={xKey} {...AXIS} />
            <YAxis {...AXIS} tickFormatter={formatCompact} />
            <Tooltip content={<ChartTooltip />} />
            {series.length > 1 && (
              <Legend
                iconType="circle"
                wrapperStyle={{ fontSize: 12, color: "var(--text-muted)" }}
              />
            )}
            {series.map((item, index) => (
              <Line
                key={item.key}
                type="monotone"
                dataKey={item.key}
                name={item.name}
                stroke={item.color ?? PALETTE[index % PALETTE.length]}
                strokeWidth={2.4}
                dot={false}
                activeDot={{ r: 4 }}
              />
            ))}
          </LineChart>
        ) : (
          <AreaChart {...common}>
            <defs>
              {series.map((item, index) => (
                <linearGradient
                  id={`fill-${item.key}`}
                  key={item.key}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor={item.color ?? PALETTE[index % PALETTE.length]}
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="100%"
                    stopColor={item.color ?? PALETTE[index % PALETTE.length]}
                    stopOpacity={0}
                  />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" vertical={false} />
            <XAxis dataKey={xKey} {...AXIS} minTickGap={24} />
            <YAxis {...AXIS} tickFormatter={formatCompact} />
            <Tooltip content={<ChartTooltip />} />
            {series.length > 1 && (
              <Legend
                iconType="circle"
                wrapperStyle={{ fontSize: 12, color: "var(--text-muted)" }}
              />
            )}
            {series.map((item, index) => (
              <Area
                key={item.key}
                type="monotone"
                dataKey={item.key}
                name={item.name}
                stroke={item.color ?? PALETTE[index % PALETTE.length]}
                strokeWidth={2.4}
                fill={`url(#fill-${item.key})`}
              />
            ))}
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

export { PALETTE as CHART_PALETTE };
