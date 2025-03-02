import React, { CSSProperties } from "react";
import { scaleBand, scaleLinear, max } from "d3";
import {
  ClientTooltip,
  TooltipContent,
  TooltipTrigger,
} from "../Tooltip/Tooltip";
import { GradientBarData } from "../utils/types";

export function BarChartHorizontalGradient({
  data,
  withTooltip = true,
  className,
}: {
  data: GradientBarData[];
  withTooltip?: boolean;
  className?: string;
}) {
  if (!data) {
    return null;
  }
  // Scales
  const yScale = scaleBand()
    .domain(data.map((d) => d.key))
    .range([0, 100])
    .padding(0.175);

  const xScale = scaleLinear()
    .domain([0, max(data.map((d) => d.value)) ?? 0])
    .range([0, 100]);

  const longestWord = max(data.map((d) => d.key.length)) || 1;
  return (
    <div
      className={`relative w-full ${className ? className : "h-72"}`}
      style={
        {
          "--marginTop": "0px",
          "--marginRight": "0px",
          "--marginBottom": "16px",
          "--marginLeft": `${longestWord * 7}px`,
        } as CSSProperties
      }
    >
      {/* Chart Area */}
      <div
        className="absolute inset-0
          z-10
          h-[calc(100%-var(--marginTop)-var(--marginBottom))]
          translate-y-[var(--marginTop)]
          w-[calc(100%-var(--marginLeft)-var(--marginRight))]
          translate-x-[var(--marginLeft)]
          overflow-visible
        "
      >
        {/* Bars with Rounded Right Corners */}
        {data.map((d, index) => {
          const barWidth = xScale(d.value);
          const barHeight = yScale.bandwidth();

          if (!withTooltip) {
            return (
              <div
                key={index}
                style={{
                  position: "absolute",
                  left: "0",
                  top: `${yScale(d.key)}%`,
                  width: `${barWidth}%`,
                  height: `${barHeight}%`,
                  borderRadius: "0 6px 6px 0", // Rounded right corners
                }}
                className={`bg-gradient-to-b ${d.color}`}
              />
            );
          }

          return (
            <ClientTooltip key={index}>
              <TooltipTrigger>
                <div
                  key={index}
                  style={{
                    position: "absolute",
                    left: "0",
                    top: `${yScale(d.key)}%`,
                    width: `${barWidth}%`,
                    height: `${barHeight}%`,
                    borderRadius: "0 6px 6px 0", // Rounded right corners
                  }}
                  className={`bg-gradient-to-b ${d.color}`}
                />
              </TooltipTrigger>
              <TooltipContent>
                <div>{d.key}</div>
                <div className="text-gray-500 text-sm">{d.value}</div>
              </TooltipContent>
            </ClientTooltip>
          );
        })}
        <svg
          className="h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          {xScale
            .ticks(8)
            .map(xScale.tickFormat(8, "d"))
            .map((active, i) => (
              <g
                transform={`translate(${xScale(+active)},0)`}
                className="text-gray-300/80 dark:text-gray-800/80"
                key={i}
              >
                <line
                  y1={0}
                  y2={100}
                  stroke="currentColor"
                  strokeDasharray="6,5"
                  strokeWidth={0.5}
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            ))}
        </svg>
        {/* X Axis (Values) */}
        {xScale.ticks(4).map((value, i) => (
          <div
            key={i}
            style={{
              left: `${xScale(value)}%`,
              top: "100%",
            }}
            className="absolute text-xs -translate-x-1/2 tabular-nums text-gray-400"
          >
            {value}
          </div>
        ))}
      </div>

      {/* Y Axis (Letters) */}
      <div
        className="
           h-[calc(100%-var(--marginTop)-var(--marginBottom))]
           w-[var(--marginLeft)]
           translate-y-[var(--marginTop)]
           overflow-visible"
      >
        {data.map((entry, i) => (
          <span
            key={i}
            style={{
              left: "-8px",
              top: `${yScale(entry.key)! + yScale.bandwidth() / 2}%`,
            }}
            className="absolute text-xs text-gray-400 -translate-y-1/2 w-full text-right"
          >
            {entry.key}
          </span>
        ))}
      </div>
    </div>
  );
}
