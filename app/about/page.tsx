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
      <h1 className="text-3xl font-bold text-navy mb-2">About MaverickMind</h1>
      <p className="text-gray-500 mb-10">Security and Communication Solutions</p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-navy mb-3">Who We Are</h2>
        <p className="text-gray-700 leading-relaxed">
          MaverickMind Security &amp; Communication Solutions provides reliable
          technology solutions for homes, businesses, and organizations. We
          specialize in CCTV systems, fire alarm systems, telephone systems,
          networking solutions, and professional installation services.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <section>
          <h2 className="text-xl font-semibold text-navy mb-3">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            To provide dependable security and communication solutions using
            quality products and professional services.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-navy mb-3">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            To become a trusted technology partner known for innovation,
            reliability, and excellent customer support.
          </p>
        </section>
      </div>

      <section>
        <h2 className="text-xl font-semibold text-navy mb-4">Why Choose Us?</h2>
        <ul className="grid sm:grid-cols-2 gap-3">
          {reasons.map((r) => (
            <li
              key={r}
              className="bg-white rounded shadow-sm px-4 py-3 text-gray-700"
            >
              ✔ {r}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
