import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

const PRODUCT_CARD_INCLUDE = {
  category: true,
  brand: true,
} satisfies Prisma.ProductInclude;

/** Products marked featured + visible, newest first. Used on the homepage. */
export async function getFeaturedProducts(limit = 6) {
  return prisma.product.findMany({
    where: { featured: true, visible: true },
    orderBy: { id: "desc" },
    take: limit,
    include: PRODUCT_CARD_INCLUDE,
  });
}

/**
 * Finds the first category whose name matches one of the given keywords.
 * Used to link the homepage's hard-coded category tiles (CCTV, Fire Alarm,
 * etc.) to whatever the matching category is actually called in the DB.
 */
export async function getCategoryByKeywords(keywords: string[]) {
  return prisma.category.findFirst({
    where: {
      OR: keywords.map((keyword) => ({
        categoryName: { contains: keyword, mode: "insensitive" as const },
      })),
    },
  });
}

export async function getCategoryTileMatches(keywordSets: string[][]) {
  return Promise.all(keywordSets.map((keywords) => getCategoryByKeywords(keywords)));
}

type SearchProductsParams = {
  search?: string;
  categoryId?: number;
  brandId?: number;
};

/** Products list for /products, filtered by search text, category, and/or brand. */
export async function searchProducts({
  search,
  categoryId,
  brandId,
}: SearchProductsParams) {
  const where: Prisma.ProductWhereInput = {
    visible: true,
    ...(search ? { productName: { contains: search, mode: "insensitive" } } : {}),
    ...(categoryId ? { categoryId } : {}),
    ...(brandId ? { brandId } : {}),
  };

  return prisma.product.findMany({
    where,
    include: PRODUCT_CARD_INCLUDE,
    orderBy: { id: "desc" },
  });
}

/** Category tiles (with a cover image + product count) for the default /products browse view. */
export async function getBrowseCategories() {
  const categories = await prisma.category.findMany({
    orderBy: { categoryName: "asc" },
    include: {
      _count: { select: { products: { where: { visible: true } } } },
      products: {
        where: { images: { isEmpty: false }, visible: true },
        take: 1,
        orderBy: { id: "desc" },
        select: { images: true },
      },
    },
  });

  return categories.filter((c) => c._count.products > 0);
}

/** A single visible product for the product detail page. */
export async function getProductById(id: number) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: PRODUCT_CARD_INCLUDE,
  });

  if (!product || !product.visible) return null;
  return product;
}

/** Same-category products to show as "Related Products" on the detail page. */
export async function getRelatedProducts(
  categoryId: number | null,
  excludeId: number,
  limit = 4
) {
  if (!categoryId) return [];

  return prisma.product.findMany({
    where: {
      categoryId,
      id: { not: excludeId },
      visible: true,
    },
    include: PRODUCT_CARD_INCLUDE,
    orderBy: { id: "desc" },
    take: limit,
  });
}

/** Product metadata (for generateMetadata) without the extra includes. */
export async function getProductMetaById(id: number) {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product || !product.visible) return null;
  return product;
}
