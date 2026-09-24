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
    <main className="w-full">
      <div className="mx-auto w-full max-w-[1800px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12 xl:px-10 2xl:px-12">
        <FadeIn>
          <Link
            href="/products"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg px-1 text-sm font-bold text-blue-700 transition hover:-translate-x-1 hover:text-blue-800"
          >
            <span aria-hidden="true">←</span>
            Back to Products
          </Link>
        </FadeIn>

        <section className="mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-[#40517f] shadow-xl sm:mt-5 sm:rounded-3xl">
          <div className="grid min-h-[620px] lg:grid-cols-[1.15fr_0.85fr] xl:min-h-[680px] xl:grid-cols-[1.2fr_0.8fr]">
            <FadeIn>
              <div className="flex h-full items-center bg-[#f6f7fb] p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
                <div className="mx-auto w-full max-w-[920px]">
                  <ProductGallery
                    images={product.images}
                    productName={product.productName}
                  />
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <div className="flex h-full flex-col p-6 text-white sm:p-8 lg:p-10 xl:p-12 2xl:p-14">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-100 sm:text-sm">
                  {product.category?.categoryName || "Product"}
                  {product.brand ? ` · ${product.brand.brandName}` : ""}
                </p>

                <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl xl:text-[3.25rem]">
                  {product.productName}
                </h1>

                {product.modelNumber && (
                  <div className="mt-5 inline-flex w-fit rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90">
                    Model: {product.modelNumber}
                  </div>
                )}

                <div className="mt-7 border-t border-white/15 pt-7 sm:mt-8 sm:pt-8">
                  <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-white">
                    Product Details
                  </h2>
                  <p className="mt-4 whitespace-pre-line text-sm leading-7 text-white/85 sm:text-base sm:leading-8 lg:text-[17px]">
                    {product.description}
                  </p>
                </div>

                <div className="mt-auto pt-8 sm:pt-10">
                  <Link
                    href="/contact"
                    className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-navy shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-lg sm:w-auto sm:text-base"
                  >
                    Inquire About This Product
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="mt-12 sm:mt-14 lg:mt-16">
            <FadeIn>
              <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
                    More From This Category
                  </p>
                  <h2 className="text-2xl font-bold text-navy sm:text-3xl lg:text-4xl">
                    Related Products
                  </h2>
                </div>

                <Link
                  href={`/products?category=${product.categoryId}`}
                  className="inline-flex min-h-11 items-center text-sm font-bold text-blue-700 hover:text-blue-800"
                >
                  View more products →
                </Link>
              </div>
            </FadeIn>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5 2xl:gap-6">
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
    </main>
  );
}
