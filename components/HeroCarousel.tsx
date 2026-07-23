"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

type Slide = {
  id: number;
  title?: string | null;
  subtitle?: string | null;
  image: string;
  linkUrl?: string | null;
  linkLabel?: string | null;
};

function IntroSlide({ playKey }: { playKey: number }) {
  return (
    <div
      key={playKey}
      className="flex flex-col items-center text-center px-6"
    >
      <div className="relative mb-6">
        <span className="absolute inset-0 rounded-full bg-blue-400/30 animate-ping" />
        <div className="relative w-20 h-20 rounded-full bg-white/10 flex items-center justify-center animate-[logoPop_0.7s_ease-out_both]">
          <svg width="44" height="44" viewBox="0 0 34 34" fill="none">
            <path
              d="M17 3 L28 7 L28 15 C28 22 23 27 17 30 C11 27 6 22 6 15 L6 7 Z"
              fill="#4f9dff"
            />
            <path
              d="M11 16 L15 20 L23 11"
              stroke="#0b1f3a"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>
      </div>
      <h2 className="text-3xl md:text-5xl font-bold text-white animate-[fadeInUp_0.6s_ease-out_0.3s_both]">
        MaverickMind
      </h2>
      <p className="text-blue-200 mt-3 text-lg animate-[fadeInUp_0.6s_ease-out_0.6s_both]">
        Security &amp; Communication Solutions
      </p>
    </div>
  );
}

export default function HeroCarousel({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [introKey, setIntroKey] = useState(0);

  const total = slides.length + 1; // +1 for the intro slide at index 0

  const goTo = useCallback(
    (index: number) => {
      setActive(((index % total) + total) % total);
    },
    [total]
  );

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (paused || total <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next, total]);

  useEffect(() => {
    if (active === 0) {
      setIntroKey((k) => k + 1);
    }
  }, [active]);

  return (
    <section
      className="relative bg-navy overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[420px] md:h-[480px]">
        {/* Slide 0: animated brand intro */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
            active === 0 ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <IntroSlide playKey={introKey} />
        </div>

        {/* Slides 1..N: admin-managed photo slides */}
        {slides.map((slide, i) => {
          const slideIndex = i + 1;
          const hasText = Boolean(slide.title);
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                slideIndex === active ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <div className="relative w-full h-full bg-navy">
                <Image
                  src={slide.image}
                  alt={slide.title || "Slide"}
                  fill
                  className="object-contain"
                />
                {hasText && (
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(11,31,58,0.85) 0%, rgba(11,31,58,0.55) 45%, rgba(11,31,58,0) 100%)",
                    }}
                  />
                )}
              </div>

              {hasText && (
                <div className="absolute inset-0 flex items-center">
                  <div className="max-w-6xl mx-auto px-6 w-full">
                    <div className="max-w-md text-white">
                      <h2 className="text-2xl md:text-4xl font-bold mb-3 leading-tight">
                        {slide.title}
                      </h2>
                      {slide.subtitle && (
                        <p className="text-lg text-blue-200 mb-6">
                          {slide.subtitle}
                        </p>
                      )}
                      {slide.linkUrl && (
                        <Link
                          href={slide.linkUrl}
                          className="inline-block bg-white text-navy px-6 py-3 rounded font-semibold hover:bg-gray-100 transition transform hover:scale-105"
                        >
                          {slide.linkLabel || "Learn More"}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {total > 1 && (
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
            {Array.from({ length: total }).map((_, i) => (
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