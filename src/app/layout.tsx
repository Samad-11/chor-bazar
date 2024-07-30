import type { Metadata } from "next";
import { Poppins, Caveat } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({ weight: ['400', '700'], subsets: ["latin"] });
const caveat = Caveat({ subsets: ["cyrillic"], variable: "--font-caveat" })

export const metadata: Metadata = {
  title: "Chor Bazar",
  description: "Place where you can find every item at low price",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="pastel">
      <body className={`${poppins.className} ${caveat.variable}`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
