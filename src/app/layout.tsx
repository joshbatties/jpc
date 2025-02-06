import React from 'react';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Urbanist } from "next/font/google";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata = {
  title: "JPC Group",
  description: "Welcome to JPC Group - Your trusted partner in business solutions.",
};

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="en" className={urbanist.className}>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}