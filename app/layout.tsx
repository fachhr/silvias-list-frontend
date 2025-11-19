import type { Metadata } from "next";
import { Inter } from 'next/font/google'; // Use Google Fonts instead of local files
import "./globals.css";

// Initialize Inter font
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Silvia's List - Top Swiss Tech Talent",
  description: "Discover pre-screened tech talent in Switzerland.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Apply Inter font globally and slate-50 background for a clean base */}
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        {/* We removed <Header /> because the new page has its own nav */}
        {children}
      </body>
    </html>
  );
}