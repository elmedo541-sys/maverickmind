import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (Number.isNaN(id)) notFound();

  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true, brand: true },
  });

  if (!product) notFound();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <Link href="/products" className="text-blue-700 text-sm">
        &larr; Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-10 mt-6">
        <div className="relative w-full h-80 bg-white rounded-lg shadow-sm">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.productName}
              fill
              className="object-contain p-4"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No image available
            </div>
          )}
        </div>

        <div>
          <h1 className="text-2xl font-bold text-navy mb-2">
            {product.productName}
          </h1>
          <p className="text-gray-500 text-sm mb-1">
            {product.category?.categoryName || "Uncategorized"}
            {product.brand ? ` · ${product.brand.brandName}` : ""}
          </p>
          {product.modelNumber && (
            <p className="text-gray-500 text-sm mb-4">
              Model: {product.modelNumber}
            </p>
          )}
          <p className="text-2xl font-bold text-blue-700 mb-4">
            ₱{Number(product.price).toFixed(2)}
          </p>
          <p className="text-sm text-gray-600 mb-6">
            {product.quantity > 0
              ? `${product.quantity} in stock`
              : "Currently out of stock"}
          </p>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {product.description}
          </p>

          <Link
            href="/contact"
            className="inline-block mt-8 bg-navy text-white px-6 py-3 rounded font-semibold hover:bg-navyLight"
          >
            Inquire About This Product
          </Link>
        </div>
      </div>
    </div>
  );
}
