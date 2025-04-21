"use client";

import { pie, arc, PieArcDatum } from "d3";
import { PieChartItem } from "../utils/types";
import {
  ClientTooltip,
  TooltipContent,
  TooltipTrigger,
} from "../Tooltip/Tooltip";
import { useState } from "react";

export function FillableDonutChart({
  data,
  className,
  suffix,
  withTooltip = true,
}: {
  data: PieChartItem[];
  className?: string;
  suffix?: string;
  withTooltip?: boolean;
}) {
  const [selectedSlice, setSelectedSlice] = useState<PieChartItem>(data[0]);

  if (!data) {
    return null;
  }

  const defaultColors = [
    "#7e4cfe",
    "#e0e0e0",
    "#956bff",
    "#a37fff",
    "#b291fd",
    "#b597ff",
  ];

  const radius = 420; // Chart base dimensions
  const lightStrokeEffect = 10; // 3d light effect around the slice

  // Modify the pie layout to create a full donut filling clockwise from 12 o'clock
  const pieLayout = pie<PieChartItem>()
    .value((d) => d.value)
    .startAngle(0) // Start at 0 degrees (12 o'clock)
    .endAngle(2 * Math.PI) // End at 360 degrees (12 o'clock again)
    .sort((a, b) => a.value - b.value)
    .padAngle(0.0);

  // Adjust innerRadius to create a donut shape
  const innerRadius = radius / 1.625;
  const arcGenerator = arc<PieArcDatum<PieChartItem>>()
    .innerRadius(innerRadius)
    .outerRadius(radius);

  // Create an arc generator for the clip path that matches the outer path of the arc
  const arcClip =
    arc<PieArcDatum<PieChartItem>>()
      .innerRadius(innerRadius + lightStrokeEffect / 2)
      .outerRadius(radius)
      .cornerRadius(lightStrokeEffect + 2) || undefined;

  const arcs = pieLayout(data);

  const handleSliceClick = (slice: PieChartItem) => {
    setSelectedSlice(slice);
  };

  return (
    <div className="scale-95">
      <div className="relative">
        <svg
          viewBox={`-${radius} -${radius} ${radius * 2} ${radius * 2}`}
          className={`overflow-visible ${className}`}
        >
          <defs>
            {arcs.map((d, i) => (
              <clipPath
                key={`fillable-donut-clip-${i}`}
                id={`fillable-donut-clip-${i}`}
              >
                <path d={arcClip(d) || undefined} />
              </clipPath>
            ))}
          </defs>
          <g>
            {/* Slices */}
            {arcs.map((d, i) => {
              const sliceContent = (
                <g
                  key={i}
                  clipPath={`url(#fillable-donut-clip-${i})`}
                  onClick={() => handleSliceClick(d.data)}
                  style={{ cursor: "pointer" }}
                >
                  <path
                    className="stroke-white/30 dark:stroke-zinc-400/10"
                    strokeWidth={lightStrokeEffect}
                    d={arcGenerator(d) || undefined}
                    style={{
                      fill:
                        d.data.colorFrom && d.data.colorFrom.startsWith("#")
                          ? d.data.colorFrom
                          : defaultColors[i % defaultColors.length],
                    }}
                  />
                </g>
              );

              if (!withTooltip) {
                return sliceContent;
              }

              return (
                <ClientTooltip key={i}>
                  <TooltipTrigger>{sliceContent}</TooltipTrigger>
                  <TooltipContent>
                    <div>{d.data.name}</div>
                    <div className="text-gray-500 text-sm">
                      {d.data.value.toLocaleString("en-US")}
                      {suffix}
                    </div>
                  </TooltipContent>
                </ClientTooltip>
              );
            })}
          </g>
        </svg>
        {/* Centered value display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-semibold leading-5">
            {selectedSlice.name}
          </span>
          <div className="text-xl font-bold">
            <span className="text-violet-600 dark:text-violet-400">
              {selectedSlice.value.toLocaleString("en-US")}
              {suffix}
            </span>
            <span className="text-zinc-400 dark:text-zinc-600">
              {" "}
              / 100 {suffix}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
