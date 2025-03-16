"use client";

import SectionTitle from "../../../components/SectionTitle";
import { IFAQ } from "../types";
import { siteDetails } from "../data/siteDetails";
import { Accordion, AccordionItem } from "@heroui/react";

export const faqs: IFAQ[] = [
  {
    question: "What types of charts can I create?",
    answer: `${siteDetails.siteName} supports a wide variety of visualizations including bar charts, line graphs, pie charts, scatter plots, heat maps, and more. Our intuitive interface makes it easy to pick the right chart for your data story.`,
  },
  {
    question:
      "Do I need technical expertise to create professional-looking charts?",
    answer:
      "Not at all! EZdataView is designed for everyone. Our interface will have you creating stunning visualizations in minutes, regardless of your technical background.",
  },
  {
    question: "How can I import my data?",
    answer: "EZdataView will supports multiple data import and export options",
  },
  {
    question: "What if I need help using the app?",
    answer:
      "Right now this is a demo, so there is no support. But you can contact me via email.",
  },
];

const FAQ: React.FC = () => {
  return (
    <section
      id="faq"
      className="py-16 lg:py-24 bg-gradient-to-b from-transparent to-gray-50/30"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:sticky lg:top-24 lg:w-1/3">
            <p className="hidden lg:block text-secondary font-medium tracking-wide mb-3">
              FAQ&apos;S
            </p>
            <SectionTitle>
              <h2 className="text-4xl lg:text-5xl font-bold my-4 leading-tight lg:max-w-sm text-center lg:text-left">
                Frequently Asked Questions
              </h2>
            </SectionTitle>
            <p className="lg:mt-8 text-foreground-accent/80 text-lg text-center lg:text-left">
              Have more questions? We&apos;re here to help!
            </p>
            <a
              href="mailto:kbueno1077@gmail.com"
              className="mt-4 block text-2xl lg:text-3xl text-secondary font-semibold transition-all duration-300 hover:text-secondary/80 hover:translate-x-1 text-center lg:text-left"
            >
              Contact us
            </a>
          </div>

          <div className="w-full lg:w-2/3 divide-y divide-gray-200">
            <Accordion>
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index + 1}
                  aria-label={faq.question}
                  title={faq.question}
                >
                  {faq.answer}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
