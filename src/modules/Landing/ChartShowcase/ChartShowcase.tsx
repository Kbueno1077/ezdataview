import ChartShowcaseSection from "./ChartShowcaseSection";
import { chartShowcases } from "@/modules/landing/data/charts";

const ChartShowcase: React.FC = () => {
  return (
    <div id="charts">
      <h2 className="sr-only">Chart Types</h2>
      {chartShowcases.map((chart, index) => {
        return (
          <ChartShowcaseSection
            key={index}
            chart={chart}
            imageAtRight={index % 2 !== 0}
          />
        );
      })}
    </div>
  );
};

export default ChartShowcase;
