import ContactForm from "./ContactForm";
import FadeIn from "@/components/FadeIn";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-14">
      <FadeIn>
        <h1 className="text-3xl font-bold text-navy mb-2">Contact Us</h1>
        <p className="text-gray-500 mb-8">
          Have a question about our products or services? Send us a message.
        </p>
      </FadeIn>
      <FadeIn delay={100}>
        <ContactForm />
      </FadeIn>
    </div>
  );
}