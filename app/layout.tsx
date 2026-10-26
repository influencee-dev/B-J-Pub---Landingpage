import type { Metadata, Viewport } from "next";
import { allowIndexing, siteUrl } from "@/lib/config";
import { hero, venuePhotos } from "@/lib/content";
import { Barlow_Condensed, Fredoka, Nunito } from "next/font/google";
import "./globals.css";

// Font ospitati dal sito stesso (scaricati al build da next/font): nessuna richiesta a Google dal browser.
const display = Fredoka({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-display", display: "swap" });
const label = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-label", display: "swap" });
const body = Nunito({ subsets: ["latin"], weight: ["400", "600", "700", "800"], variable: "--font-body", display: "swap" });

const title = "Franchising B&J Pub | Apri L’Arrotolata Originale";
// Meta description = sottotitolo approvato della hero (nessun testo aggiunto).
const description = hero.subtitle;

export const metadata: Metadata = {
  title,
  description,
  // canonical, og:url e og:image solo con il dominio definitivo configurato (NEXT_PUBLIC_SITE_URL).
  ...(siteUrl
    ? {
        metadataBase: new URL(siteUrl),
        alternates: { canonical: "/" },
      }
    : {}),
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: "B&J Pub",
    title,
    description,
    ...(siteUrl
      ? {
          url: "/",
          images: [
            {
              url: venuePhotos.banconeFrontale.src,
              width: 1800,
              height: 1350,
              alt: venuePhotos.banconeFrontale.alt,
            },
          ],
        }
      : {}),
  },
  robots: allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#fff7e8",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${display.variable} ${label.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
