import { Geist, Geist_Mono, Jost } from "next/font/google";
import Script from "next/script";
import "../styles/globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/Footer";
import GlobalEnquiryPopup from "@/components/GlobalEnquiryPopup";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import ScrollAnimator from "@/components/ScrollAnimator";
import DomErrorGuard from "@/components/NavigationErrorBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export const metadata = {
  verification: {
    google: "-uzJ_6qeakGANZNZjU1sWENiMJaNwWiis8PqEsMxcpw",
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  title: {
    default: "NIDADS — Best Data Science & Data Analytics Course in Delhi",
    template: "%s | NIDADS",
  },
  description: "NIDADS is Delhi's leading Data Science and Data Analytics institute offering courses in Python, AI, Machine Learning and Business Analytics with placement support.",
  other: {
    publisher: "Team Nidads",
  },
  keywords: [
    "data science course in Delhi",
    "data analytics course in Delhi",
    "data science institute in Delhi",
    "data analytics institute in Delhi",
    "best data science course near me",
    "best data analytics course near me",
    "data science and data analytics course",
    "online data science course",
    "data science course with placement",
    "data analytics course with placement",
    "python for data science",
    "artificial intelligence and data science",
    "NIDADS",
  ],
  openGraph: {
    title: "NIDADS — Best Data Science & Data Analytics Course in Delhi",
    description: "NIDADS is Delhi's leading Data Science and Data Analytics institute offering courses in Python, AI, Machine Learning, Big Data, and Business Analytics with placement support.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NIDADS — Best Data Science & Data Analytics Course in Delhi",
    description: "NIDADS is Delhi's leading Data Science and Data Analytics institute offering courses in Python, AI, Machine Learning, Big Data, and Business Analytics with placement support.",
  },
};

/**
 * Viewport meta — critical for responsive layouts.
 * Without this, mobile browsers use a default ~980px layout viewport,
 * which means all CSS media queries (max-width: 768px etc.) never fire.
 */
export const viewport = {
  width: "device-width",
  initialScale: 1,
};


export default function RootLayout({ children }) {
  return (
    /*
     * suppressHydrationWarning on <html> and <body> prevents React from
     * throwing "insertBefore" / hydration-mismatch errors when browser
     * extensions (SEO checkers, Grammarly, etc.) inject extra DOM nodes.
     * It only suppresses for those two elements, not their children.
     */
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="robots" content="index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        {/*
          ─── EXTENSION DOM GUARD ───────────────────────────────────────────────
          Runs SYNCHRONOUSLY before React hydrates (inline script, no defer/async).
          SEO browser extensions (e.g. "Detailed SEO Extension") inject DOM nodes
          into React's managed tree. When the user then navigates back/forward,
          React's reconciliation calls insertBefore on a node that the extension
          has moved — crashing with "not a child of this node".

          Fix: intercept ALL popstate (back/forward button) events in capture phase
          FIRST, stop Next.js's router from seeing the event, and force a full
          page reload instead. Clean DOM → no reconciliation → no crash.

          Impact: back/forward buttons do a full page reload (~200ms slower).
          Clicking links still uses Next.js SPA navigation (unaffected).
          ──────────────────────────────────────────────────────────────────────
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
  window.addEventListener('popstate', function(e){
    e.stopImmediatePropagation();
    window.location.reload();
  }, { capture: true });
})();`,
          }}
        />
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KRTKKVST');`,
          }}
        />
        {/* End Google Tag Manager */}
        {/* performance hints to reduce render-blocking */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />

        <link rel="preconnect" href="https://nidads.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jost.variable} app-shell`}
        suppressHydrationWarning
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KRTKKVST"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Navbar />
        <ScrollAnimator />
        {/* DomErrorGuard: production fallback — catches any remaining
            DOM errors via window.addEventListener (capture phase) */}
        <DomErrorGuard />
        {children}
        <Footer />
        <FloatingContactButtons phoneE164={"+919205436796"} />
        <GlobalEnquiryPopup />
      </body>
    </html>
  );
}
