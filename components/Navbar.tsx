import Link from "next/link";
import ProductsDropdown from "./ProductsDropdown";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import InstallAppButton from "./InstallAppButton";
import { getNavCategories } from "@/lib/server/categories";

export default async function Navbar() {
  const categories = await getNavCategories();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy/95 text-white shadow-[0_8px_30px_rgba(11,31,58,0.12)] backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 w-full max-w-[1800px] items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:px-8 xl:px-10">
        <Link
          href="/"
          aria-label="Maverick Minds home"
          className="min-w-0 max-w-[calc(100%-56px)] shrink transition-opacity hover:opacity-95 md:max-w-none"
        >
          <Logo />
        </Link>

        <div className="flex shrink-0 items-center gap-2 lg:gap-4">
          <nav className="hidden md:block" aria-label="Main navigation">
            <ul className="flex items-center gap-1 text-sm font-semibold">
              <li>
                <Link
                  href="/"
                  className="inline-flex min-h-11 items-center rounded-lg px-3 py-2 text-gray-100 transition hover:bg-white/10 hover:text-blue-200"
                >
                  Home
                </Link>
              </li>

              <ProductsDropdown categories={categories} />

              <li>
                <Link
                  href="/about"
                  className="inline-flex min-h-11 items-center rounded-lg px-3 py-2 text-gray-100 transition hover:bg-white/10 hover:text-blue-200"
                >
                  About
                </Link>
              </li>

              <li className="ml-1">
                <Link
                  href="/contact"
                  className="inline-flex min-h-11 items-center rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-md"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>

          <div className="hidden md:block">
            <InstallAppButton variant="icon" />
          </div>

          <MobileMenu categories={categories} />
        </div>
      </div>
    </header>
  );
}
