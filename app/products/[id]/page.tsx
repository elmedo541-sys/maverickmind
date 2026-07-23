import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductGallery from "@/components/ProductGallery";
import ProductCard from "@/components/ProductCard";
import { formatPrice } from "@/lib/formatPrice";
import FadeIn from "@/components/FadeIn";

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

  const relatedProducts = product.categoryId
    ? await prisma.product.findMany({
        where: {
          categoryId: product.categoryId,
          id: { not: product.id },
        },
        include: { category: true, brand: true },
        orderBy: { id: "desc" },
        take: 4,
      })
    : [];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <Link
        href="/products"
        className="text-blue-700 text-sm transition hover:-translate-x-1 inline-block"
      >
        &larr; Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-10 mt-6">
        <FadeIn>
          <ProductGallery images={product.images} productName={product.productName} />
        </FadeIn>

        <FadeIn delay={120}>
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
              className="inline-block mt-8 bg-navy text-white px-6 py-3 rounded font-semibold hover:bg-navyLight transition transform hover:scale-105"
            >
              Inquire About This Product
            </Link>
          </div>
        </FadeIn>
      </div>

      {relatedProducts.length > 0 && (
        <FadeIn delay={100} className="mt-16">
          <h2 className="text-xl font-bold text-navy mb-6">
            Related Products
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {relatedProducts.map((p, i) => (
              <FadeIn key={p.id} delay={i * 60}>
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
        </FadeIn>
      )}
    </div>
  );
}