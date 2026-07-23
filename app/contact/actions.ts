"use server";

import { prisma } from "@/lib/prisma";

export type ContactState = {
  success: boolean;
  error: string;
};

const VALID_METHODS = ["Email", "Viber", "Messenger"];

export async function sendMessage(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = (formData.get("name") as string || "").trim();
  const email = (formData.get("email") as string || "").trim();
  const message = (formData.get("message") as string || "").trim();
  const preferredContact = (formData.get("preferred_contact") as string || "Email").trim();
  const contactDetail = (formData.get("contact_detail") as string || "").trim();

  if (!name || !email || !message) {
    return { success: false, error: "Please fill in all fields." };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  if (!VALID_METHODS.includes(preferredContact)) {
    return { success: false, error: "Please select a valid contact method." };
  }

  if (
    (preferredContact === "Viber" || preferredContact === "Messenger") &&
    !contactDetail
  ) {
    return {
      success: false,
      error:
        preferredContact === "Viber"
          ? "Please enter your Viber number."
          : "Please enter your Messenger username or link.",
    };
  }

  await prisma.inquiry.create({
    data: {
      name,
      email,
      message,
      preferredContact,
      contactDetail: contactDetail || null,
    },
  });

  return { success: true, error: "" };
}