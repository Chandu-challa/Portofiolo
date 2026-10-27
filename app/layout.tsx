import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chandu Challa | Full Stack Developer — React, Next.js & Python",
  description:
    "Chandu Challa is a Full Stack Developer at GreenTech Industries, building enterprise web applications with React.js, Next.js, TypeScript, Python, FastAPI, and SQL Server.",
  metadataBase: new URL("https://chandu-challa-portofilo.netlify.app"),
  alternates: { canonical: "/" },
  authors: [{ name: "Chandu Challa" }],
  creator: "Chandu Challa",
  openGraph: {
    type: "website",
    url: "/",
    title: "Chandu Challa | Full Stack Developer — React, Next.js & Python",
    description:
      "Full Stack Developer at GreenTech Industries, building enterprise web applications and business workflows.",
    siteName: "Chandu Challa Portfolio",
    images: [
      {
        url: "/images/chandu1.png",
        alt: "Chandu Challa, Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chandu Challa | Full Stack Developer",
    description:
      "Full Stack Developer at GreenTech Industries, building enterprise web applications and business workflows.",
    images: ["/images/chandu1.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
