import Link from "next/link";
import InstallAppButton from "./InstallAppButton";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/products?all=1", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const solutions = [
  "CCTV Systems",
  "Fire Alarm Systems",
  "Telephone Systems",
  "Networking Solutions",
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-navy text-white">
      <div className="mx-auto w-full max-w-[1800px] px-4 py-12 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="max-w-md">
            <p className="text-lg font-bold tracking-wide">MAVERICK MINDS, INC.</p>
            <p className="mt-3 text-sm leading-6 text-gray-300">
              Security, safety, communication and networking solutions supported by practical technical guidance.
            </p>
            <p className="mt-4 text-sm font-semibold text-blue-200">
              Minds. Machines. Innovation.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-blue-200">
              Quick Links
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-gray-300">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-blue-200">
              Solutions
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-gray-300">
              {solutions.map((solution) => (
                <li key={solution}>{solution}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-blue-200">
              Stay Connected
            </h2>
            <p className="mt-4 text-sm leading-6 text-gray-300">
              Contact our team for product inquiries, system consultation and technical support.
            </p>
            <div className="mt-5 flex flex-col items-start gap-3">
              <Link
                href="/contact"
                className="inline-flex rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                Contact Us
              </Link>
              <InstallAppButton variant="footer" />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} MAVERICK MINDS, INC. All rights reserved.</p>
          <p>Connecting Technology. Protecting People.</p>
        </div>
      </div>
    </footer>
  );
}
