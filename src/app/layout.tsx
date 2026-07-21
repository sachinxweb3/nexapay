import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import { Providers } from "@/components/providers";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vyxel.app"),

  title: {
    default: "Vyxel",
    template: "%s • Vyxel",
  },

  description:
    "Vyxel is a premium multi-chain Web3 wallet dashboard for managing digital assets across Ethereum, Base, Polygon and more.",

  applicationName: "Vyxel",

  keywords: [
    "Vyxel",
    "Web3",
    "Wallet",
    "Crypto",
    "Ethereum",
    "Base",
    "Polygon",
    "Dashboard",
    "Blockchain",
  ],

  authors: [
    {
      name: "Vyxel",
    },
  ],

  creator: "Vyxel",

  openGraph: {
    title: "Vyxel",

    description:
      "Premium multi-chain Web3 wallet dashboard.",

    type: "website",

    siteName: "Vyxel",
  },

  twitter: {
    card: "summary_large_image",

    title: "Vyxel",

    description:
      "Premium multi-chain Web3 wallet dashboard.",
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#050816",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}