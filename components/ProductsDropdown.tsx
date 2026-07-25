"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

type Brand = { id: number; brandName: string };
type Category = { id: number; categoryName: string; brands: Brand[] };

export default function ProductsDropdown({
  categories,
}: {
  categories: Category[];
}) {
  const [open, setOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const ref = useRef<HTMLLIElement>(null);

  function closeAll() {
    setOpen(false);
    setExpandedCategory(null);
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        closeAll();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <li
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={closeAll}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="hover:text-blue-300 transition flex items-center gap-1"
      >
        Products
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
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
        className={`absolute left-0 top-full pt-2 w-64 z-50 origin-top transition-all duration-200 ${
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="bg-white text-navy rounded-lg shadow-lg py-2">
        <Link
          href="/products"
          onClick={closeAll}
          className="block px-4 py-2 text-sm font-semibold hover:bg-gray-50"
        >
          All Products
        </Link>
        {categories.length > 0 && <div className="border-t my-1" />}
        {categories.map((c) => (
          <div key={c.id} onMouseEnter={() => setExpandedCategory(c.id)}>
            <div className="flex items-center justify-between hover:bg-gray-50">
              <Link
                href={`/products?category=${c.id}`}
                onClick={closeAll}
                className="flex-1 px-4 py-2 text-sm"
              >
                {c.categoryName}
              </Link>
              {c.brands.length > 0 && (
                <span className="px-3 py-2 text-gray-400">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    className={`transition-transform ${
                      expandedCategory === c.id ? "rotate-180" : ""
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
                </span>
              )}
            </div>
            {c.brands.length > 0 && (
              <div
                className={`overflow-hidden transition-all duration-200 bg-gray-50 ${
                  expandedCategory === c.id ? "max-h-60" : "max-h-0"
                }`}
              >
                {c.brands.map((b) => (
                  <Link
                    key={b.id}
                    href={`/products?category=${c.id}&brand=${b.id}`}
                    onClick={closeAll}
                    className="block pl-8 pr-4 py-1.5 text-sm text-gray-600 hover:bg-gray-100"
                  >
                    {b.brandName}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        </div>
      </div>
    </li>
  );
}