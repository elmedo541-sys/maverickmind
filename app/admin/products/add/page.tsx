import { prisma } from "@/lib/prisma";
import ProductForm from "../ProductForm";
import { createProduct } from "../actions";

export default async function AddProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: { categoryName: "asc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-8">Add Product</h1>
      <ProductForm
        categories={categories}
        brands={[]}
        action={createProduct}
        mode="create"
      />
    </div>
  );
}
