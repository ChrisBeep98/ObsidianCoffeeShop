import type { Metadata } from "next";
import { Cormorant_Garamond, Urbanist } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const urbanist = Urbanist({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "The Obsidian Ritual // Coffee Shop 2",
  description: "Darkness, Precision, and Alchemy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${urbanist.variable} antialiased bg-[#0A0A0A]`}
      >
        {children}
      </body>
    </html>
  );
}
