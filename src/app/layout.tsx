import type { Metadata } from "next";
import "./globals.css";
import { BASE_PATH } from "@/lib/asset";
import SiteHeader from "@/components/SiteHeader";
import DotCursor from "@/components/DotCursor";
import CookieBanner from "@/components/CookieBanner";
import SponsorBanner from "@/components/SponsorBanner";

export const metadata: Metadata = {
  title: "Atlas Drama | Power rankings, raid reviews & clan drama from Atlas Rust.",
  description:
    "The home of Atlas Rust drama — weekly clan power rankings, scored raid reviews, clan dossiers, the drama feed and the Hall of Shame.",
  icons: {
    icon: [
      { url: `${BASE_PATH}/seo/favicon-32x32.png`, sizes: "32x32", type: "image/png" },
      { url: `${BASE_PATH}/seo/favicon-16x16.png`, sizes: "16x16", type: "image/png" },
    ],
    apple: `${BASE_PATH}/seo/apple-touch-icon.png`,
  },
};

// Self-hosted faces, injected here (not globals.css) so the url()s carry the
// deploy base path on GitHub Pages.
const FONT_FACES = `
@font-face { font-family: "Roobert"; src: url("${BASE_PATH}/fonts/Roobert-Light.woff2") format("woff2"); font-weight: 300; font-style: normal; font-display: swap; }
@font-face { font-family: "Roobert"; src: url("${BASE_PATH}/fonts/Roobert-LightItalic.woff2") format("woff2"); font-weight: 300; font-style: italic; font-display: swap; }
@font-face { font-family: "Roobert"; src: url("${BASE_PATH}/fonts/Roobert-Regular.woff2") format("woff2"); font-weight: 400; font-style: normal; font-display: swap; }
@font-face { font-family: "Roobert"; src: url("${BASE_PATH}/fonts/Roobert-RegularItalic.woff2") format("woff2"); font-weight: 400; font-style: italic; font-display: swap; }
@font-face { font-family: "Roobert"; src: url("${BASE_PATH}/fonts/Roobert-Bold.woff2") format("woff2"); font-weight: 700; font-style: normal; font-display: swap; }
@font-face { font-family: "Raleway"; src: url("${BASE_PATH}/fonts/Raleway-Medium.woff2") format("woff2"); font-weight: 500; font-style: normal; font-display: swap; }
@font-face { font-family: "Raleway"; src: url("${BASE_PATH}/fonts/Raleway-MediumItalic.woff2") format("woff2"); font-weight: 500; font-style: italic; font-display: swap; }
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <style dangerouslySetInnerHTML={{ __html: FONT_FACES }} />
        <link rel="preload" href={`${BASE_PATH}/fonts/Roobert-Light.woff2`} as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href={`${BASE_PATH}/fonts/Roobert-Regular.woff2`} as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        <SiteHeader />
        <DotCursor />
        <CookieBanner />
        <SponsorBanner />
        {children}
      </body>
    </html>
  );
}
