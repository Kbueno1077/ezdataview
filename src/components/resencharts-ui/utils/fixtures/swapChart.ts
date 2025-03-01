import { GradientBarData, VerticalMultiBarData } from "../types";

export const dataGradient: GradientBarData[] = [
  { key: "Technology", value: 38.1, color: "from-pink-300 to-pink-400" },
  { key: "Banking", value: 29.6, color: "from-purple-300 to-purple-400" },
  { key: "Energy", value: 23.1, color: "from-indigo-300 to-indigo-400" },
  { key: "Retail", value: 21.3, color: "from-sky-300 to-sky-400" },
  { key: "Healthcare", value: 17.9, color: "from-orange-200 to-orange-300" },
  { key: "Utilities", value: 5.8, color: "from-lime-300 to-lime-400" },
].toSorted((a, b) => b.value - a.value);

export const barVerticalMulti: VerticalMultiBarData[] = [
  { key: "Jan 2020", values: [11.1, 9.5] },
  { key: "Feb 2020", values: [18.3, 16.7] },
  { key: "Mar 2020", values: [25.1, 19.5] },
  { key: "Q2 2020", values: [38.9, 27.3] },
  { key: "May 2020", values: [31.7, 28.1] },
  { key: "Jun 2020", values: [25.8, 20.2] },
  { key: "Jul 2020", values: [15.8, 10.2] },
  { key: "Aug 2020", values: [24.8, 17.2] },
  { key: "Sep 2020", values: [32.5, 23.9] },
  { key: "Oct 2020", values: [36.7, 27.1] },
  { key: "Nov 2020", values: [34.7, 28.1] },
  { key: "Dec 2020", values: [42.7, 33.1] },
  { key: "Jan 2021", values: [39.7, 36.1] },
];

export const data = [
  {
    id: "1",
    name: "Pie Chart",
    type: "pie",
    data: [
      {
        name: "Healthcare",
        value: 412,
        colorFrom: "text-purple-400",
        colorTo: "text-purple-400",
      },
      {
        name: "Utilities",
        value: 287,
        colorFrom: "text-indigo-400",
        colorTo: "text-indigo-400",
      },
      {
        name: "Materials",
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
    ],
  },
  {
    id: "2",
    name: "Donut Chart",
    type: "donut",
    data: [
      { name: "NVDA", value: 25 },
      { name: "ETH", value: 18 },
      { name: "SLVR", value: 14 },
      { name: "TSLA", value: 12 },
      { name: "DOT", value: 8 },
      { name: "AMZN", value: 5 },
    ],
  },

  {
    id: "3",
    name: "Bar Chart",
    type: "horizontal-bar-gradient",
    data: dataGradient,
  },

  {
    id: "4",
    name: "Line Chart",
    type: "vertical-bar-multi",
    data: barVerticalMulti,
  },
];
