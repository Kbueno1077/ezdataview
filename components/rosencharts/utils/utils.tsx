import type { JSX } from "react";
import { BarChartHorizontal } from "../BarChartHorizontal/BarChartHorizontal";
import { BarChartHorizontalGradient } from "../BarChartHorizontal/BarChartHorizontalGradient";
import { BarChartHorizontalImage } from "../BarChartHorizontal/BarChartHorizontalImage";
import { BarChartHorizontalMulti } from "../BarChartHorizontal/BarChartHorizontalMulti";
import { BarChartHorizontalThin } from "../BarChartHorizontal/BarChartHorizontalThin";
import { BarChartVertical } from "../BarChartVertical/BarChartVertical";
import { BarChartVerticalMulti } from "../BarChartVertical/BarChartVerticalMulti";
import { BreakdownChart } from "../BreakdownChart/BreakdownChart";
import { BreakdownChartThin } from "../BreakdownChart/BreakdownChartThin";
import { LineChart } from "../LineCharts/LineChart";
import { LineChartCurved } from "../LineCharts/LineChartCurved";
import { LineChartCurvedDeprecated } from "../LineCharts/LineChartCurvedDeprecated";
import { DonutChart } from "../PieCharts/DonutChart";
import { FillableChart } from "../PieCharts/FillableChart";
import { FillableDonutChart } from "../PieCharts/FillableDonutChart";
import { HalfDonutChart } from "../PieCharts/HalfDonutChart";
import { PieChart } from "../PieCharts/PieChart";
import { PieChartImage } from "../PieCharts/PieChartImage";
import {
  BreakdownChartItem,
  DonutChartItem,
  GradientBarData,
  HorizontalBarData,
  ImageBarData,
  Item,
  LineChartCurvedData,
  LineChartData,
  LineChartDataPoint,
  LineDataSeries,
  MultiBarData,
  pieChartItem,
  SVGBarData,
  VerticalBarData,
  VerticalMultiBarData,
} from "./types";

export const getChartTypeByName = (
  data:
    | HorizontalBarData[]
    | GradientBarData[]
    | MultiBarData[]
    | SVGBarData[]
    | ImageBarData[]
    | VerticalBarData[]
    | VerticalMultiBarData[]
    | LineChartData[]
    | LineChartCurvedData[]
    | pieChartItem[]
    | DonutChartItem[]
    | LineDataSeries[]
    | LineChartDataPoint[]
    | BreakdownChartItem[],

  chartType: string,
  options?: {
    withTooltip?: boolean;
    className?: string;
    withAnimation?: boolean;
    suffix?: string;
  }
): JSX.Element | null => {
  const {
    withTooltip = true,
    className,
    withAnimation,
    suffix,
  } = options || {};
  console.log("🚀 ~ options:", options);

  switch (chartType) {
    case "horizontal-bar": {
      return (
        <BarChartHorizontal
          data={data as HorizontalBarData[]}
          className={className}
          withTooltip={withTooltip}
          withAnimation={withAnimation}
        />
      );
    }

    case "horizontal-bar-gradient": {
      return (
        <BarChartHorizontalGradient
          data={data as GradientBarData[]}
          withTooltip={withTooltip}
          className={className}
          withAnimation={withAnimation}
        />
      );
    }

    case "horizontal-bar-image": {
      return (
        <BarChartHorizontalImage
          data={data as SVGBarData[]}
          withTooltip={withTooltip}
          className={className}
          withAnimation={withAnimation}
        />
      );
    }
    case "horizontal-bar-multi": {
      return (
        <BarChartHorizontalMulti
          data={data as MultiBarData[]}
          withTooltip={withTooltip}
          className={className}
          withAnimation={withAnimation}
        />
      );
    }
    case "horizontal-bar-thin": {
      return (
        <BarChartHorizontalThin
          data={data as HorizontalBarData[]}
          withTooltip={withTooltip}
          className={className}
          withAnimation={withAnimation}
        />
      );
    }
    case "vertical-bar": {
      return (
        <BarChartVertical
          data={data as VerticalBarData[]}
          withTooltip={withTooltip}
          className={className}
          withAnimation={withAnimation}
        />
      );
    }
    case "vertical-bar-multi": {
      return (
        <BarChartVerticalMulti
          data={data as VerticalMultiBarData[]}
          withTooltip={withTooltip}
          className={className}
          withAnimation={withAnimation}
        />
      );
    }
    case "breakdown": {
      return (
        <BreakdownChart
          data={data as BreakdownChartItem[]}
          className={className}
        />
      );
    }
    case "breakdown-thin": {
      return (
        <BreakdownChartThin
          data={data as BreakdownChartItem[]}
          className={className}
        />
      );
    }
    case "line": {
      return (
        <LineChart
          data={data as LineDataSeries[]}
          withTooltip={withTooltip}
          withAnimation={withAnimation}
          className={className}
        />
      );
    }
    case "line-multi": {
      return (
        <LineChartCurved
          data={data as LineDataSeries[]}
          withTooltip={withTooltip}
          className={className}
          withAnimation={withAnimation}
        />
      );
    }
    case "line-curved": {
      return (
        <LineChartCurvedDeprecated
          data={data as LineChartDataPoint[]}
          withTooltip={withTooltip}
          className={className}
          withAnimation={withAnimation}
        />
      );
    }
    case "pie": {
      return (
        <PieChart
          data={data as pieChartItem[]}
          withTooltip={withTooltip}
          className={className}
        />
      );
    }
    case "pie-image": {
      return (
        <PieChartImage
          data={data as pieChartItem[]}
          withTooltip={withTooltip}
          className={className}
        />
      );
    }
    case "half-donut": {
      return <HalfDonutChart data={data as Item[]} className={className} />;
    }
    case "donut": {
      return (
        <DonutChart
          data={data as DonutChartItem[]}
          withTooltip={withTooltip}
          className={className}
        />
      );
    }
    case "fillable": {
      return (
        <FillableChart
          data={data as Item[]}
          className={className}
          suffix={suffix}
        />
      );
    }
    case "fillable-donut": {
      return (
        <FillableDonutChart
          data={data as Item[]}
          className={className}
          suffix={suffix}
        />
      );
    }

    default:
      return null;
  }
};

export const gradientFromHex = (hexColor: string): { background: string } => {
  const hex = hexColor.startsWith("#") ? hexColor.substring(1) : hexColor;
  const lighterHex = generateLighterColor(hex);

  return {
    background: `linear-gradient(to right, #${lighterHex}, #${hex})`,
  };
};

const generateLighterColor = (hex: string): string => {
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const lighterR = Math.floor(r + (255 - r) * 0.25);
  const lighterG = Math.floor(g + (255 - g) * 0.25);
  const lighterB = Math.floor(b + (255 - b) * 0.25);

  return (
    lighterR.toString(16).padStart(2, "0") +
    lighterG.toString(16).padStart(2, "0") +
    lighterB.toString(16).padStart(2, "0")
  );
};

export function isValidUrl(string: string) {
  try {
    new URL(string);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}
