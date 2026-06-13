import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import DotCursor from "@/components/DotCursor";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: "Atlas Drama | Power rankings, raid reviews & clan drama from Atlas Rust.",
  description:
    "The home of Atlas Rust drama — weekly clan power rankings, scored raid reviews, clan dossiers, the drama feed and the Hall of Shame.",
  icons: {
    icon: [
      { url: "/seo/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/seo/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/seo/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <link
          rel="preload"
          href="/fonts/Roobert-Light.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Roobert-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <SiteHeader />
        <DotCursor />
        <CookieBanner />
        {children}
      </body>
    </html>
  );
}
