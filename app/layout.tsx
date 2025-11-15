import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Silvia's List - Join Our Talent Pool",
  description: "Connect with top opportunities in Switzerland. Upload your CV and join our exclusive talent pool.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
