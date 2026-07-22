import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductForm from "../../ProductForm";
import { updateProduct } from "../../actions";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (Number.isNaN(id)) notFound();

  const [product, categories, brands] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { categoryName: "asc" } }),
    prisma.brand.findMany({ orderBy: { brandName: "asc" } }),
  ]);

  if (!product) notFound();

  const boundUpdate = updateProduct.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-8">Edit Product</h1>
      <ProductForm
        categories={categories}
        brands={brands}
        action={boundUpdate}
        mode="edit"
        defaultValues={{
          productName: product.productName,
          modelNumber: product.modelNumber ?? undefined,
          categoryId: product.categoryId,
          brandId: product.brandId,
          price: product.price.toString(),
          quantity: product.quantity,
          description: product.description,
          images: product.images,
        }}
      />
    </div>
  );
}