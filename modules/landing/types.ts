import type { JSX } from "react";
export interface IMenuItem {
  text: string;
  url: string;
}

export interface IPricing {
  name: string;
  price: number | string;
  features: string[];
}

export interface IFAQ {
  question: string;
  answer: string;
}

export interface ITestimonial {
  name: string;
  role: string;
  message: string;
  avatar: string;
}

export interface IStats {
  title: string;
  icon: JSX.Element;
  description: string;
}

export interface ISocials {
  facebook?: string;
  github?: string;
  instagram?: string;
  linkedin?: string;
  threads?: string;
  twitter?: string;
  youtube?: string;
  x?: string;
  [key: string]: string | undefined;
}

export interface IChartShowcase {
  title: string;
  description: string;
  features: string[];
  chartType: JSX.Element;
}

export interface IFeature {
  title: string;
  description: string;
  icon: JSX.Element | string;
  gradient: string;
}
