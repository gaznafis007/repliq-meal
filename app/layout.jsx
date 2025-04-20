import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TanstackProvider from "@/providers/TanstackProvider";
import { CartProvider } from "@/context/ContextProvider";
import Footer from "@/components/Footer";
import { UserProvider } from "@/context/UserProvider";
import { ToastContainer } from "react-toastify";

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
          <UserProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1 py-6">{children}</main>
            <Footer/>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
          </CartProvider>
          </UserProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
