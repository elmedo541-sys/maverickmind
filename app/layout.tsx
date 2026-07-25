import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "MaverickMind | Security & Communication Solutions",
    template: "%s | MaverickMind",
  },
  description:
    "Fire alarm systems, CCTV, PoE switches, video recorders, and cabling & wiring, plus professional installation services.",
  verification: {
    google: "R70V4WcDk0h2fbA8VTj3Dk6tMtoHz8lnWA0ZurrA3eM",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Navbar />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}