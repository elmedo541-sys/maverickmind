import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductsDropdown from "./ProductsDropdown";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default async function Navbar() {
  const categories = await prisma.category.findMany({
    orderBy: { categoryName: "asc" },
  });

  return (
    <header className="bg-navy text-white relative z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>

          <nav className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm font-medium">
              <li>
                <Link href="/" className="hover:text-blue-300 transition">
                  Home
                </Link>
              </li>
              <ProductsDropdown categories={categories} />
              {links.slice(1).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-blue-300 transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <MobileMenu categories={categories} />
        </div>
      </div>
    </header>
  );
}