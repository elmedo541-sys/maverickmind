import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { getServices } from "@/lib/server/services";

export const metadata = { title: "Services" };

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Understand the Requirement",
    body: "We start with the actual need, site condition and intended use of the system.",
  },
  {
    number: "02",
    title: "Recommend the Solution",
    body: "Products and system options are matched based on compatibility, reliability and practical requirements.",
  },
  {
    number: "03",
    title: "Support the Implementation",
    body: "Technical guidance, coordination and after-sales support help keep the project moving smoothly.",
  },
];

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="mx-auto w-full max-w-[1800px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16 xl:px-10">
      <FadeIn>
        <section className="relative mb-10 overflow-hidden rounded-3xl bg-[#39456b] px-6 py-10 shadow-xl sm:px-8 lg:px-12 lg:py-14">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="max-w-4xl">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-200">
                Our Services
              </p>
              <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                Professional support for security, communication and networking projects.
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-200 sm:text-base">
                From product selection and system consultation to technical support and implementation coordination, Maverick Minds helps customers move from requirement to practical solution.
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur sm:p-6">
              <p className="text-sm font-bold text-white">Need help with a project?</p>
              <p className="mt-2 text-sm leading-6 text-gray-200">
                Send your requirements and our team can help identify suitable next steps.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-bold text-navy transition hover:-translate-y-0.5 hover:bg-gray-100"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </FadeIn>

      <section>
        <FadeIn delay={50}>
          <div className="mb-7">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
              What We Do
            </p>
            <h2 className="text-2xl font-bold text-navy sm:text-3xl">
              Services designed around practical requirements.
            </h2>
          </div>
        </FadeIn>

        {services.length === 0 ? (
          <FadeIn delay={80}>
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-gray-500 shadow-sm">
              No services listed yet.
            </div>
          </FadeIn>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 lg:gap-6">
            {services.map((service, index) => (
              <FadeIn key={service.id} delay={Math.min(index, 8) * 55}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#f6f7fb]">
                    {service.image ? (
                      <Image
                        src={service.image}
                        alt={service.serviceName}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.7">
                            <path d="M4 7h16v10H4z" />
                            <path d="M8 17v3M16 17v3M7 4h10" strokeLinecap="round" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-700">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <h2 className="text-xl font-bold text-navy">{service.serviceName}</h2>
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      {service.description}
                    </p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        )}
      </section>

      <section className="mt-16 border-y border-gray-200 bg-white/70 -mx-4 px-4 py-14 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 xl:-mx-10 xl:px-10">
        <div className="mx-auto w-full max-w-[1800px]">
          <FadeIn>
            <div className="mb-8 max-w-3xl">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
                Our Approach
              </p>
              <h2 className="text-2xl font-bold text-navy sm:text-3xl">
                A straightforward process from need to solution.
              </h2>
            </div>
          </FadeIn>

          <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
            {PROCESS_STEPS.map((step, index) => (
              <FadeIn key={step.number} delay={70 + index * 60}>
                <div className="h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
                  <span className="text-3xl font-bold text-blue-200">{step.number}</span>
                  <h3 className="mt-4 text-lg font-bold text-navy">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{step.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <FadeIn delay={100}>
        <section className="mt-14 rounded-3xl bg-navy px-6 py-10 text-center shadow-xl sm:px-10 lg:px-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200">
            Let&apos;s Talk
          </p>
          <h2 className="mx-auto mt-2 max-w-3xl text-2xl font-bold text-white sm:text-3xl">
            Tell us what you are planning and we can help you identify the right products and support.
          </h2>
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-500"
          >
            Send an Inquiry
          </Link>
        </section>
      </FadeIn>
    </div>
  );
}
