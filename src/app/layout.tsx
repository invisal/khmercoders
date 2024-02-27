import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import Script from "next/script";

import { cn } from "@/lib/utils";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://khmercoders.vercel.app"),
  title: {
    default: "KhmerCoders",
    template: "%s | Khmercoders",
  },
  description: "A unified blog platform for khmer coders.",
  openGraph: {
    images: ["/khmercoder.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "antialiased")}>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-CMZYJD5WQ8"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-CMZYJD5WQ8');
          `}
        </Script>

        <ThemeProvider enableSystem attribute="class">
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
