import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import FadeIn from "@/components/FadeIn";
import { searchProducts, getBrowseCategories } from "@/lib/server/products";

export const metadata = { title: "Products" };

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { search?: string; category?: string; brand?: string; all?: string };
}) {
  const search = searchParams.search?.trim() || "";
  const categoryId = searchParams.category ? Number(searchParams.category) : undefined;
  const brandId = searchParams.brand ? Number(searchParams.brand) : undefined;
  const showAll = searchParams.all === "1";

  const isBrowsing = !search && !categoryId && !brandId && !showAll;

  const [products, categoryTiles] = await Promise.all([
    isBrowsing ? Promise.resolve([]) : searchProducts({ search, categoryId, brandId }),
    isBrowsing ? getBrowseCategories() : Promise.resolve([]),
  ]);

  return (
    <div className="mx-auto w-full max-w-[1800px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16 xl:px-10">
      <FadeIn>
        <section className="relative mb-10 overflow-hidden rounded-3xl bg-[#39456b] px-6 py-9 shadow-xl sm:px-8 lg:px-10 lg:py-11">
          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="relative grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-200">
                Product Catalog
              </p>
              <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                Security &amp; communication products.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-200 sm:text-base">
                Browse categories or search the catalog to find products for your CCTV, fire alarm, communication and networking requirements.
              </p>
            </div>

            <form className="w-full lg:w-auto">
              <div className="flex w-full flex-col gap-2 sm:flex-row lg:min-w-[430px]">
                <input
                  type="text"
                  name="search"
                  placeholder="Search products..."
                  defaultValue={search}
                  className="min-w-0 flex-1 rounded-xl border border-white/15 bg-white px-4 py-3 text-base text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 focus:ring-blue-300 sm:text-sm"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-500"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          <div className="relative mt-7 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
            <Link
              href="/products"
              className="rounded-lg bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/15"
            >
              Browse Categories
            </Link>
            <Link
              href="/products?all=1"
              className="rounded-lg bg-white px-4 py-2 text-xs font-bold text-navy transition hover:bg-gray-100"
            >
              View All Products
            </Link>
          </div>
        </section>
      </FadeIn>

      {isBrowsing && categoryTiles.length > 0 && (
        <section>
          <FadeIn delay={60}>
            <div className="mb-7">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
                Categories
              </p>
              <h2 className="text-2xl font-bold text-navy sm:text-3xl">
                Browse by category
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 lg:gap-5">
            {categoryTiles.map((category, index) => {
              const coverImage = category.products[0]?.images[0] ?? null;

              return (
                <FadeIn key={category.id} delay={Math.min(index, 10) * 45}>
                  <Link
                    href={`/products?category=${category.id}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f6f7fb]">
                      {coverImage ? (
                        <Image
                          src={coverImage}
                          alt={category.categoryName}
                          fill
                          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 items-end justify-between gap-3 p-4">
                      <div>
                        <p className="text-sm font-bold text-navy sm:text-base">
                          {category.categoryName}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {category._count.products} {category._count.products === 1 ? "product" : "products"}
                        </p>
                      </div>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
                        →
                      </span>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </section>
      )}

      {!isBrowsing && (
        <section>
          <FadeIn delay={70}>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500">
                  {products.length} {products.length === 1 ? "product" : "products"} found
                </p>
                {search && (
                  <p className="mt-1 text-sm text-gray-600">
                    Search results for <span className="font-semibold text-navy">“{search}”</span>
                  </p>
                )}
              </div>

              {(search || categoryId || brandId) && (
                <Link
                  href="/products"
                  className="text-sm font-bold text-blue-700 hover:underline"
                >
                  Clear filters
                </Link>
              )}
            </div>
          </FadeIn>

          {products.length === 0 ? (
            <FadeIn delay={100}>
              <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-12">
                <h2 className="text-xl font-bold text-navy">No products found</h2>
                <p className="mt-2 text-sm text-gray-500">
                  Try another search or return to the product categories.
                </p>
                <Link
                  href="/products"
                  className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
                >
                  Browse Categories
                </Link>
              </div>
            </FadeIn>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 lg:gap-5">
              {products.map((product, index) => (
                <FadeIn key={product.id} delay={Math.min(index, 10) * 45}>
                  <ProductCard
                    id={product.id}
                    productName={product.productName}
                    image={product.images[0] ?? null}
                    categoryName={product.category?.categoryName}
                    brandName={product.brand?.brandName}
                    featured={product.featured}
                  />
                </FadeIn>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
