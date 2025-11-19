import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Space_Grotesk, Inter } from "next/font/google";
import Script from "next/script";
import { PHProvider } from "@/src/components/PostHogProvider";
import WhatsAppButton from "@/src/components/WhatsAppButton/WhatsAppButton";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.flashfirejobs.com"),
  title: "FLASHFIRE - AI-Powered Job Search Automation | Land Your Dream Job Faster",
  description:
    "We apply to 1000+ jobs on your behalf with tailored resumes for every role. Save 150+ hours, skip the grunt work, and stay in control with real-time updates. Your job hunt—automated.",
  keywords: [
    "job search automation",
    "AI job application",
    "automated job search",
    "resume tailoring",
    "job application service",
    "career automation",
  ],
  authors: [{ name: "Flashfire" }],
  creator: "Flashfire",
  publisher: "Flashfire",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    url: "https://www.flashfirejobs.com/",
    title: "FLASHFIRE - AI-Powered Job Search Automation",
    description:
      "We apply to 1000+ jobs on your behalf with tailored resumes for every role. Save 150+ hours, skip the grunt work, and stay in control with real-time updates.",
    siteName: "FLASHFIRE",
    images: [
      {
        url: "https://www.flashfirejobs.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FLASHFIRE - AI-Powered Job Search Automation",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FLASHFIRE - AI-Powered Job Search Automation",
    description:
      "We apply to 1000+ jobs on your behalf with tailored resumes for every role. Save 150+ hours, skip the grunt work, and stay in control with real-time updates.",
    images: ["https://www.flashfirejobs.com/og-image.jpg"],
    creator: "@flashfire",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.flashfirejobs.com/",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

import ClientLogicWrapper from "@/src/components/ClientLogicWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Font Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Satoshi Font */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@500&display=swap"
          rel="stylesheet"
        />
        {/* Calendly CSS */}
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
        {/* DNS prefetch and preconnect for Calendly */}
        <link rel="dns-prefetch" href="https://calendly.com" />
        <link rel="dns-prefetch" href="https://assets.calendly.com" />
        <link
          rel="preconnect"
          href="https://calendly.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://assets.calendly.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${inter.variable} antialiased`}
      >
        <PHProvider>
          <ClientLogicWrapper>
            {children}
            <WhatsAppButton />
          </ClientLogicWrapper>
        </PHProvider>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4P890VGD8D"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag("js", new Date());
            gtag("config", "G-4P890VGD8D");
          `}
        </Script>
        {/* Freshworks CRM Tracking Code */}
        <Script
          id="freshworks-crm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,o,f,js,fjs){
                w['FreshworksWidget']=o;
                w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments)};
                w[o].l=1*new Date();
                js=d.createElement(s),fjs=d.getElementsByTagName(s)[0];
                js.id=o;
                js.src=f;
                js.async=1;
                js.setAttribute('chat','false');
                fjs.parentNode.insertBefore(js,fjs);
              }(window,document,'script','fw','//in.fw-cdn.com/32537193/1404018.js'));
            `,
          }}
        />
        {/* Calendly Script */}
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
