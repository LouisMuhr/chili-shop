// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chili Inferno – Die schärfsten Chilis Deutschlands",
  description: "Frische Chilis, Saucen & Pulver – von mild bis Weltrekord",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={`${inter.className} bg-[#fffdf9] min-h-screen`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}