"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function renameCategory(id: number, newName: string) {
  const name = newName.trim();
  if (!name) return { error: "Category name cannot be empty." };

  const existing = await prisma.category.findFirst({
    where: { categoryName: name, id: { not: id } },
  });
  if (existing) {
    return { error: "Another category already has this name." };
  }

  await prisma.category.update({
    where: { id },
    data: { categoryName: name },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/products");
  revalidatePath("/");
  return { error: "" };
}

export async function deleteCategory(id: number) {
  const count = await prisma.product.count({ where: { categoryId: id } });
  if (count > 0) {
    return {
      error:
        "This category still has products in it. Merge it into another category first.",
    };
  }

  await prisma.category.delete({ where: { id } });

  revalidatePath("/admin/categories");
  revalidatePath("/products");
  revalidatePath("/");
  return { error: "" };
}

export async function mergeCategory(sourceId: number, targetId: number) {
  if (sourceId === targetId) {
    return { error: "Choose a different category to merge into." };
  }

  await prisma.product.updateMany({
    where: { categoryId: sourceId },
    data: { categoryId: targetId },
  });

  await prisma.category.delete({ where: { id: sourceId } });

  revalidatePath("/admin/categories");
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
  return { error: "" };
}