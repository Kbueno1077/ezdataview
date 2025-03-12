import React from "react";
import type { JSX } from "react";
import BarchartUiBuilder from "./barchartUiBuilder";

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
      return <BarchartUiBuilder />;
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
      return <div className={className}>Line Chart UI Builder</div>;
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
