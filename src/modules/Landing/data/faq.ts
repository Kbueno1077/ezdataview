import { IFAQ } from "@/types";
import { siteDetails } from "./siteDetails";

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
