import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const [productCount, serviceCount, inquiryCount] = await Promise.all([
    prisma.product.count(),
    prisma.service.count(),
    prisma.inquiry.count(),
  ]);

  const stats = [
    { label: "Products", value: productCount },
    { label: "Services", value: serviceCount },
    { label: "Inquiries", value: inquiryCount },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-8">Dashboard</h1>
      <div className="grid sm:grid-cols-3 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-3xl font-bold text-navy">{s.value}</p>
            <p className="text-gray-500 text-sm mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
