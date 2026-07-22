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

  const blob = await put(`services/${Date.now()}-${file.name}`, file, {
    access: "public",
  });

  return blob.url;
}

export type ServiceFormState = { error: string };

export async function createService(
  _prevState: ServiceFormState,
  formData: FormData
): Promise<ServiceFormState> {
  const serviceName = (formData.get("service_name") as string || "").trim();
  const description = (formData.get("description") as string || "").trim();
  const file = formData.get("image") as File | null;

  if (!serviceName || !description) {
    return { error: "Please fill in all required fields." };
  }

  let imageUrl: string | null = null;
  try {
    imageUrl = await uploadImageIfProvided(file);
  } catch (e) {
    return { error: (e as Error).message };
  }

  await prisma.service.create({
    data: { serviceName, description, image: imageUrl },
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  redirect("/admin/services");
}

export async function updateService(
  id: number,
  _prevState: ServiceFormState,
  formData: FormData
): Promise<ServiceFormState> {
  const serviceName = (formData.get("service_name") as string || "").trim();
  const description = (formData.get("description") as string || "").trim();
  const file = formData.get("image") as File | null;

  if (!serviceName || !description) {
    return { error: "Please fill in all required fields." };
  }

  let imageUrl: string | undefined;
  try {
    const uploaded = await uploadImageIfProvided(file);
    if (uploaded) imageUrl = uploaded;
  } catch (e) {
    return { error: (e as Error).message };
  }

  await prisma.service.update({
    where: { id },
    data: {
      serviceName,
      description,
      ...(imageUrl ? { image: imageUrl } : {}),
    },
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  redirect("/admin/services");
}

export async function deleteService(id: number) {
  const service = await prisma.service.findUnique({ where: { id } });

  if (service?.image) {
    try {
      await del(service.image);
    } catch {
      // ignore
    }
  }

  await prisma.service.delete({ where: { id } });

  revalidatePath("/admin/services");
  revalidatePath("/services");
}
