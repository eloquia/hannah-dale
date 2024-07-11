import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Transition from "@/components/transition";
import ToastProvider from "@/components/toast/toast-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hannah and Dale",
  description: "Created by Dale, with love, for Hannah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Transition> */}
        <ToastProvider>
          {children}
        </ToastProvider>
        {/* </Transition> */}
      </body>
    </html>
  );
}
