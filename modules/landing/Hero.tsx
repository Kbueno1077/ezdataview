import LottieReact from "../../components/LottieReact";
import React from "react";
import ExampleBuildButton from "./CTA/ExampleBuildButton";
import ExampleResultButton from "./CTA/ExampleResultButton";

export const heroDetails = {
  heading: "Beautiful Charts Made Simple",
  subheading:
    "Transform your data into stunning visualizations in minutes with EZdataView's intuitive, accessible charting tools",
  centerImageSrc: "/images/hero-mockup.webp",
};

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center pb-0 pt-12 md:pt-40 px-5"
    >
      <div className="absolute left-0 top-0 bottom-0 -z-10 w-full">
        <div className="absolute inset-0 h-full w-full bg-hero-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
      </div>

      <div className="absolute left-0 right-0 bottom-0 backdrop-blur-[1px] h-32 bg-linear-to-b from-transparent via-[rgba(233,238,255,0.4)] to-[rgba(202,208,230,0.4)]"></div>

      <div className="text-center">
        <h1 className="text-4xl md:text-6xl md:leading-tight font-bold text-foreground max-w-lg md:max-w-2xl mx-auto">
          {heroDetails.heading}
        </h1>
        <p className="mt-4 text-foreground max-w-lg mx-auto">
          {heroDetails.subheading}
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center sm:gap-4 w-fit mx-auto">
          <ExampleResultButton dark />
          <ExampleBuildButton dark />
        </div>

        <LottieReact url="https://lottie.host/f803e348-bab4-4def-87e6-1b6362fc3759/lIMzlZ318Y.lottie" />
      </div>
    </section>
  );
};

export default Hero;
