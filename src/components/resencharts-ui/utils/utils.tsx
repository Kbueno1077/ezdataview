import type { JSX } from "react";
import { BarChartHorizontal } from "../BarChartHorizontal/BarChartHorizontal";
import { BarChartHorizontalGradient } from "../BarChartHorizontal/BarChartHorizontalGradient";
import { BarChartHorizontalMulti } from "../BarChartHorizontal/BarChartHorizontalMulti";
import { BarChartHorizontalImage } from "../BarChartHorizontal/BarChartHorizontalImage";
import { BarChartHorizontalThin } from "../BarChartHorizontal/BarChartHorizontalThin";
import { BarChartVertical } from "../BarChartVertical/BarChartVertical";
import { BarChartVerticalMulti } from "../BarChartVertical/BarChartVerticalMulti";
import { BreakdownChart } from "../BreakdownChart/BreakdownChart";
import { BreakdownChartThin } from "../BreakdownChart/BreakdownChartThin";
import { LineChart } from "../LineCharts/LineChart";
import { LineChartCurved } from "../LineCharts/LineChartCurved";
import { LineChartMultiple } from "../LineCharts/LineChartMultiple";
import { DonutChart } from "../PieCharts/DonutChart";
import { FillableChart } from "../PieCharts/FillableChart";
import { FillableDonutChart } from "../PieCharts/FillableDonutChart";
import { HalfDonutChart } from "../PieCharts/HalfDonutChart";
import { PieChart } from "../PieCharts/PieChart";
import { PieChartImage } from "../PieCharts/PieChartImage";

export const getChartTypeByName = (
  data: any,
  chartType: string,
  options?: {
    withTooltip?: boolean;
    className?: string;
    withAnimation?: boolean;
  }
): JSX.Element | null => {
  const { withTooltip = true, className, withAnimation } = options || {};

  switch (chartType) {
    case "horizontal-bar": {
      return (
        <BarChartHorizontal
          data={data}
          className={className}
          withTooltip={withTooltip}
          withAnimation={withAnimation}
        />
      );
    }

    case "horizontal-bar-gradient": {
      return (
        <BarChartHorizontalGradient
          data={data}
          withTooltip={withTooltip}
          className={className}
          withAnimation={withAnimation}
        />
      );
    }

    case "horizontal-bar-image": {
      return (
        <BarChartHorizontalImage
          data={data}
          withTooltip={withTooltip}
          className={className}
          withAnimation={withAnimation}
        />
      );
    }
    case "horizontal-bar-multi": {
      return (
        <BarChartHorizontalMulti
          data={data}
          withTooltip={withTooltip}
          className={className}
          withAnimation={withAnimation}
        />
      );
    }
    case "horizontal-bar-thin": {
      return (
        <BarChartHorizontalThin
          data={data}
          withTooltip={withTooltip}
          className={className}
          withAnimation={withAnimation}
        />
      );
    }
    case "vertical-bar": {
      return (
        <BarChartVertical
          data={data}
          withTooltip={withTooltip}
          className={className}
          withAnimation={withAnimation}
        />
      );
    }
    case "vertical-bar-multi": {
      return (
        <BarChartVerticalMulti
          data={data}
          withTooltip={withTooltip}
          className={className}
          withAnimation={withAnimation}
        />
      );
    }
    case "breakdown": {
      return <BreakdownChart data={data} className={className} />;
    }
    case "breakdown-thin": {
      return <BreakdownChartThin data={data} className={className} />;
    }
    case "line": {
      return (
        <LineChart
          data={data}
          withTooltip={withTooltip}
          withAnimation={withAnimation}
          className={className}
        />
      );
    }
    case "line-multi": {
      return (
        <LineChartMultiple
          data={data}
          withTooltip={withTooltip}
          className={className}
          withAnimation={withAnimation}
        />
      );
    }
    case "line-curved": {
      return (
        <LineChartCurved
          data={data}
          withTooltip={withTooltip}
          className={className}
          withAnimation={withAnimation}
        />
      );
    }
    case "pie": {
      return (
        <PieChart data={data} withTooltip={withTooltip} className={className} />
      );
    }
    case "pie-image": {
      return (
        <PieChartImage
          data={data}
          withTooltip={withTooltip}
          className={className}
        />
      );
    }
    case "half-donut": {
      return <HalfDonutChart data={data} className={className} />;
    }
    case "donut": {
      return (
        <DonutChart
          data={data}
          withTooltip={withTooltip}
          className={className}
        />
      );
    }
    case "fillable": {
      return <FillableChart data={data} className={className} />;
    }
    case "fillable-donut": {
      return <FillableDonutChart data={data} className={className} />;
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

  const lighterR = Math.floor(r + (255 - r) * 0.2);
  const lighterG = Math.floor(g + (255 - g) * 0.2);
  const lighterB = Math.floor(b + (255 - b) * 0.2);

  return (
    lighterR.toString(16).padStart(2, "0") +
    lighterG.toString(16).padStart(2, "0") +
    lighterB.toString(16).padStart(2, "0")
  );
};
