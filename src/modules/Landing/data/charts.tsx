import { BarChartHorizontalMulti } from "@/components/resencharts-ui/BarChartHorizontal/BarChartHorizontalMulti";
import { BarChartHorizontalSVG } from "@/components/resencharts-ui/BarChartHorizontal/BarChartHorizontalSVG";
import { BarChartVertical } from "@/components/resencharts-ui/BarChartVertical/BarChartVertical";
import { BarChartVerticalMulti } from "@/components/resencharts-ui/BarChartVertical/BarChartVerticalMulti";
import { BreakdownChart } from "@/components/resencharts-ui/BreakdownChart/BreakdownChart";
import { LineChart } from "@/components/resencharts-ui/LineCharts/LineChart";
import { LineChartMultiple } from "@/components/resencharts-ui/LineCharts/LineChartMultiple";
import { DonutChart } from "@/components/resencharts-ui/PieCharts/DonutChart";
import { PieChart } from "@/components/resencharts-ui/PieCharts/PieChart";
import {
  barVertical,
  dataMulti,
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
import { IChartShowcase } from "@/modules/landing/types";

export const chartShowcases: IChartShowcase[] = [
  {
    title: "Horizontal Bar Chart with SVG",
    description:
      "Create visually striking comparisons with our SVG-based horizontal bar charts. Perfect for displaying rankings, survey results, and comparative metrics with precision.",
    features: [
      "High-fidelity SVG rendering for crisp visuals at any scale",
      "Integrated value labels for immediate data comprehension",
      "Custom color schemes to match your brand identity",
      "Smooth animations for engaging user experience",
    ],
    chartType: <BarChartHorizontalSVG data={dataSVG} />,
  },

  {
    title: "Multi-Series Horizontal Bar Chart",
    description:
      "Compare multiple data series side-by-side with our intuitive horizontal bar charts. Ideal for benchmarking, trend analysis, and multi-category comparisons.",
    features: [
      "Support for multiple data series with clear visual distinction",
      "Interactive tooltips revealing detailed information on hover",
      "Customizable spacing and grouping for optimal data presentation",
      "Accessible design with keyboard navigation support",
    ],
    chartType: <BarChartHorizontalMulti data={dataMulti} />,
  },

  {
    title: "Vertical Bar Chart",
    description:
      "Showcase your data with elegant vertical bar charts that emphasize differences between categories. Perfect for time series, frequency distributions, and categorical comparisons.",
    features: [
      "Responsive design that adapts beautifully to any screen size",
      "Optional animations that bring your data to life",
      "Configurable axis scales for highlighting important differences",
      "Minimal design focusing attention on your data",
    ],
    chartType: <BarChartVertical data={barVertical} />,
  },

  {
    title: "Multi-Series Vertical Bar Chart",
    description:
      "Display complex relationships between multiple data categories with our grouped vertical bar charts. Excellent for comparative analysis across different dimensions.",
    features: [
      "Intuitive grouping of related data points for easy comparison",
      "Consistent color coding for quick series identification",
      "Interactive elements revealing detailed metrics on demand",
      "Flexible configuration options for specialized visualization needs",
    ],
    chartType: <BarChartVerticalMulti data={dataMulti} />,
  },

  {
    title: "Line Chart",
    description:
      "Visualize trends and patterns over time with our elegant line charts. Ideal for showing continuous data, progress tracking, and temporal relationships.",
    features: [
      "Smooth curve rendering with configurable interpolation methods",
      "Interactive data points for exploring specific values",
      "Optional area fills to emphasize volume or magnitude",
      "Support for annotations to highlight key events or thresholds",
    ],
    chartType: <LineChart data={lineChartData} />,
  },

  {
    title: "Multi-Series Line Chart",
    description:
      "Compare multiple trends simultaneously with our multi-series line charts. Perfect for performance comparisons, scenario analysis, and tracking related metrics.",
    features: [
      "Clear visual differentiation between multiple data series",
      "Interactive legend with series toggling functionality",
      "Consistent visual language across all chart elements",
      "Optimized rendering for smooth performance with large datasets",
    ],
    chartType: <LineChartMultiple data={lineChartMultipleData} />,
  },

  {
    title: "Pie Chart",
    description:
      "Illustrate proportions and compositions with our beautiful pie charts. Excellent for market share analysis, budget allocations, and demographic breakdowns.",
    features: [
      "Visually striking gradient fills enhancing segment distinction",
      "Smart labeling that prevents overlap and ensures readability",
      "Interactive segments with detailed information on hover",
      "Optional explosion effect to highlight important segments",
    ],
    chartType: <PieChart data={pieChartData} />,
  },

  {
    title: "Donut Chart",
    description:
      "Showcase part-to-whole relationships while utilizing the center space for key metrics or context. Ideal for dashboards, KPI displays, and summary statistics.",
    features: [
      "Customizable center space for displaying totals or key insights",
      "Smooth transitions when filtering or updating data",
      "Proportional segment sizing for accurate visual representation",
      "Support for nested hierarchies and drill-down exploration",
    ],
    chartType: <DonutChart data={donutChartData} />,
  },
  {
    title: "Breakdown Chart",
    description:
      "Visualize hierarchical data and complex distributions with our intuitive breakdown charts. Perfect for product mix analysis, organizational structures, and nested categories.",
    features: [
      "Hierarchical visualization showing relationships between categories",
      "Interactive elements supporting exploration of complex data structures",
      "Proportional sizing accurately reflecting relative values",
      "Customizable depth levels for controlling visualization complexity",
    ],
    chartType: <BreakdownChart data={breakdownChartData} />,
  },
];
