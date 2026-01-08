import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {Header} from "@/components/layout/header";
import { ThemeProvider } from "./../components/providers";
import {Toaster} from "@/components/ui/sonner";
import {Providers} from "@/components/providers/reduxProvier";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const geistTinos = Geist_Mono({
  variable: "--font-tinos",
})

export const metadata: Metadata = {
  title: "Todolist",
  description: "You can't forget your tasks with me.",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body className={`${geistSans.variable} ${geistMono.variable} ${geistTinos.variable} antialiased`}>
    <Providers>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <main className="min-h-screen">
        <Header />
        {children}
        <Toaster richColors/>
      </main>
    </ThemeProvider>
    </Providers>
    </body>
    </html>
  );
}
