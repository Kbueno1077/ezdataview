import Link from "next/link";
import React from "react";
import Image from "next/image";
import { footerDetails } from "../modules/landing/data/footer";
import { siteDetails } from "../modules/landing/data/siteDetails";
import { getPlatformIconByName } from "../modules/landing/utils";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden pt-16 pb-10">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-blue-600/10 backdrop-blur-sm -z-10"></div>

      {/* Background mesh pattern for texture */}
      <div className="absolute inset-0 opacity-5 -z-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="footer-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 0 0 L 40 0 40 40 0 40 z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              ></path>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-grid)"></rect>
        </svg>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6">
        {/* Top section with logo and content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-gray-200/20">
          {/* Logo and description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative overflow-hidden rounded-full bg-white/50 p-1">
                <Image
                  src="/ez-charts-logo-nobg.png"
                  alt="logo"
                  width={56}
                  height={56}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent transition-all">
                {siteDetails.siteName}
              </h3>
            </Link>
            <p className="text-gray-600 leading-relaxed">
              {footerDetails.subheading}
            </p>

            {/* CTA Button */}
            <Link
              href="/get-started"
              className="inline-block mt-2 px-5 py-2 rounded-full font-medium transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/20 transform hover:translate-y-px"
            >
              Get Started
            </Link>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerDetails.quickLinks.map((link) => (
                <li key={link.text}>
                  <Link
                    href={link.url}
                    className="text-gray-600 hover:text-gray-900 transition-colors relative group flex items-center"
                  >
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                    <span className="relative">{link.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Connect With Us
            </h4>

            {footerDetails.email && (
              <a
                href={`mailto:${footerDetails.email}`}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="relative">
                  {footerDetails.email}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>
            )}

            {/* Social Media Icons */}
            {footerDetails.socials && (
              <div className="mt-5 flex items-center gap-4 flex-wrap">
                {Object.keys(footerDetails.socials).map((platformName) => {
                  if (platformName && footerDetails.socials[platformName]) {
                    return (
                      <Link
                        href={footerDetails.socials[platformName]}
                        key={platformName}
                        aria-label={platformName}
                        className="p-2 rounded-full bg-white/50 backdrop-blur-sm hover:shadow-md hover:bg-white/80 transition-all duration-300 transform hover:scale-110"
                      >
                        <div className="text-blue-500">
                          {getPlatformIconByName(platformName)}
                        </div>
                      </Link>
                    );
                  }
                })}
              </div>
            )}
          </div>
        </div>

        {/* Bottom copyright section */}
        <div className="mt-8 text-center text-gray-500 pt-4 flex flex-col md:flex-row justify-between items-center">
          <p>
            &copy; {currentYear} {siteDetails.siteName}. All rights reserved.
          </p>

          {/* Optional: Add Terms & Privacy links */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              href="/terms"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
