import { IMenuItem, ISocials } from "@/modules/landing/types";

export const footerDetails: {
  subheading: string;
  quickLinks: IMenuItem[];
  email: string;
  socials: ISocials;
} = {
  subheading:
    "Empowering businesses with cutting-edge financial technology solutions.",
  quickLinks: [
    {
      text: "Features",
      url: "#features",
    },
    {
      text: "Charts",
      url: "#charts",
    },
    {
      text: "Pricing",
      url: "#pricing",
    },
    {
      text: "Testimonials",
      url: "#testimonials",
    },
  ],
  email: "kbueno1077@gmail.com",
  socials: {
    // github: 'https://github.com',
    // x: 'https://twitter.com/x',
    // twitter: 'https://twitter.com/Twitter',
    // facebook: 'https://facebook.com',
    // youtube: 'https://youtube.com',
    // linkedin: 'https://www.linkedin.com',
    // threads: 'https://www.threads.net',
    // instagram: 'https://www.instagram.com',
  },
};
