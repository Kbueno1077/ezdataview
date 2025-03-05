import Container from "@/components/Container";
import Section from "@/components/Section";
import ChartShowcase from "@/modules/landing/ChartShowcase/ChartShowcase";
import CTA from "@/modules/landing/CTA/CTA";
import FAQ from "@/modules/landing/FAQ/FAQ";
import FeatureGrid from "@/modules/landing/Features/FeaturesGrid";
import Hero from "@/modules/landing/Hero";
import Pricing from "@/modules/landing/Pricing/Pricing";
import Stats from "@/modules/landing/Stats";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Container className="mt-5 sm:mt-0">
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
