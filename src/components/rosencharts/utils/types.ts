export type HorizontalBarData = {
  key: string;
  value: number;
};

export type MultiBarData = {
  key: string;
  values: number[];
  image?: string;
};

export type SVGBarData = {
  key: string;
  value: number;
  image: React.ReactNode;
  color?: string;
};
export type ImageBarData = {
  key: string;
  value: number;
  image: string;
  color?: string;
};

export type GradientBarData = {
  key: string;
  value: number;
  color: string;
};

export type VerticalBarData = {
  key: string;
  value: number;
  color?: string;
};

export type VerticalMultiBarData = {
  key: string;
  values: number[];
};

export type BreakdownChartItem = {
  key: string;
  value: number;
  color: string;
};

// TypeScript types
export type LineChartDataPoint = {
  date: string;
  value: number;
};

export type LineChartData = LineChartDataPoint[];

// TypeScript types
export type LineChartCurvedDataPoint = {
  date: string;
  value: number;
};

export type LineChartCurvedData = LineChartCurvedDataPoint[];

// Default data for LineChartMultiple
export type DataPoint = {
  date: string;
  value: number;
};

export type LineDataSeries = {
  data: DataPoint[];
  color?: {
    line: string;
    point: string;
  };
};

export type pieChartItem = {
  name: string;
  value: number;
  colorFrom: string;
  colorTo: string;
  color?: string;
  logo?: string;
};

export type DonutChartItem = { name: string; value: number };

export type Item = { name: string; value: number };
