import { DonutChartItem, pieChartItem } from "../types";

export const pieChartData: pieChartItem[] = [
  {
    name: "Healthcare",
    value: 548,
    colorFrom: "text-pink-400",
    colorTo: "text-pink-400",
  },
  {
    name: "Utilities",
    value: 412,
    colorFrom: "text-purple-400",
    colorTo: "text-purple-400",
  },
  {
    name: "Materials",
    value: 287,
    colorFrom: "text-indigo-400",
    colorTo: "text-indigo-400",
  },
  {
    name: "Real Estate",
    value: 193,
    colorFrom: "text-sky-400",
    colorTo: "text-sky-400",
  },
  {
    name: "Consumer",
    value: 156,
    colorFrom: "text-lime-400",
    colorTo: "text-lime-400",
  },
  {
    name: "Telecom",
    value: 78,
    colorFrom: "text-amber-400",
    colorTo: "text-amber-400",
  },
];

export const donutChartData: DonutChartItem[] = [
  { name: "NVDA", value: 25 },
  { name: "ETH", value: 18 },
  { name: "SLVR", value: 14 },
  { name: "TSLA", value: 12 },
  { name: "DOT", value: 8 },
  { name: "AMZN", value: 5 },
];
