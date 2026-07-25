import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/formatPrice";

const LOW_STOCK_THRESHOLD = 5;

export default async function DashboardPage() {
  const [productCount, serviceCount, inquiryCount, outOfStockCount, lowStockProducts] =
    await Promise.all([
      prisma.product.count(),
      prisma.service.count(),
      prisma.inquiry.count(),
      prisma.product.count({ where: { quantity: 0 } }),
      prisma.product.findMany({
        where: { quantity: { lte: LOW_STOCK_THRESHOLD } },
        orderBy: { quantity: "asc" },
        take: 10,
        include: { category: true },
      }),
    ]);

  const stats = [
    { label: "Products", value: productCount },
    { label: "Services", value: serviceCount },
    { label: "Inquiries", value: inquiryCount },
    { label: "Out of Stock", value: outOfStockCount },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-8">Dashboard</h1>
      <div className="grid sm:grid-cols-4 gap-6 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-3xl font-bold text-navy">{s.value}</p>
            <p className="text-gray-500 text-sm mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-navy">
          Low Stock ({LOW_STOCK_THRESHOLD} or fewer)
        </h2>
        <Link
          href="/admin/products"
          className="text-blue-700 text-sm font-medium hover:underline"
        >
          View all products &rarr;
        </Link>
      </div>

      {lowStockProducts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm px-4 py-8 text-center text-gray-500">
          Nothing is low on stock right now.
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Qty Left</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {lowStockProducts.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-3 font-medium text-navy">
                    {p.productName}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {p.category?.categoryName || "—"}
                  </td>
                  <td className="px-4 py-3">₱{formatPrice(p.price.toString())}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                        p.quantity === 0
                          ? "bg-gray-700 text-white"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {p.quantity === 0 ? "Out of stock" : p.quantity}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/products/${p.id}/edit`}
                      className="text-blue-700 hover:underline"
                    >
                      Restock
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}