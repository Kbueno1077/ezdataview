"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Minus, Plus } from "lucide-react";

import SectionTitle from "@/components/SectionTitle";
import { IFAQ } from "@/modules/landing/types";
import { siteDetails } from "../data/siteDetails";

export const faqs: IFAQ[] = [
  {
    question: `Is ${siteDetails.siteName} secure?`,
    answer:
      "Absolutely. Your data privacy is our priority. We use enterprise-grade encryption to protect your information and never store sensitive data. You maintain complete control over your charts and datasets.",
  },
  {
    question: `Can I use ${siteDetails.siteName} on multiple devices?`,
    answer:
      "Yes! Your EZdataView account syncs seamlessly across all devices - smartphone, tablet, and computer. Create a chart on your laptop and present it from your phone with no hassle.",
  },
  {
    question: "What types of charts can I create?",
    answer: `${siteDetails.siteName} supports a wide variety of visualizations including bar charts, line graphs, pie charts, scatter plots, heat maps, and more. Our intuitive interface makes it easy to pick the right chart for your data story.`,
  },
  {
    question:
      "Do I need technical expertise to create professional-looking charts?",
    answer:
      "Not at all! EZdataView is designed for everyone. Our drag-and-drop interface and smart templates will have you creating stunning visualizations in minutes, regardless of your technical background.",
  },
  {
    question: "How can I import my data?",
    answer:
      "EZdataView supports multiple data import options including CSV, Excel files, Google Sheets integration, and direct API connections to popular data sources. Just import your data and start visualizing instantly.",
  },
  {
    question: "What if I need help using the app?",
    answer:
      "Our support team is ready to help via chat or email. We also provide comprehensive tutorials, templates, and a knowledge base to help you create the perfect charts for your needs.",
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
            {faqs.map((faq, index) => (
              <div key={index} className="py-4">
                <Disclosure>
                  {({ open }) => (
                    <div className="transition-all duration-200 hover:bg-white/50 rounded-lg">
                      <DisclosureButton className="cursor-pointer flex items-center justify-between w-full px-6 py-4 text-lg text-left group">
                        <span className="text-xl font-semibold text-gray-900 group-hover:text-secondary transition-colors">
                          {faq.question}
                        </span>
                        {open ? (
                          <Minus className="w-6 h-6 text-secondary flex-shrink-0 ml-4" />
                        ) : (
                          <Plus className="w-6 h-6 text-secondary flex-shrink-0 ml-4" />
                        )}
                      </DisclosureButton>
                      <DisclosurePanel className="px-6 pb-6 pt-2 text-foreground-accent/90 text-lg leading-relaxed">
                        {faq.answer}
                      </DisclosurePanel>
                    </div>
                  )}
                </Disclosure>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
