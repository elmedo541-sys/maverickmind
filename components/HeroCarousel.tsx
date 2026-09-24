

import { useCallback, useEffect, useRef, useState } from "react";
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
      className="mx-auto grid h-full w-full max-w-[1800px] content-center items-center gap-8 px-4 pb-16 pt-9 sm:px-6 sm:pb-16 sm:pt-11 md:grid-cols-[1.08fr_0.92fr] md:gap-10 md:py-14 lg:px-8 xl:px-10"
    >
      <div className="mx-auto max-w-3xl text-center md:mx-0 md:text-left">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-200 sm:mb-4 sm:text-xs md:text-sm animate-[fadeInUp_0.55s_ease-out_both]">
          Security &amp; Communication Products
        </p>

        <h1 className="text-3xl font-extrabold leading-[1.12] text-white min-[390px]:text-4xl sm:text-5xl lg:text-6xl animate-[fadeInUp_0.6s_ease-out_0.12s_both]">
          Equipment for safer and better connected spaces.
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-300 sm:mt-5 sm:text-base sm:leading-7 md:mx-0 lg:text-lg animate-[fadeInUp_0.6s_ease-out_0.24s_both]">
          CCTV, fire alarm, networking and communication products for homes,
          offices and project requirements.
        </p>

        <div className="mx-auto mt-6 flex max-w-sm flex-col gap-3 sm:mt-8 sm:max-w-none sm:flex-row md:mx-0 animate-[fadeInUp_0.6s_ease-out_0.36s_both]">
          <Link
            href="/products"
            className="touch-no-lift inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/20 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-xl"
          >
            Browse Products
          </Link>
          <Link
            href="/contact"
            className="touch-no-lift inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/15"
          >
            Send an Inquiry
          </Link>
        </div>
      </div>

      <div className="relative mx-auto flex w-full max-w-[360px] items-center justify-center md:max-w-lg md:justify-end">
        <div className="brand-aura absolute h-56 w-56 rounded-full bg-blue-400/20 blur-3xl sm:h-64 sm:w-64 lg:h-72 lg:w-72" />

        <div className="brand-motion relative flex h-48 w-48 items-center justify-center sm:h-56 sm:w-56 lg:h-64 lg:w-64">
          <div className="absolute inset-4 rounded-[2rem] bg-white/[0.035] shadow-[0_26px_70px_rgba(0,0,0,0.26)] backdrop-blur-sm" />

          <div className="brand-logo-frame relative h-40 w-40 overflow-hidden rounded-[1.55rem] ring-1 ring-white/15 sm:h-48 sm:w-48 sm:rounded-[1.8rem] lg:h-56 lg:w-56">
            <Image
              src="/logo.png"
              alt="Maverick Minds, Inc."
              fill
              priority
              quality={100}
              sizes="(max-width: 640px) 160px, (max-width: 1024px) 192px, 224px"
              draggable={false}
              className="select-none object-cover scale-[1.14]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroCarousel({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(0);
  const [introKey, setIntroKey] = useState(0);
  const touchStartX = useRef<number | null>(null);

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
    if (total <= 1) return;

    const timer = window.setInterval(next, 6000);
    return () => window.clearInterval(timer);
  }, [next, total]);

  useEffect(() => {
    if (active === 0) {
      setIntroKey((key) => key + 1);
    }
  }, [active]);

  function handleTouchStart(event: React.TouchEvent<HTMLElement>) {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLElement>) {
    const start = touchStartX.current;
    const end = event.changedTouches[0]?.clientX;
    touchStartX.current = null;

    if (start == null || end == null) return;
    const distance = end - start;

    if (Math.abs(distance) < 45) return;
    if (distance < 0) next();
    else prev();
  }

  return (
    <section
      className="relative touch-pan-y overflow-hidden bg-navy"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Maverick Minds highlights"
    >
      <div className="relative min-h-[690px] w-full min-[390px]:min-h-[720px] sm:min-h-[735px] md:min-h-[590px] lg:min-h-[620px]">
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            active === 0 ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0"
          }`}
          aria-hidden={active !== 0}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(59,130,246,0.19),transparent_34%),radial-gradient(circle_at_82%_72%,rgba(59,130,246,0.13),transparent_30%)]" />
          <div className="soft-pulse absolute -left-20 top-16 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
          <IntroSlide playKey={introKey} />
        </div>

        {slides.map((slide, index) => {
          const slideIndex = index + 1;
          const hasText = Boolean(slide.title);
          const isActive = slideIndex === active;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                isActive ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0"
              }`}
              aria-hidden={!isActive}
            >
              <div className="relative h-full w-full overflow-hidden bg-navy">
                <Image
                  src={slide.image}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="100vw"
                  className="scale-125 object-cover opacity-45 blur-2xl"
                />
                <Image
                  src={slide.image}
                  alt={slide.title || "Maverick Minds product highlight"}
                  fill
                  sizes="100vw"
                  className="object-contain px-2 py-8 sm:px-8 md:py-5"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/25 to-transparent md:bg-gradient-to-r md:from-navy/90 md:via-navy/50 md:to-transparent" />
              </div>

              {hasText && (
                <div className="absolute inset-0 flex items-end pb-20 md:items-center md:pb-0">
                  <div className="mx-auto w-full max-w-[1800px] px-5 sm:px-10 md:px-16 lg:px-20 xl:px-28">
                    <div className="max-w-xl rounded-2xl bg-navy/[0.55] p-5 text-white backdrop-blur-sm sm:p-6 md:bg-transparent md:p-0 md:backdrop-blur-none">
                      <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-200 sm:text-xs">
                        Maverick Minds, Inc.
                      </p>
                      <h2 className="text-2xl font-bold leading-tight min-[390px]:text-3xl sm:text-4xl lg:text-5xl">
                        {slide.title}
                      </h2>

                      {slide.subtitle && (
                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-200 sm:mt-4 sm:text-base lg:text-lg">
                          {slide.subtitle}
                        </p>
                      )}

                      {slide.linkUrl && (
                        <Link
                          href={slide.linkUrl}
                          className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-navy shadow-lg transition hover:bg-gray-100 sm:mt-7 sm:px-6"
                        >
                          {slide.linkLabel || "View Details"}
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
            className="absolute left-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-navy/[0.45] text-white backdrop-blur transition hover:bg-white/15 sm:flex"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M11 3L5 9L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-navy/[0.45] text-white backdrop-blur transition hover:bg-white/15 sm:flex"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M7 3L13 9L7 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="absolute bottom-5 left-0 right-0 z-20 flex items-center justify-center gap-2" aria-label="Choose slide">
            {Array.from({ length: total }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === active ? "true" : undefined}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === active
                    ? "w-8 bg-white"
                    : "w-2.5 bg-white/40 hover:bg-white/[0.65]"
                }`}
              />
            ))}
          </div>

          <p className="absolute bottom-9 left-0 right-0 z-20 text-center text-[10px] font-medium text-white/45 sm:hidden">
            Swipe to view more
          </p>
        </>
      )}
    </section>
  );
}
