import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio - Ahmed Qompoz",
  description: "Senior Full Stack Developer",
};

export default function ViewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
