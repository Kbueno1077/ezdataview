import React from "react";
import { pie, arc, PieArcDatum } from "d3";
import {
  ClientTooltip,
  TooltipContent,
  TooltipTrigger,
} from "../Tooltip/Tooltip";
import { pieChartItem } from "../utils/types";
import { gradientFromHex } from "../utils/utils";

export function PieChart({
  data,
  withTooltip = true,
  className,
}: {
  data: pieChartItem[];
  withTooltip?: boolean;
  className?: string;
}) {
  if (!data) {
    return null;
  }

  const defaultColors = [
    {
      colorFrom: "text-pink-400",
      colorTo: "text-pink-400",
    },
    {
      colorFrom: "text-purple-400",
      colorTo: "text-purple-400",
    },
    {
      colorFrom: "text-indigo-400",
      colorTo: "text-indigo-400",
    },
    {
      colorFrom: "text-sky-400",
      colorTo: "text-sky-400",
    },
    {
      colorFrom: "text-lime-400",
      colorTo: "text-lime-400",
    },
    {
      colorFrom: "text-amber-400",
      colorTo: "text-amber-400",
    },
  ];

  // Chart dimensions
  const radius = Math.PI * 100;
  const gap = 0.02; // Gap between slices

  // Pie layout and arc generator
  const pieLayout = pie<pieChartItem>()
    .sort(null)
    .value((d) => d.value)
    .padAngle(gap); // Creates a gap between slices

  const arcGenerator = arc<PieArcDatum<pieChartItem>>()
    .innerRadius(20)
    .outerRadius(radius)
    .cornerRadius(8);
  const labelRadius = radius * 0.8;
  const arcLabel = arc<PieArcDatum<pieChartItem>>()
    .innerRadius(labelRadius)
    .outerRadius(labelRadius);

  const arcs = pieLayout(data);
  // Calculate the angle for each slice
  const computeAngle = (d: PieArcDatum<pieChartItem>) => {
    return ((d.endAngle - d.startAngle) * 180) / Math.PI;
  };

  // Minimum angle to display text
  const MIN_ANGLE = 20;

  return (
    <div className="p-4">
      <div className="relative mx-auto max-w-[50%]">
        <svg
          viewBox={`-${radius} -${radius} ${radius * 2} ${radius * 2}`}
          className={`overflow-visible ${className}`}
        >
          {/* Slices */}
          {arcs.map((d, i) => {
            const midAngle = (d.startAngle + d.endAngle) / 2;
            const isHexColor = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(
              d.data.colorFrom
            );

            if (!withTooltip) {
              return (
                <g key={i}>
                  <path fill={`url(#pieColors-${i})`} d={arcGenerator(d)!} />
                  <linearGradient
                    id={`pieColors-${i}`}
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                    gradientTransform={`rotate(${
                      (midAngle * 180) / Math.PI - 90
                    }, 0.5, 0.5)`}
                  >
                    <stop
                      offset="0%"
                      stopColor={"currentColor"}
                      className={
                        d.data.colorFrom ||
                        defaultColors[i % data.length].colorFrom
                      }
                      style={{
                        ...(isHexColor
                          ? gradientFromHex(d.data.colorFrom)
                          : {}),
                      }}
                    />
                    <stop
                      offset="100%"
                      stopColor={"currentColor"}
                      className={
                        d.data.colorTo || defaultColors[i % data.length].colorTo
                      }
                      style={{
                        ...(isHexColor
                          ? gradientFromHex(d.data.colorFrom)
                          : {}),
                      }}
                    />
                  </linearGradient>
                </g>
              );
            }

            return (
              <ClientTooltip key={i}>
                <TooltipTrigger>
                  <g key={i}>
                    <path fill={`url(#pieColors-${i})`} d={arcGenerator(d)!} />
                    <linearGradient
                      id={`pieColors-${i}`}
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                      gradientTransform={`rotate(${
                        (midAngle * 180) / Math.PI - 90
                      }, 0.5, 0.5)`}
                    >
                      <stop
                        offset="0%"
                        stopColor={"currentColor"}
                        className={
                          d.data.colorFrom ||
                          defaultColors[i % data.length].colorFrom
                        }
                        style={{
                          ...(isHexColor
                            ? gradientFromHex(d.data.colorFrom)
                            : {}),
                        }}
                      />
                      <stop
                        offset="100%"
                        stopColor={"currentColor"}
                        className={
                          d.data.colorTo ||
                          defaultColors[i % data.length].colorTo
                        }
                        style={{
                          ...(isHexColor
                            ? gradientFromHex(d.data.colorFrom)
                            : {}),
                        }}
                      />
                    </linearGradient>
                  </g>
                </TooltipTrigger>
                <TooltipContent>
                  <div>{d.data.name}</div>
                  <div className="text-gray-500 text-sm">
                    {d.data.value.toLocaleString("en-US")}
                  </div>
                </TooltipContent>
              </ClientTooltip>
            );
          })}
        </svg>

        {/* Labels as absolutely positioned divs */}
        <div className="absolute inset-0 pointer-events-none">
          {arcs.map((d: PieArcDatum<pieChartItem>, i) => {
            const angle = computeAngle(d);
            if (angle <= MIN_ANGLE) return null;

            // Get pie center position
            const [x, y] = arcLabel.centroid(d);
            const CENTER_PCT = 50;

            // Convert to percentage positions. Adjust magic numbers to move the labels around
            const nameLeft = `${CENTER_PCT + (x / radius) * 40}%`;
            const nameTop = `${CENTER_PCT + (y / radius) * 40}%`;

            const valueLeft = `${CENTER_PCT + (x / radius) * 72}%`;
            const valueTop = `${CENTER_PCT + (y / radius) * 70}%`;

            return (
              <div key={i}>
                <div
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: valueLeft, top: valueTop }}
                >
                  {d.data.value}
                </div>
                <div
                  className="absolute text-white truncate text-center font-medium w-full text-sm"
                  style={{
                    left: nameLeft,
                    top: nameTop,
                    transform: "translate(-50%, -50%)",
                    marginLeft: x > 0 ? "2px" : "-2px",
                    marginTop: y > 0 ? "2px" : "-2px",
                  }}
                >
                  {d.data.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
