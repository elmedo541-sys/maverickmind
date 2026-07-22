import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import type { Prisma } from "@prisma/client";

export const metadata = { title: "Products" };

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { search?: string; category?: string; brand?: string };
}) {
  const search = searchParams.search?.trim() || "";
  const categoryId = searchParams.category ? Number(searchParams.category) : undefined;
  const brandId = searchParams.brand ? Number(searchParams.brand) : undefined;

  const where: Prisma.ProductWhereInput = {
    ...(search ? { productName: { contains: search, mode: "insensitive" } } : {}),
    ...(categoryId ? { categoryId } : {}),
    ...(brandId ? { brandId } : {}),
  };

  const [products, categories, brands] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true, brand: true },
      orderBy: { id: "desc" },
    }),
    prisma.category.findMany({ orderBy: { categoryName: "asc" } }),
    prisma.brand.findMany({ orderBy: { brandName: "asc" } }),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-navy mb-8">Products</h1>

      <form className="grid sm:grid-cols-4 gap-3 mb-10 bg-white p-4 rounded-lg shadow-sm">
        <input
          type="text"
          name="search"
          placeholder="Search products..."
          defaultValue={search}
          className="border rounded px-3 py-2 text-sm sm:col-span-2"
        />
        <select
          name="category"
          defaultValue={searchParams.category || ""}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.categoryName}
            </option>
          ))}
        </select>
        <select
          name="brand"
          defaultValue={searchParams.brand || ""}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="">All Brands</option>
          {brands.map((b) => (
            <option key={b.id} value={b.id}>
              {b.brandName}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="sm:col-span-4 bg-navy text-white rounded px-4 py-2 text-sm font-medium hover:bg-navyLight"
        >
          Apply Filters
        </button>
      </form>

      {products.length === 0 ? (
        <p className="text-gray-500">
          No products match your filters.{" "}
          <Link href="/products" className="text-blue-700 underline">
            Reset
          </Link>
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              productName={p.productName}
              price={p.price.toString()}
             image={p.images[0] ?? null}
              categoryName={p.category?.categoryName}
            />
          ))}
        </div>
      )}
    </div>
  );
}
