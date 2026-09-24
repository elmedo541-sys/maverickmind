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
        <section className="relative mb-8 overflow-hidden rounded-3xl bg-[#39456b] px-6 py-10 shadow-xl sm:px-8 lg:px-12 lg:py-14">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="relative max-w-4xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-200">
              Contact Maverick Minds
            </p>
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Let&apos;s talk about your security and communication needs.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-200 sm:text-base">
              Ask about products, services, system requirements or technical support. Send us a message and include as much detail as you can about your project.
            </p>
          </div>
        </section>
      </FadeIn>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <FadeIn delay={60}>
          <aside className="h-full rounded-3xl bg-[#303b60] p-6 text-white shadow-sm sm:p-8 lg:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-200">
              Contact Information
            </p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Reach us directly.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-200">
              Use your preferred contact channel or send the inquiry form. Our team can assist with product questions, system consultation and technical support.
            </p>

            <div className="mt-7 rounded-2xl border border-white/10 bg-white/10 p-5">
              <ContactIcons
                contactEmail={settings?.contactEmail}
                messengerUrl={settings?.messengerUrl}
                viberUrl={settings?.viberUrl}
              />

              <div className="space-y-5 text-sm">
                {settings?.contactEmail && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-blue-200">Email</p>
                    <a
                      href={`mailto:${settings.contactEmail}`}
                      className="mt-1 block break-all font-semibold text-white hover:text-blue-200"
                    >
                      {settings.contactEmail}
                    </a>
                  </div>
                )}

                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-blue-200">Phone</p>
                  <a href="tel:+639985834657" className="mt-1 block font-semibold text-white hover:text-blue-200">
                    0998 583 4657
                  </a>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-blue-200">Viber</p>
                  <a href="viber://chat?number=%2B639255864638" className="mt-1 block font-semibold text-white hover:text-blue-200">
                    0925 586 4638
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-blue-200">Cebu Office</p>
                <p className="mt-2 text-sm leading-6 text-gray-200">
                  Door 2, G. K. Chua Bldg., Lopez Jaena Street, Subangdaku, Mandaue City 6014, Philippines
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-blue-200">CDO Office</p>
                <p className="mt-2 text-sm leading-6 text-gray-200">
                  J.P. Borja Extension, Barangay Gusa, Cagayan De Oro City 9000, Philippines
                </p>
              </div>
            </div>
          </aside>
        </FadeIn>

        <FadeIn delay={100}>
          <section className="h-full rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="mb-7">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
                Send an Inquiry
              </p>
              <h2 className="text-2xl font-bold text-navy sm:text-3xl">
                Tell us how we can help.
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                Fill out the form below and choose how you would like us to contact you back.
              </p>
            </div>

            <ContactForm />
          </section>
        </FadeIn>
      </div>
    </div>
  );
}
