import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Toytowncafe — Premium Collectibles & Art Toys",
  description: "Discover curated premium models, art toys, and high-end collectibles. Shop the finest pieces for your collection.",
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
