import { IFeature } from "../types";
import { Server, Sliders, Copy, Smartphone, Moon, Edit } from "lucide-react";

export const features: IFeature[] = [
  {
    title: "Server-side renderable",
    description:
      "Reduce bundle size and render times with RSC compatible charts out-of-the-box. Add 'use client' only when you need interactivity.",
    icon: <Server className="w-8 h-8" />,
    gradient: "bg-gradient-to-br from-green-400 to-green-600",
  },
  {
    title: "Fully customizable",
    description:
      "Take control of your charts with direct access to divs and svgs. From colors to layouts, build visualizations tailored to your exact needs.",
    icon: <Sliders className="w-8 h-8" />,
    gradient: "bg-gradient-to-br from-purple-400 to-purple-600",
  },
  {
    title: "Copy-pasteable",
    description:
      "Instantly integrate stunning charts into your projects with zero setup. Just copy, paste, and customize — it's that simple.",
    icon: <Copy className="w-8 h-8" />,
    gradient: "bg-gradient-to-br from-orange-400 to-orange-600",
  },
  {
    title: "Portable",
    description:
      "Effortlessly compatible with Tailwind, RSCs, Shadcn, NextJS, Remix — from the start. Adapts easily to any JS codebase, as it's built on html and d3.",
    icon: <Smartphone className="w-8 h-8" />,
    gradient: "bg-gradient-to-br from-blue-400 to-blue-600",
  },
  {
    title: "Dark Mode",
    description:
      "Automatic dark mode support for stunning visuals in any theme. Seamlessly adapts to your application's color scheme.",
    icon: <Moon className="w-8 h-8" />,
    gradient: "bg-gradient-to-br from-gray-600 to-gray-800",
  },
  {
    title: "Interactive",
    description:
      "Create engaging user experiences with interactive charts that respond to user input and provide rich data exploration capabilities.",
    icon: <Edit className="w-8 h-8" />,
    gradient: "bg-gradient-to-br from-pink-400 to-pink-600",
  },
];
