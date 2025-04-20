import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TanstackProvider from "@/providers/TanstackProvider";
import { CartProvider } from "@/context/ContextProvider";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Tailus Feedus",
  description: "Discover and share delicious recipes with Tailus Feedus",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TanstackProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1 py-6">{children}</main>
            <Footer/>
          </CartProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
