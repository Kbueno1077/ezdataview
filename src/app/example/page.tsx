import Container from "@/components/Container";
import { data } from "@/components/resencharts-ui/utils/fixtures/swapChart";
import Showcase from "@/modules/showcase/Showcase";

const ExamplePage: React.FC = () => {
  return (
    <>
      <Container>
        <div className="py-10 mt-20">
          <Showcase data={data} />
        </div>
      </Container>
    </>
  );
};

export default ExamplePage;
