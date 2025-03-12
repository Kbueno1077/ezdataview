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
    hash?: string;
    withTooltip?: boolean;
    className?: string;
    withAnimation?: boolean;
  }
): JSX.Element | null => {
  const { withTooltip = true, className, withAnimation, hash } = options || {};

  switch (chartType) {
    case "horizontal-bar": {
      return (
        <BarChartHorizontal
          key={hash}
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
          key={hash}
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
          key={hash}
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
          key={hash}
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
          key={hash}
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
          key={hash}
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
          key={hash}
          data={data}
          withTooltip={withTooltip}
          className={className}
          withAnimation={withAnimation}
        />
      );
    }
    case "breakdown": {
      return <BreakdownChart key={hash} data={data} className={className} />;
    }
    case "breakdown-thin": {
      return (
        <BreakdownChartThin key={hash} data={data} className={className} />
      );
    }
    case "line": {
      return (
        <LineChart
          key={hash}
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
          key={hash}
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
          key={hash}
          data={data}
          withTooltip={withTooltip}
          className={className}
          withAnimation={withAnimation}
        />
      );
    }
    case "pie": {
      return (
        <PieChart
          key={hash}
          data={data}
          withTooltip={withTooltip}
          className={className}
        />
      );
    }
    case "pie-image": {
      return (
        <PieChartImage
          key={hash}
          data={data}
          withTooltip={withTooltip}
          className={className}
        />
      );
    }
    case "half-donut": {
      return <HalfDonutChart key={hash} data={data} className={className} />;
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
      return <FillableChart key={hash} data={data} className={className} />;
    }
    case "fillable-donut": {
      return (
        <FillableDonutChart key={hash} data={data} className={className} />
      );
    }

    default:
      return null;
  }
};
