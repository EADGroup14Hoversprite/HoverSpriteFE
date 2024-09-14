import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HoverSprite",
  description: "The solution for all farmers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TooltipProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </TooltipProvider>
  );
}
