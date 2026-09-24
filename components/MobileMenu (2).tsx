"use client";

import { useState } from "react";
import Link from "next/link";
import InstallAppButton from "./InstallAppButton";

type Brand = { id: number; brandName: string };
type Category = { id: number; categoryName: string; brands: Brand[] };

export default function MobileMenu({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  function closeAll() {
    setOpen(false);
    setProductsOpen(false);
    setExpandedCategory(null);
  }

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="rounded-lg p-2.5 transition hover:bg-white/10"
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
        className={`absolute left-0 right-0 top-full overflow-hidden border-t border-white/10 bg-navy shadow-2xl transition-all duration-300 ${
          open ? "max-h-[calc(100vh-68px)] overflow-y-auto" : "max-h-0"
        }`}
      >
        <nav className="mx-auto w-full max-w-[1800px] px-4 py-4 sm:px-6" aria-label="Mobile navigation">
          <ul className="space-y-1 text-sm font-semibold">
            <li>
              <Link
                href="/"
                onClick={closeAll}
                className="block rounded-xl px-4 py-3 hover:bg-white/10"
              >
                Home
              </Link>
            </li>

            <li>
              <button
                type="button"
                onClick={() => setProductsOpen((value) => !value)}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 hover:bg-white/10"
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
                  productsOpen ? "max-h-[32rem]" : "max-h-0"
                }`}
              >
                <div className="ml-3 space-y-1 border-l border-white/10 py-1 pl-3">
                  <Link
                    href="/products?all=1"
                    onClick={closeAll}
                    className="block rounded-lg px-3 py-2 text-blue-200 hover:bg-white/10"
                  >
                    All Products
                  </Link>

                  {categories.map((category) => (
                    <div key={category.id}>
                      <div className="flex items-center">
                        <Link
                          href={`/products?category=${category.id}`}
                          onClick={closeAll}
                          className="flex-1 rounded-lg px-3 py-2 text-gray-200 hover:bg-white/10"
                        >
                          {category.categoryName}
                        </Link>

                        {category.brands.length > 0 && (
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedCategory((current) =>
                                current === category.id ? null : category.id
                              )
                            }
                            className="rounded-lg px-3 py-2 text-gray-400 hover:bg-white/10"
                            aria-label={`Show brands for ${category.categoryName}`}
                          >
                            <svg
                              width="9"
                              height="9"
                              viewBox="0 0 10 10"
                              fill="none"
                              className={`transition-transform ${
                                expandedCategory === category.id ? "rotate-180" : ""
                              }`}
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
                        )}
                      </div>

                      {category.brands.length > 0 && (
                        <div
                          className={`overflow-hidden transition-all duration-200 ${
                            expandedCategory === category.id ? "max-h-44" : "max-h-0"
                          }`}
                        >
                          {category.brands.map((brand) => (
                            <Link
                              key={brand.id}
                              href={`/products?category=${category.id}&brand=${brand.id}`}
                              onClick={closeAll}
                              className="block rounded-lg py-1.5 pl-7 pr-3 text-xs text-gray-400 hover:bg-white/10"
                            >
                              {brand.brandName}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </li>

            <li>
              <Link
                href="/services"
                onClick={closeAll}
                className="block rounded-xl px-4 py-3 hover:bg-white/10"
              >
                Services
              </Link>
            </li>

            <li>
              <Link
                href="/about"
                onClick={closeAll}
                className="block rounded-xl px-4 py-3 hover:bg-white/10"
              >
                About
              </Link>
            </li>

            <li className="pt-2">
              <Link
                href="/contact"
                onClick={closeAll}
                className="block rounded-xl bg-blue-600 px-4 py-3 text-center text-white hover:bg-blue-500"
              >
                Contact Us
              </Link>
            </li>

            <li className="pt-3">
              <InstallAppButton variant="row" />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
