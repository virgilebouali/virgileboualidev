import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Virgile Bouali - Développeur Web",
  description: "Développeur web à Paris, création de sites modernes, performants et sur-mesure. Spécialiste React, Next.js, Tailwind, WordPress, Shopify.",
  openGraph: {
    title: "Virgile Bouali - Développeur Web",
    description: "Création de sites web modernes, performants et sur-mesure.",
    url: "https://virgilebouali.dev",
    siteName: "Virgile Bouali",
    images: [
      {
        url: "./favicon.png",
        width: 512,
        height: 512,
        alt: "Logo Virgile Bouali",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Virgile Bouali - Développeur Web",
    description: "Création de sites web modernes, performants et sur-mesure",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
  },
  robots: "index, follow",
  authors: [{ name: "Virgile Bouali" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17194101257"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17194101257');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${inter.variable} antialiased bg-[#05040b] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
