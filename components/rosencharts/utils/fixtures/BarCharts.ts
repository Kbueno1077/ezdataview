// Define types for the different bar chart data structures

import {
  GradientBarData,
  HorizontalBarData,
  ImageBarData,
  MultiBarData,
  SVGBarData,
  VerticalBarData,
  VerticalMultiBarData,
} from "../types";
import { companyLogos } from "../../../../modules/landing/utils";

export const dataHorizontal: HorizontalBarData[] = [
  {
    key: "Technology",
    value: 38.1,
    color: "bg-gradient-to-r from-purple-400 to-purple-400",
  },
  {
    key: "Financial Services",
    value: 27.8,
    color: "bg-gradient-to-r from-purple-400 to-purple-400",
  },
  {
    key: "Renewable Energy",
    value: 23.1,
    color: "bg-gradient-to-r from-purple-400 to-purple-400",
  },
  {
    key: "Consumer Cyclical",
    value: 19.5,
    color: "bg-gradient-to-r from-purple-400 to-purple-400",
  },
  {
    key: "Consumer Staples",
    value: 16.2,
    color: "bg-gradient-to-r from-purple-400 to-purple-400",
  },
  {
    key: "Utilities",
    value: 5.8,
    color: "bg-gradient-to-r from-purple-400 to-purple-400",
  },
].sort((a, b) => b.value - a.value);

export const dataGradient: GradientBarData[] = [
  {
    key: "Technology",
    value: 38.1,
    color: "bg-gradient-to-r from-pink-300 to-pink-400",
  },
  {
    key: "Banking",
    value: 29.6,
    color: "bg-gradient-to-r from-purple-300 to-purple-400",
  },
  {
    key: "Energy",
    value: 23.1,
    color: "bg-gradient-to-r from-indigo-300 to-indigo-400",
  },
  {
    key: "Retail",
    value: 21.3,
    color: "bg-gradient-to-r from-sky-300 to-sky-400",
  },
  {
    key: "Healthcare",
    value: 17.9,
    color: "bg-gradient-to-r from-orange-200 to-orange-300",
  },
  {
    key: "Utilities",
    value: 5.8,
    color: "bg-gradient-to-r from-lime-300 to-lime-400",
  },
].toSorted((a, b) => b.value - a.value);

export const dataMulti: MultiBarData[] = [
  {
    key: "European Union",
    values: [15, 25, 33],
    image: "https://hatscripts.github.io/circle-flags/flags/eu.svg",
  },
  {
    key: "United States",
    values: [13, 24, 31],
    image: "https://hatscripts.github.io/circle-flags/flags/us.svg",
  },
  {
    key: "Japan",
    values: [7, 18, 24],
    image: "https://hatscripts.github.io/circle-flags/flags/jp.svg",
  },
  {
    key: "Philippines",
    values: [4, 11, 19],
    image: "https://hatscripts.github.io/circle-flags/flags/ph.svg",
  },
];

export const dataSVG: SVGBarData[] = [
  {
    key: "Apple Inc",
    value: 58.3,
    color: "bg-pink-300 dark:bg-pink-400",
    image: companyLogos[0],
  },
  {
    key: "Microsoft",
    value: 42.7,
    color: "bg-purple-300 dark:bg-purple-400",
    image: companyLogos[1],
  },
  {
    key: "Amazon",
    value: 31.5,
    color: "bg-indigo-300 dark:bg-indigo-400",
    image: companyLogos[2],
  },
  {
    key: "Google",
    value: 22.5,
    color: "bg-sky-300 dark:bg-sky-400",
    image: companyLogos[3],
  },
  {
    key: "Meta",
    value: 18.7,
    color: "bg-orange-300 dark:bg-orange-400",
    image: companyLogos[4],
  },
];

export const dataImage: ImageBarData[] = [
  {
    key: "Portugal",
    value: 55.8,
    image: "https://hatscripts.github.io/circle-flags/flags/pt.svg",
    color: "bg-gray-300 dark:bg-zinc-700",
  },
  {
    key: "France",
    value: 34.3,
    image: "https://hatscripts.github.io/circle-flags/flags/fr.svg",
    color: "bg-gray-300 dark:bg-zinc-700",
  },
  {
    key: "Sweden",
    value: 27.1,
    image: "https://hatscripts.github.io/circle-flags/flags/se.svg",
    color: "bg-gray-300 dark:bg-zinc-700",
  },
  {
    key: "Spain",
    value: 22.5,
    image: "https://hatscripts.github.io/circle-flags/flags/es.svg",
    color: "bg-gray-300 dark:bg-zinc-700",
  },
  {
    key: "Italy",
    value: 18.7,
    image: "https://hatscripts.github.io/circle-flags/flags/it.svg",
    color: "bg-gray-300 dark:bg-zinc-700",
  },
  {
    key: "Germany",
    value: 10.8,
    image: "https://hatscripts.github.io/circle-flags/flags/de.svg",
    color: "bg-gray-300 dark:bg-zinc-700",
  },
];

export const dataThin: HorizontalBarData[] = [
  { key: "France", value: 38.1 },
  { key: "Spain", value: 25.3 },
  { key: "Italy", value: 23.1 },
  { key: "Japan", value: 31.2 },
  { key: "Germany", value: 14.7 },
  { key: "Netherlands", value: 6.1 },
  { key: "Belgium", value: 10.8 },
  { key: "Canada", value: 19.5 },
  { key: "Greece", value: 6.8 },
  { key: "Switzerland", value: 9.3 },
  { key: "Cyprus", value: 4.8 },
  { key: "Brazil", value: 17.3 },
  { key: "Slovenia", value: 3.8 },
  { key: "Australia", value: 16.4 },
  { key: "Latvia", value: 15.8 },
  { key: "South Korea", value: 20.9 },
  { key: "Croatia", value: 5.8 },
].toSorted((a, b) => b.value - a.value);

export const barVertical: VerticalBarData[] = [
  { key: "Software", value: 34.7 },
  { key: "Energy", value: 17.2 },
  { key: "Renewable", value: 39.0 },
  { key: "Consumer", value: 48.0 },
  { key: "Staples", value: 15.2 },
  { key: "Financial", value: 31.7 },
  { key: "Healthcare", value: 21.4 },
  { key: "Property", value: 7.0 },
  { key: "Entertainment", value: 44.6 },
  { key: "Commodities", value: 15.2 },
  { key: "Miscellaneous", value: 29.6 },
  { key: "Seasonal", value: 23.6 },
  { key: "Personal", value: 35.6 },
];

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
