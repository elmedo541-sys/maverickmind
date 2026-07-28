import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import FadeIn from "@/components/FadeIn";
import HeroCarousel from "@/components/HeroCarousel";

const CATEGORY_TILES = [
  {
    label: "CCTV Systems",
    keywords: ["cctv", "camera"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M3 8h11l4-3v14l-4-3H3a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
        <circle cx="8" cy="12" r="2" />
        <path d="M21 9v6" />
      </svg>
    ),
  },
  {
    label: "Fire Alarm Systems",
    keywords: ["fire alarm", "fire"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M12 2s-4 4.5-4 9a4 4 0 0 0 8 0c0-1-.5-2-1-2.5.2 1-.3 2-1.3 2.2-1.2.2-2-.7-1.7-1.9C12.5 7 12 4.5 12 2Z" />
        <path d="M8.5 15a3.5 3.5 0 0 0 7 0" />
      </svg>
    ),
  },
  {
    label: "Storage Devices",
    keywords: ["storage", "recorder", "nvr", "dvr"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <rect x="3" y="4" width="18" height="6" rx="1.5" />
        <rect x="3" y="14" width="18" height="6" rx="1.5" />
        <circle cx="7" cy="7" r="0.75" fill="currentColor" />
        <circle cx="7" cy="17" r="0.75" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Cables and Wires",
    keywords: ["cable", "wire"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M9 6V4a2 2 0 0 1 4 0v2" />
        <path d="M7 6h10v4a5 5 0 0 1-10 0V6Z" />
        <path d="M12 15v5" />
        <path d="M9 20h6" />
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

      <section className="max-w-6xl mx-auto px-6 pb-14">
        <FadeIn>
          <h2 className="text-2xl font-bold text-navy mb-6">Shop by Category</h2>
        </FadeIn>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {CATEGORY_TILES.map((tile, i) => {
            const category = tileCategories[i];
            const href = category
              ? `/products?category=${category.id}`
              : `/products?search=${encodeURIComponent(tile.label)}`;
            return (
              <FadeIn key={tile.label} delay={i * 60}>
                <Link
                  href={href}
                  className="flex flex-col items-center justify-center text-center gap-3 bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 p-6 transform hover:-translate-y-1 group"
                >
                  <span className="flex items-center justify-center w-16 h-16 rounded-full bg-navy/5 text-navy group-hover:bg-navy group-hover:text-white transition-colors">
                    {tile.icon}
                  </span>
                  <span className="font-semibold text-navy text-sm">
                    {tile.label}
                  </span>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </section>
    </div>
  );
}