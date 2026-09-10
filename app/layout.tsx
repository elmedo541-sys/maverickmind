import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegisterServiceWorker from "@/components/RegisterServiceWorker";

export const metadata: Metadata = {
  title: {
    default: "MAVERICK MINDS, INC. | Security & Communication Solutions",
    template: "%s | MAVERICK MINDS, INC.",
  },
  description:
    "Fire alarm systems, CCTV, PoE switches, video recorders, and cabling & wiring, plus professional installation services.",
  verification: {
    google: "R70V4WcDk0h2fbA8VTj3Dk6tMtoHz8lnWA0ZurrA3eM",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Maverick Minds",
  },
  formatDetection: {
    telephone: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b1f3a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <RegisterServiceWorker />
        <Navbar />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}