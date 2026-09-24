"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import InstallAppButton from "./InstallAppButton";

type Brand = { id: number; brandName: string };
type Category = { id: number; categoryName: string; brands: Brand[] };

export default function MobileMenu({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        setProductsOpen(false);
        setExpandedCategory(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

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
        aria-controls="mobile-navigation"
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition active:scale-95 hover:bg-white/10"
      >
        <svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
        className={`fixed inset-x-0 bottom-0 top-[65px] z-40 border-t border-white/10 bg-navy/[0.98] shadow-2xl backdrop-blur-xl transition duration-300 sm:top-[65px] ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
        aria-hidden={!open}
      >
        <nav
          id="mobile-navigation"
          className="mobile-safe-bottom mx-auto h-full w-full max-w-2xl overflow-y-auto px-4 py-5 sm:px-6"
          aria-label="Mobile navigation"
        >
          <div className="mb-4 rounded-2xl border border-white/10 bg-white/[0.04] p-2">
            <Link
              href="/"
              onClick={closeAll}
              className="flex min-h-12 items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <span>Home</span>
              <span aria-hidden="true" className="text-blue-200">→</span>
            </Link>

            <button
              type="button"
              onClick={() => setProductsOpen((value) => !value)}
              className="flex min-h-12 w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold text-white transition hover:bg-white/10"
              aria-expanded={productsOpen}
            >
              <span>Products</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 10 10"
                fill="none"
                className={`transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              >
                <path d="M1 3L5 7L9 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div
              className={`grid transition-[grid-template-rows] duration-300 ${
                productsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="mx-2 mb-2 rounded-xl bg-[#07172c] p-2">
                  <Link
                    href="/products?all=1"
                    onClick={closeAll}
                    className="flex min-h-11 items-center justify-between rounded-lg px-3 py-2.5 text-sm font-bold text-blue-200 transition hover:bg-white/10"
                  >
                    <span>All Products</span>
                    <span aria-hidden="true">→</span>
                  </Link>

                  {categories.map((category) => {
                    const expanded = expandedCategory === category.id;

                    return (
                      <div key={category.id} className="border-t border-white/[0.06] first:border-t-0">
                        <div className="flex items-center gap-1">
                          <Link
                            href={`/products?category=${category.id}`}
                            onClick={closeAll}
                            className="flex min-h-11 flex-1 items-center rounded-lg px-3 py-2.5 text-sm text-gray-200 transition hover:bg-white/10"
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
                              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-gray-300 transition hover:bg-white/10"
                              aria-label={`${expanded ? "Hide" : "Show"} brands for ${category.categoryName}`}
                              aria-expanded={expanded}
                            >
                              <svg
                                width="11"
                                height="11"
                                viewBox="0 0 10 10"
                                fill="none"
                                className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                                aria-hidden="true"
                              >
                                <path d="M1 3L5 7L9 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>
                          )}
                        </div>

                        {category.brands.length > 0 && (
                          <div
                            className={`grid transition-[grid-template-rows] duration-200 ${
                              expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                            }`}
                          >
                            <div className="overflow-hidden">
                              <div className="mb-2 ml-3 border-l border-white/10 pl-2">
                                {category.brands.map((brand) => (
                                  <Link
                                    key={brand.id}
                                    href={`/products?category=${category.id}&brand=${brand.id}`}
                                    onClick={closeAll}
                                    className="flex min-h-10 items-center rounded-lg px-3 py-2 text-xs text-gray-400 transition hover:bg-white/10 hover:text-white"
                                  >
                                    {brand.brandName}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <Link
              href="/about"
              onClick={closeAll}
              className="flex min-h-12 items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <span>About</span>
              <span aria-hidden="true" className="text-blue-200">→</span>
            </Link>
          </div>

          <Link
            href="/contact"
            onClick={closeAll}
            className="flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-950/20 transition active:scale-[0.99] hover:bg-blue-500"
          >
            Contact Us
          </Link>

          <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-2">
            <InstallAppButton variant="row" />
          </div>

          <p className="mt-5 px-1 text-xs leading-5 text-gray-400">
            Browse the catalog by category or send us the model you are looking for.
          </p>
        </nav>
      </div>
    </div>
  );
}
