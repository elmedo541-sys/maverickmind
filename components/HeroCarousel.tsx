"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/formatPrice";

type Slide = {
  id: number;
  productName: string;
  price: string;
  image: string | null;
  categoryName?: string | null;
};

export default function HeroCarousel({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      setActive(((index % slides.length) + slides.length) % slides.length);
    },
    [slides.length]
  );

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next, slides.length]);

  if (slides.length === 0) return null;

  return (
    <section
      className="relative bg-navy overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[420px] md:h-[480px]">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === active ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="relative w-full h-full">
              {slide.image ? (
                <Image
                  src={slide.image}
                  alt={slide.productName}
                  fill
                  priority={i === 0}
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-navyLight" />
              )}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(11,31,58,0.92) 0%, rgba(11,31,58,0.65) 45%, rgba(11,31,58,0.25) 100%)",
                }}
              />
            </div>

            <div className="absolute inset-0 flex items-center">
              <div className="max-w-6xl mx-auto px-6 w-full">
                <div className="max-w-md text-white">
                  {slide.categoryName && (
                    <p className="text-blue-300 text-sm font-medium mb-2 uppercase tracking-wide">
                      {slide.categoryName}
                    </p>
                  )}
                  <h2 className="text-2xl md:text-4xl font-bold mb-3 leading-tight">
                    {slide.productName}
                  </h2>
                  <p className="text-xl font-semibold text-blue-200 mb-6">
                    ₱{formatPrice(slide.price)}
                  </p>
                  <Link
                    href={`/products/${slide.id}`}
                    className="inline-block bg-white text-navy px-6 py-3 rounded font-semibold hover:bg-gray-100 transition transform hover:scale-105"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/15 hover:bg-white/30 text-white w-10 h-10 rounded-full flex items-center justify-center transition"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 3L5 9L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/15 hover:bg-white/30 text-white w-10 h-10 rounded-full flex items-center justify-center transition"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M7 3L13 9L7 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === active ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}