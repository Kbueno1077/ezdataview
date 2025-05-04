"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { menuItems } from "../modules/landing/data/menuItems";
import { siteDetails } from "../modules/landing/data/siteDetails";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll effect
  useEffect(() => {
    // Check initial scroll position on load
    setScrolled(window.scrollY > 10);
    setLastScrollY(window.scrollY);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrolled = currentScrollY > 10;

      // Show header when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      }

      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled, lastScrollY]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg shadow-lg py-2"
          : "bg-white/30 backdrop-blur-sm py-4 md:py-8"
      } ${visible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="w-full max-w-7xl mx-auto px-4">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative overflow-hidden rounded-full bg-gray-200/20 p-0.5">
              <Image
                src="/ez-charts-logo-nobg.png"
                alt="logo"
                width={48}
                height={48}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span
              className={`text-xl md:text-2xl font-bold ml-3 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent transition-all ${
                scrolled ? "opacity-100" : "opacity-90 hover:opacity-100"
              }`}
            >
              {siteDetails.siteName}
            </span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <li key={item.text}>
                <Link
                  href={item.url}
                  className="font-medium text-gray-700 transition-all duration-300 relative overflow-hidden group px-1"
                >
                  <span className="relative z-10">{item.text}</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/get-started"
                className="ml-4 px-5 py-2 rounded-full font-medium transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/20 transform hover:translate-y-px"
              >
                Get Started
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={`w-6 h-6 transition-colors ${
                scrolled ? "stroke-gray-800" : "stroke-gray-700"
              }`}
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-6 px-4 mt-2 bg-white/90 backdrop-blur-lg rounded-lg shadow-lg">
            <ul className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <li key={item.text}>
                  <Link
                    href={item.url}
                    className="text-gray-800 hover:text-blue-600 font-medium block py-1 transition-colors relative group"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.text}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/get-started"
                  className="block w-full text-center px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all transform hover:translate-y-px"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
