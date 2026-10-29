import type { Metadata, Viewport } from "next";
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
  title: "Chandu Challa | Full Stack Developer",
  description:
    "Chandu Challa is a Full Stack Developer building reliable business applications with React.js, Next.js, TypeScript, Python, FastAPI, and SQL Server.",
  metadataBase: new URL("https://chandu-challa-portofilo.netlify.app"),
  alternates: { canonical: "/" },
  authors: [{ name: "Chandu Challa" }],
  creator: "Chandu Challa",
  openGraph: {
    type: "website",
    url: "/",
    title: "Chandu Challa | Full Stack Developer",
    description:
      "Full Stack Developer building reliable web applications with React.js, Next.js, Python, and SQL Server.",
    siteName: "Chandu Challa Portfolio",
    images: [
      {
        url: "/images/portfolio-og.jpg",
        width: 1200,
        height: 630,
        alt: "Chandu Challa, Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chandu Challa | Full Stack Developer",
    description: "Building reliable web applications with React.js, Next.js, Python, and SQL Server.",
    images: ["/images/portfolio-og.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B1220",
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
