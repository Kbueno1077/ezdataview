// Export both implementations
export { default as NativeCharts } from "./NativeCharts";
export { default as NativeModal } from "./NativeModal";

// Export the Chart interface so consumers don't need to redefine it
export interface Chart {
  id: string;
  type: string;
  data: unknown;
  name?: string;
}
