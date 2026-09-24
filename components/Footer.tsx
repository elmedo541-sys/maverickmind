import Link from "next/link";
import InstallAppButton from "./InstallAppButton";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/products?all=1", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const productGroups = [
  "CCTV Systems",
  "Fire Alarm Systems",
  "Telephone Systems",
  "Networking Products",
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-navy text-white sm:mt-20">
      <div className="mx-auto w-full max-w-[1800px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 xl:px-10">
        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="max-w-md sm:col-span-2 lg:col-span-1">
            <p className="text-lg font-bold tracking-wide">MAVERICK MINDS, INC.</p>
            <p className="mt-3 text-sm leading-6 text-gray-300">
              Security, communication and networking products for homes, offices and project requirements.
            </p>
            <p className="mt-4 text-sm font-semibold text-blue-200">
              Minds. Machines. Innovation.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-blue-200">Quick Links</h2>
            <ul className="mt-3 space-y-1 text-sm text-gray-300">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-10 items-center py-1 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-blue-200">Product Categories</h2>
            <ul className="mt-4 space-y-2.5 text-sm leading-6 text-gray-300">
              {productGroups.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-blue-200">Need something specific?</h2>
            <p className="mt-4 text-sm leading-6 text-gray-300">
              Send the model, quantity or basic requirement and we&apos;ll help you check the available options.
            </p>
            <div className="mt-5 flex flex-col items-start gap-3">
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                Send an Inquiry
              </Link>
              <InstallAppButton variant="footer" />
            </div>
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs leading-5 text-gray-400 sm:mt-10 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} MAVERICK MINDS, INC. All rights reserved.</p>
          <p>Connecting Technology. Protecting People.</p>
        </div>
      </div>
    </footer>
  );
}
