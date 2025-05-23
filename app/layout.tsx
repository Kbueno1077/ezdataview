import type { Metadata } from "next";
import { Manrope, Source_Sans_3 } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";
import { siteDetails } from "../modules/landing/data/siteDetails";
import { ThemeProvider } from "../providers/theme-provider";
import "./globals.css";
import { BuildStoreProvider } from "@/providers/store-provider";
import { Toaster } from "@/components/ui/sonner";

const manrope = Manrope({ subsets: ["latin"] });
const sourceSans = Source_Sans_3({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: siteDetails.metadata.title,
  description: siteDetails.metadata.description,
  openGraph: {
    title: siteDetails.metadata.title,
    description: siteDetails.metadata.description,
    url: siteDetails.siteUrl,
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 675,
        alt: siteDetails.siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteDetails.metadata.title,
    description: siteDetails.metadata.description,
    images: ["/images/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>{/* Scripts will be loaded asynchronously */}</head>
        <body
          className={`${manrope.className} ${sourceSans.className} antialiased min-h-screen bg-background text-foreground`}
        >
          <ThemeProvider defaultTheme="system">
            <BuildStoreProvider>
              {children}
              <Toaster />
            </BuildStoreProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
