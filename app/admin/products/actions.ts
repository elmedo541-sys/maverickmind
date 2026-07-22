"use server";

import { prisma } from "@/lib/prisma";
import { put, del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const ALLOWED_EXT = ["jpg", "jpeg", "png", "webp"];

async function uploadImages(files: File[]): Promise<string[]> {
  const validFiles = files.filter((f) => f && f.size > 0);
  if (validFiles.length === 0) return [];

  for (const file of validFiles) {
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    if (!ALLOWED_EXT.includes(ext)) {
      throw new Error("Only JPG, JPEG, PNG and WEBP images are allowed.");
    }
  }

  const uploaded = await Promise.all(
    validFiles.map((file) =>
      put(`products/${Date.now()}-${file.name}`, file, { access: "public" })
    )
  );

  return uploaded.map((b) => b.url);
}

export type ProductFormState = { error: string };

export async function createProduct(
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const productName = (formData.get("product_name") as string || "").trim();
  const modelNumber = (formData.get("model_number") as string || "").trim() || null;
  const categoryName = (formData.get("category_name") as string || "").trim();
  const brandName = (formData.get("brand_name") as string || "").trim();
  const price = formData.get("price") as string;
  const quantity = Number(formData.get("quantity") || 0);
  const description = (formData.get("description") as string || "").trim();
  const featured = formData.get("featured") === "on";
  const files = formData.getAll("images") as File[];

  if (!productName || !price || !description) {
    return { error: "Please fill in all required fields." };
  }

  const existing = await prisma.product.findFirst({ where: { productName } });
  if (existing) {
    return { error: "A product with this name already exists." };
  }

  let categoryId: number | null = null;
  if (categoryName) {
    const category = await prisma.category.upsert({
      where: { categoryName },
      update: {},
      create: { categoryName },
    });
    categoryId = category.id;
  }

  let brandId: number | null = null;
  if (brandName) {
    const brand = await prisma.brand.upsert({
      where: { brandName },
      update: {},
      create: { brandName },
    });
    brandId = brand.id;
  }

  let images: string[] = [];
  try {
    images = await uploadImages(files);
  } catch (e) {
    return { error: (e as Error).message };
  }

  await prisma.product.create({
    data: {
      productName,
      modelNumber,
      categoryId: categoryId || null,
      brandId,
      price,
      quantity,
      description,
      images,
      featured,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
  redirect("/admin/products");
}

export async function updateProduct(
  id: number,
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const productName = (formData.get("product_name") as string || "").trim();
  const modelNumber = (formData.get("model_number") as string || "").trim() || null;
  const categoryId = Number(formData.get("category_id"));
  const brandId = Number(formData.get("brand_id")) || null;
  const price = formData.get("price") as string;
  const quantity = Number(formData.get("quantity") || 0);
  const description = (formData.get("description") as string || "").trim();
  const featured = formData.get("featured") === "on";
  const files = formData.getAll("images") as File[];
  const removeUrls = formData.getAll("remove_images") as string[];

  if (!productName || !price || !description) {
    return { error: "Please fill in all required fields." };
  }

  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) {
    return { error: "Product not found." };
  }

  // Remove any photos the admin marked for deletion
  if (removeUrls.length > 0) {
    await Promise.all(removeUrls.map((url) => del(url).catch(() => {})));
  }
  const keptImages = existing.images.filter((url) => !removeUrls.includes(url));

  // Upload any newly added photos
  let newImages: string[] = [];
  try {
    newImages = await uploadImages(files);
  } catch (e) {
    return { error: (e as Error).message };
  }

  const finalImages = [...keptImages, ...newImages];

  await prisma.product.update({
    where: { id },
    data: {
      productName,
      modelNumber,
      categoryId: categoryId || null,
      brandId,
      price,
      quantity,
      description,
      images: finalImages,
      featured,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath(`/products/${id}`);
  revalidatePath("/");
  redirect("/admin/products");
}

export async function deleteProduct(id: number) {
  const product = await prisma.product.findUnique({ where: { id } });

  if (product?.images?.length) {
    await Promise.all(
      product.images.map((url) => del(url).catch(() => {}))
    );
  }

  await prisma.product.delete({ where: { id } });

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
}

export async function toggleFeatured(id: number) {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return;

  await prisma.product.update({
    where: { id },
    data: { featured: !product.featured },
  });

  revalidatePath("/admin/products");
  revalidatePath("/");
}