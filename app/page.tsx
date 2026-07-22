import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

export default async function HomePage() {
  const [products, services, categories] = await Promise.all([
    prisma.product.findMany({
      orderBy: { id: "desc" },
      take: 6,
      include: { category: true },
    }),
    prisma.service.findMany({ orderBy: { id: "desc" }, take: 4 }),
    prisma.category.findMany({
      orderBy: { categoryName: "asc" },
      include: { _count: { select: { products: true } } },
    }),
  ]);

  return (
    <div>
      <section className="bg-navy text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Complete Security &amp; Communication Solutions
          </h1>
          <p className="text-gray-200 max-w-2xl mx-auto mb-8">
            MaverickMind supplies fire alarm systems, CCTV, PoE switches,
            video recorders, and cabling &amp; wiring, plus professional
            installation services.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/products"
              className="bg-white text-navy px-6 py-3 rounded font-semibold hover:bg-gray-100"
            >
              Browse Products
            </Link>
            <Link
              href="/contact"
              className="border border-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-navy"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {categories.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-14">
          <h2 className="text-2xl font-bold text-navy mb-6">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/products?category=${c.id}`}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-5 text-center"
              >
                <p className="font-semibold text-navy text-sm">
                  {c.categoryName}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {c._count.products}{" "}
                  {c._count.products === 1 ? "product" : "products"}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-navy">Featured Products</h2>
          <Link href="/products" className="text-blue-700 text-sm font-medium">
            View all &rarr;
          </Link>
        </div>