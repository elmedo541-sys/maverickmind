import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import FadeIn from "@/components/FadeIn";
import { searchProducts, getBrowseCategories } from "@/lib/server/products";

export const metadata = { title: "Products" };

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: {
    search?: string;
    category?: string;
    brand?: string;
    all?: string;
    letter?: string;
  };
}) {
  const search = searchParams.search?.trim() || "";
  const categoryId = searchParams.category
    ? Number(searchParams.category)
    : undefined;
  const brandId = searchParams.brand ? Number(searchParams.brand) : undefined;
  const showAll = searchParams.all === "1";

  const requestedLetter = searchParams.letter?.toUpperCase() || "";
  const letter = /^[A-Z]$/.test(requestedLetter) ? requestedLetter : "";

  const isBrowsing = !search && !categoryId && !brandId && !showAll;

  const [products, categoryTiles] = await Promise.all([
    isBrowsing
      ? Promise.resolve([])
      : searchProducts({ search, categoryId, brandId }),
    isBrowsing ? getBrowseCategories() : Promise.resolve([]),
  ]);

  const sortedProducts = [...products].sort((a, b) =>
    a.productName.localeCompare(b.productName, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  );

  const filteredProducts = letter
    ? sortedProducts.filter((product) =>
        product.productName.trim().toUpperCase().startsWith(letter)
      )
    : sortedProducts;

  function buildLetterHref(nextLetter?: string) {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (categoryId) params.set("category", String(categoryId));
    if (brandId) params.set("brand", String(brandId));
    if (showAll) params.set("all", "1");
    if (nextLetter) params.set("letter", nextLetter);

    const query = params.toString();
    return query ? `/products?${query}` : "/products";
  }

  return (
    <div className="mx-auto w-full max-w-[1800px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 xl:px-10">
      <FadeIn>
        <section className="relative mb-8 overflow-hidden rounded-2xl bg-[#39456b] px-5 py-7 shadow-xl sm:mb-10 sm:rounded-3xl sm:px-8 sm:py-9 lg:px-10 lg:py-11">
          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-8">
            <div className="max-w-3xl">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-200 sm:text-xs">
                Product Catalog
              </p>

              <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                Find the product you need.
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-200 sm:text-base">
                Search by model or browse the categories below. You can contact
                us if you need help checking compatibility.
              </p>
            </div>

            <form className="w-full lg:w-auto" role="search">
              <label htmlFor="product-search" className="sr-only">
                Search products
              </label>

              <div className="flex w-full flex-col gap-2 sm:flex-row lg:min-w-[430px]">
                <input
                  id="product-search"
                  type="search"
                  name="search"
                  placeholder="Search model or product name"
                  defaultValue={search}
                  className="min-h-12 min-w-0 flex-1 rounded-xl border border-white/15 bg-white px-4 py-3 text-base text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 focus:ring-blue-300"
                />

                <button
                  type="submit"
                  className="min-h-12 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-500 active:scale-[0.99]"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          <div className="relative mt-6 flex flex-wrap items-center gap-2.5 border-t border-white/10 pt-5 sm:mt-7 sm:gap-3">
            <Link
              href="/products"
              className="inline-flex min-h-10 items-center rounded-lg bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/15"
            >
              Categories
            </Link>

            <Link
              href="/products?all=1"
              className="inline-flex min-h-10 items-center rounded-lg bg-white px-4 py-2 text-xs font-bold text-navy transition hover:bg-gray-100"
            >
              All Products
            </Link>
          </div>
        </section>
      </FadeIn>

      {isBrowsing && categoryTiles.length > 0 && (
        <section>
          <FadeIn delay={60}>
            <div className="mb-6 sm:mb-7">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-700 sm:text-xs">
                Categories
              </p>

              <h2 className="text-2xl font-bold text-navy sm:text-3xl">
                Browse by category
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 lg:gap-5 xl:grid-cols-6">
            {categoryTiles.map((category, index) => {
              const coverImage = category.products[0]?.images[0] ?? null;

              return (
                <FadeIn key={category.id} delay={Math.min(index, 10) * 45}>
                  <Link
                    href={`/products?category=${category.id}`}
                    className="touch-no-lift group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl active:scale-[0.99]"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f6f7fb]">
                      {coverImage ? (
                        <Image
                          src={coverImage}
                          alt={category.categoryName}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 17vw"
                          className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.04] sm:p-4"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center px-2 text-center text-xs text-gray-400">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 items-end justify-between gap-2 p-3.5 sm:gap-3 sm:p-4">
                      <div className="min-w-0">
                        <p className="line-clamp-2 text-sm font-bold text-navy sm:text-base">
                          {category.categoryName}
                        </p>

                        <p className="mt-1 text-[11px] text-gray-500 sm:text-xs">
                          {category._count.products}{" "}
                          {category._count.products === 1
                            ? "product"
                            : "products"}
                        </p>
                      </div>

                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white"
                        aria-hidden="true"
                      >
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
          <FadeIn delay={60}>
            <div className="mb-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:mb-6 sm:p-5">
              <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-bold text-navy">Filter A-Z</p>
                  <p className="text-xs text-gray-500">
                    Choose the first letter of the product name.
                  </p>
                </div>

                {letter && (
                  <p className="text-xs font-semibold text-blue-700">
                    Showing products starting with “{letter}”
                  </p>
                )}
              </div>

              <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 [scrollbar-width:thin]">
                <Link
                  href={buildLetterHref()}
                  className={`flex h-9 min-w-11 shrink-0 items-center justify-center rounded-lg border px-3 text-xs font-bold transition ${
                    !letter
                      ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                      : "border-gray-200 bg-gray-50 text-navy hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  All
                </Link>

                {ALPHABET.map((item) => (
                  <Link
                    key={item}
                    href={buildLetterHref(item)}
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border text-xs font-bold transition ${
                      letter === item
                        ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                        : "border-gray-200 bg-gray-50 text-navy hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                    }`}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={70}>
            <div className="mb-5 flex flex-col gap-2 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500">
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1 ? "product" : "products"} found
                </p>

                {search && (
                  <p className="mt-1 text-sm text-gray-600">
                    Results for{" "}
                    <span className="font-semibold text-navy">“{search}”</span>
                  </p>
                )}
              </div>

              {(search || categoryId || brandId || letter) && (
                <Link
                  href={showAll ? "/products?all=1" : "/products"}
                  className="inline-flex min-h-10 items-center self-start text-sm font-bold text-blue-700 hover:underline sm:self-auto"
                >
                  Clear filters
                </Link>
              )}
            </div>
          </FadeIn>

          {filteredProducts.length === 0 ? (
            <FadeIn delay={100}>
              <div className="rounded-2xl border border-gray-200 bg-white p-7 text-center shadow-sm sm:p-12">
                <h2 className="text-xl font-bold text-navy">
                  No products found
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {letter
                    ? `There are no products starting with “${letter}”. Try another letter or show all products.`
                    : "Try another model name or go back to the product categories."}
                </p>

                <Link
                  href={letter ? buildLetterHref() : "/products"}
                  className="mt-5 inline-flex min-h-12 items-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
                >
                  {letter ? "Show All Products" : "Browse Categories"}
                </Link>
              </div>
            </FadeIn>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 lg:gap-5 xl:grid-cols-6">
              {filteredProducts.map((product, index) => (
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
