import { LineDataSeries } from "../types";

// Default data for LineChart
export const lineChartData = [
  {
    data: [
      { date: "2023-04-30", value: 4 },
      { date: "2023-05-01", value: 6 },
      { date: "2023-05-02", value: 5 },
      { date: "2023-05-03", value: 7 },
      { date: "2023-05-04", value: 10 },
      { date: "2023-05-05", value: 10 },
      { date: "2023-05-06", value: 11 },
      { date: "2023-05-07", value: 8 },
      { date: "2023-05-08", value: 8 },
      { date: "2023-05-09", value: 12 },
    ],
  },
];

export const lineChartCurvedData = [
  { date: "2023-04-30", value: 6 },
  { date: "2023-05-01", value: 3 },
  { date: "2023-05-02", value: 9 },
  { date: "2023-05-03", value: 5 },
  { date: "2023-05-04", value: 11 },
  { date: "2023-05-05", value: 8 },
  { date: "2023-05-06", value: 14 },
  { date: "2023-05-07", value: 7 },
  { date: "2023-05-08", value: 10 },
  { date: "2023-05-09", value: 12 },
];

export const lineChartMultipleData: LineDataSeries[] = [
  {
    data: [
      { date: "2024-04-30", value: 4 },
      { date: "2024-05-01", value: 5 },
      { date: "2024-05-02", value: 7 },
      { date: "2024-05-03", value: 6 },
      { date: "2024-05-04", value: 9 },
      { date: "2024-05-05", value: 11 },
      { date: "2024-05-06", value: 10 },
      { date: "2024-05-07", value: 7 },
      { date: "2024-05-08", value: 6 },
      { date: "2024-05-09", value: 9 },
    ],
    color: {
      line: "stroke-violet-400",
      point: "text-violet-300",
    },
  },
  {
    data: [
      { date: "2024-04-30", value: 3 },
      { date: "2024-05-01", value: 3.5 },
      { date: "2024-05-02", value: 4 },
      { date: "2024-05-03", value: 3.5 },
      { date: "2024-05-04", value: 5 },
      { date: "2024-05-05", value: 5 },
      { date: "2024-05-06", value: 6 },
      { date: "2024-05-07", value: 5.5 },
      { date: "2024-05-08", value: 4 },
      { date: "2024-05-09", value: 5 },
    ],
    color: {
      line: "stroke-fuchsia-400",
      point: "text-fuchsia-300",
    },
  },
  {
    data: [
      { date: "2024-04-30", value: 2 },
      { date: "2024-05-01", value: 2.5 },
      { date: "2024-05-02", value: 3 },
      { date: "2024-05-03", value: 4 },
      { date: "2024-05-04", value: 3.5 },
      { date: "2024-05-05", value: 3 },
      { date: "2024-05-06", value: 2.5 },
      { date: "2024-05-07", value: 3 },
      { date: "2024-05-08", value: 2.5 },
      { date: "2024-05-09", value: 3 },
    ],
    color: {
      line: "stroke-pink-400",
      point: "text-pink-300",
    },
  },
];
