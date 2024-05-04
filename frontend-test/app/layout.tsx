'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ContextProvider from "./context-provider";
import Header from "@/components/Header/Header";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Turing Technologies Test</title>
        <meta name='description' content='Frontend Test' />
        <link rel='TTLogo' href='/design-files/TTLogo.png' />
        
      </head>
      <ContextProvider>
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </ContextProvider>
    </html>
  );
}
