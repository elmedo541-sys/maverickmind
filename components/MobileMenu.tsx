"use client";

import { useState } from "react";
import Link from "next/link";

type Category = { id: number; categoryName: string };

const links = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function MobileMenu({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  function closeAll() {
    setOpen(false);
    setProductsOpen(false);
  }

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close menu" : "Open menu"}
        className="p-2 -mr-2"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          {open ? (
            <path
              d="M6 6L18 18M6 18L18 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M4 7H20M4 12H20M4 17H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>

      <div
        className={`absolute top-full left-0 right-0 bg-navy border-t border-white/10 overflow-hidden transition-all duration-300 ${
          open ? "max-h-[28rem]" : "max-h-0"
        }`}
      >
        <ul className="px-6 pb-4 pt-2 text-sm font-medium space-y-1">
          <li>
            <Link
              href="/"
              onClick={closeAll}
              className="block px-2 py-2 rounded hover:bg-white/10"
            >
              Home
            </Link>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setProductsOpen((o) => !o)}
              className="w-full flex items-center justify-between px-2 py-2 rounded hover:bg-white/10"
            >
              Products
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                className={`transition-transform ${productsOpen ? "rotate-180" : ""}`}
              >
                <path
                  d="M1 3L5 7L9 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                productsOpen ? "max-h-96" : "max-h-0"
              }`}
            >
              <div className="pl-4 pt-1 space-y-1">
                <Link
                  href="/products"
                  onClick={closeAll}
                  className="block px-2 py-1.5 rounded text-gray-200 hover:bg-white/10"
                >
                  All Products
                </Link>
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    href={`/products?category=${c.id}`}
                    onClick={closeAll}
                    className="block px-2 py-1.5 rounded text-gray-200 hover:bg-white/10"
                  >
                    {c.categoryName}
                  </Link>
                ))}
              </div>
            </div>
          </li>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={closeAll}
                className="block px-2 py-2 rounded hover:bg-white/10"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}