"use client";

import { useCallback, useEffect, useState } from "react";
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
      className="mx-auto grid h-full w-full max-w-[1800px] items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.1fr_0.9fr] lg:px-8 xl:px-10"
    >
      <div className="max-w-3xl text-center md:text-left">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-blue-200 sm:text-sm animate-[fadeInUp_0.6s_ease-out_both]">
          Security &amp; Communication Solutions
        </p>

        <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl animate-[fadeInUp_0.6s_ease-out_0.15s_both]">
          Smart technology for safer, better connected spaces.
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg md:mx-0 animate-[fadeInUp_0.6s_ease-out_0.3s_both]">
          Reliable products, system consultation and technical support for CCTV, fire alarm, communication and networking solutions.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start animate-[fadeInUp_0.6s_ease-out_0.45s_both]">
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/20 transition hover:bg-blue-500 hover:-translate-y-0.5"
          >
            Explore Products
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15 hover:-translate-y-0.5"
          >
            Contact Us
          </Link>
        </div>
      </div>

      <div className="relative mx-auto flex w-full max-w-lg items-center justify-center md:justify-end">
        <div className="absolute h-64 w-64 rounded-full bg-blue-500/20 blur-3xl sm:h-80 sm:w-80" />
        <div className="relative flex aspect-square w-56 items-center justify-center rounded-[2rem] border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur sm:w-72 lg:w-80 animate-[logoPop_0.7s_ease-out_0.2s_both]">
          <Image
            src="/logo.png"
            alt="Maverick Minds, Inc."
            fill
            priority
            quality={100}
            className="object-contain p-8 drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}

export default function HeroCarousel({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [introKey, setIntroKey] = useState(0);

  const total = slides.length + 1;

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
      setIntroKey((key) => key + 1);
    }
  }, [active]);

  return (
    <section
      className="relative overflow-hidden bg-navy"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative min-h-[560px] w-full sm:min-h-[590px] lg:min-h-[620px]">
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            active === 0 ? "z-10 opacity-100" : "z-0 opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.18),transparent_34%),radial-gradient(circle_at_80%_75%,rgba(59,130,246,0.12),transparent_32%)]" />
          <IntroSlide playKey={introKey} />
        </div>

        {slides.map((slide, index) => {
          const slideIndex = index + 1;
          const hasText = Boolean(slide.title);

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                slideIndex === active ? "z-10 opacity-100" : "z-0 opacity-0"
              }`}
            >
              <div className="relative h-full w-full overflow-hidden bg-navy">
                <Image
                  src={slide.image}
                  alt=""
                  aria-hidden="true"
                  fill
                  className="scale-125 object-cover opacity-50 blur-2xl"
                />
                <Image
                  src={slide.image}
                  alt={slide.title || "Maverick Minds slide"}
                  fill
                  className="object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/55 to-transparent" />
              </div>

              {hasText && (
                <div className="absolute inset-0 flex items-center">
                  <div className="mx-auto w-full max-w-[1800px] px-14 sm:px-16 md:px-20 lg:px-24 xl:px-28">
                    <div className="max-w-xl text-white">
                      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-200">
                        Maverick Minds, Inc.
                      </p>
                      <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                        {slide.title}
                      </h2>

                      {slide.subtitle && (
                        <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-200 sm:text-base lg:text-lg">
                          {slide.subtitle}
                        </p>
                      )}

                      {slide.linkUrl && (
                        <Link
                          href={slide.linkUrl}
                          className="mt-7 inline-flex rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-navy shadow-lg transition hover:-translate-y-0.5 hover:bg-gray-100"
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
            className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-navy/35 text-white backdrop-blur transition hover:bg-white/20 sm:left-5 sm:h-11 sm:w-11"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M11 3L5 9L11 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-navy/35 text-white backdrop-blur transition hover:bg-white/20 sm:right-5 sm:h-11 sm:w-11"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M7 3L13 9L7 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="absolute bottom-5 left-0 right-0 z-20 flex justify-center gap-2">
            {Array.from({ length: total }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  index === active
                    ? "w-8 bg-white"
                    : "w-2.5 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
