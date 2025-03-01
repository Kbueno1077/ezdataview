import Container from "@/components/Container";
import Section from "@/components/Section";
import ChartShowcase from "@/modules/Landing/ChartShowcase/ChartShowcase";
import CTA from "@/modules/Landing/CTA/CTA";
import FAQ from "@/modules/Landing/FAQ/FAQ";
import FeatureGrid from "@/modules/Landing/Features/FeaturesGrid";
import Hero from "@/modules/Landing/Hero";
import Pricing from "@/modules/Landing/Pricing/Pricing";
import Stats from "@/modules/Landing/Stats";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Container>
        <Section
          id="features"
          title="Our Features"
          description="Discover what makes our platform stand out from the competition"
        >
          <FeatureGrid />
        </Section>

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

        <FAQ />

        <Stats />

        <CTA />
      </Container>
    </>
  );
};

export default HomePage;
