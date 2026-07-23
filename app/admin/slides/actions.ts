"use server";

import { prisma } from "@/lib/prisma";
import { put, del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const ALLOWED_EXT = ["jpg", "jpeg", "png", "webp"];

async function uploadImage(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null;

  const ext = file.name.split(".").pop()?.toLowerCase() || "";
  if (!ALLOWED_EXT.includes(ext)) {
    throw new Error("Only JPG, JPEG, PNG and WEBP images are allowed.");
  }

  const blob = await put(`slides/${Date.now()}-${file.name}`, file, {
    access: "public",
  });

  return blob.url;
}

export type SlideFormState = { error: string };

export async function createSlide(
  _prevState: SlideFormState,
  formData: FormData
): Promise<SlideFormState> {
  const title = (formData.get("title") as string || "").trim() || null;
  const subtitle = (formData.get("subtitle") as string || "").trim() || null;
  const linkUrl = (formData.get("link_url") as string || "").trim() || null;
  const linkLabel = (formData.get("link_label") as string || "").trim() || null;
  const active = formData.get("active") === "on";
  const file = formData.get("image") as File | null;

  let imageUrl: string | null = null;
  try {
    imageUrl = await uploadImage(file);
  } catch (e) {
    return { error: (e as Error).message };
  }

  if (!imageUrl) {
    return { error: "Please upload an image for this slide." };
  }

  const count = await prisma.slide.count();

  await prisma.slide.create({
    data: {
      title,
      subtitle,
      image: imageUrl,
      linkUrl,
      linkLabel,
      active,
      position: count,
    },
  });

  revalidatePath("/admin/slides");
  revalidatePath("/");
  redirect("/admin/slides");
}

export async function updateSlide(
  id: number,
  _prevState: SlideFormState,
  formData: FormData
): Promise<SlideFormState> {
  const title = (formData.get("title") as string || "").trim() || null;
  const subtitle = (formData.get("subtitle") as string || "").trim() || null;
  const linkUrl = (formData.get("link_url") as string || "").trim() || null;
  const linkLabel = (formData.get("link_label") as string || "").trim() || null;
  const active = formData.get("active") === "on";
  const file = formData.get("image") as File | null;

  let imageUrl: string | undefined;
  try {
    const uploaded = await uploadImage(file);
    if (uploaded) imageUrl = uploaded;
  } catch (e) {
    return { error: (e as Error).message };
  }

  if (imageUrl) {
    const existing = await prisma.slide.findUnique({ where: { id } });
    if (existing?.image) {
      await del(existing.image).catch(() => {});
    }
  }

  await prisma.slide.update({
    where: { id },
    data: {
      title,
      subtitle,
      linkUrl,
      linkLabel,
      active,
      ...(imageUrl ? { image: imageUrl } : {}),
    },
  });

  revalidatePath("/admin/slides");
  revalidatePath("/");
  redirect("/admin/slides");
}

export async function deleteSlide(id: number) {
  const slide = await prisma.slide.findUnique({ where: { id } });
  if (slide?.image) {
    await del(slide.image).catch(() => {});
  }

  await prisma.slide.delete({ where: { id } });

  revalidatePath("/admin/slides");
  revalidatePath("/");
}

export async function toggleSlideActive(id: number) {
  const slide = await prisma.slide.findUnique({ where: { id } });
  if (!slide) return;

  await prisma.slide.update({
    where: { id },
    data: { active: !slide.active },
  });

  revalidatePath("/admin/slides");
  revalidatePath("/");
}

export async function moveSlide(id: number, direction: "up" | "down") {
  const slides = await prisma.slide.findMany({ orderBy: { position: "asc" } });
  const index = slides.findIndex((s) => s.id === id);
  if (index === -1) return;

  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (swapWith < 0 || swapWith >= slides.length) return;

  const a = slides[index];
  const b = slides[swapWith];

  await prisma.$transaction([
    prisma.slide.update({ where: { id: a.id }, data: { position: b.position } }),
    prisma.slide.update({ where: { id: b.id }, data: { position: a.position } }),
  ]);

  revalidatePath("/admin/slides");
  revalidatePath("/");
}