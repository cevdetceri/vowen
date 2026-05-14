import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "VOWEN Studio — Luxury Bridal Accessories",
  description:
    "Luxury accessories for modern brides. Soft colour palettes, sculptural forms and intricate details, handcrafted in the finest materials using artisan techniques.",
  openGraph: {
    title: "VOWEN Studio — Luxury Bridal Accessories",
    description: "Luxury accessories for modern brides.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${inter.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
