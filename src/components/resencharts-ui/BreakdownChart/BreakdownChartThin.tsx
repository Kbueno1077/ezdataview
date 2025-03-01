import React, { CSSProperties } from "react";

export function BreakdownChartThin({
  data,
  className,
}: {
  data: { key: string; value: number; color: string }[];
  className?: string;
}) {
  if (!data) {
    return null;
  }

  const gap = 0.3; // gap between bars
  const totalValue = data.reduce((acc, d) => acc + d.value, 0);
  const barHeight = 12;
  const totalWidth = totalValue + gap * (data.length - 1);
  let cumulativeWidth = 0;

  const cornerRadius = 4; // Adjust this value to change the roundness

  return (
    <div
      className={`relative h-[var(--height)] mt-4 mb-8 ${className}`}
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
                className="text-xs text-gray-400 text-center"
                style={{
                  left: `${xPosition + barWidth / 2}%`,
                  top: `${barHeight + 18}px`,
                }}
              >
                {d.key}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
