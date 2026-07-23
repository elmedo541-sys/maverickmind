import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductGallery from "@/components/ProductGallery";
import { formatPrice } from "@/lib/formatPrice";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const id = Number(params.id);
  if (Number.isNaN(id)) return {};

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return {};

  const description = product.description.slice(0, 155);

  return {
    title: product.productName,
    description,
    openGraph: {
      title: `${product.productName} | MaverickMind`,
      description,
      images: product.images.length > 0 ? [product.images[0]] : [],
    },
  };
}

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
        <ProductGallery images={product.images} productName={product.productName} />

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
            ₱{formatPrice(product.price.toString())}
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