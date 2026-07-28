import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import FadeIn from "@/components/FadeIn";
import HeroCarousel from "@/components/HeroCarousel";

const CATEGORY_TILES = [
  {
    label: "CCTV Systems",
    keywords: ["cctv", "camera"],
    from: "from-blue-100",
    to: "to-blue-50",
    glow: "bg-blue-400",
    ring: "group-hover:ring-blue-300",
    icon: (
      <svg viewBox="0 0 24 24" className="w-9 h-9 drop-shadow-[0_3px_3px_rgba(30,64,175,0.35)]">
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
      <svg viewBox="0 0 24 24" className="w-9 h-9 drop-shadow-[0_3px_3px_rgba(194,65,12,0.35)]">
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
      <svg viewBox="0 0 24 24" className="w-9 h-9 drop-shadow-[0_3px_3px_rgba(91,33,182,0.35)]">
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
      <svg viewBox="0 0 24 24" className="w-9 h-9 drop-shadow-[0_3px_3px_rgba(4,120,87,0.35)]">
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

export default async function HomePage() {
  const [slides, products, tileCategories] = await Promise.all([
    prisma.slide.findMany({
      where: { active: true },
      orderBy: { position: "asc" },
    }),
    prisma.product.findMany({
      where: { featured: true, visible: true },
      orderBy: { id: "desc" },
      take: 6,
      include: { category: true, brand: true },
    }),
    Promise.all(
      CATEGORY_TILES.map((tile) =>
        prisma.category.findFirst({
          where: {
            OR: tile.keywords.map((keyword) => ({
              categoryName: { contains: keyword, mode: "insensitive" as const },
            })),
          },
        })
      )
    ),
  ]);

  return (
    <div>
      <HeroCarousel
        slides={slides.map((s) => ({
          id: s.id,
          title: s.title,
          subtitle: s.subtitle,
          image: s.image,
          linkUrl: s.linkUrl,
          linkLabel: s.linkLabel,
        }))}
      />

      <section className="max-w-6xl mx-auto px-6 py-14">
        <FadeIn>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-navy">Featured Products</h2>
            <Link href="/products" className="text-blue-700 text-sm font-medium">
              View all &rarr;
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={40}>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Shop by Category
          </h3>
        </FadeIn>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-12">
          {CATEGORY_TILES.map((tile, i) => {
            const category = tileCategories[i];
            const href = category
              ? `/products?category=${category.id}`
              : `/products?search=${encodeURIComponent(tile.label)}`;
            return (
              <FadeIn key={tile.label} delay={80 + i * 70}>
                <Link
                  href={href}
                  className="relative flex flex-col items-center justify-center text-center gap-3 bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 p-6 transform hover:-translate-y-1.5 group overflow-hidden"
                >
                  <span
                    className={`absolute w-16 h-16 rounded-full ${tile.glow} opacity-0 blur-2xl group-hover:opacity-30 transition-opacity duration-300`}
                  />
                  <span
                    className={`relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${tile.from} ${tile.to} shadow-inner ring-4 ring-transparent ${tile.ring} transition-all duration-300 animate-float-icon group-hover:animate-none group-hover:scale-110 group-hover:-rotate-6`}
                    style={{ animationDelay: `${i * 300}ms` }}
                  >
                    {tile.icon}
                  </span>
                  <span className="relative font-semibold text-navy text-sm">
                    {tile.label}
                  </span>
                </Link>
              </FadeIn>
            );
          })}
        </div>

        <div className="border-t border-gray-200 mb-10" />

        {products.length === 0 ? (
          <FadeIn delay={100}>
            <p className="text-gray-500">
              No featured products yet. Mark products as featured from the
              admin panel to show them here.
            </p>
          </FadeIn>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {products.map((p, i) => (
              <FadeIn key={p.id} delay={i * 60}>
                <ProductCard
                  id={p.id}
                  productName={p.productName}
                  price={p.price.toString()}
                  image={p.images[0] ?? null}
                  categoryName={p.category?.categoryName}
                  brandName={p.brand?.brandName}
                />
              </FadeIn>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}