import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { data } from "../../components/resencharts-ui/utils/fixtures/exampleChartsData";
import Showcase from "../../modules/showcase/Showcase";

const ExamplePage: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <div className="py-10 mt-20">
            <Showcase data={data} />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default ExamplePage;
