import { BarChartHorizontalGradient } from "@/components/resencharts-ui/BarChartHorizontal/BarChartHorizontalGradient";
import { BarChartHorizontalSVG } from "@/components/resencharts-ui/BarChartHorizontal/BarChartHorizontalSVG";
import { BarChartVertical } from "@/components/resencharts-ui/BarChartVertical/BarChartVertical";
import { BreakdownChart } from "@/components/resencharts-ui/BreakdownChart/BreakdownChart";
import { LineChart } from "@/components/resencharts-ui/LineCharts/LineChart";
import { LineChartMultiple } from "@/components/resencharts-ui/LineCharts/LineChartMultiple";
import { DonutChart } from "@/components/resencharts-ui/PieCharts/DonutChart";
import { PieChart } from "@/components/resencharts-ui/PieCharts/PieChart";
import {
  barVertical,
  dataGradient,
  dataSVG,
} from "@/components/resencharts-ui/utils/fixtures/BarCharts";
import { breakdownChartData } from "@/components/resencharts-ui/utils/fixtures/BreakdownCharts";
import {
  lineChartData,
  lineChartMultipleData,
} from "@/components/resencharts-ui/utils/fixtures/LineChart";
import {
  donutChartData,
  pieChartData,
} from "@/components/resencharts-ui/utils/fixtures/PieChart";
import { IChartShowcase } from "@/modules/Landing/types";

export const chartShowcases: IChartShowcase[] = [
  {
    title: "Horizontal Bar Chart with Gradient",
    description:
      "Display categorical data with elegant gradient-filled horizontal bars. Perfect for rankings, comparisons, and showing distribution across categories.",
    features: [
      "Beautiful gradient styling for visual appeal",
      "Rounded corners for modern aesthetics",
      "Interactive tooltips for detailed information",
      "Responsive design that adapts to any screen size",
    ],
    chartType: <BarChartHorizontalGradient data={dataGradient} />,
  },
  {
    title: "Vertical Bar Charts",
    description:
      "Compare values across categories with clear, intuitive vertical bar charts. Ideal for displaying discrete data comparisons and time-based metrics.",
    features: [
      "Clean, minimalist design for clear data presentation",
      "Consistent spacing and proportions for easy comparison",
      "Hover interactions for detailed data inspection",
      "Customizable appearance to match your brand",
    ],
    chartType: <BarChartVertical data={barVertical} />,
  },

  {
    title: "Single Line Chart",
    description:
      "Track changes over time with smooth, responsive line charts. Perfect for visualizing trends, progressions, and continuous data series.",
    features: [
      "Smooth curve interpolation for natural data flow",
      "Clear data points for precise value identification",
      "Interactive elements for exploring specific values",
      "Subtle grid lines for better readability",
    ],
    chartType: <LineChart data={lineChartData} />,
  },

  {
    title: "Multiple Line Chart",
    description:
      "Compare multiple data series over time with clear, distinguishable lines. Ideal for analyzing relationships between different metrics or categories.",
    features: [
      "Distinct colors for easy differentiation between series",
      "Consistent styling for cohesive visualization",
      "Interactive elements to explore specific data points",
      "Legend support for identifying each data series",
    ],
    chartType: <LineChartMultiple data={lineChartMultipleData} />,
  },

  {
    title: "Horizontal Bar Chart with SVG",
    description:
      "Visualize comparisons between categories with space-efficient SVG-based horizontal bars. Excellent for displaying rankings and distributions with precise control.",
    features: [
      "SVG-based rendering for pixel-perfect display",
      "Value labels for immediate data comprehension",
      "Customizable appearance and formatting",
      "Optimized performance for large datasets",
    ],
    chartType: <BarChartHorizontalSVG data={dataSVG} />,
  },

  {
    title: "Pie Charts",
    description:
      "Visualize part-to-whole relationships with elegant circular charts. Perfect for displaying proportional data and percentage distributions.",
    features: [
      "Gradient fills for enhanced visual appeal",
      "Clear segment labels for easy identification",
      "Interactive tooltips for detailed information",
      "Optimized for both small and large datasets",
    ],
    chartType: <PieChart data={pieChartData} />,
  },

  {
    title: "Donut Charts",
    description:
      "Display proportional data with a central space for additional information or metrics. Ideal for dashboards and summary visualizations.",
    features: [
      "Center space for displaying summary data or icons",
      "Gradient-filled segments for visual distinction",
      "Interactive elements for exploring segment details",
      "Customizable appearance and proportions",
    ],
    chartType: <DonutChart data={donutChartData} />,
  },
  {
    title: "Breakdown Charts",
    description:
      "Analyze hierarchical data and relationships with intuitive breakdown visualizations. Perfect for displaying complex data structures in a digestible format.",
    features: [
      "Clear visual hierarchy for complex data relationships",
      "Proportional sizing for immediate value comparison",
      "Consistent color schemes for category identification",
      "Responsive design that works across all devices",
    ],
    chartType: <BreakdownChart data={breakdownChartData} />,
  },
];
