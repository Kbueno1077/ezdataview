"use client";

import clsx from "clsx";
import { motion } from "motion/react";
import { Check } from "lucide-react";

import SectionTitle from "../../../components/SectionTitle";
import { IChartShowcase } from "../types";

interface Props {
  chart: IChartShowcase;
  imageAtRight?: boolean;
}

const containerVariants = {
  offscreen: {
    opacity: 0,
    y: 100,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 0.9,
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

export const childVariants = {
  offscreen: {
    opacity: 0,
    x: -50,
  },
  onscreen: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 1,
    },
  },
};

const ChartShowcaseSection: React.FC<Props> = ({
  chart,
  imageAtRight,
}: Props) => {
  const { title, description, chartType, features } = chart;

  return (
    <section className="chart-showcase-section">
      <motion.div
        className="flex flex-wrap flex-col items-center justify-center gap-2 lg:flex-row lg:gap-20 lg:flex-nowrap mb-24"
        variants={containerVariants}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}
      >
        <div
          className={clsx("flex flex-wrap items-center w-full ", {
            "justify-start": imageAtRight,
            "lg:order-1 justify-end": !imageAtRight,
          })}
        >
          <div className="w-full text-center lg:text-left">
            <motion.div
              className="flex flex-col w-full"
              variants={childVariants}
            >
              <SectionTitle>
                <h3 className="lg:max-w-2xl">{title}</h3>
              </SectionTitle>

              <p className="mt-1.5 mx-auto lg:ml-0 leading-normal text-foreground-accent">
                {description}
              </p>
            </motion.div>

            <div className="mx-auto lg:ml-0 w-full mt-6">
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-2"
                    variants={childVariants}
                  >
                    <span className="text-primary mt-1">
                      <Check size={18} />
                    </span>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={clsx("mt-5 lg:mt-0", { "lg:order-2": imageAtRight })}>
          <div
            className={clsx("w-full flex", {
              "justify-start": imageAtRight,
              "justify-end": !imageAtRight,
            })}
          >
            <div className="relative w-[calc(100vw-40px)] sm:w-[480px] md:w-[520px] lg:w-[520px] xl:w-[520px] h-[384px] flex items-center px-5 justify-center overflow-hidden rounded-xl shadow-lg">
              <div className="w-full">{chartType}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ChartShowcaseSection;
