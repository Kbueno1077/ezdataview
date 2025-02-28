"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { BiMinus, BiPlus } from "react-icons/bi";

import { faqs } from "@/modules/Landing/data/faq";
import SectionTitle from "@/components/SectionTitle";

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
                          <BiMinus className="w-6 h-6 text-secondary flex-shrink-0 ml-4" />
                        ) : (
                          <BiPlus className="w-6 h-6 text-secondary flex-shrink-0 ml-4" />
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
