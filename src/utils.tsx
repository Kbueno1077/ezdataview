import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaThreads,
  FaTwitter,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

import type { JSX } from "react";
import { BarChartHorizontal } from "./resencharts-ui/BarChartHorizontal/BarChartHorizontal";
import { BarChartHorizontalGradient } from "./resencharts-ui/BarChartHorizontal/BarChartHorizontalGradient";
import { BarChartHorizontalMulti } from "./resencharts-ui/BarChartHorizontal/BarChartHorizontalMulti";
import { BarChartHorizontalSVG } from "./resencharts-ui/BarChartHorizontal/BarChartHorizontalSVG";
import { BarChartHorizontalThin } from "./resencharts-ui/BarChartHorizontal/BarChartHorizontalThin";
import { BarChartVertical } from "./resencharts-ui/BarChartVertical/BarChartVertical";
import { BarChartVerticalMulti } from "./resencharts-ui/BarChartVertical/BarChartVerticalMulti";
import { BreackDownChart } from "./resencharts-ui/BreakdownChart/BreakdownChart";
import { BreakdownChartThin } from "./resencharts-ui/BreakdownChart/BreakdownChartThin";
import { LineChart } from "./resencharts-ui/LineCharts/LineChart";
import { LineChartCurved } from "./resencharts-ui/LineCharts/LineChartCurved";
import { LineChartMultiple } from "./resencharts-ui/LineCharts/LineChartMultiple";
import { DonutChart } from "./resencharts-ui/PieCharts/DonutChart";
import { FillableChart } from "./resencharts-ui/PieCharts/FillableChart";
import { FillableDonutChart } from "./resencharts-ui/PieCharts/FillableDonutChart";
import { HalfDonutChart } from "./resencharts-ui/PieCharts/HalfDonutChart";
import { PieChart } from "./resencharts-ui/PieCharts/PieChart";
import { PieChartImage } from "./resencharts-ui/PieCharts/PieChartImage";

export const getPlatformIconByName = (
  platformName: string
): JSX.Element | null => {
  switch (platformName) {
    case "facebook": {
      return <FaFacebook size={24} className="min-w-fit" />;
    }
    case "github": {
      return <FaGithub size={24} className="min-w-fit" />;
    }
    case "instagram": {
      return <FaInstagram size={24} className="min-w-fit" />;
    }
    case "linkedin": {
      return <FaLinkedin size={24} className="min-w-fit" />;
    }
    case "threads": {
      return <FaThreads size={24} className="min-w-fit" />;
    }
    case "twitter": {
      return <FaTwitter size={24} className="min-w-fit" />;
    }
    case "youtube": {
      return <FaYoutube size={24} className="min-w-fit" />;
    }
    case "x": {
      return <FaXTwitter size={24} className="min-w-fit" />;
    }
    default:
      console.log(
        "Platform name not supported, no icon is returned:",
        platformName
      );
      return null;
  }
};

export const getChartTypeByName = (
  chartName: string,
  withTooltip: boolean = true
): JSX.Element | null => {
  switch (chartName) {
    case "horizontal-bar": {
      return <BarChartHorizontal />;
    }
    case "horizontal-bar-gradient": {
      return <BarChartHorizontalGradient withTooltip={withTooltip} />;
    }
    case "horizontal-bar-svg": {
      return <BarChartHorizontalSVG withTooltip={withTooltip} />;
    }
    case "horizontal-bar-multiple": {
      return <BarChartHorizontalMulti withTooltip={withTooltip} />;
    }
    case "horizontal-bar-thin": {
      return <BarChartHorizontalThin withTooltip={withTooltip} />;
    }
    case "vertical-bar": {
      return <BarChartVertical />;
    }
    case "vertical-bar-multi": {
      return <BarChartVerticalMulti />;
    }
    case "breakdown": {
      return <BreackDownChart />;
    }
    case "breakdown-thin": {
      return <BreakdownChartThin />;
    }
    case "line": {
      return <LineChart withTooltip={withTooltip} />;
    }
    case "line-multiple": {
      return <LineChartMultiple withTooltip={withTooltip} />;
    }
    case "line-curved": {
      return <LineChartCurved withTooltip={withTooltip} />;
    }
    case "pie": {
      return <PieChart withTooltip={withTooltip} />;
    }
    case "pie-image": {
      return <PieChartImage withTooltip={withTooltip} />;
    }
    case "half-donut": {
      return <HalfDonutChart />;
    }
    case "donut": {
      return <DonutChart withTooltip={withTooltip} />;
    }
    case "fillable": {
      return <FillableChart />;
    }
    case "fillable-donut": {
      return <FillableDonutChart />;
    }

    default:
      console.log("Chart type not supported, no chart is returned:", chartName);
      return null;
  }
};
