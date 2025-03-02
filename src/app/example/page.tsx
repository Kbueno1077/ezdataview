import Container from "@/components/Container";
import { data } from "@/components/resencharts-ui/utils/fixtures/swapChart";
import { NativeCharts } from "@/components/NativeModal";

const ExamplePage: React.FC = () => {
  return (
    <>
      <Container>
        <div className="py-10 mt-20">
          <div className="w-full flex flex-col gap-4 mt-5">
            {data.map((chart) => (
              <div key={chart.id}>
                <NativeCharts title={chart.name} chart={chart} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
};

export default ExamplePage;
