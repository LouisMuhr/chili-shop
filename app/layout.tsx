// app/layout.tsx ← KOMPLETT ERSETZEN!

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chili Inferno – Die schärfsten Chilis Deutschlands",
  description: "Frische Chilis, Saucen & Pulver – von mild bis Weltrekord",
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Nachrichten für die aktuelle Sprache laden
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.className} bg-[#fffdf9] min-h-screen`}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}