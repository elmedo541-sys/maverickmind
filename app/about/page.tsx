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
  { label: "Product Solutions", body: "Right products for the right applications." },
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
    <div className="max-w-4xl mx-auto px-6 py-14">
      <FadeIn>
        <div className="rounded-2xl overflow-hidden border border-white/20 shadow-lg">
          {/* Header block */}
          <div className="bg-[#39456b] px-8 py-10">
            <div className="flex items-center gap-5">
              <div className="relative w-16 h-16 shrink-0 rounded-md overflow-hidden bg-[#2c3654]">
                <Image
                  src="/logo.png"
                  alt="Maverick Minds, Inc."
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
                  MAVERICK MINDS INC.
                </h1>
                <p className="text-gray-200 font-medium mt-1">
                  Minds. Machines. Innovation.
                </p>
                <p className="italic text-gray-300 text-sm mt-1">
                  Connecting Technology. Protecting People.
                </p>
              </div>
            </div>
          </div>

          {/* Body block */}
          <div className="bg-[#59648f] px-8 py-10">
            <FadeIn delay={80}>
              <h2 className="text-lg font-bold text-white tracking-wide mb-3">
                WHO WE ARE
              </h2>
              <p className="text-gray-100 leading-relaxed mb-8">
                Maverick Minds Inc. (MMI) is a technology solutions company
                focused on reliable Product Solutions, System Consultation,
                and Technical Support for security, safety, communication,
                networking, and auxiliary systems.
              </p>
            </FadeIn>

            <FadeIn delay={100}>
              <div className="bg-[#3e4a70] border border-white/20 rounded-lg px-6 py-4 text-center mb-8">
                <p className="text-white font-bold tracking-wide text-sm sm:text-base">
                  NATIONWIDE PRODUCT SOLUTIONS &amp; TECHNICAL SUPPORT
                </p>
                <p className="text-gray-200 text-sm mt-1 font-semibold">
                  LUZON | VISAYAS | MINDANAO
                </p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {pillars.map((p, i) => (
                <FadeIn key={p.title} delay={120 + i * 60}>
                  <div className="bg-[#39456b] border border-white/10 rounded-lg p-5 h-full">
                    <h3 className="text-white font-bold mb-1">{p.title}</h3>
                    <p className="text-xs text-gray-300 mb-3">{p.tagline}</p>
                    <p className="text-sm text-gray-100 leading-relaxed">
                      {p.body}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={140}>
              <h2 className="text-lg font-bold text-white tracking-wide mb-4">
                WHAT MMI PROVIDES
              </h2>
              <div className="space-y-2 mb-8">
                {provides.map((item) => (
                  <div
                    key={item.label}
                    className="sm:flex sm:items-start sm:gap-4"
                  >
                    <p className="font-bold text-white text-sm sm:w-56 shrink-0 uppercase">
                      {item.label}
                    </p>
                    <p className="text-gray-100 text-sm leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={160}>
              <div className="border border-white/30 rounded-lg p-6 mb-2">
                <h2 className="text-white font-bold mb-2">
                  INSTALLATION &amp; PREVENTIVE MAINTENANCE SERVICES
                </h2>
                <p className="text-gray-100 text-sm mb-2">
                  Professional field implementation is provided through our
                  service partner:
                </p>
                <p className="text-white font-bold mb-2">
                  UNOTEL ELECTRONICS INC.
                </p>
                <p className="text-gray-200 text-sm">
                  Installation &nbsp;|&nbsp; Testing &amp; Commissioning
                  &nbsp;|&nbsp; Preventive Maintenance &nbsp;|&nbsp; Field
                  Services
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Footer block */}
          <FadeIn delay={180}>
            <div className="bg-[#39456b] px-8 py-8 text-center border-t border-white/10">
              <p className="text-white font-semibold mb-1">
                Serving customers and partners across the Philippines.
              </p>
              <p className="text-gray-200 text-sm mb-2">
                Understand the Need. Recommend the Right Solution. Support
                the Technology.
              </p>
              <p className="text-gray-100 text-sm font-medium">
                0998 583 4657 &nbsp;|&nbsp; Viber 0925 586 4638 &nbsp;|&nbsp;{" "}
                <a
                  href="mailto:maverickminds.sales26@gmail.com"
                  className="text-blue-300 hover:underline"
                >
                  maverickminds.sales26@gmail.com
                </a>
              </p>
            </div>
          </FadeIn>
        </div>
      </FadeIn>

      {/* Offices - kept from existing site info, not part of the source PDF */}
      <FadeIn delay={100}>
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-navy mb-4">Our Offices</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-5">
              <h3 className="font-semibold text-navy mb-2">Cebu Office</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Door 2, G. K. Chua Bldg., Lopez Jaena Street, Subangdaku,
                Mandaue City 6014, Philippines
              </p>

            </div>
            <div className="bg-white rounded-lg shadow-sm p-5">
              <h3 className="font-semibold text-navy mb-2">CDO Office</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                J.P. Borja Extension, Barangay Gusa, Cagayan De Oro City 9000,
                Philippines
              </p>
    
            </div>
          </div>
        </section>
      </FadeIn>
  )
}
