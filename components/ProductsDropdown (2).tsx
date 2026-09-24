"use client";

import { useEffect, useRef, useState } from "react";
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
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-gray-100 transition hover:bg-white/10 hover:text-blue-200"
        aria-expanded={open}
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
        className={`absolute left-0 top-full z-50 w-72 origin-top pt-3 transition-all duration-200 ${
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-95 opacity-0"
        }`}
      >
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 text-navy shadow-2xl">
          <Link
            href="/products?all=1"
            onClick={closeAll}
            className="mb-1 flex items-center justify-between rounded-xl bg-[#f6f7fb] px-4 py-3 text-sm font-bold transition hover:bg-blue-50"
          >
            All Products
            <span aria-hidden="true">→</span>
          </Link>

          <div className="max-h-[28rem] overflow-y-auto">
            {categories.map((category) => (
              <div
                key={category.id}
                onMouseEnter={() => setExpandedCategory(category.id)}
              >
                <div className="flex items-center rounded-xl transition hover:bg-gray-50">
                  <Link
                    href={`/products?category=${category.id}`}
                    onClick={closeAll}
                    className="flex-1 px-4 py-2.5 text-sm font-medium"
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
                      className="px-4 py-2.5 text-gray-400"
                      aria-label={`Show brands for ${category.categoryName}`}
                    >
                      <svg
                        width="10"
                        height="10"
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
                      expandedCategory === category.id ? "max-h-64" : "max-h-0"
                    }`}
                  >
                    <div className="mb-1 ml-3 border-l border-gray-200 pl-2">
                      {category.brands.map((brand) => (
                        <Link
                          key={brand.id}
                          href={`/products?category=${category.id}&brand=${brand.id}`}
                          onClick={closeAll}
                          className="block rounded-lg px-3 py-2 text-xs font-medium text-gray-500 transition hover:bg-blue-50 hover:text-blue-700"
                        >
                          {brand.brandName}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
}
