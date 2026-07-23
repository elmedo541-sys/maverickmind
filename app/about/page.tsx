import FadeIn from "@/components/FadeIn";

export const metadata = { title: "About" };

const reasons = [
  "Quality Products",
  "Professional Installation",
  "Technical Support",
  "Customer Satisfaction",
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-14">
      <FadeIn>
        <h1 className="text-3xl font-bold text-navy mb-2">About MaverickMind</h1>
        <p className="text-gray-500 mb-10">Security and Communication Solutions</p>
      </FadeIn>

      <FadeIn delay={80}>
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-navy mb-3">Who We Are</h2>
          <p className="text-gray-700 leading-relaxed">
            MaverickMind Security &amp; Communication Solutions provides reliable
            technology solutions for homes, businesses, and organizations. We
            specialize in CCTV systems, fire alarm systems, telephone systems,
            networking solutions, and professional installation services.
          </p>
        </section>
      </FadeIn>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <FadeIn delay={140}>
          <section>
            <h2 className="text-xl font-semibold text-navy mb-3">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              To provide dependable security and communication solutions using
              quality products and professional services.
            </p>
          </section>
        </FadeIn>
        <FadeIn delay={200}>
          <section>
            <h2 className="text-xl font-semibold text-navy mb-3">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              To become a trusted technology partner known for innovation,
              reliability, and excellent customer support.
            </p>
          </section>
        </FadeIn>
      </div>

      <FadeIn delay={100}>
        <section>
          <h2 className="text-xl font-semibold text-navy mb-4">Why Choose Us?</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {reasons.map((r, i) => (
              <li
                key={r}
                style={{ transitionDelay: `${i * 60}ms` }}
                className="bg-white rounded shadow-sm px-4 py-3 text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                ✔ {r}
              </li>
            ))}
          </ul>
        </section>
      </FadeIn>
    </div>
  );
}