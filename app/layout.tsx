import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/home/Footer";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextGen Talent machine",
  description: "NextGen Talent machine",
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
      <body className={`${bricolage.variable} antialiased md:mx-20`}>
         <ClerkProvider appearance={{ variables: { colorPrimary: '#fe5933' }} }>
          <Navbar />
          <div className="mt-10">
           {children}
          </div>
            <Footer />
        </ClerkProvider>
        </body>
    </html>
  );
}
