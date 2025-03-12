export interface ChartType {
  title: string;
  value: string;
}

export const chartTypes: ChartType[] = [
  { title: "Horizontal Bar", value: "horizontal-bar" },
  { title: "Horizontal Bar Gradient", value: "horizontal-bar-gradient" },
  { title: "Horizontal Bar Image", value: "horizontal-bar-image" },
  { title: "Horizontal Bar Multi", value: "horizontal-bar-multi" },
  { title: "Horizontal Bar Thin", value: "horizontal-bar-thin" },
  { title: "Vertical Bar", value: "vertical-bar" },
  { title: "Vertical Bar Multi", value: "vertical-bar-multi" },
  { title: "Breakdown", value: "breakdown" },
  { title: "Breakdown Thin", value: "breakdown-thin" },
  { title: "Line", value: "line" },
  { title: "Line Multi", value: "line-multi" },
  { title: "Line Curved", value: "line-curved" },
  { title: "Pie", value: "pie" },
  { title: "Pie Image", value: "pie-image" },
  { title: "Half Donut", value: "half-donut" },
  { title: "Donut", value: "donut" },
  { title: "Fillable", value: "fillable" },
  { title: "Fillable Donut", value: "fillable-donut" },
];

/**
 * Converts a hex color to a CSS gradient style object
 * @param hexColor - The hex color to convert (e.g., "#FF5733")
 * @returns A CSS style object with background gradient
 */
export const gradientFromHex = (hexColor: string): { background: string } => {
  // Remove # if present
  const hex = hexColor.startsWith("#") ? hexColor.substring(1) : hexColor;

  // Generate a lighter version for the gradient
  const lighterHex = generateLighterColor(hex);

  // Return a CSS style object with linear gradient
  return {
    background: `linear-gradient(to right, #${lighterHex}, #${hex})`,
  };
};

/**
 * Generates a lighter version of a hex color
 * @param hex - The hex color without # (e.g., "FF5733")
 * @returns A lighter hex color without # (e.g., "FF8C73")
 */
const generateLighterColor = (hex: string): string => {
  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Make it lighter by mixing with white (255,255,255)
  const lighterR = Math.floor(r + (255 - r) * 0.4);
  const lighterG = Math.floor(g + (255 - g) * 0.4);
  const lighterB = Math.floor(b + (255 - b) * 0.4);

  // Convert back to hex
  return (
    lighterR.toString(16).padStart(2, "0") +
    lighterG.toString(16).padStart(2, "0") +
    lighterB.toString(16).padStart(2, "0")
  );
};
