import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/navigation/Footer";
import { Header } from "@/components/navigation/Header";
import { organizationJsonLd } from "@/lib/seo/jsonld";
import { site } from "@/lib/seo/site";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "600", "700", "800"],
});

const browserExtensionAttributeCleanup = `
(() => {
  const blockedAttributes = ["fpdprocessid"];
  const cleanNode = (node) => {
    if (!(node instanceof Element)) return;
    for (const attr of blockedAttributes) node.removeAttribute(attr);
    node.querySelectorAll(blockedAttributes.map((attr) => "[" + attr + "]").join(",")).forEach((child) => {
      for (const attr of blockedAttributes) child.removeAttribute(attr);
    });
  };

  cleanNode(document.documentElement);

  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "attributes" && blockedAttributes.includes(mutation.attributeName || "")) {
        cleanNode(mutation.target);
      }
      for (const node of mutation.addedNodes) cleanNode(node);
    }
  }).observe(document.documentElement, {
    attributes: true,
    childList: true,
    subtree: true,
    attributeFilter: blockedAttributes,
  });
})();
`;

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
    <html lang="en" suppressHydrationWarning className={jakarta.variable} data-scroll-behavior="smooth">
      <body suppressHydrationWarning className={`${jakarta.className} min-h-dvh`}>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <div className="pb-8 sm:pb-10">{children}</div>
        <Footer />
        <script
          // Browser extensions can inject attributes before React hydrates, which causes the dev overlay.
          dangerouslySetInnerHTML={{ __html: browserExtensionAttributeCleanup }}
        />
      </body>
    </html>
  );
}
