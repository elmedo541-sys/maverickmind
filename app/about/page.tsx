import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata = { title: "About" };

const productAreas = [
  "CCTV and surveillance",
  "Fire alarm systems",
  "Telephone and communication",
  "Networking equipment",
  "Access control and auxiliary systems",
  "Cables, accessories and related devices",
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-[1800px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 xl:px-10">
      <FadeIn>
        <section className="mb-8 overflow-hidden rounded-2xl bg-[#39456b] shadow-lg">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="flex items-center px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
              <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left">
                <div className="logo-float relative h-24 w-24 shrink-0 sm:h-28 sm:w-28">
                  <div className="logo-glow absolute inset-0 rounded-2xl bg-blue-400/20 blur-xl" />
                  <div className="logo-shine relative h-full w-full overflow-hidden rounded-2xl ring-1 ring-white/15">
                    <Image
                      src="/logo.png"
                      alt="Maverick Minds, Inc."
                      fill
                      priority
                      sizes="112px"
                      className="object-cover scale-[1.14]"
                    />
                  </div>
                </div>

                <div>
                  <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                    MAVERICK MINDS, INC.
                  </h1>
                  <p className="mt-3 text-lg font-semibold text-gray-100 sm:text-xl">Minds. Machines. Innovation.</p>
                  <p className="mt-2 text-gray-300">Connecting Technology. Protecting People.</p>
                </div>
              </div>
            </div>

            <div className="flex items-center border-t border-white/10 bg-[#303b60] px-6 py-9 sm:px-10 lg:border-l lg:border-t-0 lg:px-12 lg:py-14">
              <div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">About the company</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-200 sm:text-base">
                  Maverick Minds, Inc. supplies security, communication and networking products for homes, businesses and project requirements. We also provide product information and technical assistance to help customers choose compatible equipment.
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      <div className="mb-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <FadeIn delay={70}>
          <section className="h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            <h2 className="text-2xl font-bold text-navy sm:text-3xl">What we focus on</h2>
            <p className="mt-4 max-w-4xl text-base leading-7 text-gray-600">
              Our work is centered on supplying practical equipment and helping customers understand which products match their system requirements. We aim to keep product selection clear, especially when compatibility between devices matters.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {productAreas.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-[#f6f7fb] px-4 py-3">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600" />
                  <span className="text-sm font-semibold text-navy">{item}</span>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={100}>
          <section className="h-full rounded-2xl bg-[#59648f] p-6 text-white shadow-sm sm:p-8 lg:p-10">
            <h2 className="text-2xl font-bold sm:text-3xl">How we assist customers</h2>

            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-white/10 bg-[#465277] p-5">
                <h3 className="font-bold text-white">Product inquiries</h3>
                <p className="mt-2 text-sm leading-6 text-gray-200">
                  Questions about available models, specifications, brands and product categories.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#465277] p-5">
                <h3 className="font-bold text-white">Compatibility checks</h3>
                <p className="mt-2 text-sm leading-6 text-gray-200">
                  Help checking whether equipment and accessories are suitable for the intended system.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#465277] p-5">
                <h3 className="font-bold text-white">Technical questions</h3>
                <p className="mt-2 text-sm leading-6 text-gray-200">
                  Basic guidance for configuration, product setup and troubleshooting concerns.
                </p>
              </div>
            </div>
          </section>
        </FadeIn>
      </div>

      <FadeIn delay={130}>
        <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <h2 className="text-2xl font-bold text-navy sm:text-3xl">Our offices</h2>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Maverick Minds serves customers from its Cebu and Cagayan de Oro locations.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl bg-[#f6f7fb] p-5">
                <h3 className="font-bold text-navy">Cebu Office</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Door 2, G. K. Chua Bldg., Lopez Jaena Street, Subangdaku, Mandaue City 6014, Philippines
                </p>
              </div>

              <div className="rounded-xl bg-[#f6f7fb] p-5">
                <h3 className="font-bold text-navy">CDO Office</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  J.P. Borja Extension, Barangay Gusa, Cagayan De Oro City 9000, Philippines
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={150}>
        <section className="rounded-2xl bg-[#303b60] px-6 py-8 shadow-lg sm:px-8 lg:flex lg:items-center lg:justify-between lg:px-10">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Have a product inquiry?</h2>
            <p className="mt-2 text-sm leading-6 text-gray-200 sm:text-base">
              Send us the model, quantity or system requirement and our team will assist you.
            </p>
          </div>
          <Link href="/contact" className="mt-6 inline-flex rounded-lg bg-white px-6 py-3 text-sm font-bold text-navy transition hover:bg-gray-100 lg:mt-0">
            Contact Us
          </Link>
        </section>
      </FadeIn>
    </div>
  );
}
