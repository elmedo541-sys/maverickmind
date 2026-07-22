import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import DeleteButton from "./DeleteButton";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true, brand: true },
    orderBy: { id: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-navy">Products</h1>
        <Link
          href="/admin/products/add"
          className="bg-navy text-white px-4 py-2 rounded text-sm font-semibold hover:bg-navyLight"
        >
          + Add Product
        </Link>
      </div>

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
                <td className="px-4 py-3">₱{Number(p.price).toFixed(2)}</td>
                <td className="px-4 py-3">{p.quantity}</td>
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
                <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                  No products yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}