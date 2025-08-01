import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["300", "400", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Authentication",
  description:
    "A simple authentication system using Next.js, Prisma, and Auth.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${poppins.className} antialiased relative`}
        >
          <Navbar />
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                // width: "100%",
                maxWidth: "50vw",
              },
            }}
          />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
