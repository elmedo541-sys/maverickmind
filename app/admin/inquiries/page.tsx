import { prisma } from "@/lib/prisma";
import DeleteButton from "./DeleteButton";

export default async function InquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-8">Inquiries</h1>

      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((i) => (
              <tr key={i.id} className="border-t align-top">
                <td className="px-4 py-3 font-medium text-navy whitespace-nowrap">
                  {i.name}
                </td>
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                  {i.email}
                </td>
                <td className="px-4 py-3 text-gray-600 max-w-md">
                  {i.message}
                </td>
                <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                  {i.createdAt.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <DeleteButton id={i.id} />
                </td>
              </tr>
            ))}
            {inquiries.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  No inquiries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
