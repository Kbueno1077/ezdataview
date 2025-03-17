[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnexi-launch%2FEZdataView)

# EZdataView - Interactive Data Visualization Platform

EZdataView is a powerful, user-friendly platform that helps you create, customize, and share interactive charts and data visualizations with ease. Built with **Next.js**, **Tailwind CSS**, and modern charting libraries, it transforms complex data into clear, compelling visual stories.

Try out the demo here: [https://ezdataview.vercel.app](https://ezdataview.vercel.app).

Please check out the documentation below to get started.

---

## Features

- **Next.js** app router with **TypeScript** for type safety
- **Tailwind CSS** v3 for responsive and customizable UI
- Interactive charts powered by modern visualization libraries
- **Clerk Authentication** for secure user management
- Smooth animations with **Framer Motion**
- Built-in **font optimization** with [next/font](https://nextjs.org/docs/app/api-reference/components/font)
- Automatic **image optimization** via [next/image](https://nextjs.org/docs/app/building-your-application/optimizing/images)

- Optimized for performance with near-perfect **Lighthouse score**
- Modular architecture for easy customization and extension
- Responsive design that works on all devices

---

## Visualization Types

- Line Charts
- Bar Charts
- Pie Charts
- Area Charts
- Scatter Plots
- Heatmaps
- Candlestick Charts
- And more!

---

## Getting Started

### Prerequisites

Before starting, make sure you have the following installed:

- **Node.js**: Version 18 or later
- **npm**: Version 8 or later (bundled with Node.js)
- **Code editor**: [VS Code](https://code.visualstudio.com/) is recommended.

### Steps

1. **Install dependencies**: Run `npm install`
2. **Set up environment variables**: Copy `.env.example` to `.env.local` and fill in your Clerk API keys
3. **Run the development server**: `npm run dev`
4. **View your project**: Open [localhost:3000](http://localhost:3000)

---

## Customization

1. **Edit colors**: Update `globals.css` for primary, secondary, background, and accent colors.
2. **Update site details**: Customize `siteDetails.ts` in `/modules/Landing/data` to reflect your brand and site info.
3. **Add new chart types**: Extend the visualization options in the `resencharts-ui` component.
4. **Modify protected routes**: Update middleware.ts to change authentication requirements.
5. **Replace favicon**: Add your icon to `/app/favicon.ico`.
6. **Add images**: Update `public/images` for logos and Open Graph metadata.

---

## Deploying on Vercel

The fastest way to deploy EZdataView is on [Vercel](https://vercel.com/). Simply click the "Deploy with Vercel" button at the top of this README, or check the [Next.js deployment docs](https://vercel.com/docs/deployments/deployment-methods) for other deployment options.

---

## Contributing

EZdataView is an open-source project, and we welcome contributions from the community! If you have ideas for new visualization types, UI improvements, or performance optimizations, please join us in making EZdataView even better.

### How to Contribute

1. **Fork the Repository**: Clone it locally.
2. **Create a New Branch**: For example, `feature/new-chart-type` or `fix/visualization-bug`.
3. **Develop and Test**: Make sure your changes work and don't break existing functionality.
4. **Submit a Pull Request**: Open a pull request with a clear description of your changes, and we'll review it.

### Ideas for Contributions

- New chart types and visualization options
- Data import/export features
- Enhanced customization options for charts
- Performance optimizations
- Documentation improvements

---

## Community and Support

Join our community discussions on GitHub to share ideas, ask questions, or suggest improvements. Let's build something amazing together!

---

## License

This project is open-source and available under the MIT License. Feel free to use, modify, and distribute it for personal or commercial projects.
