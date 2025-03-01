import Container from "@/components/Container";
import SwapCharts from "@/modules/swap/SwapCharts";
import { data } from "@/components/resencharts-ui/utils/fixtures/swapChart";
const ExamplePage: React.FC = () => {
  return (
    <>
      <Container>
        <div className="py-10 mt-20">
          <SwapCharts chartsData={data} />
        </div>
      </Container>
    </>
  );
};

export default ExamplePage;
