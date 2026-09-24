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
    from: "from-blue-100",
    to: "to-blue-50",
    glow: "bg-blue-400",
    ring: "group-hover:ring-blue-300",
    icon: (
      <svg viewBox="0 0 24 24" className="h-9 w-9 drop-shadow-[0_3px_3px_rgba(30,64,175,0.35)]">
        <defs>
          <linearGradient id="gradCctv" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>
        <path d="M3 8h10l5-3.5v15L13 16H3a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" fill="url(#gradCctv)" />
        <circle cx="7.4" cy="12" r="2.3" fill="#0f172a" opacity="0.35" />
        <circle cx="6.8" cy="11.2" r="0.85" fill="#fff" opacity="0.85" />
        <rect x="18.6" y="9.3" width="1.8" height="5.4" rx="0.9" fill="url(#gradCctv)" />
      </svg>
    ),
  },
  {
    label: "Fire Alarm Systems",
    keywords: ["fire alarm", "fire"],
    from: "from-orange-100",
    to: "to-orange-50",
    glow: "bg-orange-400",
    ring: "group-hover:ring-orange-300",
    icon: (
      <svg viewBox="0 0 24 24" className="h-9 w-9 drop-shadow-[0_3px_3px_rgba(194,65,12,0.35)]">
        <defs>
          <linearGradient id="gradFire" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="55%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
        </defs>
        <path
          d="M12 2c-1 3-4 5-4 9a4 4 0 0 0 8 0c0-1.2-.6-2.2-1.2-2.9.1 1.1-.5 1.9-1.4 2-.9.1-1.5-.7-1.3-1.6C12.6 7 12.5 4.5 12 2Z"
          fill="url(#gradFire)"
        />
        <ellipse cx="11.1" cy="8.8" rx="0.7" ry="1.2" fill="#fff" opacity="0.5" />
      </svg>
    ),
  },
  {
    label: "Storage Devices",
    keywords: ["storage", "recorder", "nvr", "dvr"],
    from: "from-violet-100",
    to: "to-violet-50",
    glow: "bg-violet-400",
    ring: "group-hover:ring-violet-300",
    icon: (
      <svg viewBox="0 0 24 24" className="h-9 w-9 drop-shadow-[0_3px_3px_rgba(91,33,182,0.35)]">
        <defs>
          <linearGradient id="gradStorage" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c4b5fd" />
            <stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>
        </defs>
        <rect x="3" y="4" width="18" height="6" rx="1.5" fill="url(#gradStorage)" />
        <rect x="3" y="14" width="18" height="6" rx="1.5" fill="url(#gradStorage)" opacity="0.85" />
        <circle cx="7" cy="7" r="1" fill="#fff" opacity="0.9" />
        <circle cx="7" cy="17" r="1" fill="#fff" opacity="0.9" />
        <rect x="11" y="6.3" width="7" height="1.4" rx="0.7" fill="#fff" opacity="0.35" />
        <rect x="11" y="16.3" width="7" height="1.4" rx="0.7" fill="#fff" opacity="0.35" />
      </svg>
    ),
  },
  {
    label: "Cables and Wires",
    keywords: ["cable", "wire"],
    from: "from-emerald-100",
    to: "to-emerald-50",
    glow: "bg-emerald-400",
    ring: "group-hover:ring-emerald-300",
    icon: (
      <svg viewBox="0 0 24 24" className="h-9 w-9 drop-shadow-[0_3px_3px_rgba(4,120,87,0.35)]">
        <defs>
          <linearGradient id="gradCable" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6ee7b7" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
        </defs>
        <rect x="9" y="3.3" width="1.8" height="3.7" rx="0.9" fill="url(#gradCable)" />
        <rect x="13.2" y="3.3" width="1.8" height="3.7" rx="0.9" fill="url(#gradCable)" />
        <path d="M7 6.5h10v4a5 5 0 0 1-10 0v-4Z" fill="url(#gradCable)" />
        <rect x="11.1" y="14.5" width="1.8" height="6.2" rx="0.9" fill="url(#gradCable)" />
        <ellipse cx="9.2" cy="8.3" rx="0.6" ry="1.4" fill="#fff" opacity="0.4" />
      </svg>
    ),
  },
];

