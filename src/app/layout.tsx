import type { Metadata } from "next";
import localFont from "next/font/local";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "./globals.css";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import ConvexClerkProvider from "@/components/providers/ConvexClerkProvider";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "react-hot-toast";
import StreamClientProvider from "@/components/providers/StreamClientProvider";
import RoleRedirector from "@/components/RoleRedirector";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CodeVu - Technical Interview Platform",
  description: "Experience seamless technical interviews with real-time coding, video calls, and comprehensive evaluation tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <StreamClientProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SignedIn>
                <RoleRedirector />
                <div className="min-h-screen">
                  <Navbar />
                  <main className="px-4 sm:px-6 lg:px-8">{children}</main>
                </div>
              </SignedIn>
              <SignedOut>
                {children}
              </SignedOut>
            </ThemeProvider>
            <Toaster />
          </StreamClientProvider>
        </body>
      </html>
    </ConvexClerkProvider>
  );
}
