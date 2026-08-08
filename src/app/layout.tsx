import type { Metadata, Viewport } from "next";
import {
  Fraunces,
  Inter,
  JetBrains_Mono,
  Pinyon_Script,
} from "next/font/google";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { InstallPrompt } from "@/components/install-prompt";
import { PageViewTracker } from "@/components/page-view-tracker";
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
 * Cookie consent, self-hosted from `public/` rather than a CDN. A site about
 * data protection should not hand its visitors to a third party in order to
 * ask them about tracking, and it keeps the consent gate working offline.
 *
 * The disclosed cookies must match what the site actually sets. `_ga_*` is
 * named after the measurement ID with the `G-` prefix removed, so
 * `G-4CRHNPWKYX` produces `_ga_4CRHNPWKYX`.
 */
const CONSENT_COOKIE_NAME = "cc_consent";

const CONSENT_CONFIG = {
  cookieName: CONSENT_COOKIE_NAME,
  categories: {
    necessary: {
      enabled: true,
      locked: true,
      cookies: [
        {
          name: CONSENT_COOKIE_NAME,
          provider: "DPDP Academy",
          domain: "dpdpact.net",
          duration: "182 days",
        },
      ],
    },
    analytics: {
      cookies: [
        {
          name: "_ga",
          provider: "Google Analytics",
          domain: ".dpdpact.net",
          duration: "Up to 13 months",
        },
        {
          name: `_ga_${GA_MEASUREMENT_ID.replace(/^G-/, "")}`,
          provider: "Google Analytics (GA4 property)",
          domain: ".dpdpact.net",
          duration: "Up to 13 months",
        },
      ],
    },
    functional: { cookies: [] },
    marketing: { cookies: [] },
  },
  theme: { "--cc-accent": "#b4321a" },
  labels: {
    // The SDK's default text claims personalisation and content-targeting
    // cookies. This site sets neither — functional and marketing are empty —
    // and it links to a Privacy and Cookie Policy that do not exist here yet.
    bannerText:
      "We use strictly necessary cookies to make this site work, and only with your consent Google Analytics to understand how it is used. We do not use advertising or personalisation cookies, and we do not sell or share personal data.",
  },
};

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
        {/*
         * Order is load-bearing and `beforeInteractive` scripts run in the
         * order they are placed. The bootstrap pushes `consent: default` with
         * every storage type denied, so it has to execute before gtag.js — once
         * gtag has loaded without a default, tags may fire ungated.
         */}
        <Script id="cc-bootstrap-config" strategy="beforeInteractive">
          {`window.CC_BOOTSTRAP=${JSON.stringify({ cookieName: CONSENT_COOKIE_NAME })};`}
        </Script>
        <Script src="/cc-bootstrap.js" strategy="beforeInteractive" />

        {/*
         * The SDK auto-initialises only from `data-auto-init`, and that path
         * reads a handful of `data-*` attributes — it has no way to express
         * categories, cookie disclosures, theme or labels. Those have to go
         * through `CookieConsent.init()`, which the bundle exposes on `window`
         * as it executes, hence the explicit call placed after it.
         */}
        <Script src="/cookie-consent.js" strategy="beforeInteractive" />
        <Script id="cc-config" strategy="beforeInteractive">
          {`window.CC_CONFIG=${JSON.stringify(CONSENT_CONFIG)};`}
        </Script>
        <Script src="/cc-init.js" strategy="beforeInteractive" />
        <Script src="/cookie-branding.js" strategy="beforeInteractive" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
        {children}
        <InstallPrompt />
        <ServiceWorker />
        {gaId ? <PageViewTracker /> : null}
      </body>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  );
}
