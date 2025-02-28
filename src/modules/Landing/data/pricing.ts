import { IPricing } from "@/types";

export const tiers: IPricing[] = [
  {
    name: "Free",
    price: 0,
    features: [
      "Basic charts usage",
      "24 hour data retention",
      "Basic chart customization",
    ],
  },
  {
    name: "Pro",
    price: 5.99,
    features: [
      "Unlimited charts",
      "Unlimited data retention",
      "Advanced chart customization",
    ],
  },
  {
    name: "Coming Soon",
    price: "Custom",
    features: ["New Features ... Coming Soon"],
  },
];
