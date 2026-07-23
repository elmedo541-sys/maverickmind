import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import FadeIn from "@/components/FadeIn";
import HeroCarousel from "@/components/HeroCarousel";

export default async function HomePage() {
  const [slides, products, services] = await Promise.all([
    prisma.slide.findMany({
      where: { active: true },
      orderBy: { position: "asc" },
    }),
    prisma.product.findMany({
      where: { featured: true },
      orderBy: { id: "desc" },
      take: 6,
      include: { category: true, brand: true },
    }),
    prisma.service.findMany({ orderBy: { id: "desc" }, take: 4 }),
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
                  quantity={p.quantity}
                />
              </FadeIn>
            ))}
          </div>
        )}
      </section>

      <section className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <FadeIn>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-navy">Our Services</h2>
              <Link href="/services" className="text-blue-700 text-sm font-medium">
                View all &rarr;
              </Link>
            </div>
          </FadeIn>
          {services.length === 0 ? (
            <FadeIn delay={100}>
              <p className="text-gray-500">No services yet.</p>
            </FadeIn>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {services.map((s, i) => (
                <FadeIn key={s.id} delay={i * 60}>
                  <div className="bg-gray-50 rounded-lg p-5 shadow-sm transition transform hover:-translate-y-1 hover:shadow-md">
                    <h3 className="font-semibold text-navy mb-2">
                      {s.serviceName}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {s.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}