const BENEFITS = [
  {
    title: "Professional Guidance",
    body: "Get practical recommendations for product selection, compatibility and system planning.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3l7 3v5c0 4.8-2.8 8-7 10-4.2-2-7-5.2-7-10V6l7-3Z" />
        <path d="m9 12 2 2 4-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Reliable Equipment",
    body: "A focused range of security, safety, communication and networking products for real-world applications.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="5" width="16" height="12" rx="2" />
        <path d="M8 21h8M12 17v4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Technical Support",
    body: "Support for configuration, troubleshooting and after-sales concerns when you need assistance.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 13a8 8 0 0 1 16 0" />
        <path d="M4 13v4a2 2 0 0 0 2 2h2v-6H4ZM20 13v4a2 2 0 0 1-2 2h-2v-6h4Z" />
      </svg>
    ),
  },
  {
    title: "Scalable Solutions",
    body: "Solutions can be planned around the size, requirements and future needs of your home or business.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 19V9M12 19V5M19 19v-7" strokeLinecap="round" />
      </svg>
    ),
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

      <section className="mx-auto w-full max-w-[1800px] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20 xl:px-10">
        <FadeIn>
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
                Browse Solutions
              </p>
              <h2 className="text-3xl font-bold text-navy sm:text-4xl">
                Find the right technology for your space.
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 transition hover:gap-3"
            >
              View all products <span aria-hidden="true">→</span>
            </Link>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {CATEGORY_TILES.map((tile, index) => {
            const category = tileCategories[index];
            const href = category
              ? `/products?category=${category.id}`
              : `/products?search=${encodeURIComponent(tile.label)}`;

            return (
              <FadeIn key={tile.label} delay={60 + index * 60}>
                <Link
                  href={href}
                  className="group relative flex h-full min-h-44 flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6"
                >
                  <span
                    className={`absolute -right-5 -top-5 h-24 w-24 rounded-full ${tile.glow} opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-20`}
                  />
                  <span
                    className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${tile.from} ${tile.to} ring-4 ring-transparent ${tile.ring} shadow-inner transition-all duration-300 group-hover:scale-105`}
                  >
                    {tile.icon}
                  </span>

                  <div className="relative mt-6 flex items-end justify-between gap-3">
                    <span className="font-bold text-navy sm:text-lg">{tile.label}</span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f6f7fb] text-navy transition group-hover:bg-blue-600 group-hover:text-white">
                      →
                    </span>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </section>

      <section className="border-y border-gray-200 bg-white/70">
        <div className="mx-auto w-full max-w-[1800px] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20 xl:px-10">
          <FadeIn>
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
                  Featured Products
                </p>
                <h2 className="text-3xl font-bold text-navy sm:text-4xl">
                  Products selected from our catalog.
                </h2>
              </div>
              <Link
                href="/products?all=1"
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 transition hover:gap-3"
              >
                Browse catalog <span aria-hidden="true">→</span>
              </Link>
            </div>
          </FadeIn>

          {products.length === 0 ? (
            <FadeIn delay={80}>
              <div className="rounded-2xl border border-gray-200 bg-white p-8 text-gray-500 shadow-sm">
                No featured products yet. Mark products as featured from the admin panel to show them here.
              </div>
            </FadeIn>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 lg:gap-5">
              {products.map((product, index) => (
                <FadeIn key={product.id} delay={Math.min(index, 8) * 55}>
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

      <section className="mx-auto w-full max-w-[1800px] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20 xl:px-10">
        <FadeIn>
          <div className="mx-auto mb-9 max-w-3xl text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
              Why Maverick Minds
            </p>
            <h2 className="text-3xl font-bold text-navy sm:text-4xl">
              More than products — support for the complete solution.
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 lg:gap-6">
          {BENEFITS.map((item, index) => (
            <FadeIn key={item.title} delay={70 + index * 60}>
              <div className="h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{item.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1800px] px-4 pb-6 sm:px-6 lg:px-8 xl:px-10">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl bg-[#39456b] px-6 py-10 shadow-xl sm:px-10 lg:flex lg:items-center lg:justify-between lg:px-12 lg:py-12">
            <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="relative max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200">
                Start a Conversation
              </p>
              <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                Need help choosing a security or communication solution?
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-200 sm:text-base">
                Tell us what you need and our team can help you identify suitable products and the next steps for your project.
              </p>
            </div>

            <div className="relative mt-7 flex shrink-0 flex-col gap-3 sm:flex-row lg:mt-0 lg:pl-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-navy transition hover:-translate-y-0.5 hover:bg-gray-100"
              >
                Contact Us
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/15"
              >
                View Services
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
