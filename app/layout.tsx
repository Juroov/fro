import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import "./components/react-bits/react-bits.css";

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
  title: "FRO Solar Power Installation Services | Philippines",
  description:
    "Solar panel installation for homes and businesses in the Philippines. Grid-tied, hybrid, and off-grid systems by engineers with 28 years of industry experience. DTI & TESDA certified. Call 082-272-0011.",
  keywords: [
    "solar panels Philippines",
    "solar installation Philippines",
    "FRO Solar",
    "grid-tied solar Philippines",
    "hybrid solar battery",
    "off-grid solar",
    "TESDA certified electrician",
  ],
  openGraph: {
    title: "FRO Solar Power Installation Services",
    description:
      "28 years of power experience for solar projects in the Philippines. Grid-tied, hybrid, and off-grid solar systems.",
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
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

