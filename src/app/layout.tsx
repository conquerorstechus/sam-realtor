import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/navigation/Footer";
import { Header } from "@/components/navigation/Header";
import { MobileStickyCta } from "@/components/navigation/MobileStickyCta";
import { organizationJsonLd } from "@/lib/seo/jsonld";
import { site } from "@/lib/seo/site";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Tampa Bay Real Estate`,
    template: `%s | ${site.name}`,
  },
  description:
    "High-energy Tampa Bay real estate: sharper strategy, faster follow-up, and marketing that makes listings impossible to ignore.",
  openGraph: {
    title: `${site.name} | Tampa Bay Real Estate`,
    description:
      "Buy, sell, and invest with a team built for competitive markets - strategy, speed, and obsessive execution.",
    url: site.url,
    siteName: site.name,
    locale: site.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Tampa Bay Real Estate`,
    description:
      "Buy, sell, and invest with a team built for competitive markets - strategy, speed, and obsessive execution.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = organizationJsonLd();

  return (
    <html lang="en" className={jakarta.variable}>
      <body className={`${jakarta.className} min-h-dvh`}>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="pb-24 sm:pb-0">{children}</main>
        <Footer />
        <MobileStickyCta />
      </body>
    </html>
  );
}
