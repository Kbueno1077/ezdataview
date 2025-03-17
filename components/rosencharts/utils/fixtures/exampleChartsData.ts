import {
  barVertical,
  barVerticalMulti,
  dataGradient,
  dataHorizontal,
  dataImage,
  dataMulti,
  dataSVG,
  dataThin,
} from "./BarCharts";
import { breakdownChartData } from "./BreakdownCharts";
import {
  lineChartCurvedData,
  lineChartData,
  lineChartMultipleData,
} from "./LineChart";
import {
  donutChartData,
  filledDonutChartData,
  pieChartData,
  pieChartImageData,
} from "./PieChart";

export const data = [
  {
    id: "1",
    name: "Bar Chart",
    type: "horizontal-bar",
    data: dataHorizontal,
  },

  {
    id: "2",
    name: "Bar Chart Horizontal Gradient",
    type: "horizontal-bar-gradient",
    data: dataGradient,
  },

  {
    id: "3",
    name: "Bar Chart Horizontal Multi",
    type: "horizontal-bar-multi",
    data: dataMulti,
  },
  {
    id: "4",
    name: "Bar Chart Horizontal Image (SVG)",
    type: "horizontal-bar-image",
    data: dataSVG,
  },
  {
    id: "4.5",
    name: "Bar Chart Horizontal Image (IMG)",
    type: "horizontal-bar-image",
    data: dataImage,
  },

  {
    id: "5",
    name: "Bar Chart Horizontal Thin",
    type: "horizontal-bar-thin",
    data: dataThin,
  },

  {
    id: "6",
    name: "Bar Chart Vertical",
    type: "vertical-bar",
    data: barVertical,
  },

  {
    id: "7",
    name: "Bar Chart Vertical Multi",
    type: "vertical-bar-multi",
    data: barVerticalMulti,
  },

  {
    id: "8",
    name: "Breakdown",
    type: "breakdown",
    data: breakdownChartData,
  },
  {
    id: "9",
    name: "Breakdown Thin",
    type: "breakdown-thin",
    data: breakdownChartData,
  },

  {
    id: "10",
    name: "Lines Chart",
    type: "line",
    data: lineChartData,
  },

  {
    id: "12",
    name: "Lines Chart Curved",
    type: "line-curved",
    data: lineChartCurvedData,
  },

  {
    id: "11",
    name: "Lines Chart Multiple",
    type: "line-multi",
    data: lineChartMultipleData,
  },

  {
    id: "13",
    name: "Pie Chart",
    type: "pie",
    data: pieChartData,
  },
  {
    id: "14",
    name: "Donut Chart",
    type: "donut",
    data: donutChartData,
  },

  {
    id: "15",
    name: "Pie Chart Image",
    type: "pie-image",
    data: pieChartImageData,
  },

  {
    id: "16",
    name: "Fillable Chart ",
    type: "fillable",
    data: filledDonutChartData,
  },
  {
    id: "17",
    name: "Inner Donut Chart ",
    type: "fillable-donut",
    data: filledDonutChartData,
  },
];
