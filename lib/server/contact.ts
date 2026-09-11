import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/server/settings";
import { Resend } from "resend";

export type ContactInput = {
  name: string;
  email: string;
  message: string;
  preferredContact: string;
  contactDetail: string;
};

export type ContactResult = {
  success: boolean;
  error: string;
};

const VALID_METHODS = ["Email", "Viber", "Messenger"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContactInput(input: ContactInput): string | null {
  if (!input.name || !input.email || !input.message) {
    return "Please fill in all fields.";
  }

  if (!EMAIL_PATTERN.test(input.email)) {
    return "Please enter a valid email address.";
  }

  if (!VALID_METHODS.includes(input.preferredContact)) {
    return "Please select a valid contact method.";
  }

  if (
    (input.preferredContact === "Viber" || input.preferredContact === "Messenger") &&
    !input.contactDetail
  ) {
    return input.preferredContact === "Viber"
      ? "Please enter your Viber number."
      : "Please enter your Messenger username or link.";
  }

  return null;
}

async function notifyAdmin(input: ContactInput) {
  try {
    const settings = await getSiteSettings();
    const adminEmail = settings?.contactEmail;

    if (adminEmail && process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "MaverickMind Website <onboarding@resend.dev>",
        to: adminEmail,
        replyTo: input.email,
        subject: `New inquiry from ${input.name}`,
        text: `Name: ${input.name}\nEmail: ${input.email}\nPreferred contact: ${input.preferredContact}${
          input.contactDetail ? ` (${input.contactDetail})` : ""
        }\n\nMessage:\n${input.message}`,
      });
    }
  } catch (e) {
    // Don't fail the form submission just because the email notification failed
    console.error("Failed to send email notification:", e);
  }
}

/** Validates, stores, and (if configured) emails a notification for a contact inquiry. */
export async function submitContactMessage(
  rawInput: ContactInput
): Promise<ContactResult> {
  const input: ContactInput = {
    name: rawInput.name.trim(),
    email: rawInput.email.trim(),
    message: rawInput.message.trim(),
    preferredContact: (rawInput.preferredContact || "Email").trim(),
    contactDetail: rawInput.contactDetail.trim(),
  };

  const validationError = validateContactInput(input);
  if (validationError) {
    return { success: false, error: validationError };
  }

  await prisma.inquiry.create({
    data: {
      name: input.name,
      email: input.email,
      message: input.message,
      preferredContact: input.preferredContact,
      contactDetail: input.contactDetail || null,
    },
  });

  await notifyAdmin(input);

  return { success: true, error: "" };
}
