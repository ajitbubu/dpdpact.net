import type { Metadata, Viewport } from "next";
import {
  Fraunces,
  Inter,
  JetBrains_Mono,
  Pinyon_Script,
} from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ServiceWorker } from "@/components/service-worker";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/site";
import "./globals.css";

/**
 * GA4 Measurement ID. Public by design — it ships in the page source of every
 * site that uses it — so it lives here rather than in env config.
 */
const GA_MEASUREMENT_ID = "G-4CRHNPWKYX";

/**
 * Analytics stay off in development so local browsing never lands in the
 * property. Set `NEXT_PUBLIC_GA_ID` to point a deployment at a different
 * property (a staging one, say), or to enable it locally while testing.
 */
const gaId =
  process.env.NEXT_PUBLIC_GA_ID ??
  (process.env.NODE_ENV === "production" ? GA_MEASUREMENT_ID : undefined);

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const pinyonScript = Pinyon_Script({
  variable: "--font-pinyon-script",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    // Pages set their own title; this wraps it. `default` covers the homepage.
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "DPDP Act",
    "DPDP Act 2023",
    "Digital Personal Data Protection Act",
    "DPDP certification",
    "data fiduciary",
    "data principal",
    "India data protection law",
  ],
  alternates: { canonical: "/" },
  // No title/description here on purpose: when `openGraph.title` is unset Next
  // falls back to each page's own `title`, so social cards match the page.
  // Setting it here would pin every page to the site-wide string.
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_IN",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  manifest: "/manifest.webmanifest",
  // iOS ignores most of the manifest, so standalone mode and the home-screen
  // icon have to be declared the old way as well.
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "default",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#F5F5F2",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  // Installed apps still need to be zoomable — capping this would break
  // WCAG 1.4.4 for anyone relying on pinch zoom.
  maximumScale: 5,
};

/** Site-wide identity + search box hint for the SERP. */
const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      publishingPrinciples: `${SITE_URL}/editorial-policy`,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // The design sets `scroll-behavior: smooth` on <html>; this tells Next
      // it is intentional so it does not fight it on route transitions.
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${jetbrainsMono.variable} ${fraunces.variable} ${pinyonScript.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
        {children}
        <ServiceWorker />
      </body>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  );
}
