import { pie, arc, PieArcDatum } from "d3";
import {
  ClientTooltip,
  TooltipContent,
  TooltipTrigger,
} from "../Tooltip/Tooltip";
import { DonutChartItem } from "../utils/types";

export function DonutChart({
  data,
  withTooltip = true,
  innerContent = false,
  className,
}: {
  data: DonutChartItem[];
  withTooltip?: boolean;
  innerContent?: boolean;
  className?: string;
}) {
  const radius = Math.PI * 120; // Chart base dimensions
  const gap = 0.01; // Gap between slices
  const lightStrokeEffect = 10; // 3d light effect around the slice

  // Pie layout and arc generator
  const pieLayout = pie<DonutChartItem>()
    .value((d) => d.value)
    .padAngle(gap); // Creates a gap between slices

  // Adjust innerRadius to create a donut shape
  const innerRadius = radius / 1.625;
  const arcGenerator = arc<PieArcDatum<DonutChartItem>>()
    .innerRadius(innerRadius)
    .outerRadius(radius)
    .cornerRadius(lightStrokeEffect + 2);

  // Create an arc generator for the clip path that matches the outer path of the arc
  const arcClip =
    arc<PieArcDatum<DonutChartItem>>()
      .innerRadius(innerRadius + lightStrokeEffect / 2)
      .outerRadius(radius)
      .cornerRadius(lightStrokeEffect + 2) || undefined;

  const labelRadius = radius * 0.825;
  const arcLabel = arc<PieArcDatum<DonutChartItem>>()
    .innerRadius(labelRadius)
    .outerRadius(labelRadius);

  const arcs = pieLayout(data);

  // Calculate the angle for each slice
  function computeAngle(d: PieArcDatum<DonutChartItem>) {
    return ((d.endAngle - d.startAngle) * 180) / Math.PI;
  }

  // Minimum angle to display text
  const minAngle = 20; // Adjust this value as needed

  const colors = [
    "#7e4cfe",
    "#895cfc",
    "#956bff",
    "#a37fff",
    "#b291fd",
    "#b597ff",
  ];

  return (
    <div className="relative">
      {/* Add a new div for centered text */}
      {innerContent && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className={`text-lg text-zinc-500`}>Total</p>
            <p className={`text-4xl transition-colors duration-300 font-bold`}>
              184
            </p>
          </div>
        </div>
      )}

      <svg
        viewBox={`-${radius} -${radius} ${radius * 2} ${radius * 2}`}
        className={`mx-auto w-full h-full overflow-visible ${className}`}
      >
        {/* Define clip paths and colors for each slice */}
        <defs>
          {arcs.map((d, i) => (
            <clipPath key={`donut-c0-clip-${i}`} id={`donut-c0-clip-${i}`}>
              <path d={arcClip(d) || undefined} />
              <linearGradient key={i} id={`donut-c0-gradient-${i}`}>
                <stop offset="55%" stopColor={colors[i]} stopOpacity={0.95} />
              </linearGradient>
            </clipPath>
          ))}
        </defs>

        {/* Slices */}
        {arcs.map((d, i) => {
          const angle = computeAngle(d);
          const centroid = arcLabel.centroid(d);
          if (d.endAngle > Math.PI) {
            centroid[0] += 10;
            centroid[1] += 10;
          } else {
            centroid[0] -= 10;
            centroid[1] -= 0;
          }

          if (!withTooltip) {
            return (
              <g key={i}>
                {/* Use the clip path on this group or individual path */}
                <g clipPath={`url(#donut-c0-clip-${i})`}>
                  <path
                    fill={`url(#donut-c0-gradient-${i})`}
                    stroke="#ffffff33" // Lighter stroke for a 3D effect
                    strokeWidth={lightStrokeEffect} // Adjust stroke width for the desired effect
                    d={arcGenerator(d) || undefined}
                  />
                </g>
                {/* Labels with conditional rendering */}
                <g opacity={angle > minAngle ? 1 : 0}>
                  <text
                    transform={`translate(${centroid})`}
                    textAnchor="middle"
                    fontSize={38}
                  >
                    <tspan y="-0.4em" fontWeight="600" fill={"#eee"}>
                      {d.data.name}
                    </tspan>
                    {angle > minAngle && (
                      <tspan x={0} y="0.7em" fillOpacity={0.7} fill={"#eee"}>
                        {d.data.value.toLocaleString("en-US")}%
                      </tspan>
                    )}
                  </text>
                </g>
              </g>
            );
          }

          return (
            <ClientTooltip key={i}>
              <TooltipTrigger>
                <g key={i}>
                  {/* Use the clip path on this group or individual path */}
                  <g clipPath={`url(#donut-c0-clip-${i})`}>
                    <path
                      fill={`url(#donut-c0-gradient-${i})`}
                      stroke="#ffffff33" // Lighter stroke for a 3D effect
                      strokeWidth={lightStrokeEffect} // Adjust stroke width for the desired effect
                      d={arcGenerator(d) || undefined}
                    />
                  </g>
                  {/* Labels with conditional rendering */}
                  <g opacity={angle > minAngle ? 1 : 0}>
                    <text
                      transform={`translate(${centroid})`}
                      textAnchor="middle"
                      fontSize={38}
                    >
                      <tspan y="-0.4em" fontWeight="600" fill={"#eee"}>
                        {d.data.name}
                      </tspan>
                      {angle > minAngle && (
                        <tspan x={0} y="0.7em" fillOpacity={0.7} fill={"#eee"}>
                          {d.data.value.toLocaleString("en-US")}%
                        </tspan>
                      )}
                    </text>
                  </g>
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
    </div>
  );
}
