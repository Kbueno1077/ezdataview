import { BarChart3, ChartBarStacked, LineChart, PieChart } from "lucide-react";
import type { JSX } from "react";
import BarChartBuilder from "../ui-builders/BarChartBuilder";
import BreakdownBuilder from "../ui-builders/BreakdownBuilder";
import LineChartBuilder from "../ui-builders/LineChartBuilder";
import PieChartBuilder from "../ui-builders/PieChartBuilder";

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
      return <BreakdownBuilder />;
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
      return <PieChartBuilder />;
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

export const getChartTypeIcon = (chartType: string) => {
  switch (chartType) {
    case "horizontal-bar":
    case "horizontal-bar-gradient":
    case "horizontal-bar-image":
    case "horizontal-bar-multi":
    case "horizontal-bar-thin":
      return <BarChart3 className="h-4 w-4 rotate-90 hover:text-white" />;

    case "vertical-bar":
    case "vertical-bar-multi":
      return <BarChart3 className="h-4 w-4 hover:text-white" />;

    case "line":
    case "line-multi":
    case "line-curved":
      return <LineChart className="h-4 w-4 hover:text-white" />;

    case "breakdown":
    case "breakdown-thin":
      return <ChartBarStacked className="h-4 w-4 hover:text-white" />;

    case "pie":
    case "pie-image":
    case "half-donut":
    case "donut":
    case "fillable":
    case "fillable-donut":
      return <PieChart className="h-4 w-4 hover:text-white" />;

    default:
      return <BarChart3 className="h-4 w-4 hover:text-white" />;
  }
};
