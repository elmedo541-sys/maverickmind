import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Services" };

export default async function ServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { id: "desc" } });

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-navy mb-8">Our Services</h1>

      {services.length === 0 ? (
        <p className="text-gray-500">No services listed yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative w-full h-40 bg-gray-100">
                {s.image ? (
                  <Image
                    src={s.image}
                    alt={s.serviceName}
                    fill
                    className="object-cover"
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
          ))}
        </div>
      )}
    </div>
  );
}
