import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

// Categories rarely change, but the Navbar needs them on every single page
// (it's in the root layout). Without caching, that's a database round-trip
// on every navigation. This caches the result for 60 seconds so most page
// loads skip the database entirely.
export const getNavCategories = unstable_cache(
  async () => {
    return prisma.category.findMany({
      orderBy: { categoryName: "asc" },
    });
  },
  ["nav-categories"],
  { revalidate: 60 }
);