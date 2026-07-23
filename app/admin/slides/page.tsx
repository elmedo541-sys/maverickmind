import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import DeleteButton from "./DeleteButton";
import { MoveButtons, ActiveToggle } from "./SlideControls";

export default async function AdminSlidesPage() {
  const slides = await prisma.slide.findMany({ orderBy: { position: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy">Homepage Slideshow</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage the banner slides shown at the top of your homepage.
          </p>
        </div>
        <Link
          href="/admin/slides/add"
          className="bg-navy text-white px-4 py-2 rounded text-sm font-semibold hover:bg-navyLight"
        >
          + Add Slide
        </Link>
      </div>

      {slides.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm px-4 py-8 text-center text-gray-500">
          No slides yet. Add one to show a banner on your homepage.
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Link</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {slides.map((s, i) => (
                <tr key={s.id} className="border-t">
                  <td className="px-4 py-3">
                    <MoveButtons
                      id={s.id}
                      isFirst={i === 0}
                      isLast={i === slides.length - 1}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="relative w-16 h-12">
                      <Image
                        src={s.image}
                        alt={s.title || "Slide"}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-navy">
                      {s.title || <span className="text-gray-400 italic">No title (image only)</span>}
                    </p>
                    {s.subtitle && (
                      <p className="text-gray-500 text-xs">{s.subtitle}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {s.linkUrl || "—"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <ActiveToggle id={s.id} active={s.active} />
                  </td>
                  <td className="px-4 py-3 text-right space-x-3 whitespace-nowrap">
                    <Link
                      href={`/admin/slides/${s.id}/edit`}
                      className="text-blue-700 hover:underline"
                    >
                      Edit
                    </Link>
                    <DeleteButton id={s.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}