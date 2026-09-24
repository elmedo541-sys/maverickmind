import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata = { title: "About" };

const pillars = [
  {
    title: "Minds",
    tagline: "Knowledge · Expertise · Solutions",
    body: "We understand customer requirements and provide technical guidance for practical product selection and solution planning.",
  },
  {
    title: "Machines",
    tagline: "Products · Technology · Systems",
    body: "Technology products for CCTV, FDAS, access control, networking, communications, PA/intercom, IP telephony and ELV systems.",
  },
  {
    title: "Innovation",
    tagline: "Modern · Practical · Future-Ready",
    body: "Reliable, compatible, scalable and cost-effective technologies designed to create long-term customer value.",
  },
];

const provides = [
  {
    label: "Product Solutions",
    body: "Right products for the right applications.",
  },
  {
    label: "System Consultation",
    body: "Guidance for selection, compatibility and solution planning.",
  },
  {
    label: "Technical Support",
    body: "Configuration guidance, troubleshooting and after-sales support.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-[1800px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16 xl:px-10">
      <FadeIn>
        <section className="relative mb-8 overflow-hidden rounded-3xl bg-[#39456b] shadow-xl">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="relative grid lg:grid-cols-[1.15fr_0.85fr]">
            <div className="flex items-center px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
              <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-white/15 bg-[#2c3654] shadow-xl sm:h-28 sm:w-28">
                  <Image
                    src="/logo.png"
                    alt="Maverick Minds, Inc."
                    fill
                    className="object-contain p-3"
                    priority
                  />
                </div>

                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-200">
                    About Maverick Minds
                  </p>
                  <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                    MAVERICK MINDS, INC.
                  </h1>
                  <p className="mt-3 text-lg font-semibold text-gray-100 sm:text-xl">
                    Minds. Machines. Innovation.
                  </p>
                  <p className="mt-2 text-gray-300">
                    Connecting Technology. Protecting People.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center border-t border-white/10 bg-[#303b60] px-6 py-9 sm:px-10 lg:border-l lg:border-t-0 lg:px-12 lg:py-14">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-200">
                  Nationwide Coverage
                </p>
                <h2 className="text-2xl font-bold leading-snug text-white sm:text-3xl">
                  Product solutions and technical support across the Philippines.
                </h2>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Luzon", "Visayas", "Mindanao"].map((area) => (
                    <span
                      key={area}
                      className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      <div className="mb-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <FadeIn delay={70}>
          <section className="h-full rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
              Who We Are
            </p>
            <h2 className="max-w-4xl text-2xl font-bold text-navy sm:text-3xl">
              Practical technology solutions for security, safety and communication.
            </h2>
            <p className="mt-4 max-w-5xl text-base leading-7 text-gray-600 sm:text-lg">
              Maverick Minds Inc. (MMI) is a technology solutions company focused on reliable Product Solutions, System Consultation, and Technical Support for security, safety, communication, networking, and auxiliary systems.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {pillars.map((pillar, index) => (
                <FadeIn key={pillar.title} delay={110 + index * 55}>
                  <article className="h-full rounded-2xl border border-gray-200 bg-[#f6f7fb] p-5 transition hover:-translate-y-1 hover:shadow-md sm:p-6">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-700">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <h3 className="text-xl font-bold text-navy">{pillar.title}</h3>
                    <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-[#59648f]">
                      {pillar.tagline}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-gray-600">{pillar.body}</p>
                  </article>
                </FadeIn>
              ))}
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={110}>
          <section className="h-full rounded-3xl bg-[#59648f] p-6 text-white shadow-sm sm:p-8 lg:p-10">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-200">
              What MMI Provides
            </p>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Support from product selection to implementation.
            </h2>

            <div className="mt-6 space-y-4">
              {provides.map((item, index) => (
                <FadeIn key={item.label} delay={140 + index * 50}>
                  <div className="rounded-2xl border border-white/10 bg-[#465277] p-5">
                    <div className="flex items-start gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-xs font-bold text-blue-200">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-sm font-bold uppercase tracking-wide text-white">
                          {item.label}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-gray-200">{item.body}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </section>
        </FadeIn>
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        <FadeIn delay={130}>
          <section className="h-full rounded-3xl bg-[#39456b] p-6 shadow-sm sm:p-8 lg:col-span-2 lg:p-10">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-200">
              Installation &amp; Preventive Maintenance
            </p>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Professional field implementation through our service partner.
            </h2>
            <p className="mt-4 max-w-4xl leading-7 text-gray-200">
              Installation, testing, commissioning, preventive maintenance and field services are provided through:
            </p>

            <div className="mt-6 rounded-2xl border border-white/15 bg-white/10 p-5 sm:p-6">
              <p className="text-xl font-bold text-white">UNOTEL ELECTRONICS INC.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Installation", "Testing & Commissioning", "Preventive Maintenance", "Field Services"].map((service) => (
                  <span
                    key={service}
                    className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs text-gray-100 sm:text-sm"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={150}>
          <section className="h-full rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
              Our Offices
            </p>
            <h2 className="text-2xl font-bold text-navy">Where to find us</h2>

            <div className="mt-6 space-y-6">
              <div>
                <h3 className="font-bold text-navy">Cebu Office</h3>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Door 2, G. K. Chua Bldg., Lopez Jaena Street, Subangdaku, Mandaue City 6014, Philippines
                </p>
              </div>
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-bold text-navy">CDO Office</h3>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  J.P. Borja Extension, Barangay Gusa, Cagayan De Oro City 9000, Philippines
                </p>
              </div>
            </div>
          </section>
        </FadeIn>
      </div>

      <FadeIn delay={170}>
        <section className="relative overflow-hidden rounded-3xl bg-[#303b60] px-6 py-9 shadow-xl sm:px-8 lg:flex lg:items-center lg:justify-between lg:px-10">
          <div className="absolute -right-12 -top-20 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="relative max-w-3xl">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Serving customers and partners across the Philippines.
            </h2>
            <p className="mt-2 text-gray-200">
              Understand the Need. Recommend the Right Solution. Support the Technology.
            </p>
          </div>
          <Link
            href="/contact"
            className="relative mt-6 inline-flex rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-navy transition hover:-translate-y-0.5 hover:bg-gray-100 lg:mt-0"
          >
            Contact Maverick Minds
          </Link>
        </section>
      </FadeIn>
    </div>
  );
}
