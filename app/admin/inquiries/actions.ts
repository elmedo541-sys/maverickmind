"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteInquiry(id: number) {
  await prisma.inquiry.delete({ where: { id } });
  revalidatePath("/admin/inquiries");
}
