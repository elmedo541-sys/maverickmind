import { prisma } from "@/lib/prisma";
import CategoryRow from "./CategoryRow";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { categoryName: "asc" },
    include: { _count: { select: { products: true } } },
  });

  const rows = categories.map((c) => ({
    id: c.id,
    categoryName: c.categoryName,
    productCount: c._count.products,
  }));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy">Categories</h1>
        <p className="text-sm text-gray-500 mt-1">
          Rename, merge, or delete categories. Merging moves all products from
          one category into another, then removes the empty one — useful for
          cleaning up near-duplicate names.
        </p>
      </div>

      {rows.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm px-4 py-8 text-center text-gray-500">
          No categories yet. They&apos;re created automatically when you add
          a product with a new category name.
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Products</th>
                <th className="px-4 py-3">Merge</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <CategoryRow key={c.id} category={c} allCategories={rows} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}