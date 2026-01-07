import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EdgeStoreProvider } from "../lib/edgestore";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ahmed Qompoz | Full Stack Web Developer Portfolio",
  description:
    "Senior Full Stack Developer specializing in building modern, high-performance web applications using React, Next.js, and Node.js.",
  keywords:
    "Web Developer, Full Stack, Portfolio, Next.js, React, Backend Developer",
};

import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <EdgeStoreProvider>
          {children}
          <Toaster />
        </EdgeStoreProvider>
      </body>
    </html>
  );
}
