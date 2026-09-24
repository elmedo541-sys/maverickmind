import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import HeroCarousel from "@/components/HeroCarousel";
import { getActiveSlides } from "@/lib/server/slides";
import { getCategoryTileMatches } from "@/lib/server/products";

const CATEGORY_TILES = [
  {
    label: "CCTV Systems",
    keywords: ["cctv", "camera"],
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="h-8 w-8 sm:h-9 sm:w-9"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M9.5 16.5h19.2c1.4 0 2.6 1.2 2.6 2.6v9.8c0 1.4-1.2 2.6-2.6 2.6H9.5a2.6 2.6 0 0 1-2.6-2.6v-9.8a2.6 2.6 0 0 1 2.6-2.6Z"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <circle cx="18.8" cy="24" r="5.2" stroke="currentColor" strokeWidth="2.4" />
        <circle cx="18.8" cy="24" r="2.1" fill="currentColor" />
        <path
          d="M31.3 19.4 40 15.2v17.6l-8.7-4.2"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <path
          d="M14.5 31.5v4.2M23.2 31.5v4.2M11.8 35.7h14"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Fire Alarm Systems",
    keywords: ["fire alarm", "fire"],
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="h-8 w-8 sm:h-9 sm:w-9"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M24 6.5c1.2 5.6-5.5 8.3-5.5 14.3 0 3.3 2.4 5.7 5.5 5.7s5.5-2.4 5.5-5.7c0-2.4-1-4.4-2.7-6.2.3 3-1.2 4.8-3 4.8-2 0-3.1-1.8-2.5-3.7.8-2.6 2.5-5.4 2.7-9.2Z"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <path
          d="M11 32.5h26v5H11z"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <path d="M15 37.5v3M33 37.5v3" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M13.5 28.5 10 25M34.5 28.5 38 25" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Storage Devices",
    keywords: ["storage", "recorder", "nvr", "dvr"],
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="h-8 w-8 sm:h-9 sm:w-9"
        fill="none"
        aria-hidden="true"
      >
        <rect x="7.5" y="8" width="33" height="12" rx="3" stroke="currentColor" strokeWidth="2.4" />
        <rect x="7.5" y="28" width="33" height="12" rx="3" stroke="currentColor" strokeWidth="2.4" />
        <circle cx="13.5" cy="14" r="1.8" fill="currentColor" />
        <circle cx="13.5" cy="34" r="1.8" fill="currentColor" />
        <path d="M19 14h15M19 34h15" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M34.5 11.5h2M34.5 31.5h2" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Cables and Wires",
    keywords: ["cable", "wire"],
    icon: (
      <svg
        viewBox="0 0 48 48"
        className="h-8 w-8 sm:h-9 sm:w-9"
        fill="none"
        aria-hidden="true"
      >
        <path d="M16 8v8M24 8v8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <path
          d="M12 16h16v4.5A8 8 0 0 1 20 28.5a8 8 0 0 1-8-8V16Z"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <path d="M20 28.5v4.2c0 4.2 3.4 7.6 7.6 7.6h1.9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M29.5 36.5h6.8v7h-6.8z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M31.4 39.2h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default async function HomePage() {
  const [slides, tileCategories] = await Promise.all([
    getActiveSlides(),
    getCategoryTileMatches(CATEGORY_TILES.map((tile) => tile.keywords)),
  ]);

  return (
    <div>
      <HeroCarousel
        slides={slides.map((slide) => ({
          id: slide.id,
          title: slide.title,
          subtitle: slide.subtitle,
          image: slide.image,
          linkUrl: slide.linkUrl,
          linkLabel: slide.linkLabel,
        }))}
      />

      <section className="mx-auto w-full max-w-[1800px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 xl:px-10">
        <FadeIn>
          <div className="mb-6 flex flex-col gap-3 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-navy sm:text-3xl lg:text-4xl">
                Product Categories
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
                Start with a category, then narrow it down by brand or model.
              </p>
            </div>

            <Link
              href="/products"
              className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-bold text-blue-700 transition hover:gap-3 sm:self-auto"
            >
              View all products <span aria-hidden="true">→</span>
            </Link>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-6">
          {CATEGORY_TILES.map((tile, index) => {
            const category = tileCategories[index];
            const href = category
              ? `/products?category=${category.id}`
              : `/products?search=${encodeURIComponent(tile.label)}`;

            return (
              <FadeIn key={tile.label} delay={50 + index * 50}>
                <Link
                  href={href}
                  className="touch-no-lift group relative flex h-full min-h-32 items-center justify-between gap-4 overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl min-[420px]:min-h-40 min-[420px]:flex-col min-[420px]:items-stretch min-[420px]:justify-between sm:p-6"
                >
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-50 opacity-0 transition-all duration-500 group-hover:scale-125 group-hover:opacity-100"
                    aria-hidden="true"
                  />

                  <div className="relative z-10 flex items-center gap-4">
                    <span className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white text-blue-700 shadow-[0_8px_24px_rgba(37,99,235,0.10)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-105 group-hover:border-blue-200 group-hover:shadow-[0_12px_30px_rgba(37,99,235,0.16)] sm:h-16 sm:w-16">
                      <span
                        className="absolute inset-x-2 top-1 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"
                        aria-hidden="true"
                      />
                      <span className="transition-transform duration-300 group-hover:scale-110">
                        {tile.icon}
                      </span>
                    </span>
                  </div>

                  <div className="relative z-10 flex min-w-0 flex-1 items-center justify-between gap-3 min-[420px]:mt-5 min-[420px]:items-end">
                    <span className="font-bold text-navy sm:text-lg">
                      {tile.label}
                    </span>

                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-navy transition-all duration-300 group-hover:translate-x-0.5 group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          d="M5 12h14M13 6l6 6-6 6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </section>
    </div>
  );
}
