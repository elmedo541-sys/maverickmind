import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

// Categories rarely change, but the Navbar needs them on every single page
// (it's in the root layout). Without caching, that's a database round-trip
// on every navigation. This caches the result for 60 seconds so most page
// loads skip the database entirely.
export const getNavCategories = unstable_cache(
  async () => {
    const categories = await prisma.category.findMany({
      orderBy: { categoryName: "asc" },
      include: {
        products: {
          where: { brandId: { not: null } },
          select: { brandId: true, brand: { select: { brandName: true } } },
        },
      },
    });

    return categories.map((c) => {
      const brandMap = new Map<number, string>();
      for (const p of c.products) {
        if (p.brandId && p.brand) brandMap.set(p.brandId, p.brand.brandName);
      }
      const brands = Array.from(brandMap.entries())
        .map(([id, brandName]) => ({ id, brandName }))
        .sort((a, b) => a.brandName.localeCompare(b.brandName));

      return { id: c.id, categoryName: c.categoryName, brands };
    });
  },
  ["nav-categories"],
  { revalidate: 60 }
);