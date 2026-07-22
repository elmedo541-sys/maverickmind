import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

export default async function HomePage() {
  const [products, services] = await Promise.all([
    prisma.product.findMany({
      orderBy: { id: "desc" },
      take: 6,
      include: { category: true },
    }),
    prisma.service.findMany({ orderBy: { id: "desc" }, take: 4 }),
  ]);

  return (
    <div>
      <section className="bg-navy text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Complete Security &amp; Communication Solutions
          </h1>
          <p className="text-gray-200 max-w-2xl mx-auto mb-8">
            MaverickMind supplies fire alarm systems, CCTV, PoE switches,
            video recorders, and cabling &amp; wiring, plus professional
            installation services.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/products"
              className="bg-white text-navy px-6 py-3 rounded font-semibold hover:bg-gray-100"
            >
              Browse Products
            </Link>
            <Link
              href="/contact"
              className="border border-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-navy"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-bold text-navy mb-6 text-center">
          Why Choose MaverickMind
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            "Quality Products",
            "Professional Installation",
            "Technical Support",
            "Customer Satisfaction",
          ].map((reason) => (
            <div
              key={reason}
              className="bg-white rounded-lg shadow-sm p-5 text-center"
            >
              <p className="text-blue-700 text-xl mb-2">✔</p>
              <p className="font-semibold text-navy text-sm">{reason}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-navy">Featured Products</h2>
          <Link href="/products" className="text-blue-700 text-sm font-medium">
            View all &rarr;
          </Link>
        </div>
        {products.length === 0 ? (
          <p className="text-gray-500">No products yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                productName={p.productName}
                price={p.price.toString()}
                image={p.image}
                categoryName={p.category?.categoryName}
              />
            ))}
          </div>
        )}
      </section>

      <section className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-navy">Our Services</h2>
            <Link href="/services" className="text-blue-700 text-sm font-medium">
              View all &rarr;
            </Link>
          </div>
          {services.length === 0 ? (
            <p className="text-gray-500">No services yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {services.map((s) => (
                <div key={s.id} className="bg-gray-50 rounded-lg p-5 shadow-sm">
                  <h3 className="font-semibold text-navy mb-2">
                    {s.serviceName}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}