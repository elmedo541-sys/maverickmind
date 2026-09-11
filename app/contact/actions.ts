"use server";

import { submitContactMessage, type ContactResult } from "@/lib/server/contact";

export type ContactState = ContactResult;

export async function sendMessage(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  return submitContactMessage({
    name: (formData.get("name") as string) || "",
    email: (formData.get("email") as string) || "",
    message: (formData.get("message") as string) || "",
    preferredContact: (formData.get("preferred_contact") as string) || "Email",
    contactDetail: (formData.get("contact_detail") as string) || "",
  });
}
