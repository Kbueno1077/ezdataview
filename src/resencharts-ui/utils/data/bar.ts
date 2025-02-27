export const barData = [
  { key: "Technology", value: 38.1 },
  { key: "Financials", value: 25.3 },
  { key: "Energy", value: 23.1 },
  { key: "Cyclical", value: 19.5 },
  { key: "Defensive", value: 14.7 },
  { key: "Utilities", value: 5.8 },
].toSorted((a, b) => b.value - a.value);

export const gradientData = [
  { key: "Company A", value: 55.8, color: "bg-pink-300 dark:bg-pink-400" },
  { key: "Company B", value: 34.3, color: "bg-purple-300 dark:bg-purple-400" },
  { key: "Company C", value: 27.1, color: "bg-indigo-300 dark:bg-indigo-400" },
  { key: "Company D", value: 22.5, color: "bg-sky-300 dark:bg-sky-400" },
  { key: "Company E", value: 18.7, color: "bg-orange-300 dark:bg-orange-400" },
  {
    key: "Spanish or vanish",
    value: 10.8,
    color: "bg-lime-400 dark:bg-lime-500",
  },
];

export const multiData = [
  { key: "European Union", values: [15, 25, 33], flag: "eu" },
  { key: "United States", values: [11, 22, 29], flag: "us" },
  { key: "China", values: [5, 16, 21], flag: "cn" },
  { key: "Philippines", values: [4, 11, 19], flag: "ph" },
];

export const svgData = [
  { key: "Company A", value: 55.8, color: "bg-pink-300 dark:bg-pink-400" },
  { key: "Company B", value: 34.3, color: "bg-purple-300 dark:bg-purple-400" },
  { key: "Company C", value: 27.1, color: "bg-indigo-300 dark:bg-indigo-400" },
  { key: "Company D", value: 22.5, color: "bg-sky-300 dark:bg-sky-400" },
  { key: "Company E", value: 18.7, color: "bg-orange-300 dark:bg-orange-400" },
  {
    key: "Spanish or vanish",
    value: 10.8,
    color: "bg-lime-400 dark:bg-lime-500",
  },
];

export const thinData = [
  { key: "France", value: 38.1 },
  { key: "Spain", value: 25.3 },
  { key: "Italy", value: 23.1 },
  { key: "Portugal", value: 19.5 },
  { key: "Germany", value: 14.7 },
  { key: "Netherlands", value: 6.1 },
  { key: "Belgium", value: 10.8 },
  { key: "Austria", value: 7.8 },
  { key: "Greece", value: 6.8 },
  { key: "Luxembourg", value: 5.5 },
  { key: "Cyprus", value: 4.8 },
  { key: "Malta", value: 3.5 },
  { key: "Slovenia", value: 3.8 },
  { key: "Estonia", value: 8.8 },
  { key: "Latvia", value: 15.8 },
  { key: "Lithuania", value: 12.8 },
  { key: "Croatia", value: 5.8 },
].toSorted((a, b) => b.value - a.value);
