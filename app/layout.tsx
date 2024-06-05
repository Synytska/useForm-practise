import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { BaseLayout } from "@/src/components/BaseLayout";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}><BaseLayout>{children}</BaseLayout></body>
    </html>
  );
}
