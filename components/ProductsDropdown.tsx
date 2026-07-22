"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

type Category = { id: number; categoryName: string };

export default function ProductsDropdown({
  categories,
}: {
  categories: Category[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <li ref={ref} className="relative">
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
        className={`absolute left-0 mt-2 w-56 bg-white text-navy rounded-lg shadow-lg py-2 z-50 origin-top transition-all duration-200 ${
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <Link
          href="/products"
          onClick={() => setOpen(false)}
          className="block px-4 py-2 text-sm font-semibold hover:bg-gray-50"
        >
          All Products
        </Link>
        {categories.length > 0 && <div className="border-t my-1" />}
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/products?category=${c.id}`}
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm hover:bg-gray-50"
          >
            {c.categoryName}
          </Link>
        ))}
      </div>
    </li>
  );
}