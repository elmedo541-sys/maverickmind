import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import FadeIn from "@/components/FadeIn";
import type { Prisma } from "@prisma/client";

export const metadata = { title: "Products" };

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { search?: string; category?: string; all?: string };
}) {
  const search = searchParams.search?.trim() || "";
  const categoryId = searchParams.category ? Number(searchParams.category) : undefined;
  const showAll = searchParams.all === "1";

  const isBrowsing = !search && !categoryId && !showAll;

  const where: Prisma.ProductWhereInput = {
    ...(search ? { productName: { contains: search, mode: "insensitive" } } : {}),
    ...(categoryId ? { categoryId } : {}),
  };

  const [products, categoryTiles] = await Promise.all([
    isBrowsing
      ? Promise.resolve([])
      : prisma.product.findMany({
          where,
          include: { category: true, brand: true },
          orderBy: { id: "desc" },
        }),
    isBrowsing
      ? prisma.category.findMany({
          orderBy: { categoryName: "asc" },
          include: {
            _count: { select: { products: true } },
            products: {
              where: { images: { isEmpty: false } },
              take: 1,
              orderBy: { id: "desc" },
              select: { images: true },
            },
          },
        })
      : Promise.resolve([]),
  ]);

  const nonEmptyCategoryTiles = categoryTiles.filter(
    (c) => c._count.products > 0
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <form>
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <h1 className="text-3xl font-bold text-navy">Products</h1>
            <div className="flex gap-2 w-full sm:w-auto">
              <input
                type="text"
                name="search"
                placeholder="Search products..."
                defaultValue={search}
                className="border rounded px-3 py-2 text-sm flex-1 sm:w-64 transition focus:ring-2 focus:ring-blue-300 outline-none"
              />
              <button
                type="submit"
                className="bg-navy text-white rounded px-4 py-2 text-sm font-medium hover:bg-navyLight transition transform hover:scale-105 whitespace-nowrap"
              >
                Search
              </button>
            </div>
          </div>
        </FadeIn>
      </form>

      <FadeIn delay={40}>
        <Link
          href="/products?all=1"
          className="inline-block text-sm font-medium text-blue-700 hover:underline mb-10"
        >
          View All Products &rarr;
        </Link>
      </FadeIn>

      {isBrowsing && nonEmptyCategoryTiles.length > 0 && (
        <FadeIn delay={60}>
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-navy mb-4">
              Browse by Category
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {nonEmptyCategoryTiles.map((c, i) => {
                const coverImage = c.products[0]?.images[0] ?? null;
                return (
                  <FadeIn key={c.id} delay={i * 50}>
                    <Link
                      href={`/products?category=${c.id}`}
                      className="block bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden transform hover:-translate-y-1 group"
                    >
                      <div className="relative w-full h-28 bg-gray-100 overflow-hidden">
                        {coverImage ? (
                          <Image
                            src={coverImage}
                            alt={c.categoryName}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                            No image
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <p className="font-semibold text-navy text-sm">
                          {c.categoryName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {c._count.products}{" "}
                          {c._count.products === 1 ? "product" : "products"}
                        </p>
                      </div>
                    </Link>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </FadeIn>
      )}

      {!isBrowsing && (
        <>
          <FadeIn delay={80}>
            <p className="text-sm text-gray-500 mb-4">
              {products.length} {products.length === 1 ? "product" : "products"} found
            </p>
          </FadeIn>

          {products.length === 0 ? (
            <FadeIn delay={100}>
              <p className="text-gray-500">
                No products match your search.{" "}
                <Link href="/products" className="text-blue-700 underline">
                  Reset
                </Link>
              </p>
            </FadeIn>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((p, i) => (
                <FadeIn key={p.id} delay={Math.min(i, 8) * 60}>
                  <ProductCard
                    id={p.id}
                    productName={p.productName}
                    price={p.price.toString()}
                    image={p.images[0] ?? null}
                    categoryName={p.category?.categoryName}
                    brandName={p.brand?.brandName}
                    quantity={p.quantity}
                    featured={p.featured}
                  />
                </FadeIn>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}