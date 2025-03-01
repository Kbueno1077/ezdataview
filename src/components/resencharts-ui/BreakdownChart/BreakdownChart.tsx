import React, { CSSProperties } from "react";
import { BreakdownChartItem } from "../utils/fixtures/BreakdownCharts";

export function BreakdownChart({
  data,
  className,
}: {
  data: BreakdownChartItem[];
  className?: string;
}) {
  if (!data) {
    return null;
  }

  const gap = 0.3; // gap between bars
  const totalValue = data.reduce((acc, d) => acc + d.value, 0);
  const barHeight = 54;
  const totalWidth = totalValue + gap * (data.length - 1);
  let cumulativeWidth = 0;

  const cornerRadius = 4; // Adjust this value to change the roundness

  return (
    <div
      className={`relative h-[var(--height)] mb-1.5 ${className}`}
      style={
        {
          "--marginTop": "0px",
          "--marginRight": "0px",
          "--marginBottom": "0px",
          "--marginLeft": "0px",
          "--height": `${barHeight}px`,
        } as CSSProperties
      }
    >
      {/* Chart Area */}
      <div
        className="absolute inset-0 
          h-[calc(100%-var(--marginTop)-var(--marginBottom))]
          w-[calc(100%-var(--marginLeft)-var(--marginRight))]
          translate-x-[var(--marginLeft)]
          translate-y-[var(--marginTop)]
          overflow-visible
        "
      >
        {/* Bars with Gradient Fill */}
        {data.map((d, index) => {
          const barWidth = (d.value / totalWidth) * 100;
          const xPosition = cumulativeWidth;
          cumulativeWidth += barWidth + gap;

          return (
            <div
              key={index}
              className="relative"
              style={{
                width: `${barWidth}%`,
                height: `${barHeight}px`,
                left: `${xPosition}%`,
                position: "absolute",
              }}
            >
              <div
                className={`bg-gradient-to-b ${d.color}`}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: `${cornerRadius}px`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: `${barHeight / 5}px`,
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                {d.key}
              </div>
              <div
                style={{
                  position: "absolute",
                  top: `${barHeight / 2}px`,
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "bold",
                  textAlign: "center",
                  fontFamily: "monospace",
                }}
              >
                {d.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
