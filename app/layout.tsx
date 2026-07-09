import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://liam-callaghan.com"),
  title: "Liam Callaghan — Designer & Builder",
  description:
    "UI/UX designer and frontend developer. Building research-backed digital products from concept to launch. Relocating to Stockholm, September 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full">
        {children}
      </body>
    </html>
  );
}
