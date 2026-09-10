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
        <h1 className="text-3xl font-bold text-navy mb-2">Maverick Minds Inc.</h1>
        <p className="text-gray-500 mb-1">Minds. Machines. Innovation.</p>
        <p className="italic text-gray-500 mb-10">
          Connecting Technology. Protecting People.
        </p>
      </FadeIn>

      <FadeIn delay={80}>
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-navy mb-3">Who We Are</h2>
          <p className="text-gray-700 leading-relaxed">
            Maverick Minds Inc. (MMI) is a technology solutions company focused
            on reliable Product Solutions, System Consultation, and Technical
            Support for security, safety, communication, networking, and
            auxiliary systems.
          </p>
        </section>
      </FadeIn>

      <FadeIn delay={100}>
        <div className="bg-navy text-white rounded-lg shadow-sm px-6 py-4 text-center mb-10">
          <p className="font-semibold tracking-wide">
            NATIONWIDE PRODUCT SOLUTIONS &amp; TECHNICAL SUPPORT
          </p>
          <p className="text-sm text-gray-200 mt-1">LUZON | VISAYAS | MINDANAO</p>
        </div>
      </FadeIn>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {pillars.map((p, i) => (
          <FadeIn key={p.title} delay={120 + i * 60}>
            <div className="bg-navy text-white rounded-lg shadow-sm p-5 h-full">
              <h3 className="text-lg font-semibold mb-1">{p.title}</h3>
              <p className="text-xs text-gray-300 mb-3">{p.tagline}</p>
              <p className="text-sm text-gray-100 leading-relaxed">{p.body}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={140}>
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-navy mb-4">What MMI Provides</h2>
          <div className="space-y-3">
            {provides.map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-lg shadow-sm p-4 sm:flex sm:items-start sm:gap-4"
              >
                <p className="font-semibold text-navy sm:w-56 shrink-0">
                  {item.label}
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={160}>
        <section className="mb-10">
          <div className="border-2 border-navy/20 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-navy mb-2">
              Installation &amp; Preventive Maintenance Services
            </h2>
            <p className="text-gray-700 mb-2">
              Professional field implementation is provided through our
              service partner:
            </p>
            <p className="font-semibold text-navy mb-2">
              Unotel Electronics Inc.
            </p>
            <p className="text-gray-700 text-sm">
              Installation | Testing &amp; Commissioning | Preventive
              Maintenance | Field Services
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={100}>
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-navy mb-4">Our Offices</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-5">
              <h3 className="font-semibold text-navy mb-2">Cebu Office</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Door 2, G. K. Chua Bldg., Lopez Jaena Street, Subangdaku,
                Mandaue City 6014, Philippines
              </p>
              <p className="text-gray-700 text-sm mt-2">
                Tel: +63 32 3461223 · 09985398334 · 09985834659
              </p>
              <p className="text-gray-700 text-sm">
                Email:{" "}
                <a
                  href="mailto:maverickminds24@gmail.com"
                  className="text-blue-700 hover:underline"
                >
                  maverickminds24@gmail.com
                </a>
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-5">
              <h3 className="font-semibold text-navy mb-2">CDO Office</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                J.P. Borja Extension, Barangay Gusa, Cagayan De Oro City 9000,
                Philippines
              </p>
              <p className="text-gray-700 text-sm mt-2">
                Cel: 09985834657 · Viber: 09255864638
              </p>
              <p className="text-gray-700 text-sm">
                Email:{" "}
                <a
                  href="mailto:maverickmindssales@gmail.com"
                  className="text-blue-700 hover:underline"
                >
                  maverickmindssales@gmail.com
                </a>
              </p>
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={180}>
        <section className="text-center">
          <p className="text-navy font-semibold mb-1">
            Serving customers and partners across the Philippines.
          </p>
          <p className="text-gray-600 text-sm mb-1">
            Understand the Need. Recommend the Right Solution. Support the
            Technology.
          </p>
          <p className="text-gray-600 text-sm">
            0998 583 4657 &nbsp;|&nbsp; Viber 0925 586 4638 &nbsp;|&nbsp;{" "}
            <a
              href="mailto:maverickminds.sales26@gmail.com"
              className="text-blue-700 hover:underline"
            >
              maverickminds.sales26@gmail.com
            </a>
          </p>
        </section>
      </FadeIn>
    </div>
  );
}
