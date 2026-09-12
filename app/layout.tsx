import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "./components/SmoothScrollProvider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FRO Solar Power Installation Services | Digos City, Davao del Sur",
  description:
    "Solar panel installation for homes and businesses in Davao del Sur, Philippines. Grid-tied, hybrid, and off-grid systems by engineers with 28 years of industry experience. DTI & TESDA certified. Call 082-272-0011.",
  keywords: [
    "solar panels Digos City",
    "solar installation Davao del Sur",
    "FRO Solar",
    "grid-tied solar Philippines",
    "hybrid solar battery",
    "off-grid solar",
    "TESDA certified electrician",
  ],
  openGraph: {
    title: "FRO Solar Power Installation Services",
    description:
      "28 years of power experience, now serving Davao del Sur. Grid-tied, hybrid, and off-grid solar systems.",
    siteName: "FRO Solar",
    locale: "en_PH",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-PH"
      className={`${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}

