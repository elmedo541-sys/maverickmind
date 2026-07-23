import Image from "next/image";
import { prisma } from "@/lib/prisma";
import FadeIn from "@/components/FadeIn";

export const metadata = { title: "Services" };

export default async function ServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { id: "desc" } });

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <FadeIn>
        <h1 className="text-3xl font-bold text-navy mb-8">Our Services</h1>
      </FadeIn>

      {services.length === 0 ? (
        <FadeIn delay={80}>
          <p className="text-gray-500">No services listed yet.</p>
        </FadeIn>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <FadeIn key={s.id} delay={Math.min(i, 8) * 60}>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group">
                <div className="relative w-full h-40 bg-gray-100 overflow-hidden">
                  {s.image ? (
                    <Image
                      src={s.image}
                      alt={s.serviceName}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                      No image
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h2 className="font-semibold text-navy mb-2">{s.serviceName}</h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}