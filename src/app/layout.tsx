import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { restaurant } from "@/data/restaurant";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const title = `${restaurant.name} — Trattoria włoska w ${restaurant.address.city}`;

export const metadata: Metadata = {
  metadataBase: new URL(restaurant.siteUrl),
  title: {
    default: title,
    template: `%s · ${restaurant.name}`,
  },
  description: restaurant.shortDescription,
  applicationName: restaurant.name,
  keywords: [
    "restauracja włoska",
    "trattoria",
    `restauracja ${restaurant.address.city}`,
    "pizza z pieca",
    "świeży makaron",
    "rezerwacja stolika",
    restaurant.name,
  ],
  authors: [{ name: restaurant.name }],
  creator: restaurant.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: restaurant.siteUrl,
    siteName: restaurant.name,
    title,
    description: restaurant.shortDescription,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: restaurant.shortDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  category: "restaurant",
};

export const viewport: Viewport = {
  themeColor: "#fbf7f0",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-dvh bg-cream text-espresso antialiased">
        {children}
      </body>
    </html>
  );
}
