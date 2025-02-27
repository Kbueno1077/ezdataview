import { CSSProperties } from "react";
import { scaleTime, scaleLinear, max, line as d3_line } from "d3";
import {
  ClientTooltip,
  TooltipContent,
  TooltipTrigger,
} from "../utils/Tooltip/Tooltip"; // Or wherever you pasted Tooltip.tsx

/* Original component: https://buildui.com/recipes/responsive-line-chart */
const sales = [
  { date: "2023-04-30", value: 4 },
  { date: "2023-05-01", value: 6 },
  { date: "2023-05-02", value: 8 },
  { date: "2023-05-03", value: 7 },
  { date: "2023-05-04", value: 10 },
  { date: "2023-05-05", value: 12 },
  { date: "2023-05-06", value: 11 },
  { date: "2023-05-07", value: 8 },
  { date: "2023-05-08", value: 7 },
  { date: "2023-05-09", value: 9 },
];
const data = sales.map((d) => ({ ...d, date: new Date(d.date) }));

export function LineChart({ withTooltip = true }: { withTooltip?: boolean }) {
  const xScale = scaleTime()
    .domain([data[0].date, data[data.length - 1].date])
    .range([0, 100]);
  const yScale = scaleLinear()
    .domain([0, max(data.map((d) => d.value)) ?? 0])
    .range([100, 0]);

  const line = d3_line<(typeof data)[number]>()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.value));

  const d = line(data);

  if (!d) {
    return null;
  }

  return (
    <div
      className="relative h-72 w-full"
      style={
        {
          "--marginTop": "0px",
          "--marginRight": "8px",
          "--marginBottom": "25px",
          "--marginLeft": "25px",
        } as CSSProperties
      }
    >
      {/* Y axis */}
      <div
        className="absolute inset-0
          h-[calc(100%-var(--marginTop)-var(--marginBottom))]
          w-[var(--marginLeft)]
          translate-y-[var(--marginTop)]
          overflow-visible
        "
      >
        {yScale
          .ticks(8)
          .map(yScale.tickFormat(8, "d"))
          .map((value, i) => (
            <div
              key={i}
              style={{
                top: `${yScale(+value)}%`,
                left: "0%",
              }}
              className="absolute text-xs tabular-nums -translate-y-1/2 text-gray-500 w-full text-right pr-2"
            >
              {value}
            </div>
          ))}
      </div>

      {/* Chart area */}
      <div
        className="absolute inset-0
          h-[calc(100%-var(--marginTop)-var(--marginBottom))]
          w-[calc(100%-var(--marginLeft)-var(--marginRight))]
          translate-x-[var(--marginLeft)]
          translate-y-[var(--marginTop)]
          overflow-visible
        "
      >
        <svg
          viewBox="0 0 100 100"
          className="overflow-visible w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          {yScale
            .ticks(8)
            .map(yScale.tickFormat(8, "d"))
            .map((active, i) => (
              <g
                transform={`translate(0,${yScale(+active)})`}
                className="text-zinc-300 dark:text-zinc-700"
                key={i}
              >
                <line
                  x1={0}
                  x2={100}
                  stroke="currentColor"
                  strokeDasharray="6,5"
                  strokeWidth={0.5}
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            ))}
          {/* Line */}
          <path
            d={d}
            fill="none"
            className="stroke-fuchsia-400"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />

          {/* Circles and Tooltips */}
          {data.map((d, index) => {
            if (!withTooltip) {
              return (
                <path
                  key={index}
                  d={`M ${xScale(d.date)} ${yScale(d.value)} l 0.0001 0`}
                  vectorEffect="non-scaling-stroke"
                  strokeWidth="7"
                  strokeLinecap="round"
                  fill="none"
                  stroke="currentColor"
                  className="text-fuchsia-300"
                />
              );
            }

            const prevX =
              index > 0 ? xScale(data[index - 1].date) : xScale(d.date);
            const nextX =
              index < data.length - 1
                ? xScale(data[index + 1].date)
                : xScale(d.date);
            const leftBound = (prevX + xScale(d.date)) / 2;
            const rightBound = (xScale(d.date) + nextX) / 2;

            return (
              <ClientTooltip key={index}>
                <TooltipTrigger>
                  <path
                    key={index}
                    d={`M ${xScale(d.date)} ${yScale(d.value)} l 0.0001 0`}
                    vectorEffect="non-scaling-stroke"
                    strokeWidth="7"
                    strokeLinecap="round"
                    fill="none"
                    stroke="currentColor"
                    className="text-fuchsia-300"
                  />
                  <g className="group/tooltip">
                    {/* Tooltip Line */}
                    <line
                      x1={xScale(d.date)}
                      y1={0}
                      x2={xScale(d.date)}
                      y2={100}
                      stroke="currentColor"
                      strokeWidth={1}
                      className="opacity-0 group-hover/tooltip:opacity-100 text-zinc-300 dark:text-zinc-700 transition-opacity"
                      vectorEffect="non-scaling-stroke"
                      style={{ pointerEvents: "none" }}
                    />
                    {/* Invisible area closest to a specific point for the tooltip trigger */}
                    <rect
                      x={leftBound}
                      y={0}
                      width={rightBound - leftBound}
                      height={100}
                      fill="transparent"
                    />
                  </g>
                </TooltipTrigger>
                <TooltipContent>
                  <div>
                    {d.date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                    })}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {d.value.toLocaleString("en-US")}
                  </div>
                </TooltipContent>
              </ClientTooltip>
            );
          })}
        </svg>

        {/* X Axis */}
        <div className="translate-y-2">
          {data.map((day, i) => {
            const isFirst = i === 0;
            const isLast = i === data.length - 1;
            const isMax = day.value === Math.max(...data.map((d) => d.value));
            if (!isFirst && !isLast && !isMax) return null;
            return (
              <div key={i} className="overflow-visible text-zinc-500">
                <div
                  style={{
                    left: `${xScale(day.date)}%`,
                    top: "100%",
                    transform: `translateX(${
                      i === 0 ? "0%" : i === data.length - 1 ? "-100%" : "-50%"
                    })`, // The first and last labels should be within the chart area
                  }}
                  className="text-xs absolute"
                >
                  {day.date.toLocaleDateString("en-US", {
                    month: "numeric",
                    day: "numeric",
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
