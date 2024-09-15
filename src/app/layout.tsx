import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import SessionWrapper from "@/components/session-wrapper/SessionWrapper";
import { cookies } from "next/headers";
import { CookiesProvider } from "next-client-cookies/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HoverSprite",
  description: "The solution for all farmers",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const sessionToken = (cookieStore.get("sessionToken")?.value ?? "") as string;

  return (
    <SessionWrapper session={sessionToken}>
      <CookiesProvider>
        <TooltipProvider>
          <html lang="en">
            <body className={`${inter.className}`}>
              {children}
              <Toaster />
            </body>
          </html>
        </TooltipProvider>
      </CookiesProvider>
    </SessionWrapper>
  );
}
