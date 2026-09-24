import Image from "next/image";
import FadeIn from "@/components/FadeIn";

export const metadata = { title: "About" };

const pillars = [
  {
    title: "Minds",
    tagline: "Knowledge - Expertise - Solutions",
    body: "We understand customer requirements and provide technical guidance for practical product selection and solution planning.",
  },
  {
    title: "Machines",
    tagline: "Products - Technology - Systems",
    body: "Technology products for CCTV, FDAS, access control, networking, communications, PA/intercom, IP telephony and ELV systems.",
  },
  {
    title: "Innovation",
    tagline: "Modern - Practical - Future-Ready",
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
    <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-12">
      {/* Hero */}
      <FadeIn>
        <section className="overflow-hidden rounded-2xl bg-[#39456b] border border-white/10 shadow-lg mb-8">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
            <div className="px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14 flex items-center">
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 sm:gap-6">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-xl overflow-hidden bg-[#2c3654] border border-white/10 shadow-md">
                  <Image
                    src="/logo.png"
                    alt="Maverick Minds, Inc."
                    fill
                    className="object-contain p-2"
                    priority
                  />
                </div>

                <div>
                  <p className="text-blue-200 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-2">
                    About Us
                  </p>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wide leading-tight">
                    MAVERICK MINDS, INC.
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-100 font-semibold mt-3">
                    Minds. Machines. Innovation.
                  </p>
                  <p className="text-gray-300 mt-2">
                    Connecting Technology. Protecting People.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#303b60] px-6 py-9 sm:px-10 lg:px-12 lg:py-14 flex items-center">
              <div className="w-full">
                <p className="text-blue-200 text-xs font-bold tracking-[0.2em] uppercase mb-3">
                  Nationwide Coverage
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                  Product solutions and technical support across the Philippines.
                </h2>
                <div className="flex flex-wrap gap-2 mt-6">
                  {['Luzon', 'Visayas', 'Mindanao'].map((area) => (
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

      {/* Main about content */}
      <div className="grid xl:grid-cols-[1.15fr_0.85fr] gap-6 mb-8">
        <FadeIn delay={80}>
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 lg:p-10 h-full">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#59648f] mb-2">
              Who We Are
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-4">
              Practical technology solutions for security, safety and communication.
            </h2>
            <p className="text-gray-600 leading-7 text-base sm:text-lg max-w-5xl">
              Maverick Minds Inc. (MMI) is a technology solutions company focused on reliable Product Solutions, System Consultation, and Technical Support for security, safety, communication, networking, and auxiliary systems.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-8">
              {pillars.map((pillar, index) => (
                <FadeIn key={pillar.title} delay={120 + index * 60}>
                  <div className="h-full rounded-xl bg-[#f6f7fb] border border-gray-200 p-5 hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-navy">{pillar.title}</h3>
                    <p className="text-xs uppercase tracking-wide text-[#59648f] font-semibold mt-1 mb-3">
                      {pillar.tagline}
                    </p>
                    <p className="text-sm text-gray-600 leading-6">{pillar.body}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={120}>
          <section className="bg-[#59648f] rounded-2xl border border-white/10 shadow-sm p-6 sm:p-8 lg:p-10 h-full text-white">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-blue-200 mb-2">
              What MMI Provides
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">
              Support from product selection to implementation.
            </h2>

            <div className="space-y-4">
              {provides.map((item, index) => (
                <FadeIn key={item.label} delay={150 + index * 50}>
                  <div className="rounded-xl bg-[#465277] border border-white/10 p-5">
                    <h3 className="font-bold text-white mb-1 uppercase tracking-wide text-sm">
                      {item.label}
                    </h3>
                    <p className="text-gray-200 leading-6 text-sm">
                      {item.body}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </section>
        </FadeIn>
      </div>

      {/* Service partner and offices */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <FadeIn delay={140}>
          <section className="lg:col-span-2 bg-[#39456b] rounded-2xl border border-white/10 shadow-sm p-6 sm:p-8 lg:p-10 h-full">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-blue-200 mb-2">
              Installation &amp; Preventive Maintenance
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Professional field implementation through our service partner.
            </h2>
            <p className="text-gray-200 leading-7 mb-5">
              Installation, testing, commissioning, preventive maintenance and field services are provided through:
            </p>
            <div className="rounded-xl border border-white/15 bg-white/10 p-5 sm:p-6">
              <p className="text-xl font-bold text-white mb-3">UNOTEL ELECTRONICS INC.</p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Installation',
                  'Testing & Commissioning',
                  'Preventive Maintenance',
                  'Field Services',
                ].map((service) => (
                  <span
                    key={service}
                    className="rounded-full bg-white/10 border border-white/15 px-3 py-2 text-xs sm:text-sm text-gray-100"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={160}>
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 lg:p-10 h-full">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#59648f] mb-2">
              Our Offices
            </p>
            <h2 className="text-2xl font-bold text-navy mb-6">Where to find us</h2>

            <div className="space-y-5">
              <div>
                <h3 className="font-bold text-navy mb-1">Cebu Office</h3>
                <p className="text-gray-600 text-sm leading-6">
                  Door 2, G. K. Chua Bldg., Lopez Jaena Street, Subangdaku, Mandaue City 6014, Philippines
                </p>
              </div>
              <div className="border-t border-gray-200 pt-5">
                <h3 className="font-bold text-navy mb-1">CDO Office</h3>
                <p className="text-gray-600 text-sm leading-6">
                  J.P. Borja Extension, Barangay Gusa, Cagayan De Oro City 9000, Philippines
                </p>
              </div>
            </div>
          </section>
        </FadeIn>
      </div>

      {/* Contact strip */}
      <FadeIn delay={180}>
        <section className="rounded-2xl bg-[#303b60] px-6 py-8 sm:px-8 lg:px-10 text-center shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Serving customers and partners across the Philippines.
          </h2>
          <p className="text-gray-200 mt-2">
            Understand the Need. Recommend the Right Solution. Support the Technology.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row flex-wrap justify-center items-center gap-x-5 gap-y-2 text-sm font-medium">
            <a href="tel:+639985834657" className="text-white hover:text-blue-200 transition-colors">
              0998 583 4657
            </a>
            <span className="hidden sm:inline text-white/30">|</span>
            <a
              href="viber://chat?number=%2B639255864638"
              className="text-white hover:text-blue-200 transition-colors"
            >
              Viber 0925 586 4638
            </a>
            <span className="hidden sm:inline text-white/30">|</span>
            <a
              href="mailto:maverickminds.sales26@gmail.com"
              className="text-blue-200 hover:text-white transition-colors break-all"
            >
              maverickminds.sales26@gmail.com
            </a>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
