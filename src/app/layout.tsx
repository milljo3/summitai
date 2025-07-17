import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Toaster} from "sonner";
import QueryProvider from "@/app/providers/QueryProvider";
import Link from "next/link";
import SignOutButton from "@/components/auth/SignOutButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SummitAi",
  description: "Organize and summarize your meetings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <div className="flex justify-between items-center absolute top-0 left-0 w-full p-4">
        <Link
            href="/"
            className="text-lg"
        >
          SummitAi
        </Link>
        <SignOutButton />
      </div>
      <QueryProvider>
        {children}
      </QueryProvider>
        <Toaster position="top-center" theme="dark" richColors={true} />
      </body>
    </html>
  );
}
