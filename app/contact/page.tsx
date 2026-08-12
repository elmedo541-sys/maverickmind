import ContactForm from "./ContactForm";
import ContactIcons from "@/components/ContactIcons";
import FadeIn from "@/components/FadeIn";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Contact" };

export default async function ContactPage() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });

  return (
    <div className="max-w-2xl mx-auto px-6 py-14">
      <FadeIn>
        <h1 className="text-3xl font-bold text-navy mb-2 text-center">
          Contact Us
        </h1>
        <p className="text-gray-500 mb-6 text-center">
          Have a question about our products or services? Reach out directly
          or send us a message below.
        </p>
      </FadeIn>
      <FadeIn delay={60}>
        <ContactIcons
          contactEmail={settings?.contactEmail}
          messengerUrl={settings?.messengerUrl}
          viberUrl={settings?.viberUrl}
        />
      </FadeIn>
      <FadeIn delay={100}>
        <ContactForm />
      </FadeIn>
    </div>
  );
}