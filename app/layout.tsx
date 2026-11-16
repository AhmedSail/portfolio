import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { EdgeStoreProvider } from "../lib/edgestore";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/lib/language-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ahmedqompoz.dev"),
  title: "Ahmed Qompoz | Full Stack Engineer",
  description:
    "Full Stack Engineer building production platforms with Next.js, TypeScript and PostgreSQL: ERP, cryptographic e-voting, AI tutoring, government-integrated logistics, and real-time ordering. 8 live platforms actively serving real businesses.",
  keywords: [
    "Ahmed Qompoz",
    "أحمد قنبز",
    "Full Stack Engineer",
    "Next.js Developer",
    "TypeScript",
    "PostgreSQL",
    "Drizzle ORM",
    "Real-time WebSockets",
    "HMAC Webhooks",
    "Government Integration",
    "Production Systems",
  ],
  authors: [{ name: "Ahmed Qompoz" }],
  creator: "Ahmed Qompoz",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ahmedqompoz.dev",
    title: "Ahmed Qompoz | Full Stack Engineer",
    description:
      "Full Stack Engineer building production platforms with Next.js, TypeScript and PostgreSQL: ERP, e-voting, AI tutoring, government-integrated logistics, and real-time ordering. 8 live platforms.",
    siteName: "Ahmed Qompoz Portfolio",
    images: [
      {
        url: "/logoWhite2.png",
        width: 1200,
        height: 630,
        alt: "Ahmed Qompoz | Full Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Qompoz | Full Stack Engineer",
    description:
      "Full Stack Engineer building production platforms with Next.js, TypeScript and PostgreSQL. 8 production platforms live and used by real businesses.",
    images: ["/logoWhite2.png"],
    creator: "@AhmedQompoz",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-blue-500/20 selection:text-blue-500`}
      >
        <LanguageProvider>
          <EdgeStoreProvider>
            {children}
            <Toaster />
          </EdgeStoreProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
