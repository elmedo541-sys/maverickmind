import ContactForm from "./ContactForm";
import ContactIcons from "@/components/ContactIcons";
import FadeIn from "@/components/FadeIn";
import { getSiteSettings } from "@/lib/server/settings";

export const metadata = { title: "Contact" };

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-12">
      {/* Contact Hero */}
      <FadeIn>
        <section className="rounded-2xl bg-[#39456b] border border-white/10 shadow-lg px-6 py-9 sm:px-10 sm:py-11 lg:px-12 lg:py-12 mb-8">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12 items-center">
            <div>
              <p className="text-blue-200 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-3">
                Get In Touch
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Contact Maverick Minds, Inc.
              </h1>
              <p className="text-gray-200 mt-4 max-w-3xl leading-7">
                Have a question about our products, system solutions, or
                technical services? Contact us directly or send us a message
                using the inquiry form.
              </p>
            </div>

            <div className="rounded-xl bg-white/10 border border-white/15 p-5 sm:p-6">
              <p className="text-sm font-semibold text-white mb-2">
                We can help with
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2 text-sm text-gray-200">
                <div className="rounded-lg bg-white/10 px-4 py-3">
                  Product inquiries and recommendations
                </div>
                <div className="rounded-lg bg-white/10 px-4 py-3">
                  System consultation and technical guidance
                </div>
                <div className="rounded-lg bg-white/10 px-4 py-3">
                  Installation and after-sales concerns
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Main Contact Content */}
      <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-6 lg:gap-8 items-stretch">
        {/* Direct Contact */}
        <FadeIn delay={60}>
          <section className="h-full rounded-2xl bg-[#303b60] border border-white/10 shadow-sm p-6 sm:p-8 lg:p-10">
            <p className="text-blue-200 text-xs font-bold tracking-[0.18em] uppercase mb-2">
              Direct Contact
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Reach us through your preferred channel.
            </h2>
            <p className="text-gray-200 leading-7 mb-7">
              For faster communication, you can contact us through email,
              Messenger, or Viber using the available links below.
            </p>

            <div className="rounded-xl bg-white/10 border border-white/15 p-5 sm:p-6 mb-6">
              <ContactIcons
                contactEmail={settings?.contactEmail}
                messengerUrl={settings?.messengerUrl}
                viberUrl={settings?.viberUrl}
              />

              <div className="space-y-4">
                {settings?.contactEmail && (
                  <div className="border-t border-white/15 pt-4">
                    <p className="text-xs uppercase tracking-wider text-blue-200 mb-1">
                      Email
                    </p>
                    <a
                      href={`mailto:${settings.contactEmail}`}
                      className="text-white font-medium hover:text-blue-200 transition-colors break-all"
                    >
                      {settings.contactEmail}
                    </a>
                  </div>
                )}

                {settings?.messengerUrl && (
                  <div className="border-t border-white/15 pt-4">
                    <p className="text-xs uppercase tracking-wider text-blue-200 mb-1">
                      Messenger
                    </p>
                    <a
                      href={settings.messengerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-medium hover:text-blue-200 transition-colors"
                    >
                      Open Messenger
                    </a>
                  </div>
                )}

                {settings?.viberUrl && (
                  <div className="border-t border-white/15 pt-4">
                    <p className="text-xs uppercase tracking-wider text-blue-200 mb-1">
                      Viber
                    </p>
                    <a
                      href={settings.viberUrl}
                      className="text-white font-medium hover:text-blue-200 transition-colors"
                    >
                      Open Viber
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="rounded-xl bg-white/10 border border-white/15 p-5">
                <h3 className="font-bold text-white mb-2">Product Inquiry</h3>
                <p className="text-sm text-gray-200 leading-6">
                  Ask about CCTV, FDAS, networking, communications, access
                  control, and other ELV products.
                </p>
              </div>

              <div className="rounded-xl bg-white/10 border border-white/15 p-5">
                <h3 className="font-bold text-white mb-2">Technical Support</h3>
                <p className="text-sm text-gray-200 leading-6">
                  Send the details of your concern so our team can review the
                  system requirement and assist you properly.
                </p>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Contact Form */}
        <FadeIn delay={100}>
          <section className="h-full rounded-2xl bg-white border border-gray-200 shadow-sm p-6 sm:p-8 lg:p-10">
            <p className="text-[#59648f] text-xs font-bold tracking-[0.18em] uppercase mb-2">
              Send A Message
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-3">
              Tell us what you need.
            </h2>
            <p className="text-gray-500 leading-7 mb-7 max-w-3xl">
              Fill out the form below and provide as much information as
              possible about the product, project, or technical concern you
              would like us to assist with.
            </p>

            <ContactForm />
          </section>
        </FadeIn>
      </div>
    </div>
  );
}
