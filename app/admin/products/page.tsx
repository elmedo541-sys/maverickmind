import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import DeleteButton from "./DeleteButton";
import FeaturedButton from "./FeaturedButton";
import { formatPrice } from "@/lib/formatPrice";
import type { Prisma } from "@prisma/client";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: { search?: string; category?: string };
}) {
  const search = searchParams.search?.trim() || "";
  const categoryId = searchParams.category ? Number(searchParams.category) : undefined;

  const where: Prisma.ProductWhereInput = {
    ...(search ? { productName: { contains: search, mode: "insensitive" } } : {}),
    ...(categoryId ? { categoryId } : {}),
  };

  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true, brand: true },
      orderBy: { id: "desc" },
    }),
    prisma.category.findMany({ orderBy: { categoryName: "asc" } }),
  ]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy">Products</h1>
        <Link
          href="/admin/products/add"
          className="bg-navy text-white px-4 py-2 rounded text-sm font-semibold hover:bg-navyLight"
        >
          + Add Product
        </Link>
      </div>

      <form className="grid sm:grid-cols-4 gap-3 mb-6 bg-white p-4 rounded-lg shadow-sm">
        <input
          type="text"
          name="search"
          placeholder="Search by product name..."
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
        <button
          type="submit"
          className="bg-navy text-white rounded px-4 py-2 text-sm font-medium hover:bg-navyLight"
        >
          Search
        </button>
      </form>

      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Model</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Brand</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Qty</th>
              <th className="px-4 py-3 text-center">Featured</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-4 py-3">
                  {p.images[0] ? (
                    <div className="relative w-12 h-12">
                      <Image
                        src={p.images[0]}
                        alt={p.productName}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-gray-100 rounded" />
                  )}
                </td>
                <td className="px-4 py-3 font-medium text-navy">
                  {p.productName}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {p.modelNumber || "—"}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {p.category?.categoryName || "—"}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {p.brand?.brandName || "—"}
                </td>
                <td className="px-4 py-3">₱{formatPrice(p.price.toString())}</td>
                <td className="px-4 py-3">{p.quantity}</td>
                <td className="px-4 py-3 text-center">
                  <FeaturedButton id={p.id} featured={p.featured} />
                </td>
                <td className="px-4 py-3 text-right space-x-3 whitespace-nowrap">
                  <Link
                    href={`/admin/products/${p.id}/edit`}
                    className="text-blue-700 hover:underline"
                  >
                    Edit
                  </Link>
                  <DeleteButton id={p.id} />
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-gray-500">
                  No products match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}