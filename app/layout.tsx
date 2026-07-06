import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

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
      <body className="min-h-full flex flex-col bg-black text-[#F6F6F6] antialiased">
        <Nav />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-[#1e1e1e] px-6 md:px-12 py-6 text-[#444] text-xs flex flex-col md:flex-row md:justify-between md:items-center gap-2">
          <span>Liam Callaghan — © 2026</span>
          <div className="flex gap-6">
            <a href="mailto:liamcallag@gmail.com" className="hover:text-[#F6F6F6] transition-colors">liamcallag@gmail.com</a>
            <a href="https://linkedin.com/in/liam-callaghan-02aa64199" target="_blank" rel="noopener noreferrer" className="hover:text-[#F6F6F6] transition-colors">LinkedIn</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
