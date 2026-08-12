"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type SettingsFormState = { error: string; success?: string };

export async function updateContactLinks(
  _prevState: SettingsFormState,
  formData: FormData
): Promise<SettingsFormState> {
  const contactEmail = ((formData.get("contact_email") as string) || "").trim() || null;
  const messengerUrl = ((formData.get("messenger_url") as string) || "").trim() || null;
  const viberUrl = ((formData.get("viber_url") as string) || "").trim() || null;

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: { contactEmail, messengerUrl, viberUrl },
    create: { id: 1, contactEmail, messengerUrl, viberUrl },
  });

  revalidatePath("/admin/settings");
  revalidatePath("/contact");
  return { error: "", success: "Contact links updated." };
}