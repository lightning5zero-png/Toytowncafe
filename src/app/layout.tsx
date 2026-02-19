import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: {
    default: "Toytowncafe — Premium Collectibles & Art Toys",
    template: "%s | Toytowncafe"
  },
  description: "Discover curated premium models, art toys, and high-end collectibles in Thailand. Best prices for Gundam, LEGO, and limited edition figures.",
  keywords: ["Art Toys", "Collectibles", "Gundam Thailand", "LEGO", "Toytowncafe", "Models", "Action Figures"],
  authors: [{ name: "Toytowncafe Team" }],
  creator: "Toytowncafe",
  publisher: "Toytowncafe",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Toytowncafe — Premium Collectibles & Art Toys",
    description: "Discover curated premium models, art toys, and high-end collectibles. Shop the finest pieces for your collection.",
    url: "https://toytowncafe.com",
    siteName: "Toytowncafe",
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Toytowncafe — Premium Collectibles & Art Toys",
    description: "Discover curated premium models, art toys, and high-end collectibles.",
    creator: "@toytowncafe",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={`${outfit.variable} font-sans antialiased min-h-screen bg-white`}>
        <CartProvider>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
