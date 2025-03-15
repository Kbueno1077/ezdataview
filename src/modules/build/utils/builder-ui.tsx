import type { JSX } from "react";
import BarChartBuilder from "../ui-builders/BarChartBuilder";
import LineChartBuilder from "../ui-builders/LineChartBuilder";

export const getChartUIBuilder = (
  chartType: string,
  options?: {
    className?: string;
  }
): JSX.Element | null => {
  const { className } = options || {};

  switch (chartType) {
    case "horizontal-bar":
    case "horizontal-bar-gradient":
    case "horizontal-bar-image":
    case "horizontal-bar-multi":
    case "horizontal-bar-thin":
    case "vertical-bar":
    case "vertical-bar-multi": {
      return <BarChartBuilder />;
    }

    case "breakdown":
    case "breakdown-thin": {
      // Return breakdown chart UI builder when implemented
      return <div className={className}>Breakdown Chart UI Builder</div>;
    }

    case "line":
    case "line-multi":
    case "line-curved": {
      // Return line chart UI builder when implemented
      return <LineChartBuilder />;
    }

    case "pie":
    case "pie-image":
    case "half-donut":
    case "donut":
    case "fillable":
    case "fillable-donut": {
      // Return pie chart UI builder when implemented
      return <div className={className}>Pie Chart UI Builder</div>;
    }

    default:
      return null;
  }
};

export interface ChartType {
  title: string;
  value: string;
}

export const chartTypes: ChartType[] = [
  { title: "Horizontal Bar", value: "horizontal-bar" },
  { title: "Horizontal Bar Gradient", value: "horizontal-bar-gradient" },
  { title: "Horizontal Bar Image", value: "horizontal-bar-image" },
  { title: "Horizontal Bar Multi", value: "horizontal-bar-multi" },
  { title: "Horizontal Bar Thin", value: "horizontal-bar-thin" },
  { title: "Vertical Bar", value: "vertical-bar" },
  { title: "Vertical Bar Multi", value: "vertical-bar-multi" },
  { title: "Breakdown", value: "breakdown" },
  { title: "Breakdown Thin", value: "breakdown-thin" },
  { title: "Lines", value: "line" },
  { title: "Lines Curved", value: "line-multi" },
  { title: "Pie", value: "pie" },
  { title: "Pie Image", value: "pie-image" },
  { title: "Half Donut", value: "half-donut" },
  { title: "Donut", value: "donut" },
  { title: "Fillable", value: "fillable" },
  { title: "Fillable Donut", value: "fillable-donut" },
];
