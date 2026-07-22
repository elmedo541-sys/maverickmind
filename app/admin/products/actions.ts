"use server";

import { prisma } from "@/lib/prisma";
import { put, del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const ALLOWED_EXT = ["jpg", "jpeg", "png", "webp"];

async function uploadImageIfProvided(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null;

  const ext = file.name.split(".").pop()?.toLowerCase() || "";
  if (!ALLOWED_EXT.includes(ext)) {
    throw new Error("Only JPG, JPEG, PNG and WEBP images are allowed.");
  }

  const blob = await put(`products/${Date.now()}-${file.name}`, file, {
    access: "public",
  });

  return blob.url;
}

export type ProductFormState = { error: string };

export async function createProduct(
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const productName = (formData.get("product_name") as string || "").trim();
  const modelNumber = (formData.get("model_number") as string || "").trim() || null;
  const categoryId = Number(formData.get("category_id"));
  const brandName = (formData.get("brand_name") as string || "").trim();
  const price = formData.get("price") as string;
  const quantity = Number(formData.get("quantity") || 0);
  const description = (formData.get("description") as string || "").trim();
  const file = formData.get("image") as File | null;

  if (!productName || !price || !description) {
    return { error: "Please fill in all required fields." };
  }

  const existing = await prisma.product.findFirst({ where: { productName } });
  if (existing) {
    return { error: "A product with this name already exists." };
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

  let imageUrl: string | null = null;
  try {
    imageUrl = await uploadImageIfProvided(file);
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
      image: imageUrl,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/products");
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
  const file = formData.get("image") as File | null;

  if (!productName || !price || !description) {
    return { error: "Please fill in all required fields." };
  }

  let imageUrl: string | undefined;
  try {
    const uploaded = await uploadImageIfProvided(file);
    if (uploaded) imageUrl = uploaded;
  } catch (e) {
    return { error: (e as Error).message };
  }

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
      ...(imageUrl ? { image: imageUrl } : {}),
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath(`/products/${id}`);
  redirect("/admin/products");
}

export async function deleteProduct(id: number) {
  const product = await prisma.product.findUnique({ where: { id } });

  if (product?.image) {
    try {
      await del(product.image);
    } catch {
      // ignore blob deletion errors (e.g. already removed)
    }
  }

  await prisma.product.delete({ where: { id } });

  revalidatePath("/admin/products");
  revalidatePath("/products");
}
