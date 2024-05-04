import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ContextProvider from './context-provider'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Turing Technologies Test",
  description: "Frontend Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
              <ContextProvider>
      <body className={inter.className}>{children}</body>
      </ContextProvider>
    </html>
  );
}
