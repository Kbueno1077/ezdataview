import type { JSX } from "react";
import { BarChartHorizontal } from "../BarChartHorizontal/BarChartHorizontal";
import { BarChartHorizontalGradient } from "../BarChartHorizontal/BarChartHorizontalGradient";
import { BarChartHorizontalMulti } from "../BarChartHorizontal/BarChartHorizontalMulti";
import { BarChartHorizontalSVG } from "../BarChartHorizontal/BarChartHorizontalSVG";
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

    case "horizontal-bar-svg": {
      return (
        <BarChartHorizontalSVG
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
        />
      );
    }
    case "line-curved": {
      return (
        <LineChartCurved
          data={data}
          withTooltip={withTooltip}
          className={className}
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
