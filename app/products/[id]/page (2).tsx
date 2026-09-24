import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductGallery from "@/components/ProductGallery";
import ProductCard from "@/components/ProductCard";
import FadeIn from "@/components/FadeIn";
import {
  getProductById,
  getProductMetaById,
  getRelatedProducts,
} from "@/lib/server/products";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const id = Number(params.id);
  if (Number.isNaN(id)) return {};

  const product = await getProductMetaById(id);
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

  const product = await getProductById(id);
  if (!product) notFound();

  const relatedProducts = await getRelatedProducts(product.categoryId, product.id);

  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 xl:px-10">
      <FadeIn>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 transition hover:-translate-x-1"
        >
          <span aria-hidden="true">←</span> Back to Products
        </Link>
      </FadeIn>

      <section className="mt-6 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
          <FadeIn>
            <div className="h-full bg-[#f6f7fb] p-5 sm:p-7 lg:p-9">
              <ProductGallery images={product.images} productName={product.productName} />
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="flex h-full flex-col p-6 sm:p-8 lg:p-10 xl:p-12">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
                {product.category?.categoryName || "Product"}
                {product.brand ? ` · ${product.brand.brandName}` : ""}
              </p>

              <h1 className="mt-3 text-3xl font-bold leading-tight text-navy sm:text-4xl">
                {product.productName}
              </h1>

              {product.modelNumber && (
                <div className="mt-4 inline-flex w-fit rounded-full bg-[#f6f7fb] px-3 py-1.5 text-xs font-semibold text-gray-600">
                  Model: {product.modelNumber}
                </div>
              )}

              <div className="mt-7 border-t border-gray-100 pt-7">
                <h2 className="text-sm font-bold uppercase tracking-wide text-navy">Description</h2>
                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-gray-600 sm:text-base">
                  {product.description}
                </p>
              </div>

              <div className="mt-auto pt-8">
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-md sm:w-auto"
                >
                  Inquire About This Product
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="mt-14 lg:mt-16">
          <FadeIn>
            <div className="mb-7">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
                You May Also Like
              </p>
              <h2 className="text-2xl font-bold text-navy sm:text-3xl">Related Products</h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {relatedProducts.map((related, index) => (
              <FadeIn key={related.id} delay={index * 55}>
                <ProductCard
                  id={related.id}
                  productName={related.productName}
                  image={related.images[0] ?? null}
                  categoryName={related.category?.categoryName}
                  brandName={related.brand?.brandName}
                  featured={related.featured}
                />
              </FadeIn>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
