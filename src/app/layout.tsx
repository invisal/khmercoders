import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { cn } from "@/lib/utils";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KhmerCoder Blog",
  description: "A unified blog platform for khmer coders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "antialiased")}>
        <ThemeProvider enableSystem attribute="class">
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
