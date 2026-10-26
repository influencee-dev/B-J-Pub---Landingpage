import type { Metadata, Viewport } from "next";
import { allowIndexing, siteUrl } from "@/lib/config";
import { hero, venuePhotos } from "@/lib/content";
import "./globals.css";

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
  themeColor: "#f6f1e8",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
