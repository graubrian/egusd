import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from './providers';
import '@rainbow-me/rainbowkit/styles.css'
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Toaster } from "@/components/ui/toaster";

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "egUSDC",
  description: "egUSDC EigenLayer AVS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistMono.variable} font-mono antialiased flex flex-col min-h-screen`}
      >
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow flex flex-col">
              {children}
            </main>
            <Toaster/>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
