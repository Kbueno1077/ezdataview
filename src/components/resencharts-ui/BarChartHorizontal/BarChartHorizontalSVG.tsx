import React, { CSSProperties } from "react";
import { scaleBand, scaleLinear, max } from "d3";
import {
  ClientTooltip,
  TooltipContent,
  TooltipTrigger,
} from "../Tooltip/Tooltip"; // Or wherever you pasted Tooltip.tsx
import { SVGBarData } from "../utils/types";
import { AnimatedBar } from "../Animated/AnimatedBar";
import { companyLogos } from "@/modules/landing/utils";

export function BarChartHorizontalSVG({
  data,
  withTooltip = true,
  withAnimation = false,
  className,
}: {
  data: SVGBarData[];
  withTooltip?: boolean;
  withAnimation?: boolean;
  className?: string;
}) {
  if (!data) {
    return null;
  }

  // Scales
  const yScale = scaleBand()
    .domain(data.map((d) => d.key))
    .range([0, 100])
    .padding(0.2);

  const xScale = scaleLinear()
    .domain([0, max(data.map((d) => d.value)) ?? 0])
    .range([0, 100]);

  return (
    <div
      className={`relative w-full h-72 ${className}`}
      style={
        {
          "--marginTop": "0px",
          "--marginRight": "35px",
          "--marginBottom": "0px",
          "--marginLeft": `35px`,
        } as CSSProperties
      }
    >
      {/* X Axis (Values) */}
      <div
        className="absolute inset-0
          h-[calc(100%-var(--marginTop)-var(--marginBottom))]
          translate-y-[var(--marginTop)]
          left-[var(--marginLeft)]
          right-[var(--marginRight)]
          overflow-visible"
      >
        {data.map((entry, i) => {
          if (xScale(entry.value) == 0) return null;
          return (
            <span
              key={i}
              style={{
                top: `${yScale(entry.key)! + yScale.bandwidth() / 2}%`,
                left: `calc(${xScale(entry.value)}% + 5px)`,
              }}
              className="absolute text-xs text-gray-400 font-medium -translate-y-1/2 pr-1"
            >
              {entry.value}
            </span>
          );
        })}
      </div>

      {/* Y Axis (Images) */}
      <div
        className="absolute inset-0
         h-[calc(100%-var(--marginTop)-var(--marginBottom))]
         translate-y-[var(--marginTop)]
         overflow-visible"
      >
        {data.map((entry, i) => (
          <div
            key={i}
            style={{
              top: `${yScale(entry.key)! + yScale.bandwidth() / 2}%`,
              left: `0`,
            }}
            className="absolute rounded-full overflow-hidden size-7 text-sm text-gray-700 -translate-y-1/2 pointer-events-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 18"
              className=""
            >
              {companyLogos[i]}
            </svg>
          </div>
        ))}
      </div>

      {/* Chart Area */}
      <div
        className="absolute inset-0
        z-10
        h-[calc(100%-var(--marginTop)-var(--marginBottom))]
        w-[calc(100%-var(--marginLeft)-var(--marginRight))]
        translate-x-[var(--marginLeft)]
        translate-y-[var(--marginTop)]
        overflow-visible
      "
      >
        {/* Bars with Rounded Right Corners */}
        {data.map((d, index) => {
          const barWidth = xScale(d.value);
          const barHeight = yScale.bandwidth();

          if (!withTooltip) {
            return (
              <AnimatedBar
                key={index}
                index={index}
                withAnimation={withAnimation}
                className={`absolute ${d.color}`}
                style={{
                  left: "0",
                  top: `${yScale(d.key)}%`,
                  width: `${barWidth}%`,
                  height: `${barHeight}%`,
                  borderRadius: "0 6px 6px 0",
                }}
              />
            );
          }

          return (
            <ClientTooltip key={index}>
              <TooltipTrigger>
                <AnimatedBar
                  index={index}
                  withAnimation={withAnimation}
                  className={`inset-0 absolute ${d.color}`}
                  style={{
                    left: "0",
                    top: `${yScale(d.key)}%`,
                    width: `${barWidth}%`,
                    height: `${barHeight}%`,
                    borderRadius: "0 6px 6px 0",
                  }}
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
          className="w-full h-full"
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
      </div>
    </div>
  );
}
