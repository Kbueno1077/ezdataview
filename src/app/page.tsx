import Benefits from "@/modules/Landing/Benefits/Benefits";
import Container from "@/components/Container";
import CTA from "@/modules/Landing/CTA/CTA";
import FAQ from "@/modules/Landing/FAQ";
import Hero from "@/modules/Landing/Hero";
import Logos from "@/modules/Landing/Logos";
import Pricing from "@/modules/Landing/Pricing/Pricing";
import Section from "@/components/Section";
import Stats from "@/modules/Landing/Stats";
import Testimonials from "@/modules/Landing/Testimonials";
import ChartShowcase from "@/modules/Landing/ChartShowcase/ChartShowcase";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Logos />
      <Container>
        <Benefits />

        <Section
          id="charts"
          title="Powerful Chart Types"
          description="Visualize your data with our comprehensive suite of interactive charts."
        >
          <ChartShowcase />
        </Section>

        <Section
          id="pricing"
          title="Pricing"
          description="Simple, transparent pricing. No surprises."
        >
          <Pricing />
        </Section>

        <Section
          id="testimonials"
          title="What Our Clients Say"
          description="Hear from those who have partnered with us."
        >
          <Testimonials />
        </Section>

        <FAQ />

        <Stats />

        <CTA />
      </Container>
    </>
  );
};

export default HomePage;
