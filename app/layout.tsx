import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ButtonStyles } from "@/components/buttons";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aptitude Cafe & Eatery | Louvre Abu Dhabi",
  description: "Abu Dhabi's first specialty coffee shop, nestled at the Louvre Abu Dhabi Park on Saadiyat Island.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${hanken.variable}`}>
      <body style={{ fontFamily: "var(--font-body)" }}>
        <ButtonStyles />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
