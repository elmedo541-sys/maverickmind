import ContactForm from "./ContactForm";
import ContactIcons from "@/components/ContactIcons";
import FadeIn from "@/components/FadeIn";
import { getSiteSettings } from "@/lib/server/settings";

export const metadata = { title: "Contact" };

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto w-full max-w-[1800px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16 xl:px-10">
      <FadeIn>
        <section className="mb-8 rounded-2xl bg-[#39456b] px-6 py-10 shadow-lg sm:px-8 lg:px-12 lg:py-12">
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">Contact Maverick Minds</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-200 sm:text-base">
              For product inquiries, quotations, model availability or technical questions, send us a message below. If you already know the product model or quantity you need, include it in your message.
            </p>
          </div>
        </section>
      </FadeIn>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <FadeIn delay={60}>
          <aside className="h-full rounded-2xl bg-[#303b60] p-6 text-white shadow-sm sm:p-8 lg:p-10">
            <h2 className="text-2xl font-bold sm:text-3xl">Contact information</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-200">
              You can reach us through email, phone, Viber or Messenger. You can also use the inquiry form and choose your preferred contact method.
            </p>

            <div className="mt-7 rounded-xl border border-white/10 bg-white/10 p-5">
              <ContactIcons contactEmail={settings?.contactEmail} messengerUrl={settings?.messengerUrl} viberUrl={settings?.viberUrl} />

              <div className="space-y-5 text-sm">
                {settings?.contactEmail && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-blue-200">Email</p>
                    <a href={`mailto:${settings.contactEmail}`} className="mt-1 block break-all font-semibold text-white hover:text-blue-200">
                      {settings.contactEmail}
                    </a>
                  </div>
                )}

                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-blue-200">Phone</p>
                  <a href="tel:+639985834657" className="mt-1 block font-semibold text-white hover:text-blue-200">0998 583 4657</a>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-blue-200">Viber</p>
                  <a href="viber://chat?number=%2B639255864638" className="mt-1 block font-semibold text-white hover:text-blue-200">0925 586 4638</a>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/10 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-blue-200">Cebu Office</p>
                <p className="mt-2 text-sm leading-6 text-gray-200">
                  Door 2, G. K. Chua Bldg., Lopez Jaena Street, Subangdaku, Mandaue City 6014, Philippines
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/10 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-blue-200">CDO Office</p>
                <p className="mt-2 text-sm leading-6 text-gray-200">
                  J.P. Borja Extension, Barangay Gusa, Cagayan De Oro City 9000, Philippines
                </p>
              </div>
            </div>
          </aside>
        </FadeIn>

        <FadeIn delay={100}>
          <section className="h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="mb-7">
              <h2 className="text-2xl font-bold text-navy sm:text-3xl">Send an inquiry</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                Fill in the form and we&apos;ll reply using the contact method you select.
              </p>
            </div>

            <ContactForm />
          </section>
        </FadeIn>
      </div>
    </div>
  );
}
