import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import Footer from "@/components/home/Footer";

import Script from "next/script";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextGen Talent Machine",
  description: "NextGen Talent Machine",
  icons: {
    icon: "/favicon.png",   // for browsers
    // shortcut: "/favicon.png", // optional
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} antialiased`}>
        <AuthProvider>
          <Navbar />
          <main >
            {children}
          </main>
          <Footer />
          {process.env.NEXT_PUBLIC_TIDIO_SRC && (
     <Script src={process.env.NEXT_PUBLIC_TIDIO_SRC} strategy="lazyOnload" />
   )}
        </AuthProvider>
      </body>
    </html>
  );
}
