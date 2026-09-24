import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import FadeIn from "@/components/FadeIn";
import HeroCarousel from "@/components/HeroCarousel";
import { getActiveSlides } from "@/lib/server/slides";
import { getFeaturedProducts, getCategoryTileMatches } from "@/lib/server/products";

const CATEGORY_TILES = [
  {
    label: "CCTV Systems",
    keywords: ["cctv", "camera"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7 sm:h-8 sm:w-8" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M3 8h10l5-3v14l-5-3H3a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" strokeLinejoin="round" />
        <circle cx="7" cy="12" r="2.2" />
        <path d="M18 10h3v4h-3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Fire Alarm Systems",
    keywords: ["fire alarm", "fire"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7 sm:h-8 sm:w-8" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 3c-.4 2.2-3.6 4.5-3.6 8.2A3.6 3.6 0 0 0 12 15a3.6 3.6 0 0 0 3.6-3.8c0-1.3-.5-2.4-1.3-3.4.1 1.5-.7 2.4-1.6 2.4-1 0-1.6-.9-1.4-1.9.3-1.4.8-2.9.7-5.3Z" strokeLinejoin="round" />
        <path d="M5 20h14" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Storage Devices",
    keywords: ["storage", "recorder", "nvr", "dvr"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7 sm:h-8 sm:w-8" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="4" width="18" height="6" rx="1.5" />
        <rect x="3" y="14" width="18" height="6" rx="1.5" />
        <circle cx="7" cy="7" r="1" fill="currentColor" stroke="none" />
        <circle cx="7" cy="17" r="1" fill="currentColor" stroke="none" />
        <path d="M11 7h6M11 17h6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Cables and Wires",
    keywords: ["cable", "wire"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7 sm:h-8 sm:w-8" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M8 4v4M16 4v4M6 8h12v2a6 6 0 0 1-12 0V8Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 16v5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const COMPANY_POINTS = [
  {
    title: "Need help choosing?",
    body: "Tell us what you are working on and we can help narrow down the right product, model or accessory.",
  },
  {
    title: "Checking compatibility",
    body: "If you already have equipment, send us the model numbers so we can help check which items work with it.",
  },
  {
    title: "Questions after purchase",
    body: "You can contact us for product information, basic configuration questions and troubleshooting concerns.",
  },
];

export default async function HomePage() {
  const [slides, products, tileCategories] = await Promise.all([
    getActiveSlides(),
    getFeaturedProducts(6),
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
              <h2 className="text-2xl font-bold text-navy sm:text-3xl lg:text-4xl">Product Categories</h2>
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
                  className="touch-no-lift group flex h-full min-h-32 items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg min-[420px]:min-h-40 min-[420px]:flex-col min-[420px]:items-stretch min-[420px]:justify-between sm:p-6"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition duration-300 group-hover:bg-blue-100 group-hover:scale-105 sm:h-12 sm:w-12">
                    {tile.icon}
                  </span>

                  <div className="flex min-w-0 flex-1 items-center justify-between gap-3 min-[420px]:mt-6 min-[420px]:items-end">
                    <span className="font-bold text-navy sm:text-lg">{tile.label}</span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-navy transition group-hover:bg-blue-600 group-hover:text-white" aria-hidden="true">
                      →
                    </span>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </section>

      <section className="border-y border-gray-200 bg-white">
        <div className="mx-auto w-full max-w-[1800px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 xl:px-10">
          <FadeIn>
            <div className="mb-7 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-navy sm:text-3xl lg:text-4xl">Featured Products</h2>
                <p className="mt-2 text-sm text-gray-600 sm:text-base">
                  A few products currently highlighted in our catalog.
                </p>
              </div>
              <Link
                href="/products?all=1"
                className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-bold text-blue-700 transition hover:gap-3 sm:self-auto"
              >
                Browse catalog <span aria-hidden="true">→</span>
              </Link>
            </div>
          </FadeIn>

          {products.length === 0 ? (
            <FadeIn delay={80}>
              <div className="rounded-2xl border border-gray-200 bg-white p-8 text-gray-500 shadow-sm">
                No featured products are available yet.
              </div>
            </FadeIn>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5 xl:grid-cols-6">
              {products.map((product, index) => (
                <FadeIn key={product.id} delay={Math.min(index, 8) * 50}>
                  <ProductCard
                    id={product.id}
                    productName={product.productName}
                    image={product.images[0] ?? null}
                    categoryName={product.category?.categoryName}
                    brandName={product.brand?.brandName}
                    featured={product.featured}
                  />
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1800px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 xl:px-10">
        <FadeIn>
          <div className="mb-7 max-w-3xl sm:mb-8">
            <h2 className="text-2xl font-bold text-navy sm:text-3xl lg:text-4xl">How we can help</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
              You do not need to know every specification before contacting us. Send what you already know and we can work from there.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-4 md:grid-cols-3 lg:gap-6">
          {COMPANY_POINTS.map((item, index) => (
            <FadeIn key={item.title} delay={60 + index * 50}>
              <div className="h-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:border-blue-200 hover:shadow-md sm:p-6">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-sm font-bold text-white">
                  {index + 1}
                </div>
                <h3 className="text-lg font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{item.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1800px] px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 xl:px-10">
        <FadeIn>
          <div className="overflow-hidden rounded-2xl bg-[#39456b] px-6 py-8 shadow-lg sm:px-10 sm:py-9 lg:flex lg:items-center lg:justify-between lg:px-12 lg:py-10">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Looking for a specific model?
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-200 sm:text-base">
                Send us the product name, model and quantity. If it is for a project, you can also include the basic requirement.
              </p>
            </div>

            <div className="mt-6 shrink-0 lg:mt-0 lg:pl-8">
              <Link
                href="/contact"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-bold text-navy transition hover:bg-gray-100 sm:w-auto"
              >
                Send an Inquiry
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
